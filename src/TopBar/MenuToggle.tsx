import * as classnames from "classnames";
import * as PropTypes from "prop-types";
import * as React from "react";

import Tooltip from "../Tooltip";
import TopBarButton from "./TopBarButton";

import "./MenuToggle.less";

const propTypes = {
  className: PropTypes.string,
  onClick: PropTypes.func,
};

const cssClass = {
  CONTAINER: "MenuToggle",
  BAR: "MenuToggle--bar",
};

export default class MenuToggle extends React.PureComponent {
  static propTypes = propTypes;

  render() {
    const { className, onClick } = this.props;

    return (
      <Tooltip content="Menu" placement="right">
        <TopBarButton className={classnames(cssClass.CONTAINER, className)} onClick={onClick}>
          <div className={cssClass.BAR} />
          <div className={cssClass.BAR} />
          <div className={cssClass.BAR} />
        </TopBarButton>
      </Tooltip>
    );
  }
}
