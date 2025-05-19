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
  title?: string;
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
  title: PropTypes.string,
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
      title,
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
        role="menuitem"
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
        aria-current={selected ? "page" : undefined}
      >
        <div className={cssClass.CONTENTS}>
          {icon && (
            <div className={cssClass.ICON_CONTAINER}>
              {React.cloneElement(icon, {
                className: classnames(cssClass.ICON, icon.props.className),
              })}
            </div>
          )}
          <div className={cssClass.LABEL_CONTAINER} aria-hidden={_collapsed}>
            <div
              className={cssClass.LABEL}
              title={(title || label) as any}
              aria-hidden={_collapsed}
            >
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
