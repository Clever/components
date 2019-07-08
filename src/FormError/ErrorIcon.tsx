import * as classnames from "classnames";
import * as React from "react";

import "./ErrorIcon.less";

export interface Props {
  className?: string;
}

const cssClass = {
  CONTAINER: "FormError--ErrorIcon",
  PATH: "FormError--ErrorIcon--path",
};

export default class ErrorIcon extends React.PureComponent<Props> {
  render() {
    const { className } = this.props;

    return (
      <svg
        className={classnames(cssClass.CONTAINER, className)}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 14 14"
      >
        <path
          className={cssClass.PATH}
          fillRule="evenodd"
          d="M13.84 11.9c.22.45.2.98-.05 1.4-.28.44-.75.7-1.25.7H1.46c-.5 0-.97-.26-1.25-.7a1.5 1.5 0 0 1-.06-1.4L5.69.8c.26-.5.76-.81 1.3-.81.56 0 1.06.3 1.3.81l5.55 11.08zM6.12 3.8v4.95h1.75V3.79H6.12zM7 12.53c.65 0 1.17-.52 1.17-1.17 0-.64-.52-1.16-1.17-1.16a1.16 1.16 0 1 0 0 2.33z"
        />
      </svg>
    );
  }
}
