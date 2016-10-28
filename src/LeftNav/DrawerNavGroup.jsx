import React from "react";
import classnames from "classnames";

import {NavGroup} from "./NavGroup";

import "./DrawerNavGroup.less";

export class DrawerNavGroup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {closed: true};
  }

  render() {
    const {cssClass} = DrawerNavGroup;
    const closed = this.state.closed ? cssClass.CLOSED : null;

    const children = React.Children.map(this.props.children, navLink => {
      const that = this;
      return React.cloneElement(navLink, {onClick: () => {
        that.setState({closed: true});
        navLink.props.onClick();
      }});
    });

    return (
      <NavGroup
        {...this.props}
        className={classnames(cssClass.CONTAINER, closed)}
        onClick={() => this.setState({closed: !this.state.closed})}
      >
        {children}
      </NavGroup>
    );
  }
}

DrawerNavGroup.cssClass = {
  CONTAINER: "DrawerNavGroup",
  CLOSED: "DrawerNavGroup--closed",
};
