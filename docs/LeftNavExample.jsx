import React from "react";

import {LeftNav} from "../src/LeftNav/LeftNav";

export default function LeftNavExample() {
  const {cssClass} = LeftNavExample;
  const {NavLink, NavGroup} = LeftNav;

  return (
    <div>
      <a name="leftnav">
        <h1>Left Nav</h1>
      </a>
      <LeftNav>
        <NavLink label="Home" href="#" icon={cssClass.fa("home")} />
        <NavGroup label="Tools" icon={cssClass.fa("cog")}>
          <NavLink label="Hammer" href="" />
          <NavLink label="Screwdriver" href="" />
          <NavLink label="Measuring Tape" href="" />
        </NavGroup>
        <NavLink label="Profile" href="#" icon={cssClass.fa("user")} />
      </LeftNav>
    </div>
  );
}

LeftNavExample.cssClass = {
  fa: fontAwesomeClass => `fa fa-fw fa-${fontAwesomeClass}`,
};
