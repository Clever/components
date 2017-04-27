import React from "react";
import classnames from "classnames";
import moment from "moment";

import "./DateInput.less";

import DatePicker from "../DatePicker/DatePicker";
import {Button} from "../Button/Button";
import {FlexBox, FlexItem} from "../flex";

export class DateInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showPicker: false,
    };
  }

  _onChange(val) {
    this.props.onChange(val);
    this.setState({
      showPicker: false,
    });
  }

  render() {
    const val = this.props.value ? moment(this.props.value) : moment();

    return (<FlexBox column className={classnames("DateInput", this.props.className)}>
      <div className="DateInput--InfoRow">{this.props.label}</div>
      <FlexBox className="DateInput--DateRow">
        <span className="DateInput--Date">
          {this.props.value ? val.format("M/D/YYYY") : "--"}
        </span>
        <FlexItem grow />
        {this.props.value && <Button
          className="DateInput--ClearButton"
          type="link"
          size="small"
          value="Clear"
          onClick={() => this._onChange(undefined)}
        />}
        <Button
          className="DateInput--EditButton"
          type="link"
          size="small"
          value={this.props.value ? "Change" : "Set"}
          onClick={() => this.setState({showPicker: true})}
        />
      </FlexBox>
      {this.state.showPicker && <DatePicker
        title={this.props.label}
        value={this.props.value}
        onClose={() => this.setState({showPicker: false})}
        onChange={(v) => this._onChange(v)}
        datePickerProps={{
          minDate: this.props.min,
          maxDate: this.props.max,
        }}
      />}
    </FlexBox>);
  }
}

DateInput.propTypes = {
  className: React.PropTypes.string,
  label: React.PropTypes.string,
  value: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.instanceOf(Date),
  ]),
  onChange: React.PropTypes.func.isRequired,
  min: React.PropTypes.instanceOf(Date),
  max: React.PropTypes.instanceOf(Date),
};
