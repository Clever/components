import classnames from "classnames";
import React, {PropTypes} from "react";

import "./Tab.less";


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
}) {
  const {cssClass} = Tab;

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
        className
      )}
      disabled={disabled}
      href={href}
      onClick={e => {
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

Tab.cssClass = {
  CONTAINER: "TabBar--Tab",
  DISABLED: "TabBar--Tab--disabled",
  SELECTED: "TabBar--Tab--selected",
};
