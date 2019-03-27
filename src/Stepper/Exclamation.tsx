import * as classnames from "classnames";
import * as React from "react";

const cssClass = {
  CONTAINER: "Stepper--Exclamation",
};

export default class Exclamation extends React.PureComponent {
  render() {
    const { className } = this.props;
    return (
      <svg
        className={classnames(cssClass.CONTAINER, className)}
        viewBox="0 0 12 9"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M1.945 8.275c-.237 0-.465-.096-.684-.287a1.077 1.077 0 0 1-.383-.663C.66 6.242.368 4.167.003 1.1-.016.883.062.675.235.475.408.275.614.15.851.1a6.81 6.81 0 0 1 2.325 0c.256.05.46.175.616.375a.88.88 0 0 1 .205.625c-.365 3.067-.657 5.142-.875 6.225-.037.25-.165.47-.383.663a1.06 1.06 0 0 1-.712.287h-.082zm-1.334 5.15c-.39-.35-.584-.775-.584-1.275 0-.5.195-.925.584-1.275.389-.35.86-.525 1.416-.525.556 0 1.028.175 1.417.525.389.35.583.775.583 1.275 0 .5-.194.925-.583 1.275-.389.35-.861.525-1.417.525-.555 0-1.027-.175-1.416-.525z"
          fill="#FFF"
          fillRule="evenodd"
        />
      </svg>
    );
  }
}
