import * as React from "react";
import lodash from "lodash";

import "./SegmentedControl.less";


const CLASSNAMES = {
  CONTAINER: "segmented_control",
  DISABLED: "segmented_control--selectable-item--disabled",
  OPTION: "segmented_control--selectable-item",
  SELECTED: "segmented_control--selectable-item--selected",
};

/**
 * SegmentedControl selection. Shows several options as defined in the props and
 * allows the user to select one of those options.
 */
export class SegmentedControl extends React.Component {
  static validateProps(props) {
    const {defaultValue, onSelect, value} = props;

    if (value && defaultValue) {
      throw new Error(
        "SegmentedControl must either be controlled or uncontrolled "
        + "(specify either the `value` prop, or the `defaultValue` prop, but not both).\n"
        + "More info: https://fb.me/react-controlled-components"
      );
    }

    if (value && !onSelect) {
      throw new Error(
        "`onSelect` prop required when using SegmentedControl as a controlled component. "
        + "Either provide the `onSelect` prop, or replace `value` with `defaultValue` for an "
        + "uncontrolled SegmentedControl.\n"
        + "More info: https://fb.me/react-controlled-components"
      );
    }

    return props;
  }

  constructor(props) {
    super(SegmentedControl.validateProps(props));

    this.state = {selected: props.defaultValue || null};
  }

  onSelect({disabled, value}) {
    if (
      disabled
      || this.props.disabled
      || value === this.state.selected
    ) {
      return;
    }

    this.setState({selected: value});
    if (this.props.onSelect) {
      this.props.onSelect(value);
    }
  }

  getValue() {
    return this.props.value || this.state.selected;
  }

  render() {
    const {className, disabled, options, value} = this.props;
    const selected = value || this.state.selected;

    let idx = -1;
    const selectableItems = lodash.map(options, option => {
      const isSelected = option.value === selected;
      const classes = [CLASSNAMES.OPTION];
      if (isSelected) {
        classes.push(CLASSNAMES.SELECTED);
      }
      if (disabled || option.disabled) {
        classes.push(CLASSNAMES.DISABLED);
      }

      idx = idx + 1;
      return (
        <button
          className={classes.join(" ")}
          onClick={() => this.onSelect(option)}
          key={idx}
          type="button"
        >
          {option.content}
        </button>
      );
    });

    return (
      <div className={[CLASSNAMES.CONTAINER, className].join(" ")}>
        {selectableItems}
      </div>
    );
  }
}

SegmentedControl.propTypes = {
  className:  React.PropTypes.string,
  defaultValue:  React.PropTypes.string,
  disabled:  React.PropTypes.bool,
  options:  React.PropTypes.arrayOf(React.PropTypes.shape({
    content:  React.PropTypes.node.isRequired,
    disabled:  React.PropTypes.bool,
    value:  React.PropTypes.any.isRequired,
  })).isRequired,
  onSelect:  React.PropTypes.func,
  value:  React.PropTypes.any,
};
