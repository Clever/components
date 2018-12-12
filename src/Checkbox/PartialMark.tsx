import * as classnames from "classnames";
import * as React from "react";

const cssClass = {
  CONTAINER: "Checkbox--PartialMark",
};

export default class CheckMark extends React.PureComponent {
  render() {
    const {className} = this.props;

    return (
      <svg
        className={classnames(cssClass.CONTAINER, className)}
        xmlns="http://www.w3.org/2000/svg"
        version="1"
        viewBox="0 0 10 4"
      >
        <rect
          width="10"
          height="4"
          x="0"
          y="0"
          fill="#FFF"
          fillRule="evenodd"
          rx="1"
        />
      </svg>
    );
  }
}
