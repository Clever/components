import classnames from "classnames";
import * as React from "react";
import * as _ from "lodash";

import {Button} from "..";

require("./DropdownButton.less");

export class DropdownButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false,
    };
  }

  handleDropdown(cb) {
    this.setState((prevState) => ({
      expanded: !prevState.expanded,
    }), cb);
  }

  render() {
    const {cssClass} = DropdownButton;
    const {
      className, type, size, value, href, target, disabled, onClick, submit, style, options,
    } = this.props;
    const directlyInheritedProps = {
      value, href, target, disabled, submit, onClick,
    };

    const {expanded} = this.state;

    return (
      <div className={cssClass.CONTAINER}>
        <div
          className={classnames(
            cssClass.PARENT, cssClass.type(type), cssClass.size(size),
            disabled && cssClass.DISABLED, className
          )}
          style={style}
        >
          <Button
            className={cssClass.MAIN_BUTTON}
            {...directlyInheritedProps}
            type="plain"
          />

          <Button
            className={cssClass.DROPDOWN_ARROW_WRAPPER}
            onClick={() => {
              this.handleDropdown(() => this.optionsElem.focus());
            }}
            aria-label="More options"
            value={<div className={cssClass.DROPDOWN_ARROW} />}
          />
        </div>
        <div
          className={classnames(cssClass.OPTIONS, !expanded && cssClass.OPTIONS_HIDDEN)}
          onBlur={() => this.handleDropdown()}
          ref={(elem) => (this.optionsElem = elem)}
          {...(expanded && {tabIndex: 1})}
        >
          {options.map((option) => (
            <Button
              className={cssClass.OPTION}
              type="link"
              {..._.omit(option, ["onClick"])}
              onMouseDown={() => {
                option.onClick();
                this.handleDropdown();
              }}
            />
          ))}
        </div>
      </div>
    );
  }
}

// `options` gets a subset of button arguments.
const optionShape = React.PropTypes.shape(Object.assign(
  _.pick(Button.propTypes, ["value", "href", "target", "disabled", "onClick"]),
  {key: React.PropTypes.string}
));

// `DropdownButton` inherits all the properties of `Button` except type, since type is limited to
// the actual button-rendering types.
DropdownButton.propTypes = Object.assign({}, _.omit(Button.propTypes, ["type"]), {
  type: React.PropTypes.oneOf(["primary", "secondary", "destructive"]),
  options: React.PropTypes.arrayOf(optionShape).isRequired,
});


DropdownButton.defaultProps = {
  type: "secondary",
  size: "regular",
  target: "_blank",
};

DropdownButton.cssClass = {
  CONTAINER: "DropdownButton",
  PARENT: "DropdownButton--Button",
  MAIN_BUTTON: "DropdownButton--mainButton",
  MAIN_BUTTON_VALUE: "DropdownButton--mainButton--value",
  DROPDOWN_ARROW_WRAPPER: "DropdownButton--dropdownArrow",
  DROPDOWN_ARROW: "DropdownButton--dropdownArrow--arrow",
  OPTIONS: "DropdownButton--options",
  OPTIONS_HIDDEN: "DropdownButton--options--hidden",
  OPTION: "DropdownButton--options--option",
  DISABLED: "DropdownButton--disabled",
  type: (type) => `DropdownButton--${type} Button--${type}`,
  size: (size) => `DropdownButton--${size} Button--${size}`,
};
