import * as classnames from "classnames";
import * as React from "react";

const cssClass = {
  CONTAINER: "Stepper--CheckMark",
};

export default class CheckMark extends React.PureComponent {
  render() {
    const {className} = this.props;
    return (
      <svg className={classnames(cssClass.CONTAINER, className)} viewBox="0 0 12 9" xmlns="http://www.w3.org/2000/svg">
        <path d="M11.612 2.081L4.568 8.934A.314.314 0 0 1 4.393 9a.314.314 0 0 1-.176-.066L.087 4.917c-.116-.114-.116-.228 0-.342l1.701-1.654c.117-.114.234-.114.35 0l2.255 2.206L9.56.085c.117-.113.234-.113.35 0l1.701 1.655c.117.113.117.227 0 .341z"
          fill="#FFF" fillRule="evenodd"
        />
      </svg>
    );
  }
}

