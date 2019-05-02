import * as _ from "lodash";
import * as classnames from "classnames";
import * as PropTypes from "prop-types";
import * as React from "react";
import * as FontAwesome from "react-fontawesome";

import TopBarButton from "./TopBarButton";
import Menu from "../Menu";

import "./TopBarMenu.less";

const propTypes = {
  children: Menu.propTypes.children,
  className: PropTypes.string,
  icon: PropTypes.string.isRequired,
};

export default class TopBarMenu extends React.PureComponent {
  static propTypes = propTypes;

  static Item = Menu.Item;

  render() {
    const { children, className } = this.props;
    const additionalProps = _.omit(this.props, Object.keys(propTypes));

    return (
      <Menu
        {...additionalProps}
        className={classnames("TopBarMenu", className)}
        placement={Menu.Placement.RIGHT}
        trigger={
          <TopBarButton className={"TopBarMenu--trigger"}>
            <FontAwesome name={this.props.icon} />
          </TopBarButton>
        }
      >
        {children}
      </Menu>
    );
  }

  _getWrapperComponent() {
    const { component, href } = this.props;

    if (component) {
      return component;
    }

    if (href) {
      return "a";
    }

    return "button";
  }
}
