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
    const link = (label, icon) => {
      return (
        <NavLink
          label={label}
          icon={icon}
          selected={this.state.selected === label}
          onClick={() => {
            console.log("select " + label);
            this.setState({selected: label});
          }}
        />
      );
    }

    return (
      <div>
        <a name="leftnav">
          <h1>Left Nav</h1>
        </a>
        <Button
          className={cssClass.COLLAPSE}
          type="primary"
          value={"TODO"}
          onClick={() => {
            console.log("collapse", !this.state.collapsed);
            this.setState({collapsed: !this.state.collapsed})
					}}
        />
        <FlexBox className={cssClass.CONTAINER}>
          <LeftNav collapsed={this.state.collapsed}>
            {link("Home", icon(Icon.names.SCHOOL))}
            <NavGroup label="Tools" icon={icon(Icon.names.GEAR)}>
              {link("Hammer")}
              {link("Screwdriver")}
              {link("Measuring Tape")}
            </NavGroup>
            <NavGroup label="Juggling Props" icon={icon(Icon.names.JUGGLER)}>
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
