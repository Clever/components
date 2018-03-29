import {Link} from "react-router";
import * as PropTypes from "prop-types";
import * as React from "react";
import classnames from "classnames";

import Colors from "src/utils/Colors";
import Example, {CodeSample, ExampleCode} from "./Example";
import PropDocumentation from "./PropDocumentation";
import View from "./View";
import {
  FlexBox,
  FlexItem,
  GoalsLogo,
  ItemAlign,
  Logo,
  SegmentedControl,
  Select,
  TextInput,
} from "src";
import TopBar from "src/TopBar";

import "./TopBarView.less";

const cssClass = {
  CONFIG_CONTAINER: "TopBarView--configContainer",
  CONFIG_OPTIONS: "TopBarView--configOptions",
  CONFIG: "TopBarView--config",
  CONFIG_TOGGLE: "TopBarView--configToggle",
  CONTAINER: "TopBarView",
  DROPDOWN_COLOR: "TopBarView--dropdown--color",
  INPUT_TITLE: "TopBarView--input--title",
  INTRO: "TopBarView--intro",
  PROPS: "TopBarView--props",
  SEARCH_BOX: "TopBarView--searchBox",
  SEARCH_ICON: "TopBarView--searchIcon",
  SEARCH_INPUT: "TopBarView--searchInput",
  TOP_BAR: "TopBarView--topBar",
  USER_NAME: "TopBarView--userName",
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
    betaLogo: false,
    color: TopBar.defaultProps.color,
    markerShape: TopBar.Button.defaultProps.markerShape,
    showHeart: true,
    showMenuToggle: true,
    title: "Clever Unified School District",
    titleWrap: false,
  };

  render() {
    const {location} = this.props;
    const {
      addArbitraryContent,
      betaLogo,
      color,
      markerShape,
      showHeart,
      showMenuToggle,
      title,
      titleWrap,
    } = this.state;

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
              import TopBar from "clever-components/dist/TopBar"; // Avoids importing all of clever-components.
            `}
          </CodeSample>
        </header>

        <Example title="Basic Usage:">
          <div className={cssClass.WINDOW}>
            <ExampleCode>
              <TopBar
                className={cssClass.TOP_BAR}
                color={color}
                logo={
                  page === "goals" ? (
                    <GoalsLogo color={Colors.PRIMARY_BLUE} size="custom" withClever />
                  ) : (
                    <Logo beta={betaLogo} color={Colors.PRIMARY_BLUE} />
                  )
                }
                logoLinkHref="//clever.com"
                logoLinkTarget="_blank"
                onToggleMenu={this._logMenuToggleClicked}
                showHeart={showHeart}
                showMenuToggle={showMenuToggle}
                title={title}
                titleWrap={titleWrap}
              >
                <FlexItem grow />
                {addArbitraryContent && <SearchBox />}
                <TopBar.Button
                  active={page === "dashboard"}
                  component={Link}
                  markerShape={markerShape}
                  onClick={this._logDashboardButtonClick}
                  to="/components/top-bar?page=dashboard"
                >
                  Dashboard
                </TopBar.Button>
                <TopBar.Button
                  active={page === "portal"}
                  component={Link}
                  markerShape={markerShape}
                  onClick={this._logPortalButtonClick}
                  to="/components/top-bar?page=portal"
                >
                  Portal
                </TopBar.Button>
                <TopBar.Button
                  active={page === "goals"}
                  component={Link}
                  markerShape={markerShape}
                  onClick={this._logGoalsButtonClick}
                  to="/components/top-bar?page=goals"
                >
                  Goals
                </TopBar.Button>
                <TopBar.Menu
                  dropdownPlacement={TopBar.Menu.Placement.RIGHT}
                  label={
                    <FlexBox alignItems="center">
                      <span className="fa fa-user" style={{marginRight: "0.25rem"}} />
                      <span className={cssClass.USER_NAME}>K. Stark</span>
                    </FlexBox>
                  }
                  maxWidth="20rem"
                  minWidth="7rem"
                >
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
    const {
      addArbitraryContent,
      betaLogo,
      color,
      markerShape,
      showHeart,
      showMenuToggle,
      title,
      titleWrap,
    } = this.state;

    return (
      <FlexBox alignItems={ItemAlign.CENTER} className={cssClass.CONFIG_CONTAINER} wrap>
        <div className={cssClass.CONFIG}>
          <Select
            className={classnames(cssClass.CONFIG_OPTIONS, cssClass.DROPDOWN_COLOR)}
            id={cssClass.DROPDOWN_COLOR}
            label="Color"
            name={cssClass.DROPDOWN_COLOR}
            onChange={({value}) => this.setState({color: value})}
            options={Object.keys(TopBar.Color)
              .sort()
              .map(key => ({
                label: key,
                value: TopBar.Color[key],
              }))}
            value={color}
          />
        </div>
        <label className={cssClass.CONFIG}>
          <input
            type="checkbox"
            checked={showMenuToggle}
            className={cssClass.CONFIG_TOGGLE}
            onChange={e => this.setState({showMenuToggle: e.target.checked})}
          />{" "}
          Menu Toggle
        </label>
        <label className={cssClass.CONFIG}>
          <input
            type="checkbox"
            checked={betaLogo}
            className={cssClass.CONFIG_TOGGLE}
            onChange={e => this.setState({betaLogo: e.target.checked})}
          />{" "}
          Beta Logo
        </label>
        <label className={cssClass.CONFIG}>
          <input
            type="checkbox"
            checked={showHeart}
            className={cssClass.CONFIG_TOGGLE}
            onChange={e => this.setState({showHeart: e.target.checked})}
          />{" "}
          Heart
        </label>
        <div className={cssClass.CONFIG}>
          <TextInput
            className={classnames(cssClass.CONFIG_OPTIONS, cssClass.INPUT_TITLE)}
            id={cssClass.INPUT_TITLE}
            label="Title"
            name={cssClass.INPUT_TITLE}
            onChange={e => this.setState({title: e.target.value})}
            value={title}
          />
        </div>
        <div className={cssClass.CONFIG}>
          Link Marker:
          <SegmentedControl
            className={cssClass.CONFIG_OPTIONS}
            onSelect={value => this.setState({markerShape: value})}
            options={Object.keys(TopBar.Button.MarkerShape).map(key => ({
              content: key,
              value: TopBar.Button.MarkerShape[key],
            }))}
            value={markerShape}
          />
        </div>
        <label className={cssClass.CONFIG}>
          <input
            type="checkbox"
            checked={titleWrap}
            className={cssClass.CONFIG_TOGGLE}
            onChange={e => this.setState({titleWrap: e.target.checked})}
          />{" "}
          Title Wrap
        </label>
        <label className={cssClass.CONFIG}>
          <input
            type="checkbox"
            checked={addArbitraryContent}
            className={cssClass.CONFIG_TOGGLE}
            onChange={e => this.setState({addArbitraryContent: e.target.checked})}
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
            name: "color",
            type: <code>TopBar.Color</code>,
            description: "Accent color for the bottom border.",
            optional: true,
            defaultValue: <code>TopBar.Color.BLUE</code>,
          },
          {
            name: "logo",
            type: <code>React.Node</code>,
            description: "The element to render as the logo.",
            optional: true,
          },
          {
            name: "logoLinkHref",
            type: <code>React.Node</code>,
            description: "Optional link URL for the logo.",
            optional: true,
          },
          {
            name: "logoLinkTarget",
            type: <code>React.Node</code>,
            description: "Optional window target for the logo link, if applicable.",
            optional: true,
          },
          {
            name: "onToggleMenu",
            type: <code>Function</code>,
            description: "Event handler called when the menu button is clicked.",
            optional: true,
          },
          {
            name: "showHeart",
            type: <code>boolean</code>,
            description: "Whether or not to show the Clever heart after the logo.",
            optional: true,
          },
          {
            name: "showMenuToggle",
            type: <code>boolean</code>,
            description: "Whether or not to show the left nav menu toggle.",
            optional: true,
          },
          {
            name: "title",
            type: <code>React.Node</code>,
            description: "Title text to show after the Clever logo, if applicable.",
            optional: true,
          },
          {
            name: "titleWrap",
            type: <code>boolean</code>,
            description: (
              <p>
                Whether or not the title text should be wrapped if longer than the available space.
                If not specified, the title text will be truncated with an ellipsis.,
              </p>
            ),
            optional: true,
            default: <code>false</code>,
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
