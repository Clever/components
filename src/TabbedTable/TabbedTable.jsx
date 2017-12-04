import * as PropTypes from "prop-types";
import * as React from "react";
import * as classnames from "classnames";
import MorePropTypes from "clever-components/dist/utils/MorePropTypes";

import Tab from "./Tab";

import "./TabbedTable.less";


export default class TabbedTable extends React.PureComponent {
  static cssClass = {
    TAB_BAR: "TabbedTable--TabBar",
    TITLE: "TabbedTable--Title",
    TABS: "TabbedTable--Tabs",
    TAB_NAME: "TabbedTable--TabName",
    SELECTED_TAB_NAME: "TabbedTable--SelectedTabName",
  };

  static propTypes = {
    children: PropTypes.arrayOf(PropTypes.oneOfType([
      MorePropTypes.instanceOfComponent(Tab),
      PropTypes.oneOf([null, false]), // allow for conditionally including tabs
    ])).isRequired,
    title: PropTypes.string,
  };

  constructor(props) {
    super(props);

    this.state = {
      selectedTabIndex: 0,
    };
  }

  _onSelect(e, tabIndex) {
    e.preventDefault();
    this.setState({selectedTabIndex: tabIndex});
  }

  render() {
    const {cssClass} = TabbedTable;
    const {children, title} = this.props;
    const {selectedTabIndex} = this.state;

    const tabLinks = React.Children.map(children, (tab, i) => {
      if (!tab) {
        return null;
      }
      return (
        <a
          className={classnames(cssClass.TAB_NAME, {
            [cssClass.SELECTED_TAB_NAME]: i === selectedTabIndex,
          })}
          onClick={e => this._onSelect(e, i)}
          key={tab.props.name}
        >
          {tab.props.name}
        </a>
      );
    });

    const selectedTab = children[selectedTabIndex];
    const tableToRender = React.Children.only(selectedTab.props.children);
    return (
      <div>
        <div className={cssClass.TAB_BAR}>
          {title && <h2 className={cssClass.TITLE}>{title}</h2>}
          <span className={cssClass.TABS}>
            <label>view:</label>
            {tabLinks}
          </span>
        </div>
        {tableToRender}
      </div>
    );
  }
}

TabbedTable.Tab = Tab;
