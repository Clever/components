import * as _ from "lodash";
import * as classnames from "classnames";
import * as PropTypes from "prop-types";
import * as React from "react";

import {FlexBox, FlexItem} from "../flex";
import TopBarButton from "./TopBarButton";
import Menu from "../Menu";

import "../DropdownButton/Caret.less";
import "./TopBarMenu.less";

const MarkerShape = {
  CIRCLE: "circle",
  TRIANGLE: "triangle",
};

const propTypes = {
  active: PropTypes.bool,
  children: Menu.propTypes.children,
  className: PropTypes.string,
  component: PropTypes.any,
  dropdownPlacement: Menu.propTypes.placement,
  href: PropTypes.string,
  label: PropTypes.node.isRequired,
  markerShape: PropTypes.oneOf(Object.values(MarkerShape)),
  onClick: PropTypes.func,
  target: PropTypes.string,
};

const defaultProps = {
  markerShape: MarkerShape.CIRCLE,
};

const cssClass = {
  CARET: "DropdownButton--Caret",
  CONTAINER: "TopBarMenu",
  TRIGGER_CONTENT: "TopBarMenu--trigger--content",
  TRIGGER_LABEL: "TopBarMenu--trigger--label",
  TRIGGER: "TopBarMenu--trigger",
};

export default class TopBarMenu extends React.PureComponent {
  static propTypes = propTypes;
  static defaultProps = defaultProps;
  static cssClass = cssClass;

  static MarkerShape = MarkerShape;
  static Item = Menu.Item;
  static Placement = Menu.Placement;

  render() {
    const {children, className, dropdownPlacement} = this.props;
    const additionalProps = _.omit(this.props, Object.keys(propTypes));

    return (
      <Menu
        {...additionalProps}
        className={classnames(cssClass.CONTAINER, className)}
        placement={dropdownPlacement}
        trigger={
          <TopBarButton className={cssClass.TRIGGER}>
            <FlexBox className={cssClass.TRIGGER_CONTENT}>
              <FlexItem className={cssClass.TRIGGER_LABEL} grow>
                {this.props.label}
              </FlexItem>
              <div className={cssClass.CARET} />
            </FlexBox>
          </TopBarButton>
        }
      >
        {children}
      </Menu>
    );
  }

  _getWrapperComponent() {
    const {component, href} = this.props;

    if (component) {
      return component;
    }

    if (href) {
      return "a";
    }

    return "button";
  }
}
