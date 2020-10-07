import * as classnames from "classnames";
import * as React from "react";
import * as PropTypes from "prop-types";

import "./Tab.less";

export interface Props {
  children: React.ReactNode;
  className?: string;
  component?: any;
  // TODO: It's theoretically possible to make this component generic and type these extra props, but it's a pain
  [additionalProp: string]: any;
  disabled?: boolean;
  href?: string;
  id: any;
  onSelect?: (id: any) => void;
  selected?: boolean;
}

export const cssClass = {
  CONTAINER: "TabBar--Tab",
  DISABLED: "TabBar--Tab--disabled",
  SELECTED: "TabBar--Tab--selected",
};

export default function Tab({
  children,
  className,
  component,
  disabled,
  href,
  id,
  onSelect,
  selected,
  ...additionalProps
}: Props) {
  let Wrapper = component;
  if (!Wrapper) {
    Wrapper = href ? "a" : "button";
  }

  return (
    <Wrapper
      className={classnames(
        cssClass.CONTAINER,
        disabled && cssClass.DISABLED,
        selected && cssClass.SELECTED,
        className,
      )}
      disabled={disabled}
      href={href}
      onClick={(e) => {
        if (disabled) {
          e.preventDefault();
          return;
        }
        onSelect(id);
      }}
      {...additionalProps}
    >
      {children}
    </Wrapper>
  );
}

Tab.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  component: PropTypes.any,
  disabled: PropTypes.bool,
  href: PropTypes.string,
  id: PropTypes.any.isRequired,
  onSelect: PropTypes.func,
  selected: PropTypes.bool,
};

Tab.defaultProps = {
  onSelect: () => {},
};
