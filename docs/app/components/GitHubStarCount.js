import { CSS, VDOM } from 'cx/ui';

export class GitHubStarCount extends VDOM.Component {
   render() {
      return (
         <div className={CSS.expand('master_githubstars', this.props.instance.data.className)}>
            <a
               className="github-button"
               href="https://github.com/codaxy/cx-diagrams"
               data-size="large"
               data-show-count="true"
               aria-label="Star codaxy/cx-diagrams on GitHub"
            >
               Star
            </a>
         </div>
      );
   }

   shouldComponentUpdate() {
      return false;
   }

   componentDidMount() {
      let script = document.createElement('script');
      script.async = true;
      script.defer = true;
      script.src = 'https://buttons.github.io/buttons.js';
      document.body.appendChild(script);
   }
}
