/** @jsxImportSource react */
import { TextualBoundedObject, type TextualBoundedObjectConfig } from "cx/svg";
import type { StringProp } from "cx/ui";

interface ImageConfig extends TextualBoundedObjectConfig {
  href: StringProp;
}

export class Image extends TextualBoundedObject {
  declare data: any;

  constructor(config: ImageConfig) {
    super(config);
  }

  declareData() {
    super.declareData(...arguments, {
      href: undefined,
    });
  }

  render(context: any, instance: any, key: any) {
    const { data } = instance;
    const { bounds } = data;
    if (!bounds.valid()) return false;
    return (
      <g key={key} className={data.classNames}>
        <image
          href={data.href}
          x={bounds.l}
          y={bounds.t}
          width={bounds.width()}
          height={bounds.height()}
          style={data.style}
          fill={data.fill}
          stroke={data.stroke}
        />
        {this.renderChildren(context, instance)}
      </g>
    );
  }
}

Image.prototype.baseClass = "image";
Image.prototype.anchors = "0 1 1 0";
