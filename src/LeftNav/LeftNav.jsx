import React from "react";
import classnames from "classnames";

import {FlexBox, FlexItem} from "../";
import {NavLink} from "./NavLink";
import {NavGroup} from "./NavGroup";

import "./LeftNav.less";

// no group open, nothing selected      -> drawer closed, no visual selected
// no group open, top link selected     -> drawer closed, link visually selected
// no group open, sub link selected     -> drawer open to group, group visually open, link visually selected
// group open, sub link selected        -> drawer open to group, group visually open, link visually selected
// group open, top link selected        -> drawer open to group, group visually open, link visually selected
// group open, nothing selected         -> drawer open to group, group visually selected
// group open, hidden sub link selected -> drawer open to group, group visually selected

export class LeftNav extends React.Component {
  constructor(props) {
    super(props);

    const selectedNavGroup = props.children.find(child => {
      return child.type === NavGroup &&
        React.Children.toArray(child.props.children).some(navLink => navLink.props.selected);
    });
    this.state = {openNavGroup: selectedNavGroup};
  }

  render() {
    const {cssClass} = LeftNav;

    const children = React.Children.map(this.props.children, child => {
      // Configure the props for NavGroups to track which one is open
      if (child.type === NavGroup) {
        const that = this;
        // TODO figure out why object equality doesn't work here. we don't want
        // to rely on label being unique
        const open = this.state.openNavGroup && child.props.label === this.state.openNavGroup.props.label;
        return React.cloneElement(child, {
          open,
          onClick: () => {
            console.log("click", child.props.label);
            that.setState({openNavGroup: open ? null : child});
          },
        });
      }
      // Configure the props for top level NavLinks to close other open drawers on click
      return React.cloneElement(child, {onClick: () => {
        console.log("click", child.props.label);
        this.setState({openNavGroup: null});
        child.props.onClick();
      }});
    });

    // Find the open NavGroup so that we can render its subnav drawer
    const openChild  = React.Children.toArray(children).find(child => child.props.open);

    const collapsed = this.props.collapsed ? cssClass.COLLAPSED : null;

    return (
      <FlexBox component="nav" className={cssClass.CONTAINER}>
        <FlexItem component="ul" className={classnames(cssClass.TOPNAV, collapsed)}>{children}</FlexItem>
        {openChild && <FlexItem component="ul" className={cssClass.SUBNAV}>{openChild.props.children}</FlexItem>}
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
  TOPNAV: "LeftNav--topnav",
  SUBNAV: "LeftNav--subnav",
};
