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
    this.state = {selected: null};
  }

  onSelect(e) {
    const value = e.target.getAttribute("value");
    this.setState({selected: value});
    if (this.props.onSelect) {
      this.props.onSelect(value);
    }
  }

  render() {
    const cssClass = SegmentedControl.cssClass;
    let idx = -1;
    const selectedElement = this.state.selected !== null ? this.state.selected : this.props.selected;
    const selectableItems = lodash.map(this.props.selectableItems, (name, value) => {
      const isSelected = value === selectedElement;
      const selectedClass = isSelected ? "selected" : "";
      idx = idx + 1;
      return (
        <span
          className={`${cssClass.SELECTABLE_ITEM} ${selectedClass}`}
          onClick={(e) => this.onSelect(e)}
          key={idx}
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
  selected: React.PropTypes.string,
  selectableItems: React.PropTypes.object.isRequired,
  onSelect: React.PropTypes.func,
};

SegmentedControl.cssClass = {
  SELECTABLE_ITEM: "segmented_control--selectable-item",
};
