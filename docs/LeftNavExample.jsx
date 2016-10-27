import React from "react";

import {FlexBox, FlexItem} from "../src/flex/";
import {LeftNav} from "../src/LeftNav/LeftNav";

import "./LeftNavExample.less";

export default function LeftNavExample() {
  const {cssClass} = LeftNavExample;
  const {NavLink, NavGroup} = LeftNav;

  return (
    <div>
      <a name="leftnav">
        <h1>Left Nav</h1>
      </a>
      <FlexBox className={cssClass.CONTAINER}>
        <LeftNav>
          <NavLink label="Home" href="#" icon={cssClass.fa("home")} />
          <NavGroup label="Tools" icon={cssClass.fa("cog")}>
            <NavLink label="Hammer" href="" />
            <NavLink label="Screwdriver" href="" />
            <NavLink label="Measuring Tape" href="" />
          </NavGroup>
          <NavLink label="Profile" href="#" icon={cssClass.fa("user")} />
        </LeftNav>
        <FlexItem grow className={cssClass.RIGHT_PANE}>
          Look at that pretty left nav!
        </FlexItem>
      </FlexBox>
    </div>
  );
}

LeftNavExample.cssClass = {
  CONTAINER: "LeftNavExample",
  RIGHT_PANE: "LeftNavExample--rightPane",
  fa: fontAwesomeClass => `fa fa-fw fa-${fontAwesomeClass}`,
};
