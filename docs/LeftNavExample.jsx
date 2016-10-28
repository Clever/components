import React from "react";

import {FlexBox, FlexItem} from "../src/flex/";
import {LeftNav} from "../src/LeftNav/LeftNav";

import "./LeftNavExample.less";

export default class LeftNavExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = {selected: "Home"};
  }

  render() {
    const {cssClass} = LeftNavExample;
    const {NavLink, NavGroup, CollapsibleNavGroup} = LeftNav;

    const renderLink = (label, icon) => {
      return <NavLink
        label={label}
        icon={icon}
        selected={this.state.selected === label}
        onClick={() => {console.log("select " + label);
          this.setState({selected: label})}}
      />
    };

    return (
      <div>
        <a name="leftnav">
          <h1>Left Nav</h1>
        </a>
        <FlexBox className={cssClass.CONTAINER}>
          <LeftNav>
            {renderLink("Home", cssClass.fa("home"))}
            <NavGroup label="Tools" icon={cssClass.fa("cog")}>
              {renderLink("Hammer")}
              {renderLink("Screwdriver")}
              {renderLink("Measuring Tape")}
            </NavGroup>
            <CollapsibleNavGroup label="Instruments" icon={cssClass.fa("music")}>
              {renderLink("Accordion")}
              {renderLink("Piano")}
              {renderLink("Hurdy-gurdy")}
            </CollapsibleNavGroup>
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
  RIGHT_PANE: "LeftNavExample--rightPane",
  fa: fontAwesomeClass => `fa fa-fw fa-${fontAwesomeClass}`,
};
