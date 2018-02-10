import * as _ from "lodash";
import * as React from "react";
import {Link} from "react-router";

import Example, {CodeSample, ExampleCode} from "./Example";
import PropDocumentation from "./PropDocumentation";
import View from "./View";
import {List, FlexBox, ItemAlign, SegmentedControl} from "src";

import "./ListView.less";

const Items = {
  empty: [],
  nonEmpty: [
    "Raindrops on roses",
    "Whiskers on kittens",
    "Bright copper kettles",
    "Warm woolen mittens",
    "Cream-colored ponies",
    "Crisp apple strudels",
    "Door bells",
    "Sleigh bells",
    "Schnitzel with noodles",
  ],
};

export default class ListView extends React.PureComponent {
  static cssClass = {
    CONFIG_CONTAINER: "ListView--configContainer",
    CONFIG_OPTIONS: "ListView--configOptions",
    CONFIG: "ListView--config",
    CONTAINER: "ListView",
    INTRO: "ListView--intro",
    LIST: "ListView--list",
    PROPS: "ListView--props",
  };

  state = {
    itemsKey: "nonEmpty",
    rowType: List.defaultProps.rowType,
    showCustomEmptyMessage: false,
    showTitle: true,
    showBorder: true,
  };

  renderConfig() {
    const {cssClass} = ListView;
    const {itemsKey, rowType, showBorder, showCustomEmptyMessage, showTitle} = this.state;

    return (
      <FlexBox alignItems={ItemAlign.CENTER} className={cssClass.CONFIG_CONTAINER} wrap>
        <div className={cssClass.CONFIG}>
          Row Type:
          <SegmentedControl
            className={cssClass.CONFIG_OPTIONS}
            onSelect={value => this.setState({rowType: value})}
            options={_.map(List.RowType, type => ({content: type, value: type}))}
            value={rowType}
          />
        </div>
        <div className={cssClass.CONFIG}>
          Items:
          <SegmentedControl
            className={cssClass.CONFIG_OPTIONS}
            onSelect={value => this.setState({itemsKey: value})}
            options={[
              {content: "Non-Empty", value: "nonEmpty"},
              {content: "Empty", value: "empty"},
            ]}
            value={itemsKey}
          />
        </div>
        <label className={cssClass.CONFIG}>
          <input
            type="checkbox"
            checked={showBorder}
            onChange={e => this.setState({showBorder: e.target.checked})}
          />
          {" "}
          Show Border
        </label>
        <label className={cssClass.CONFIG}>
          <input
            type="checkbox"
            checked={showTitle}
            onChange={e => this.setState({showTitle: e.target.checked})}
          />
          {" "}
          Show Title
        </label>
        <label className={cssClass.CONFIG}>
          <input
            type="checkbox"
            checked={showCustomEmptyMessage}
            onChange={e => this.setState({showCustomEmptyMessage: e.target.checked})}
          />
          {" "}
          Custom Empty Message
        </label>
      </FlexBox>
    );
  }

  render() {
    const {Item} = List;
    const {cssClass} = ListView;
    const {itemsKey, rowType, showBorder, showCustomEmptyMessage, showTitle} = this.state;
    const items = Items[itemsKey];

    return (
      <View
        className={cssClass.CONTAINER}
        title="List"
        sourcePath="src/List/List.jsx"
      >
        <div className={cssClass.INTRO}>
          <p>
            Provides a simple view for a list of items with various display configuration options.
          </p>
          <p>
            Closely follows <Link to="/components/table">Table</Link> component styling.
          </p>
          <CodeSample>
            {`
              import {List} from "clever-components";
              const {Item, RowType} = List;
            `}
          </CodeSample>
        </div>

        <Example title="Basic Usage:">
          <List className={cssClass.LIST} title={"Days of the Week (That Matter)"}>
            <Item>Friday</Item>
            <Item>Saturday</Item>
            <Item>Sunday</Item>
          </List>
        </Example>

        <Example title="With Customization Options:">
          <ExampleCode>
            <List
              className={cssClass.LIST}
              emptyMessage={showCustomEmptyMessage ? "I hate everything." : undefined}
              noBorder={!showBorder}
              rowType={rowType}
              title={showTitle ? "A Few of My Favourite Things" : undefined}
            >
              {items.map((item, i) => (
                <Item
                  key={i}
                  className="my--custom--class"
                  onClick={() => console.log(`${item} clicked`)}
                >
                  {item}
                </Item>
              ))}
            </List>
          </ExampleCode>
          {this.renderConfig()}
        </Example>

        <PropDocumentation
          title="<List /> Props"
          availableProps={[
            {
              name: "children",
              type: "List.Item | List.Item[]",
              description: "List items to display.",
            },
            {
              name: "className",
              type: "string",
              description: "Optional additional CSS class name to apply to the list.",
              optional: true,
            },
            {
              name: "emptyMessage",
              type: "React Node",
              description: "Content to display when the list is empty.",
              defaultValue: "NO DATA",
              optional: true,
            },
            {
              name: "noBorder",
              type: "boolean",
              description:
                "Removes the default outermost surrounding border. Borders between rows are "
                + "unaffected",
              optional: true,
            },
            {
              name: "rowType",
              type: "string",
              description: (
                <span>
                  <code>"plain"</code> | <code>"bordered"</code> | <code>"zebra"</code>
                </span>
              ),
              defaultValue: <code>"zebra"</code>,
              optional: true,
            },
            {
              name: "title",
              type: "string",
              description: "Label for the main action button.",
              optional: true,
            },
          ]}
          className={cssClass.PROPS}
        />

        <PropDocumentation
          title="<List.Item /> Props"
          availableProps={[
            {
              name: "children",
              type: "React Node",
              description: "The list item content.",
            },
            {
              name: "className",
              type: "string",
              description: "Optional additional CSS class name to apply to the list item.",
            },
            {
              name: "onClick",
              type: "function",
              description: "onClick handler",
              optional: true,
            },
          ]}
          className={cssClass.PROPS}
        />
      </View>
    );
  }
}
