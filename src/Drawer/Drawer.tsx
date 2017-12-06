import * as classnames from "classnames";
import * as PropTypes from "prop-types";
import * as React from "react";

import {Button} from "../Button/Button";

import "./Drawer.less";

/**
 * To do list:
 * accept a prop for page header height
 * import FontAwesome for chevron-left
 * style chevron-left
 * rethink button that is provided with the drawer?
 * default padding for drawer content
 * when scrolling page, separates from header
 */

const propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  headerContent: PropTypes.node,
  onPerformAction: PropTypes.func.isRequired,
  onDrawerClose: PropTypes.func,
};

const cssClass = {
  CONTAINER: "Drawer",
  DRAWER_DIV: "Drawer--drawerDiv",
  HEADER: "Drawer--header",
};

/**
 * TODO: Add short description.
 */
export default class Drawer extends React.PureComponent {
  static propTypes = propTypes;
  static cssClass = cssClass;
  constructor(props) {
    super(props);
    this.state = {
      drawerOpen: false,
    };
  }

  render() {
    const {children, className, headerContent} = this.props;

    return (
      <div className={classnames(cssClass.CONTAINER, className)}>
        <div className={classnames(
            cssClass.DRAWER_DIV,
            className,
            this.state.drawerOpen ? "drawerOpen" : "")}
        >
          {headerContent && <h2>
            <a onClick={this._handleCloseDrawer}>
              {"<"}
              {/* TODO: remove above "<" */}
              {/*<FontAwesome name="chevron-left" />*/}
            </a>
            {headerContent}
          </h2>}
          <p>Drawer content goes here!</p>
          <p>{children}</p>
        </div>
        <div>
          <Button
            onClick={this._handlePerformAction}
            type={Button.Type.PRIMARY}
            value="Open Drawer"
          />
        </div>
      </div>
    );
  }

  _handlePerformAction = () => {
    console.log("performing action");
    this.setState({
      drawerOpen: true,
    });
    this.props.onPerformAction("action performed");
  }

  _handleCloseDrawer = () => {
    this.setState({
      drawerOpen: false,
    });
    this.props.onDrawerClose();
  }
}
