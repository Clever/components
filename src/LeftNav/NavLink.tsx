import * as PropTypes from "prop-types";
import * as React from "react";
import * as classnames from "classnames";

import Tooltip from "../Tooltip";
import Arrow from "./Arrow";

import "./NavLink.less";

export interface Props {
  className?: string;
  component?: any;
  // TODO: It's theoretically possible to make this component generic and type these extra props, but it's a pain
  [additionalProp: string]: any;
  href?: string;
  icon?: React.ReactElement;
  label?: React.ReactNode;
  onClick?: React.MouseEventHandler;
  selected?: boolean;

  // Internal use only: (TODO: Remove?)
  _collapsed?: boolean;
  _withArrow?: boolean;
  _withTooltips?: boolean;
}

const propTypes = {
  className: PropTypes.string,
  component: PropTypes.any,
  href: PropTypes.string,
  icon: PropTypes.element,
  label: PropTypes.node,
  onClick: PropTypes.func,
  selected: PropTypes.bool,

  // Internal use only:
  _collapsed: PropTypes.bool,
  _withArrow: PropTypes.bool,
  _withTooltips: PropTypes.bool,
};

export const cssClass = {
  ARROW_CONTAINER: "NavLink--arrow--container",
  ARROW_ICON: "NavLink--arrow",
  COLLAPSED: "NavLink--collapsed",
  CONTAINER: "NavLink",
  CONTENTS: "NavLink--contents",
  ICON: "NavLink--icon",
  ICON_CONTAINER: "NavLink--icon--container",
  LABEL: "NavLink--label",
  LABEL_CONTAINER: "NavLink--label--container",
  SELECTED: "NavLink--selected",
  WITH_ARROW: "NavLink--withArrow",
};

export class NavLink extends React.PureComponent<Props> {
  static propTypes = propTypes;

  render() {
    const {
      _collapsed,
      _withArrow,
      _withTooltips,
      className,
      component,
      href,
      icon,
      label,
      onClick,
      selected,
      ...additionalProps
    } = this.props;

    let Component: any = "button";
    if (component) {
      Component = component;
    } else if (href) {
      Component = "a";
    }

    const element = (
      <Component
        {...additionalProps}
        className={classnames(
          cssClass.CONTAINER,
          selected && cssClass.SELECTED,
          _collapsed && cssClass.COLLAPSED,
          _withArrow && cssClass.WITH_ARROW,
          className,
        )}
        href={href}
        onClick={onClick}
      >
        <div className={cssClass.CONTENTS}>
          {icon && (
            <div className={cssClass.ICON_CONTAINER}>
              {React.cloneElement(icon, {
                className: classnames(cssClass.ICON, icon.props.className),
              })}
            </div>
          )}
          <div className={cssClass.LABEL_CONTAINER}>
            <div className={cssClass.LABEL} title={label as any}>
              {label}
            </div>
          </div>
          {_withArrow && (
            <div className={cssClass.ARROW_CONTAINER}>
              <Arrow className={cssClass.ARROW_ICON} />
            </div>
          )}
        </div>
      </Component>
    );

    if (!_withTooltips) {
      return element;
    }

    return (
      <Tooltip content={label} hide={!_collapsed} placement={Tooltip.Placement.RIGHT}>
        {element}
      </Tooltip>
    );
  }
}
