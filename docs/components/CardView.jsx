import * as React from "react";

import Example, {CodeSample, ExampleCode} from "./Example";
import PropDocumentation from "./PropDocumentation";
import View from "./View";
import {Card, FlexBox, ItemAlign} from "src";

import "./CardView.less";

const Classes = {
  CARD: "CardView--card",
  CONFIG_CONTAINER: "CardView--configContainer",
  CONFIG_OPTIONS: "CardView--configOptions",
  CONFIG: "CardView--config",
  CONFIG_TOGGLE: "CardView--configToggle",
  CONTAINER: "CardView",
  INTRO: "CardView--intro",
  PROPS: "CardView--props",
};

export default class CardView extends React.PureComponent {
  state = {
    raised: true,
    withFooter: false,
    withTitle: true,
    noPadding: false,
  };

  render() {
    const {raised, withFooter, withTitle, noPadding} = this.state;

    return (
      <View className={Classes.CONTAINER} title="Card" sourcePath="src/Card/Card.tsx">
        <header className={Classes.INTRO}>
          <CodeSample>
            {`
              import Card from "goals-components/dist/Card";
            `}
          </CodeSample>
        </header>

        <Example title="Basic Usage:">
          <ExampleCode>
            <Card
              className={Classes.CARD}
              footer={withFooter && "You can add a footer as well"}
              raised={raised}
              title={withTitle && "You can add a title"}
              noPadding={noPadding}
            >
              <p>Card content goes here</p>
              <p>Can be anything you want</p>
            </Card>
          </ExampleCode>
          {this._renderConfig()}
        </Example>
        {this._renderProps()}
      </View>
    );
  }

  _renderConfig() {
    const {raised, withFooter, withTitle, noPadding} = this.state;

    return (
      <FlexBox alignItems={ItemAlign.CENTER} className={Classes.CONFIG_CONTAINER} wrap>
        <label className={Classes.CONFIG}>
          <input
            type="checkbox"
            checked={raised}
            className={Classes.CONFIG_TOGGLE}
            onChange={e => this.setState({raised: e.target.checked})}
          />{" "}
          Raised
        </label>
        <label className={Classes.CONFIG}>
          <input
            type="checkbox"
            checked={withTitle}
            className={Classes.CONFIG_TOGGLE}
            onChange={e => this.setState({withTitle: e.target.checked})}
          />{" "}
          With title
        </label>
        <label className={Classes.CONFIG}>
          <input
            type="checkbox"
            checked={withFooter}
            className={Classes.CONFIG_TOGGLE}
            onChange={e => this.setState({withFooter: e.target.checked})}
          />{" "}
          With footer
        </label>
        <label className={Classes.CONFIG}>
          <input
            type="checkbox"
            checked={noPadding}
            className={Classes.CONFIG_TOGGLE}
            onChange={e => this.setState({noPadding: e.target.checked})}
          />{" "}
          No content padding
        </label>
      </FlexBox>
    );
  }

  _renderProps() {
    return (
      <PropDocumentation
        title="<Card /> Props"
        availableProps={[
          {
            name: "children",
            type: "React.Node",
            description: "Card main content",
          },
          {
            name: "className",
            type: "string",
            description: "Optional additional CSS class name to apply to the container.",
            optional: true,
          },
          {
            name: "footer",
            type: "React.Node",
            description: "Optional footer content.",
            optional: true,
          },
          {
            name: "inline",
            type: "boolean",
            description: "Card should use inline-block display",
            defaultValue: "false",
            optional: true,
          },
          {
            name: "noFooterPadding",
            type: "boolean",
            description: "Remove padding from the footer.",
            defaultValue: "false",
            optional: true,
          },
          {
            name: "noPadding",
            type: "boolean",
            description: "Remove padding from the content section",
            defaultValue: "false",
            optional: true,
          },
          {
            name: "raised",
            type: "boolean",
            description: "Add a dropshadow to the card",
            defaultValue: "false",
            optional: true,
          },
          {
            name: "title",
            type: "React.Node",
            description: "Optional title content.",
            optional: true,
          },
        ]}
        className={Classes.PROPS}
      />
    );
  }
}
