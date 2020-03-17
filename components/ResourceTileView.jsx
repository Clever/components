import * as React from "react";

import Example, { CodeSample, ExampleCode } from "./Example";
import PropDocumentation from "./PropDocumentation";
import View from "./View";
import { ResourceTile, FlexBox, ItemAlign, SegmentedControl } from "src";

import "./ResourceTileView.less";

const cssClass = {
  CONFIG_CONTAINER: "ResourceTileView--configContainer",
  CONFIG_OPTIONS: "ResourceTileView--configOptions",
  CONFIG: "ResourceTileView--config",
  CONFIG_TOGGLE: "ResourceTileView--configToggle",
  CONTAINER: "ResourceTileView",
  INTRO: "ResourceTileView--intro",
  PROPS: "ResourceTileView--props",
  EXAMPLE: "ResourceTileView--example",
};

export default class ResourceTileView extends React.PureComponent {
  static cssClass = cssClass;

  state = {
    size: "small",
    draggable: false,
    notify: false,
  };

  render() {
    const { size, draggable, notify } = this.state;

    return (
      <View
        className={cssClass.CONTAINER}
        title="ResourceTile"
        sourcePath="src/ResourceTile/ResourceTile.tsx"
      >
        <header className={cssClass.INTRO}>
          <p>ResourceTile is a tile for displaying a resource, generally in a Portal.</p>
          <CodeSample>
            {`
              import { ResourceTile } from "clever-components";
              // OR
              import ResourceTile from "clever-components/dist/ResourceTile"; // Avoids importing all of clever-components.
            `}
          </CodeSample>
        </header>

        <Example title="Basic Usage:" className={cssClass.EXAMPLE}>
          <ExampleCode>
            <FlexBox>
              <ResourceTile
                icon="https://assets.clever.com/resource-icons/apps/5ce8488bb85d7a0013d52f1a/icon_ae3363a.png"
                title="Chess.com this is a very long title and stuff"
                url="https://chess.com"
                notes="This icon has actions so the draggable doesn't display"
                size={size}
                notify={notify}
                actions={[
                  { content: "Hello", href: "https://google.com" },
                  { content: "World", href: "https://google.com" },
                ]}
                additionalInfo={"Additional Info!"}
                overlays={["I'm an overlay"]}
              />
              <ResourceTile
                icon="https://assets.clever.com/resource-icons/apps/5ce8488bb85d7a0013d52f1a/icon_ae3363a.png"
                title="Chess.com"
                url="https://chess.com"
                size={size}
                notify={notify}
                draggable={draggable}
              />
            </FlexBox>
          </ExampleCode>
          {this._renderConfig()}
        </Example>

        {this._renderProps()}
      </View>
    );
  }

  _renderConfig() {
    const { size, draggable, notify } = this.state;

    return (
      <FlexBox alignItems={ItemAlign.CENTER} className={cssClass.CONFIG_CONTAINER} wrap>
        <div className={cssClass.CONFIG}>
          Size:
          <SegmentedControl
            className={cssClass.CONFIG_OPTIONS}
            onSelect={value => this.setState({ size: value })}
            options={[
              { content: "Small", value: "small" },
              { content: "Medium", value: "medium" },
              { content: "Large", value: "large" },
            ]}
            value={size}
          />
        </div>
        <label className={cssClass.CONFIG}>
          <input
            type="checkbox"
            checked={draggable}
            className={cssClass.CONFIG_TOGGLE}
            onChange={e => this.setState({ draggable: e.target.checked })}
          />{" "}
          Draggable
        </label>
        <label className={cssClass.CONFIG}>
          <input
            type="checkbox"
            checked={notify}
            className={cssClass.CONFIG_TOGGLE}
            onChange={e => this.setState({ notify: e.target.checked })}
          />{" "}
          Notify
        </label>
      </FlexBox>
    );
  }

  _renderProps() {
    return (
      <PropDocumentation
        title="<ResourceTile /> Props"
        availableProps={[
          {
            name: "actions",
            type: "Action[]",
            description: "Up to two actions to display",
            optional: true,
          },
          {
            name: "additionalInfo",
            type: "string",
            description: "Additional info to display at the bottom",
            optional: true,
          },
          {
            name: "className",
            type: "string",
            description: "Optional additional CSS class name to apply to the container.",
            optional: true,
          },
          {
            name: "draggable",
            type: "boolean",
            description: "Whether to display the draggable icon at the bottom",
            optional: true,
          },
          {
            name: "icon",
            type: "string",
            description: "Src for image to display as icon",
          },
          {
            name: "loadingSpinner",
            type: "React.ReactNode",
            description: "Loading spinner to display when icon is an empty string",
          },
          {
            name: "notes",
            type: "string",
            description: "Notes to display in a tooltip",
            optional: true,
          },
          {
            name: "notify",
            type: "boolean",
            description: "Whether to display a red notify icon",
            optional: true,
          },
          {
            name: "onClick",
            type: "(event?: React.MouseEvent) => void",
            description: "Function to call when a click happens",
            optional: true,
          },
          {
            name: "openInSameTab",
            type: "boolean",
            description: "Whether to open the URL in the same tab when clicked",
            defaultValue: "false",
            optional: true,
          },
          {
            name: "overlays",
            type: "React.ReactNode[]",
            description: "Overlays to display on top of the tile",
            optional: true,
          },
          {
            name: "size",
            type: '"small" | "medium" | "large"',
            description: "What size the tile should be.",
            defaultValue: "large",
            optional: true,
          },
          {
            name: "url",
            type: "string",
            description: "URL to navigate to on click",
          },
        ]}
        className={cssClass.PROPS}
      />
    );
  }
}
