import { readFile, writeFile, mkdir } from "node:fs/promises";
import { join, dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { navigation } from "../../data/navigation.js";

/**
 * Generates llms.txt, llms-full.txt and a Markdown copy of every documentation page,
 * following https://llmstxt.org. Pages are ordered by the sidebar navigation.
 *
 * @param {{ title: string, description: string, site: string }} options
 * @returns {import('astro').AstroIntegration}
 */
export default function llmsTxt({ title, description, site }) {
  return {
    name: "llms-txt",
    hooks: {
      "astro:build:done": async ({ dir, logger }) => {
        const distDir = fileURLToPath(dir);
        const pagesDir = join(process.cwd(), "src/pages");

        const pages = [];
        for (const group of navigation) {
          for (const item of group.items) {
            const slug = item.href === "/" ? "index" : item.href.slice(1);
            const markdown = await pageToMarkdown(join(pagesDir, `${slug}.mdx`), item.text, site);
            await mkdir(dirname(join(distDir, `${slug}.md`)), { recursive: true });
            await writeFile(join(distDir, `${slug}.md`), markdown, "utf-8");
            pages.push({ group: group.title, item, slug, markdown });
          }
        }

        await writeFile(
          join(distDir, "llms-full.txt"),
          `<SYSTEM>${description}</SYSTEM>\n\n` + pages.map((p) => p.markdown).join("\n\n---\n\n"),
          "utf-8",
        );

        const index = [`# ${title}`, "", `> ${description}`, "", "## Documentation Sets", ""];
        index.push(`- [Complete Documentation](${site}/llms-full.txt): All pages in one file`, "");
        index.push("## Documentation Pages");
        for (const group of navigation) {
          index.push("", `### ${group.title}`, "");
          for (const p of pages.filter((p) => p.group == group.title)) {
            const desc = p.item.description ? `: ${p.item.description}` : "";
            index.push(`- [${p.item.text}](${site}/${p.slug}.md)${desc}`);
          }
        }
        await writeFile(join(distDir, "llms.txt"), index.join("\n") + "\n", "utf-8");

        logger.info(`llms.txt, llms-full.txt and ${pages.length} Markdown pages generated`);
      },
    },
  };
}

/** Converts an MDX documentation page into plain Markdown. */
async function pageToMarkdown(mdxPath, fallbackTitle, site) {
  let content = (await readFile(mdxPath, "utf-8")).replace(/\r\n/g, "\n");

  // Frontmatter
  let pageTitle = fallbackTitle;
  content = content.replace(/^---\r?\n([\s\S]*?)\r?\n---\r?\n/, (_, fm) => {
    const match = fm.match(/^title:\s*(.+)$/m);
    if (match) pageTitle = match[1].trim().replace(/^["']|["']$/g, "");
    return "";
  });

  // Code examples exported as template strings: export const code = `...`;
  const snippets = {};
  content = content.replace(/^export const (\w+) = `([\s\S]*?)`;?[ \t]*$/gm, (_, name, code) => {
    snippets[name] = code.trim();
    return "";
  });

  // Config objects rendered by <ConfigTable>
  const configs = {};
  for (const [, name, path] of content.matchAll(/^import\s+(\w+)\s+from\s+["']([^"']*\/config\/[^"']+)["'];?\s*$/gm)) {
    configs[name] = await loadConfig(resolve(dirname(mdxPath), path));
  }

  // Remaining imports
  content = content.replace(/^import\s.*$/gm, "");

  // Prose blocks are indented inside JSX; dedent them so they read as Markdown
  content = content.replace(/<Prose>([\s\S]*?)<\/Prose>/g, (_, inner) => dedent(inner));

  content = content
    .replace(/^[ \t]*<CodeSnippet[\s\S]*?code=\{(\w+)\}[\s\S]*?\/>/gm, (match, name) => {
      const lang = match.match(/lang=["'](\w+)["']/)?.[1] ?? "tsx";
      return snippets[name] != null ? "```" + lang + "\n" + snippets[name] + "\n```" : "";
    })
    .replace(/^[ \t]*<ConfigTable\s+config=\{(\w+)\}[^>]*\/>/gm, (_, name) =>
      configs[name] ? configTable(configs[name]) : "",
    )
    .replace(/^[ \t]*<ImportPath\s+path=(['"])(.*?)\1[^>]*\/>/gm, (_, q, path) => "```ts\n" + path + "\n```")
    // Site-relative links point to the Markdown version of the page
    .replace(/\]\((\/[^)\s#]*)(#[^)\s]*)?\)/g, (_, path, hash = "") =>
      `](${site}${path === "/" ? "/index" : path}.md${hash})`,
    )
    .replace(/<h([1-6])>(.*?)<\/h\1>/g, (_, level, text) => "#".repeat(Number(level)) + " " + text)
    // Live examples and layout wrappers have no Markdown equivalent
    .replace(/<[A-Z]\w*[^>]*client:load[^>]*\/>/g, "")
    .replace(/^[ \t]*<\/?(Split|Prose)[^>]*>[ \t]*$/gm, "")
    .replace(/^[ \t]*<div[^>]*>[ \t]*$/gm, "")
    .replace(/^[ \t]*<\/div>[ \t]*$/gm, "")
    .replace(/^[ \t]+$/gm, "")
    .replace(/\n{3,}/g, "\n\n")
    .trim();

  if (!/^# /m.test(content)) content = `# ${pageTitle}\n\n${content}`;
  return content + "\n";
}

/** Loads a src/config/*.ts file. They are plain objects that import each other, so they can be evaluated directly. */
async function loadConfig(file) {
  if (!file.endsWith(".ts")) file += ".ts";
  const source = await readFile(file, "utf-8");
  const names = [];
  const values = [];
  for (const [, name, path] of source.matchAll(/^import\s+(\w+)\s+from\s+["'](.+?)["'];?\s*$/gm)) {
    names.push(name);
    values.push(await loadConfig(resolve(dirname(file), path)));
  }
  const body = source.replace(/^import\s.*$/gm, "").replace(/export default/, "return");
  return new Function(...names, body)(...values);
}

/** Renders a config object the way ConfigTable does: key properties first, then alphabetically. */
function configTable(config) {
  const keys = Object.keys(config).sort((a, b) => {
    if (config[a].key && !config[b].key) return -1;
    if (!config[a].key && config[b].key) return 1;
    return a.localeCompare(b);
  });
  const rows = keys.map((key) => {
    const { type = "", alias, description = "" } = config[key];
    const name = alias ? `\`${key}\` (alias \`${alias}\`)` : `\`${key}\``;
    return `| ${name} | ${cell(type)} | ${cell(htmlToMarkdown(description))} |`;
  });
  return ["| Property | Type | Description |", "| --- | --- | --- |", ...rows].join("\n");
}

function htmlToMarkdown(html) {
  return html
    .replace(/<code>(.*?)<\/code>/g, "`$1`")
    .replace(/<a\s+href=["'](.*?)["'][^>]*>(.*?)<\/a>/g, "[$2]($1)")
    .replace(/<br\s*\/?>/g, " ")
    .replace(/<[^>]+>/g, "");
}

function cell(text) {
  return String(text).replace(/\|/g, "\\|").replace(/\s*\n\s*/g, " ");
}

function dedent(text) {
  const lines = text.split(/\r?\n/);
  const indents = lines.filter((l) => l.trim()).map((l) => l.match(/^[ \t]*/)[0].length);
  const min = indents.length ? Math.min(...indents) : 0;
  return lines.map((l) => l.slice(min)).join("\n");
}
