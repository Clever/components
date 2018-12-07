import * as classnames from "classnames";
import * as React from "react";

const cssClass = {
  CONTAINER: "Checkbox--CheckMark",
};

export default class CheckMark extends React.PureComponent {
  render() {
    const {className} = this.props;

    return (
      <svg
        className={classnames(cssClass.CONTAINER, className)}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 12 10"
      >
        <path
          fill="#FAFCFC"
          fillRule="evenodd"
          d="M11.93 2.3c.1-.1.1-.28 0-.38L10.18.08a.25.25 0 0 0-.36 0L4.5 5.68 2.18 3.24a.25.25 0 0 0-.36 0L.07 5.07c-.1.1-.1.28 0 .38l4.25 4.48c.06.04.11.07.18.07.07 0 .13-.03.18-.07l7.25-7.63z"
        />
      </svg>
    );
  }
}
