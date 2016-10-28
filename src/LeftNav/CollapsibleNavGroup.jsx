import React from "react";
import classnames from "classnames";

import {NavGroup} from "./NavGroup";

import "./CollapsibleNavGroup.less";

export class CollapsibleNavGroup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {collapsed: true};
  }

  render() {
    const {cssClass} = CollapsibleNavGroup;
    const collapsed = this.state.collapsed ? cssClass.COLLAPSED : null;
    return (
      <NavGroup
        {...this.props}
        className={classnames(cssClass.CONTAINER, collapsed)}
        onClick={() => this.setState({collapsed: !this.state.collapsed})}
      />
    );
  }
}

CollapsibleNavGroup.cssClass = {
  CONTAINER: "CollapsibleNavGroup",
  COLLAPSED: "CollapsibleNavGroup--collapsed",
};
