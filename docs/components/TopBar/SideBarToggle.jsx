import classnames from "classnames";
import * as PropTypes from "prop-types";
import * as React from "react";

import "./SideBarToggle.less";

export default class SideBarToggle extends React.PureComponent {
  render() {
    const { cssClass } = SideBarToggle;
    const { className, onClick } = this.props;

    return (
      <button
        className={classnames(cssClass.CONTAINER, className)}
        onClick={() => {
          this._buttonRef.blur();
          onClick();
        }}
        ref={ref => {
          this._buttonRef = ref;
        }}
      >
        <span className="fa fa-bars" />
      </button>
    );
  }
}

SideBarToggle.propTypes = {
  className: PropTypes.string,
  onClick: PropTypes.func.isRequired,
};

SideBarToggle.cssClass = {
  CONTAINER: "SideBarToggle",
};
