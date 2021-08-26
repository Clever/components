import { Link } from "react-router";
import * as PropTypes from "prop-types";
import * as React from "react";
import classnames from "classnames";
import FontAwesome from "react-fontawesome";

import Example, { CodeSample, ExampleCode } from "./Example";
import PropDocumentation from "./PropDocumentation";
import View from "./View";
import { FlexBox, FlexItem, ItemAlign, TextInput, Menu, Select } from "src";
import { TopBar, TopBarThemes } from "src/TopBar";

import "./TopBarView.less";

const cssClass = {
  CONFIG_CONTAINER: "TopBarView--configContainer",
  CONFIG_OPTIONS: "TopBarView--configOptions",
  CONFIG: "TopBarView--config",
  CONFIG_TOGGLE: "TopBarView--configToggle",
  CONTAINER: "TopBarView",
  DROPDOWN_THEME: "TopBarView--dropdown--theme",
  INPUT_TITLE: "TopBarView--input--title",
  INTRO: "TopBarView--intro",
  PROPS: "TopBarView--props",
  SEARCH_BOX: "TopBarView--searchBox",
  SEARCH_ICON: "TopBarView--searchIcon",
  SEARCH_INPUT: "TopBarView--searchInput",
  TOP_BAR: "TopBarView--topBar",
  WINDOW: "TopBarView--window",
};

export default class TopBarView extends React.PureComponent {
  static propTypes = {
    location: PropTypes.shape({
      query: PropTypes.shape({
        page: PropTypes.string,
      }).isRequired,
    }),
  };
  static cssClass = cssClass;

  state = {
    addArbitraryContent: true,
    theme: undefined,
    title: "Welcome back to Clever",
  };

  render() {
    const { location } = this.props;
    const { addArbitraryContent, theme, title } = this.state;

    const page = location.query.page || "portal";

    return (
      <View className={cssClass.CONTAINER} title="TopBar" sourcePath="src/TopBar/index.tsx">
        <header className={cssClass.INTRO}>
          <p>
            Global page-level header component with support for navigation buttons, links and menus.
          </p>
          <CodeSample>
            {`
              import {TopBar} from "clever-components";
              // OR
              import { TopBar } from "clever-components/dist/TopBar"; // Avoids importing all of clever-components.
            `}
          </CodeSample>
        </header>

        <Example title="Basic Usage:">
          <div className={cssClass.WINDOW}>
            <ExampleCode>
              <TopBar
                className={cssClass.TOP_BAR}
                logoHref="//clever.com"
                theme={theme}
                title={title}
              >
                <TopBar.Button
                  active={page === "dashboard"}
                  component={Link}
                  onClick={this._logDashboardButtonClick}
                  to="/components/top-bar?page=dashboard"
                >
                  Dashboard
                </TopBar.Button>
                <TopBar.Button
                  active={page === "portal"}
                  component={Link}
                  onClick={this._logPortalButtonClick}
                  to="/components/top-bar?page=portal"
                >
                  Portal
                </TopBar.Button>
                <TopBar.Button
                  active={page === "goals"}
                  component={Link}
                  onClick={this._logGoalsButtonClick}
                  to="/components/top-bar?page=goals"
                >
                  Goals
                </TopBar.Button>
                {addArbitraryContent && <SearchBox />}
                <Menu
                  trigger={
                    <TopBar.Button round>
                      <FontAwesome name="question-circle" />
                    </TopBar.Button>
                  }
                >
                  <Menu.Item>Help Center</Menu.Item>
                  <Menu.Item>Give Feedback</Menu.Item>
                </Menu>
                <Menu
                  placement={Menu.Placement.RIGHT}
                  trigger={
                    <TopBar.Button round>
                      <FontAwesome name="user" />
                    </TopBar.Button>
                  }
                >
                  <Menu.Item>Profile Settings</Menu.Item>
                  <Menu.Item>Email Settings</Menu.Item>
                  <Menu.Item>Logout</Menu.Item>
                </Menu>
              </TopBar>
            </ExampleCode>
          </div>
          {this._renderConfig()}
        </Example>

        {this._renderProps()}
      </View>
    );
  }

  _logMenuToggleClicked = () => console.log("menu toggle clicked");

  _logDashboardButtonClick = () => console.log("dashboard button clicked");

  _logPortalButtonClick = () => console.log("portal button clicked");

  _logGoalsButtonClick = () => console.log("goals button clicked");

  _logUserMenuButtonClick = () => console.log("user menu button clicked");

