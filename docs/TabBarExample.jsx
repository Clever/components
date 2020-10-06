import _ from "lodash";
import classnames from "classnames";
import React, { Component } from "react";

import { FlexBox, ItemAlign, Justify, SegmentedControl, Tab, TabBar } from "../src";

import "../src/less/spacing.less";
import "../src/less/type-utilities.less";
import "./TabBarExample.less";

const ALIGNMENTS = {
  [Justify.START]: {
    title: "Left-Aligned [Default]",
    src: "<TabBar />",
    label: "START [Default]",
  },
  [Justify.CENTER]: {
    title: "Centered",
    titleClassName: "text--center",
    src: "<TabBar justify={Justify.CENTER} />",
    label: "CENTER",
  },
  [Justify.BETWEEN]: {
    title: "Full-Width",
    src: "<TabBar justify={Justify.BETWEEN} />",
    label: "BETWEEN",
  },
  [Justify.AROUND]: {
    title: "Full-Width (with Padding)",
    titleClassName: "text--center",
    src: "<TabBar justify={Justify.AROUND} />",
    label: "AROUND",
  },
  [Justify.END]: {
    title: "Right-Aligned",
    src: "<TabBar justify={Justify.END} />",
    label: "END",
  },
};

const MOUNTAINS = ["Everest", "K2", "Fiji", "Blanc", "Afadja"];

export default class TabBarExample extends Component {
  constructor(props) {
    super(props);

    this.state = {
      alignment: Justify.START,
      enabled: true,
      mountain: "Everest",
      size: TabBar.Size.MEDIUM,
    };
  }

  renderCode() {}

  render() {
    const { cssClass } = TabBarExample;
    const { alignment, enabled, mountain, size } = this.state;
    const alignmentConfig = ALIGNMENTS[alignment];

    return (
      <div className={cssClass.CONTAINER}>
        <div className={cssClass.CONFIG}>
          <FlexBox className={cssClass.CONFIG_LINE} alignItems={ItemAlign.CENTER}>
            <h4 className={cssClass.CONFIG_LABEL}>Size:</h4>
            <SegmentedControl
              onSelect={(s) => this.setState({ size: s })}
              options={[
                { content: "Small", value: TabBar.Size.SMALL },
                { content: "Medium [Default]", value: TabBar.Size.MEDIUM },
                { content: "Large", value: TabBar.Size.LARGE },
              ]}
              value={size}
            />
          </FlexBox>

          <FlexBox className={cssClass.CONFIG_LINE} alignItems={ItemAlign.CENTER}>
            <h4 className={cssClass.CONFIG_LABEL}>Justify:</h4>
            <SegmentedControl
              onSelect={(a) => this.setState({ alignment: a })}
              options={_.map(ALIGNMENTS, ({ label }, value) => ({ content: label, value }))}
              value={alignment}
            />
          </FlexBox>

          <FlexBox className={cssClass.CONFIG_LINE} alignItems={ItemAlign.CENTER}>
            <h4 className={cssClass.CONFIG_LABEL}>Tab State:</h4>
            <SegmentedControl
              onSelect={(s) => this.setState({ enabled: s })}
              options={[
                { content: "Enabled [Default]", value: true },
                { content: "Disabled", value: false },
              ]}
              value={enabled}
            />
          </FlexBox>
        </div>

        <div className={cssClass.VIEW}>
          <h2 className={classnames(cssClass.HEADING, alignmentConfig.titleClassName)}>
            {alignmentConfig.title}
            <br />
            <code>{alignmentConfig.src}</code>
          </h2>
          <TabBar className={cssClass.TAB_BAR} justify={alignment} size={size}>
            {_.map(MOUNTAINS, (name) => (
              <Tab
                className={cssClass.TAB}
                disabled={!enabled}
                id={name}
                key={name}
                onSelect={() => this.setState({ mountain: name })}
                selected={name === mountain}
              >
                {name}
              </Tab>
            ))}
          </TabBar>
        </div>

        <div className={cssClass.VIEW}>
          <h2 className={classnames(cssClass.HEADING, alignmentConfig.titleClassName)}>
            HREF Tabs
            <br />
            <code>{'<TabBar><Tab href="http://url/path" /></TabBar>'}</code>
          </h2>
          <TabBar className={cssClass.TAB_BAR} justify={alignment} size={size}>
            {_.map(MOUNTAINS, (name) => (
              <Tab
                className={cssClass.TAB}
                disabled={!enabled}
                href={`${window.location.pathname}#tabbar?mount=${name}`}
                id={name}
                key={name}
                onSelect={() => this.setState({ mountain: name })}
                selected={name === mountain}
              >
                {name}
              </Tab>
            ))}
          </TabBar>
        </div>
      </div>
    );
  }
}

TabBarExample.cssClass = {
  CONFIG: "TabBarExample--config",
  CONFIG_LINE: "TabBarExample--configLine",
  CONFIG_LABEL: "TabBarExample--configLabel",
  CONTAINER: "TabBarExample",
  HEADING: "TabBarExample--ViewContainer--heading",
  TAB: "TabBarExample--Tab",
  TAB_BAR: "TabBarExample--TabBar",
  VIEW: "TabBarExample--ViewContainer",
};
