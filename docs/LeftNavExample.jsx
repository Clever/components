import React from "react";

import {FlexBox, FlexItem, Button, LeftNav, Icon} from "../src/";

import "./LeftNavExample.less";

export default class LeftNavExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = {selected: "Home", collapsed: false};
		this.handleClick = this.handleClick.bind(this);
  }

	handleClick(label) {
		return () => {
			console.log("select " + label);
			this.setState({selected: label});
		}
	}

  render() {
    const {cssClass} = LeftNavExample;
    const {NavLink, NavGroup} = LeftNav;

    const icon = name => <Icon name={name} size={Icon.sizes.SMALL} />;

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
            <NavLink label={"Home"} icon={icon(Icon.names.SCHOOL)} onClick={this.handleClick("Home")} />
            <NavGroup label="Tools" icon={icon(Icon.names.GEAR)}>
              <NavLink label={"Hammer"} onClick={this.handleClick("Hammer")} />
              <NavLink label={"Screwdriver"} onClick={this.handleClick("Screwdriver")} />
              <NavLink label={"Measuring Tape"} onClick={this.handleClick("Measuring Tape")} />
            </NavGroup>
            <NavGroup label="Juggling Props" icon={icon(Icon.names.JUGGLER)}>
              <NavLink label={"Balls"} onClick={this.handleClick("Balls")} />
              <NavLink label={"Clubs"} onClick={this.handleClick("Clubs")} />
              <NavLink label={"Rings"} onClick={this.handleClick("Rings")} />
            </NavGroup>
            <NavLink label={"Profile"} icon={icon(Icon.names.USER)} onClick={this.handleClick("Profile")} />
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