  _renderConfig() {
    const { addArbitraryContent, theme, title } = this.state;

    return (
      <FlexBox alignItems={ItemAlign.CENTER} className={cssClass.CONFIG_CONTAINER} wrap>
        <div className={cssClass.CONFIG}>
          <Select
            className={classnames(cssClass.CONFIG_OPTIONS, cssClass.DROPDOWN_THEME)}
            clearable
            id={cssClass.DROPDOWN_THEME}
            label="Theme"
            name={cssClass.DROPDOWN_THEME}
            onChange={(o) => this.setState({ theme: o && o.value })}
            options={TopBarThemes.sort().map((value) => ({
              label: value,
              value,
            }))}
            value={theme}
          />
        </div>
        <div className={cssClass.CONFIG}>
          <TextInput
            className={classnames(cssClass.CONFIG_OPTIONS, cssClass.INPUT_TITLE)}
            id={cssClass.INPUT_TITLE}
            label="Title"
            name={cssClass.INPUT_TITLE}
            onChange={(e) => this.setState({ title: e.target.value })}
            value={title}
          />
        </div>
        <label className={cssClass.CONFIG}>
          <input
            type="checkbox"
            checked={addArbitraryContent}
            className={cssClass.CONFIG_TOGGLE}
            onChange={(e) => this.setState({ addArbitraryContent: e.target.checked })}
          />{" "}
          Arbitrary Content
        </label>
      </FlexBox>
    );
  }

  _renderProps() {
    return (
      <React.Fragment>
        <PropDocumentation
          title="<TopBar /> Props"
          availableProps={[
            {
              name: "children",
              type: <code>React.Node</code>,
              description: "TopBar contents.",
              optional: true,
            },
            {
              name: "className",
              type: <code>string</code>,
              description: "Optional additional CSS class name to apply to the container.",
              optional: true,
            },
            {
              name: "logoAriaLabel",
              type: <code>string</code>,
              description: "The aria-label for the TopBarButton containing the logo.",
              optional: true,
              defaultValue: '"Clever Home"',
            },
            {
              name: "logoHref",
              type: <code>string</code>,
              description: "URL to use for the Clever logo link.",
              optional: false,
            },
            {
              name: "customLogo",
              type: <code>React.Node</code>,
              description: "Alternate node to show instead of the Clever logo.",
              optional: true,
            },
            {
              name: "theme",
              type: <code>"{TopBarThemes.sort().join('" | "')}"</code>,
              description: "Optional style theme to apply to the TopBar.",
              optional: true,
              defaultValue: '"default"',
            },
            {
              name: "title",
              type: <code>React.Node</code>,
              description: "Title text to show after the Clever logo, if applicable.",
              optional: true,
            },
            {
              name: "onLogoClick",
              type: <code>function</code>,
              description: "Optional onClick event handler for the Clever logo.",
              optional: true,
            },
          ]}
          className={cssClass.PROPS}
        />
        <PropDocumentation
          title="<TopBar.Button /> Props"
          availableProps={[
            {
              name: "children",
              type: <code>React.Node</code>,
              description: "Content of the button.",
              optional: false,
            },
            {
              name: "className",
              type: <code>string</code>,
              description: "Optional additional CSS class name to apply to the button.",
              optional: true,
            },
            {
              name: "active",
              type: <code>bool</code>,
              description: "Is the button currently active/selected?",
              optional: true,
            },
            {
              name: "round",
              type: <code>bool</code>,
              description:
                "Should we use the round button style vs the square one? Often used in conjection with icons as content",
              optional: true,
            },
            {
              name: "onClick",
              type: <code>function</code>,
              description: "Optional onClick event handler for the button.",
              optional: true,
            },
            {
              name: "href",
              type: <code>string</code>,
              description: "If provided, cause the button to behave as a link",
              optional: true,
            },
            {
              name: "component",
              type: "Any",
              description:
                "Tagname of class for the wrapper component. Tab renders as a <button> by default (or " +
                "a <a> if the href prop is specified). It can be made to render as a different component by specifying " +
                "the component tagname or class. e.g. <Tab component={ReactRouter.Link} />",
              defaultValue: "button or a if href available",
              optional: true,
            },
          ]}
          className={cssClass.PROPS}
        />
      </React.Fragment>
    );
  }
}

class SearchBox extends React.PureComponent {
  render() {
    return (
      <div className={cssClass.SEARCH_BOX}>
        <FlexBox>
          <span className={classnames(cssClass.SEARCH_ICON, "fa fa-search")} />
          <FlexItem grow>
            <input
              className={cssClass.SEARCH_INPUT}
              placeholder="Search all the things"
              type="text"
            />
          </FlexItem>
        </FlexBox>
      </div>
    );
  }
}
