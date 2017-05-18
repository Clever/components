import React from "react";

import Example, {ExampleCode} from "./components/Example";
import {FlexBox, FlexItem, Button, LeftNav, Icon} from "../src/";

import "./LeftNavExample.less";

export default class LeftNavExample extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selected: "Home",
      collapseOnSubNavOpen: true,
      collapsed: false,
      closeSubNavOnBlur: true,
      withActiveNavGroups: true,
      withTooltips: true,
    };
  }

  _renderCheckbox(id) {
    const {cssClass} = LeftNavExample;

    return (
      <label className={cssClass.CONFIG}>
        <input
          checked={this.state[id]}
          type="checkbox"
          onChange={e => this.setState({[id]: e.target.checked})}
        />
        &nbsp;
        {id}
      </label>
    );
  }

  render() {
    const {cssClass} = LeftNavExample;
    const {NavLink, NavGroup} = LeftNav;
    const {
      closeSubNavOnBlur,
      collapseOnSubNavOpen,
      collapsed,
      selected,
      withActiveNavGroups,
      withTooltips,
    } = this.state;

    const icon = name => <Icon name={name} size={Icon.sizes.SMALL} />;
    const link = (label, iconNode) =>
      <NavLink
        label={label}
        icon={iconNode}
        selected={selected === label}
        onClick={() => this.setState({selected: label})}
      />;

    return (
      <Example>
        <ExampleCode>
          <Button
            className={cssClass.COLLAPSE}
            type="primary"
            value={<span className="fa fa-bars" />}
            onClick={() => this.setState({collapsed: !collapsed})}
          />
          <FlexBox className={cssClass.CONTAINER}>
            <LeftNav
              closeSubNavOnBlur={closeSubNavOnBlur}
              collapseOnSubNavOpen={collapseOnSubNavOpen}
              collapsed={collapsed}
              withActiveNavGroups={withActiveNavGroups}
              withTooltips={withTooltips}
            >
              <NavLink
                label="Menu"
                icon={icon(Icon.names.MENU)}
                onClick={() => this.setState({collapsed: !collapsed})}
              />
              {link("Home", icon(Icon.names.SCHOOL))}
              <NavGroup label="Tools" id="Tools" icon={icon(Icon.names.GEAR)}>
                {link("Hammer")}
                {link("Screwdriver")}
                {link("Measuring Tape")}
              </NavGroup>
              <NavGroup label="Juggling Props" id="Juggling Props" icon={icon(Icon.names.JUGGLER)}>
                {link("Balls")}
                {link("Clubs")}
                {link("Rings")}
              </NavGroup>
              <NavGroup
                label="Really really ridiculously long label"
                id="verbose"
                icon={icon(Icon.names.PEN)}
              >
                {link("So Much To Say")}
                {link("So Little Time")}
              </NavGroup>
              {link("Profile", icon(Icon.names.USER))}
            </LeftNav>
            <FlexItem grow className={cssClass.RIGHT_PANE}>
              <h2>{selected}</h2>
              <p>Look at that pretty left nav!</p>
            </FlexItem>
          </FlexBox>
        </ExampleCode>

        <FlexBox className={cssClass.CONFIG_CONTAINER}>
          {this._renderCheckbox("collapseOnSubNavOpen")}
          {this._renderCheckbox("closeSubNavOnBlur")}
          {this._renderCheckbox("withActiveNavGroups")}
          {this._renderCheckbox("withTooltips")}
        </FlexBox>
      </Example>
    );
  }
}

LeftNavExample.cssClass = {
  COLLAPSE: "LeftNavExample--collapse",
  CONFIG_CONTAINER: "LeftNavExample--configContainer",
  CONFIG: "LeftNavExample--config",
  CONTAINER: "LeftNavExample",
  RIGHT_PANE: "LeftNavExample--rightPane",
};
