import classnames from "classnames";
import * as React from "react";

import "./Tab.less";


const CLASSNAMES = {
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
  ...additionalProps,
}) {
  let Wrapper = component;
  if (!Wrapper) {
    Wrapper = href ? "a" : "button";
  }

  return (
    <Wrapper
      className={classnames(
        CLASSNAMES.CONTAINER,
        disabled && CLASSNAMES.DISABLED,
        selected && CLASSNAMES.SELECTED,
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
  children:  React.PropTypes.node.isRequired,
  className:  React.PropTypes.string,
  component:  React.PropTypes.any,
  disabled:  React.PropTypes.bool,
  href:  React.PropTypes.string,
  id:  React.PropTypes.any.isRequired,
  onSelect:  React.PropTypes.func,
  selected:  React.PropTypes.bool,
};

Tab.defaultProps = {
  onSelect: () => {},
};
