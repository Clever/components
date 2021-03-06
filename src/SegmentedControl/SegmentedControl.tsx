import * as React from "react";
import * as PropTypes from "prop-types";
import * as _ from "lodash";

import "./SegmentedControl.less";

export interface Option {
  content: React.ReactNode;
  disabled?: boolean;
  value: any;
}

export interface Props {
  className?: string;
  defaultValue?: string;
  disabled?: boolean;
  options: Option[];
  onSelect?: (value: any) => void;
  value?: any;
}

interface State {
  selected: any;
}

const propTypes = {
  className: PropTypes.string,
  defaultValue: PropTypes.string,
  disabled: PropTypes.bool,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      content: PropTypes.node.isRequired,
      disabled: PropTypes.bool,
      value: PropTypes.any.isRequired,
    }),
  ).isRequired,
  onSelect: PropTypes.func,
  value: PropTypes.any,
};

export const cssClass = {
  CONTAINER: "segmented_control",
  DISABLED: "segmented_control--selectable-item--disabled",
  OPTION: "segmented_control--selectable-item",
  SELECTED: "segmented_control--selectable-item--selected",
};

/**
 * SegmentedControl selection. Shows several options as defined in the props and
 * allows the user to select one of those options.
 */
export class SegmentedControl extends React.Component<Props, State> {
  static propTypes = propTypes;

  static validateProps(props) {
    const { defaultValue, onSelect, value } = props;

    if (value && defaultValue) {
      throw new Error(
        "SegmentedControl must either be controlled or uncontrolled " +
          "(specify either the `value` prop, or the `defaultValue` prop, but not both).\n" +
          "More info: https://fb.me/react-controlled-components",
      );
    }

    if (value && !onSelect) {
      throw new Error(
        "`onSelect` prop required when using SegmentedControl as a controlled component. " +
          "Either provide the `onSelect` prop, or replace `value` with `defaultValue` for an " +
          "uncontrolled SegmentedControl.\n" +
          "More info: https://fb.me/react-controlled-components",
      );
    }

    return props;
  }

  constructor(props: Props) {
    super(SegmentedControl.validateProps(props));

    this.state = { selected: props.defaultValue || null };
  }

  onSelect({ disabled, value }: Option) {
    // TODO: We need to do an audit for SegmentedControl usage and figure out if we can safely get
    // rid of the uncontrolled mode (and stop tracking state internally) so we avoid this complexity
    // (or just make a breaking change).
    const previousValue = this.props.value || this.state.selected;
    if (disabled || this.props.disabled || value === previousValue) {
      return;
    }

    this.setState({ selected: value });
    if (this.props.onSelect) {
      this.props.onSelect(value);
    }
  }

  getValue() {
    return this.props.value || this.state.selected;
  }

  render() {
    const { className, disabled, options, value } = this.props;
    const selected = value || this.state.selected;

    let idx = -1;
    const selectableItems = _.map(options, (option) => {
      const isSelected = option.value === selected;
      const classes = [cssClass.OPTION];
      if (isSelected) {
        classes.push(cssClass.SELECTED);
      }
      if (disabled || option.disabled) {
        classes.push(cssClass.DISABLED);
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

    return <div className={[cssClass.CONTAINER, className].join(" ")}>{selectableItems}</div>;
  }
}
