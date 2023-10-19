import * as React from "react";
import * as ReactRouter from "react-router";

import Example, { CodeSample, ExampleCode } from "./Example";
import PropDocumentation from "./PropDocumentation";
import View from "./View";
import { Button, Menu, FlexBox, ItemAlign, SegmentedControl } from "src";

import "./MenuView.less";

const cssClass = {
  A11Y_CHECKLIST: "MenuView--a11yChecklist",
  CONFIG_CONTAINER: "MenuView--configContainer",
  CONFIG_OPTIONS: "MenuView--configOptions",
  CONFIG: "MenuView--config",
  CONFIG_TOGGLE: "MenuView--configToggle",
  CONTAINER: "MenuView",
  CUSTOM_ITEM: "MenuView--customItem",
  INTRO: "MenuView--intro",
  PROPS: "MenuView--props",
};

const A11Y_DOCS_URL = "https://www.w3.org/TR/2017/NOTE-wai-aria-practices-1.1-20171214/#menu";

export default class MenuView extends React.PureComponent {
  static cssClass = cssClass;

  state = {
    placement: Menu.defaultProps.placement,
    stayOpenOnSelect: false,
    triggerLabel: <span>Open ▾</span>,
    wrapItems: false,
  };

  render() {
    const { location } = this.props;
    const { placement, stayOpenOnSelect, triggerLabel, wrapItems } = this.state;
    const page = location.query.page;

    return (
      <View className={cssClass.CONTAINER} title="Menu" sourcePath="src/Menu/Menu.tsx">
        <header className={cssClass.INTRO}>
          <p>
            Menu provides a standard dropdown menu with customizable trigger. It attaches a dropdown
            to the given trigger child node and toggles it in and out based on trigger click events.
          </p>
          <CodeSample>
            {`
              import {Menu} from "clever-components";
              // OR
              import Menu from "clever-components/dist/Menu"; // Avoids importing all of clever-components.
            `}
          </CodeSample>
          <h3>a11y:</h3>
          <p>
            Follows W3.org <a href={A11Y_DOCS_URL}>recommendations</a> for <code>menu-button</code>s
          </p>
          <ul className={cssClass.A11Y_CHECKLIST}>
            <li>
              With focus on the button:
              <ul>
                <li>
                  <label>
                    <input checked readOnly type="checkbox" /> Enter: opens the menu and places
                    focus on the first menu item.
                  </label>
                </li>
                <li>
                  <label>
                    <input checked readOnly type="checkbox" /> Space: Opens the menu and places
                    focus on the first menu item.
                  </label>
                </li>
                <li>
                  <label>
                    <input checked readOnly type="checkbox" /> (Optional) Down Arrow: opens the menu
                    and moves focus to the first menu item.
                  </label>
                </li>
                <li>
                  <label>
                    <input checked readOnly type="checkbox" /> (Optional) Up Arrow: opens the menu
                    and moves focus to the last menu item.
                  </label>
                </li>
              </ul>
            </li>
            <li>
              With focus on a menu item:
              <ul>
                <li>
                  <label>
                    <input checked readOnly type="checkbox" /> Home: If arrow key wrapping is not
                    supported, moves focus to the first item in the current menu or menubar.
                  </label>
                </li>
                <li>
                  <label>
                    <input checked readOnly type="checkbox" /> End: If arrow key wrapping is not
                    supported, moves focus to the last item in the current <code>menu</code> or{" "}
                    <code>menubar</code>.
                  </label>
                </li>
                <li>
                  <label>
                    <input checked={false} readOnly type="checkbox" /> <b>[TODO]</b> Any key that
                    corresponds to a printable character (Optional): Move focus to the next menu
                    item in the current menu whose label begins with that printable character.
                  </label>
                </li>
                <li>
                  <label>
                    <input checked readOnly type="checkbox" /> Escape: Close the menu that contains
                    focus and return focus to the element or context, e.g., menu button or parent
                    menuitem, from which the menu was opened.
                  </label>
                </li>
                <li>
                  <label>
                    <input checked readOnly type="checkbox" /> Tab: Moves focus to the next element
                    in the tab sequence, and if the item that had focus is not in a menubar, closes
                    its menu and all open parent menu containers.
                  </label>
                </li>
                <li>
                  <label>
                    <input checked readOnly type="checkbox" /> Shift + Tab: Moves focus to the
                    previous element in the tab sequence, and if the item that had focus is not in a
                    menubar, closes its menu and all open parent menu containers.
                  </label>
                </li>
              </ul>
            </li>
            <li>
              <label>
                <input checked readOnly type="checkbox" /> The element that opens the menu has role{" "}
                <code>button</code>.
              </label>
            </li>
            <li>
              <label>
                <input checked readOnly type="checkbox" /> The element with role <code>button</code>{" "}
                has <code>aria-haspopup</code> set to either <code>menu</code> or <code>true</code>.
              </label>
            </li>
            <li>
              <label>
                <input checked readOnly type="checkbox" /> When the menu is displayed, the element
                with role <code>button</code> has <code>aria-expanded</code> set to true. When the
                menu is hidden, it is recommended that <code>aria-expanded</code> is not present. If{" "}
                <code>aria-expanded</code> is specified when the menu is hidden, it is set to{" "}
                <code>false</code>.
              </label>
            </li>
            <li>
              <label>
                <input checked readOnly type="checkbox" /> The element that contains the menu items
                displayed by activating the button has role <code>menu</code>.
              </label>
            </li>
            <li>
              <label>
                <input checked readOnly type="checkbox" /> Optionally, the element with role{" "}
                <code>button</code> has a value specified for <code>aria-controls</code> that refers
                to the element with role <code>menu</code>.
              </label>
            </li>
          </ul>
        </header>

        <Example title="Basic Usage:">
          <ExampleCode>
            <Menu
              className="my--custom--class"
              maxWidth="20rem"
              minWidth="10rem"
              onOpenChange={(isOpen) =>
                this.setState({
                  triggerLabel: isOpen ? <span>Close ▴</span> : <span>Open ▾</span>,
                })
              }
              placement={placement}
              stayOpenOnSelect={stayOpenOnSelect}
              trigger={<Button className={cssClass.TRIGGER} type="primary" value={triggerLabel} />}
              wrapItems={wrapItems}
            >
              <Menu.Item onClick={this._goToPageOne} selected={page === "one"}>
                Button Menu Item
              </Menu.Item>
              <Menu.Item
                component={ReactRouter.Link}
                selected={page === "two"}
                to="/components/menu?page=two"
              >
                Custom Component Menu Item
              </Menu.Item>
              <Menu.Item
                className={cssClass.CUSTOM_ITEM}
                customStyles
                onClick={this._goToPageThree}
                selected={page === "three"}
              >
                Button With Custom Styling
              </Menu.Item>
              <Menu.Item href="https://google.com/search?q=four" target="_blank">
                Plain Link Menu Item
              </Menu.Item>
              <Menu.Item disabled>Disabled Item</Menu.Item>
            </Menu>
          </ExampleCode>
          {this._renderConfig()}
        </Example>

        {this._renderProps()}
      </View>
    );
  }

