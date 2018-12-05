import classnames from "classnames";
import * as React from "react";

import Example, {CodeSample, ExampleCode} from "./Example";
import PropDocumentation from "./PropDocumentation";
import View from "./View";
import {WithKeyboardNav, FlexBox, ItemAlign} from "src";

import "./WithKeyboardNavView.less";
import KeyCode from "src/utils/KeyCode";

const cssClass = {
  CONFIG_CONTAINER: "WithKeyboardNavView--configContainer",
  CONFIG_OPTIONS: "WithKeyboardNavView--configOptions",
  CONFIG_TOGGLE: "WithKeyboardNavView--configToggle",
  CONFIG: "WithKeyboardNavView--config",
  CONTAINER: "WithKeyboardNavView",
  DISABLED: "WithKeyboardNavView--disabled",
  FOCUSED: "WithKeyboardNavView--focused",
  INTRO: "WithKeyboardNavView--intro",
  OPTION: "WithKeyboardNavView--option",
  PROPS: "WithKeyboardNavView--props",
};

export default class WithKeyboardNavView extends React.PureComponent {
  static cssClass = cssClass;

  state = {
    currentCategory: null,
    currentVehicle: null,
    useCustomKeys: false,
    noWrap: false,
  };

  render() {
    const {currentVehicle, noWrap, useCustomKeys} = this.state;

    return (
      <View
        className={cssClass.CONTAINER}
        title="WithKeyboardNav"
        sourcePath="src/WithKeyboardNav/WithKeyboardNav.tsx"
      >
        <header className={cssClass.INTRO}>
          <p>
            Wrapper component that enables keyboard navigation through a specified ordered list of
            items.
          </p>
          <p>
            Emits navigation events with the ID of the next item to focus on - it's up to the client
            to move focus as needed and update the currentID prop accordingly.
          </p>
          <CodeSample>
            {`
              import KeyCode from "clever-components/dist/utils/KeyCode";
              import {WithKeyboardNav} from "clever-components";
              // OR
              import KeyCode from "clever-components/dist/utils/KeyCode";
              import WithKeyboardNav from "clever-components/dist/WithKeyboardNav"; // Avoids importing all of clever-components.
            `}
          </CodeSample>
        </header>

        <Example title="Basic Usage:">
          <ExampleCode>
            <WithKeyboardNav
              currentID={currentVehicle}
              itemIDs={[
                "airplane",
                "canoe",
                // "car", // Leave out items that shouldn't be in the tab order e.g. disabled items.
                "scooter",
                "wingsuit",
              ]}
              noWrap={noWrap}
              onChange={id => this.setState({currentVehicle: id})}
              forwardKeys={useCustomKeys ? [KeyCode.K] : undefined}
              backKeys={useCustomKeys ? [KeyCode.J] : undefined}
            >
              <div tabIndex={0}>
                {[
                  {id: "airplane", label: "Airplane", focused: currentVehicle === "airplane"},
                  {id: "canoe", label: "Canoe", focused: currentVehicle === "canoe"},
                  {id: "car", label: "Car", focused: currentVehicle === "car", disabled: true},
                  {id: "scooter", label: "Scooter", focused: currentVehicle === "scooter"},
                  {id: "wingsuit", label: "Wing Suit", focused: currentVehicle === "wingsuit"},
                ].map(o => (
                  <div
                    className={classnames(
                      cssClass.OPTION,
                      o.focused && cssClass.FOCUSED,
                      o.disabled && cssClass.DISABLED,
                    )}
                    key={o.id}
                  >
                    {o.label}
                  </div>
                ))}
              </div>
            </WithKeyboardNav>
          </ExampleCode>
          {this._renderConfig()}
        </Example>

        {this._renderProps()}
      </View>
    );
  }

  _renderOption(o) {
    return (
      <div className={classnames(cssClass.OPTION, o.focused && cssClass.FOCUSED)} key={o.id}>
        {o.label}
      </div>
    );
  }

  _renderConfig() {
    const {useCustomKeys, noWrap} = this.state;

    return (
      <FlexBox alignItems={ItemAlign.CENTER} className={cssClass.CONFIG_CONTAINER} wrap>
        <label className={cssClass.CONFIG}>
          <input
            type="checkbox"
            checked={useCustomKeys}
            className={cssClass.CONFIG_TOGGLE}
            onChange={e => this.setState({useCustomKeys: e.target.checked})}
          />{" "}
          Use custom keys (
          <span>
            e.g. <b>J</b> and <b>K</b>
          </span>
          )
        </label>
        <label className={cssClass.CONFIG}>
          <input
            type="checkbox"
            checked={noWrap}
            className={cssClass.CONFIG_TOGGLE}
            onChange={e => this.setState({noWrap: e.target.checked})}
          />{" "}
          Disable wrapping
        </label>
      </FlexBox>
    );
  }

  _renderProps() {
    return (
      <PropDocumentation
        title="<WithKeyboardNav /> Props"
        availableProps={[
          {
            name: "backKeys",
            type: "KeyCode[]",
            description: "Custom key codes to use for backward navigation.",
            default: "[KeyCode.ARROW_RIGHT, KeyCode.ARROW_UP]",
            optional: true,
          },
          {name: "children", type: "React.Node", description: "The element to be wrapped."},
          {name: "currentID", type: "string", description: "ID of the currently focused item."},
          {
            name: "forceTabKey",
            type: "bool",
            description: "Optional additional CSS class name to apply to the container.",
            optional: true,
          },
          {
            name: "forwardKeys",
            type: "KeyCode[]",
            description: "Custom key codes to use for forward navigation.",
            default: "[KeyCode.ARROW_RIGHT, KeyCode.ARROW_DOWN]",
            optional: true,
          },
          {name: "itemIDs", type: "string[]", description: "List of IDs to cycle through."},
          {
            name: "noWrap",
            type: "bool",
            description:
              "When true, prevents navigation from wrapping when tabbing past the end of the list.",
          },
          {
            name: "onChange",
            type: "Function",
            description:
              "Nav change event handler - called with the ID of the next item when the user hits a nav key.",
          },
        ]}
        className={cssClass.PROPS}
      />
    );
  }
}
