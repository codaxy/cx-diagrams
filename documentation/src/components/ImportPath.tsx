/** @jsxImportSource react */
import { Widget, VDOM, Instance, RenderingContext } from "cx/ui";

interface InputWithButtonProps {
  path: string;
}

interface InputWithButtonState {
  copied: boolean;
}

class InputWithButton extends VDOM.Component<
  InputWithButtonProps,
  InputWithButtonState
> {
  textInput: HTMLElement | null = null;

  constructor(props: InputWithButtonProps) {
    super(props);
    this.state = { copied: false };
  }

  copyToClipboard() {
    let range = document.createRange();
    range.selectNodeContents(this.textInput!);
    let selection = window.getSelection();
    selection?.removeAllRanges();
    selection?.addRange(range);
    try {
      document.execCommand("copy");
      selection?.removeAllRanges();
      this.setState({ copied: true });
    } catch (err) {
      alert("Please press CTRL/CMD+C to copy");
    }
  }

  resetTooltipText() {
    this.setState({ copied: false });
  }

  render() {
    return (
      <div className="cxb-importpath">
        <code
          ref={(input) => (this.textInput = input)}
          onClick={this.copyToClipboard.bind(this)}
          onMouseLeave={this.resetTooltipText.bind(this)}
        >
          {this.props.path}
          <i className="fa fa-copy" aria-hidden="true"></i>
        </code>
        <span
          aria-hidden="true"
          style={
            this.state.copied
              ? {
                  transition: "visibility 0s, opacity 0.5s",
                  visibility: "visible",
                  opacity: 1,
                }
              : { opacity: 0, visibility: "hidden" }
          }
        >
          Copied
        </span>
      </div>
    );
  }
}

export class ImportPath extends Widget {
  declare path: string;
  declare className: string;

  init() {
    super.init();
  }

  render(context: RenderingContext, instance: Instance, key: string) {
    return <InputWithButton path={this.path} key={key} />;
  }
}

ImportPath.prototype.className = "importpath";
