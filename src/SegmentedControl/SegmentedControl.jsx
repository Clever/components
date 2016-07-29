import React from "react";
import lodash from "lodash";

import "./SegmentedControl.less";

/*
  SegmentedControl selection. Shows several options
  as defined in the props and allows the user to select
  one of those options.
*/
export class SegmentedControl extends React.Component {
  constructor(props) {
    super(props);
    this.state = {selected: props.defaultValue};
    this.onSelect = this.onSelect.bind(this);
  }

  onSelect(e) {
    const value = e.target.getAttribute("value");
    this.setState({selected: value});
    if (this.props.onSelect !== undefined) {
      this.props.onSelect(value);
    }
  }

  render() {
    const cssClass = SegmentedControl.cssClass;
    const selectableItems = lodash.map(this.props.selectableItems, (name, value) => {
      const isSelected = value === this.state.selected;
      const selectedClass = isSelected ? "selected" : "";
      return (
        <span
          className={`${cssClass.SELECTABLE_ITEM} ${selectedClass}`}
          onClick={this.onSelect}
          key={value}
          value={value}
        >
          {name}
        </span>
      );
    });

    return (
      <div className="SegmentedControl">
        {selectableItems}
      </div>
    );
  }
}

SegmentedControl.propTypes = {
  defaultValue: React.PropTypes.string,
  selectableItems: React.PropTypes.object.isRequired,
  onSelect: React.PropTypes.func,
};

SegmentedControl.cssClass = {
  SELECTABLE_ITEM: "segmented_control--selectable-item",
};
