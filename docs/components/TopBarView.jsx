import { Link } from "react-router";
import * as PropTypes from "prop-types";
import * as React from "react";
import classnames from "classnames";

import Example, { CodeSample, ExampleCode } from "./Example";
import PropDocumentation from "./PropDocumentation";
import View from "./View";
import {
  FlexBox,
  FlexItem,
  ItemAlign,
  TextInput,
} from "src";
import { TopBar } from "src/TopBar";

import "./TopBarView.less";

const cssClass = {
  CONFIG_CONTAINER: "TopBarView--configContainer",
  CONFIG_OPTIONS: "TopBarView--configOptions",
  CONFIG: "TopBarView--config",
  CONFIG_TOGGLE: "TopBarView--configToggle",
  CONTAINER: "TopBarView",
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
    addArbitraryContent: false,
    title: "Clever Unified School District",
  };

  render() {
    const { location } = this.props;
    const { addArbitraryContent, title } = this.state;

    const page = location.query.page || "portal";

    return (
      <View className={cssClass.CONTAINER} title="TopBar" sourcePath="src/TopBar/TopBar.tsx">
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
              <TopBar className={cssClass.TOP_BAR} logoHref="//clever.com" title={title}>
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
                <TopBar.Menu icon="question-circle">
                  <TopBar.Menu.Item>Help Center</TopBar.Menu.Item>
                  <TopBar.Menu.Item>Give Feedback</TopBar.Menu.Item>
                </TopBar.Menu>
                <TopBar.Menu icon="user">
                  <TopBar.Menu.Item>Profile Settings</TopBar.Menu.Item>
                  <TopBar.Menu.Item>Email Settings</TopBar.Menu.Item>
                  <TopBar.Menu.Item>Logout</TopBar.Menu.Item>
                </TopBar.Menu>
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
    const { addArbitraryContent, title } = this.state;

    return (
      <FlexBox alignItems={ItemAlign.CENTER} className={cssClass.CONFIG_CONTAINER} wrap>
        <div className={cssClass.CONFIG}>
          <TextInput
            className={classnames(cssClass.CONFIG_OPTIONS, cssClass.INPUT_TITLE)}
            id={cssClass.INPUT_TITLE}
            label="Title"
            name={cssClass.INPUT_TITLE}
            onChange={e => this.setState({ title: e.target.value })}
            value={title}
          />
        </div>
        <label className={cssClass.CONFIG}>
          <input
            type="checkbox"
            checked={addArbitraryContent}
            className={cssClass.CONFIG_TOGGLE}
            onChange={e => this.setState({ addArbitraryContent: e.target.checked })}
          />{" "}
          Arbitrary Content
        </label>
      </FlexBox>
    );
  }

  _renderProps() {
    return (
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
            name: "logoHref",
            type: <code>React.Node</code>,
            description: "Optional link URL for the logo.",
            optional: true,
          },
          {
            name: "title",
            type: <code>React.Node</code>,
            description: "Title text to show after the Clever logo, if applicable.",
            optional: true,
          },
        ]}
        className={cssClass.PROPS}
      />
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
