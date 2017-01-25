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

  handleDropdown(expand, cb) {
    this.setState((prevState) => ({
      expanded: expand === "toggle" ? !prevState.expanded : expand,
    }), cb);
  }

  render() {
    const {cssClass} = DropdownButton;
    const {
      className, type, size, value, href, target, disabled, onClick, submit, style,
      options, width, dropdownWidth,
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
            style={width ? {width} : {}}
          />

          <Button
            className={cssClass.DROPDOWN_ARROW_WRAPPER}
            onClick={() => {
              this.handleDropdown("toggle", () => this.state.expanded && this.optionsElem.focus());
            }}
            aria-label="More options"
            value={<div className={cssClass.DROPDOWN_ARROW} />}
          />
        </div>
        <div
          className={classnames(cssClass.OPTIONS, !expanded && cssClass.OPTIONS_HIDDEN)}
          onBlur={(e) => {
            if (!e.relatedTarget || !(
              e.relatedTarget.matches(`.${cssClass.OPTION}`) ||
              e.relatedTarget.matches(`.${cssClass.DROPDOWN_ARROW_WRAPPER}`)
            )) {
              this.handleDropdown(false);
            }
          }}
          ref={(elem) => (this.optionsElem = elem)}
          {
            // need to add tab index so that this is focusable, so that blur event can fire
            ...(expanded && {tabIndex: 0})
          }
          style={dropdownWidth ? {width: dropdownWidth} : {}}
        >
          {options.map((option) => (
            <Button
              className={cssClass.OPTION}
              type="link"
              {..._.omit(option, ["onClick"])}
              onClick={() => {
                option.onClick();
                this.handleDropdown(false);
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
  width: React.PropTypes.string,
  dropdownWidth: React.PropTypes.string,
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
