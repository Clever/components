import React from "react";

import {FlexBox, FlexItem} from "../flex/";
import {NavLink} from "./NavLink";
import {NavGroup} from "./NavGroup";

import "./LeftNav.less";

export class LeftNav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {openNavGroup: null};
  }

  render() {
    const {cssClass} = LeftNav;

    // Configure the props for NavGroup children to track which one is open
    const children = React.Children.map(this.props.children, child => {
      if (child.type === NavGroup) {
        const that = this;
        const open = child === this.state.openNavGroup;
        return React.cloneElement(child, {
          open,
          onClick: () => {
            console.log("click", child.label);
            that.setState({openNavGroup: open ? null : child});
            //child.props.onClick(); // TODO maybe let NavGroup have onClick prop passed in?
          },
        });
      } 
      return child;
    });
    console.log(children)

    // Find the open NavGroup so that we can render its subnav drawer
    const openChild  = React.Children.toArray(children).find(child => child.props.open);
    console.log(openChild)

    const collapsed = this.props.collapsed ? cssClass.COLLAPSED : null;
    console.log(collapsed);

    return (
      <FlexBox component="nav" className={cssClass.CONTAINER}>
        <FlexItem className={collapsed}>{children}</FlexItem>
        {openChild && <FlexItem className={cssClass.SUBNAV}>{openChild.props.children}</FlexItem>}
      </FlexBox>
    );
  }
}

LeftNav.NavLink = NavLink;
LeftNav.NavGroup = NavGroup;

LeftNav.propTypes = {
  // List required and optional proptypes
};

LeftNav.cssClass = {
  CONTAINER: "LeftNav",
  COLLAPSED: "LeftNav--collapsed",
  SUBNAV: "LeftNav--subnav",
};
