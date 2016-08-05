import cls from "classnames";
import React, {PropTypes} from "react";
import lodash from "lodash";

import "./SegmentedControl.less";

/**
 * SegmentedControl selection. Shows several options as defined in the props and
 * allows the user to select one of those options.
 */
export class SegmentedControl extends React.Component {
  constructor(props) {
    super(props);
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
    return this.state.selected;
  }

  render() {
    const {className, disabled, options} = this.props;
    const {selected} = this.state;
    const cssClass = SegmentedControl.cssClass;

    let idx = -1;
    const selectableItems = lodash.map(options, option => {
      const isSelected = option.value === selected;
      idx = idx + 1;
      return (
        <span
          className={cls(cssClass.OPTION, {
            [cssClass.SELECTED]: isSelected,
            [cssClass.DISABLED]: disabled || option.disabled,
          })}
          onClick={() => this.onSelect(option)}
          key={idx}
        >
          {option.content}
        </span>
      );
    });

    return (
      <div className={cls(cssClass.CONTAINER, className)}>
        {selectableItems}
      </div>
    );
  }
}

SegmentedControl.propTypes = {
  className: PropTypes.string,
  defaultValue: PropTypes.string,
  disabled: PropTypes.bool,
  options: PropTypes.arrayOf(PropTypes.shape({
    content: PropTypes.node.isRequired,
    disabled: PropTypes.bool,
    value: PropTypes.string.isRequired,
  })).isRequired,
  onSelect: PropTypes.func,
};

SegmentedControl.cssClass = {
  CONTAINER: "segmented_control",
  DISABLED: "segmented_control--selectable-item--disabled",
  OPTION: "segmented_control--selectable-item",
  SELECTED: "segmented_control--selectable-item--selected",
};