  _renderConfig() {
    const { placement, stayOpenOnSelect, wrapItems } = this.state;

    return (
      <FlexBox alignItems={ItemAlign.CENTER} className={cssClass.CONFIG_CONTAINER} wrap>
        <div className={cssClass.CONFIG}>
          Placement:
          <SegmentedControl
            className={cssClass.CONFIG_OPTIONS}
            onSelect={(value) => this.setState({ placement: value })}
            options={Object.keys(Menu.Placement).map((key) => ({
              content: key,
              value: Menu.Placement[key],
            }))}
            value={placement}
          />
        </div>
        <label className={cssClass.CONFIG}>
          <input
            type="checkbox"
            checked={stayOpenOnSelect}
            className={cssClass.CONFIG_TOGGLE}
            onChange={(e) => this.setState({ stayOpenOnSelect: e.target.checked })}
          />{" "}
          Stay open on select
        </label>
        <label className={cssClass.CONFIG}>
          <input
            type="checkbox"
            checked={wrapItems}
            className={cssClass.CONFIG_TOGGLE}
            onChange={(e) => this.setState({ wrapItems: e.target.checked })}
          />{" "}
          Wrap items
        </label>
      </FlexBox>
    );
  }

  _renderProps() {
    return (
      <PropDocumentation
        title="<Menu /> Props"
        availableProps={[
          {
            name: "children",
            type: "React.Node",
            description: "Menu content.",
          },
          {
            name: "className",
            type: "string",
            description: "Optional additional CSS class name to apply to the container.",
            optional: true,
          },
          {
            name: "maxHeight",
            type: "string (CSS height)",
            description: "Max height for the dropdown menu.",
            optional: true,
            defaultValue: (
              <span>
                <code>50vh</code> (50% of the viewport height)
              </span>
            ),
          },
          {
            name: "maxWidth",
            type: "string (CSS width)",
            description: "Max width for the dropdown menu.",
            optional: true,
            defaultValue: (
              <span>
                <code>50vw</code> (50% of the viewport width)
              </span>
            ),
          },
          {
            name: "minWidth",
            type: "string (CSS width)",
            description: "Min width for the dropdown menu.",
            optional: true,
            defaultValue: (
              <span>
                <code>100%</code> (relative to the width of the trigger)
              </span>
            ),
          },
          {
            name: "onOpenChange",
            type: <code>function(isOpen: boolean)</code>,
            description: "Event listener triggered when the menu is toggled.",
          },
          {
            name: "onSelect",
            type: <code>function(e: MouseEvent)</code>,
            description: "Event listener triggered when a menu item is clicked.",
          },
          {
            name: "placement",
            type: <code>Menu.Placement</code>,
            description:
              "Horizontal alignment of the dropdown menu container, relative to the trigger",
          },
          {
            name: "stayOpenOnSelect",
            type: "boolean",
            description: "Whether or not to keep the menu open when an item is selected.",
            default: false,
          },
          {
            name: "trigger",
            type: "React Node",
            description: (
              <div>
                Trigger element to render.
                <ul>
                  <li>Must support passing through arbitrary HTML props</li>
                  <li>
                    Must expose a <code>focus()</code> component API for moving focus to the
                    element.
                  </li>
                </ul>
              </div>
            ),
            default: false,
          },
          {
            name: "triggerRefOverride",
            type: "React.RefObject<HTMLElement>",
            description:
              "Optional ref override for the triggering element, for accessibility purposes (e.g. returning focus after modal close).",
            optional: true,
          },
        ]}
        className={cssClass.PROPS}
      />
    );
  }

  _goToPageOne = () => ReactRouter.hashHistory.push("/components/menu?page=one");

  _goToPageTwo = () => ReactRouter.hashHistory.push("/components/menu?page=two");

  _goToPageThree = () => ReactRouter.hashHistory.push("/components/menu?page=three");
}
