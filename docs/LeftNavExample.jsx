import React from "react";

import {FlexBox, FlexItem} from "../src/flex/";
import {Button} from "../src/Button/Button";
import {LeftNav} from "../src/LeftNav/LeftNav";

import "./LeftNavExample.less";

export default class LeftNavExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = {selected: "Home", collapsed: false};
  }

  render() {
    const {cssClass} = LeftNavExample;
    const {NavLink, NavGroup} = LeftNav;

    const renderLink = (label, icon) => {
      return <NavLink
        label={label}
        icon={icon}
        onClick={() => {console.log("select " + label);
          this.setState({selected: label})}}
      />
    };

    return (
      <div>
        <a name="leftnav">
          <h1>Left Nav</h1>
        </a>
        <Button
          className={cssClass.COLLAPSE}
          type="primary"
          value={<span className={cssClass.fa("bars")}/>}
          onClick={() => {
            console.log("collapse", !this.state.collapsed);
            this.setState({collapsed: !this.state.collapsed})}}
        />
        <FlexBox className={cssClass.CONTAINER}>
          <LeftNav collapsed={this.state.collapsed}>
            {renderLink("Home", cssClass.fa("home"))}
            <NavGroup label="Tools" icon={cssClass.fa("cog")}>
              {renderLink("Hammer")}
              {renderLink("Screwdriver")}
              {renderLink("Measuring Tape")}
            </NavGroup>
            <NavGroup label="Instruments" icon={cssClass.fa("music")}>
              {renderLink("Accordion")}
              {renderLink("Piano")}
              {renderLink("Hurdy-gurdy")}
            </NavGroup>
            <NavGroup label="Drawer" icon={cssClass.fa("inbox")}>
              {renderLink("Shirts")}
              {renderLink("Socks")}
              {renderLink("Underwear")}
            </NavGroup>
            {renderLink("Profile", cssClass.fa("user"))}
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
  fa: fontAwesomeClass => `fa fa-fw fa-${fontAwesomeClass}`,
};
