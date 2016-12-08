import React from "react";

import {FlexBox, FlexItem, Button, LeftNav, Icon} from "../src/";

import "./LeftNavExample.less";

export default class LeftNavExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = {selected: "Home", collapsed: false};
  }

  render() {
    const {cssClass} = LeftNavExample;
    const {NavLink, NavGroup} = LeftNav;

    const icon = name => <Icon name={name} size={Icon.sizes.SMALL} />;
    const link = (label, iconNode, visible = true) =>
      <NavLink
        label={label}
        icon={iconNode}
        selected={this.state.selected === label}
        onClick={() => this.setState({selected: label})}
        visible={visible}
      />;
    const menulink = (label, iconNode) =>
      <NavLink
        label={label}
        icon={iconNode}
        onClick={() => this.setState({collapsed: !this.state.collapsed})}
      />;

    return (
      <div>
        <Button
          className={cssClass.COLLAPSE}
          type="primary"
          value={<span className="fa fa-bars" />}
          onClick={() => this.setState({collapsed: !this.state.collapsed})}
        />
        <FlexBox className={cssClass.CONTAINER}>
          <LeftNav collapsed={this.state.collapsed}>
            {menulink("Menu", icon(Icon.names.MENU))}
            {link("Home", icon(Icon.names.SCHOOL))}
            <NavGroup label="Tools" id="Tools" icon={icon(Icon.names.GEAR)}>
              {link("Hammer")}
              {link("Screwdriver")}
              {link("Measuring Tape")}
            </NavGroup>
            <NavGroup label="Invisible Group" id="invisible" icon={icon(Icon.names.GEAR)}>
              {link("Invisible Link", null, false)}
            </NavGroup>
            <NavGroup label="Juggling Props" id="Juggling Props" icon={icon(Icon.names.JUGGLER)}>
              {link("Balls")}
              {link("Clubs")}
              {link("Rings")}
            </NavGroup>
            {link("Profile", icon(Icon.names.USER))}
          </LeftNav>
          <FlexItem grow className={cssClass.RIGHT_PANE}>
            <h2>{this.state.selected}</h2>
            <p>Look at that pretty left nav!</p>
          </FlexItem>
        </FlexBox>
      </div>
    );
  }
}

LeftNavExample.cssClass = {
  CONTAINER: "LeftNavExample",
  COLLAPSE: "LeftNavExample--collapse",
  RIGHT_PANE: "LeftNavExample--rightPane",
};
