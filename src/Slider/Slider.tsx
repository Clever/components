import * as _ from "lodash";
import * as classnames from "classnames";
import * as PropTypes from "prop-types";
import * as React from "react";
import RCSlider, {createSliderWithTooltip} from "rc-slider";

import MorePropTypes from "../utils/MorePropTypes";
import Styles from "./Styles";

import "./Slider.less";

const propTypes = {
  className: PropTypes.string,
  disabled: PropTypes.bool,
  intervalSize: PropTypes.number,
  markIntervals: PropTypes.bool,
  marks: PropTypes.objectOf(PropTypes.node),
  max: PropTypes.number.isRequired,
  min: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  tooltipFn: PropTypes.func,
  value: MorePropTypes.oneOrManyOf(PropTypes.number).isRequired,
};

const cssClass = {
  CONTAINER: "Slider",
  SLIDER: "Slider--slider",
  TOOLTIP: "Slider--tooltip",
};

const RCTooltipSlider = createSliderWithTooltip(RCSlider);
const RCTooltipRange = createSliderWithTooltip(RCSlider.Range);

/**
 * Simple single and multi-value slider.
 */
export default class Slider extends React.PureComponent {
  static propTypes = propTypes;
  static cssClass = cssClass;
  static Styles = Styles;

  render() {
    const {
      className,
      disabled,
      intervalSize,
      markIntervals,
      marks,
      max,
      min,
      tooltipFn,
      value,
    } = this.props;

    let SliderComponent = RCSlider;
    if (tooltipFn) {
      SliderComponent = value instanceof Array ? RCTooltipRange : RCTooltipSlider;
    } else {
      SliderComponent = value instanceof Array ? RCSlider.Range : RCSlider;
    }

    return (
      <div className={classnames(cssClass.CONTAINER, className)}>
        <SliderComponent
          className={cssClass.SLIDER}
          disabled={disabled}
          dots={!!markIntervals}
          marks={marks ? _.mapValues(marks, label => ({
            label,
            style: Styles.MARK,
          })) : undefined}
          max={max}
          min={min}
          onChange={this._handleChange}
          step={intervalSize || undefined}
          tipFormatter={tooltipFn}
          tipProps={{overlayClassName: cssClass.TOOLTIP}}
          value={value}
        />
      </div>
    );
  }

  _handleChange = newValue => {
    if (this.props.disabled) {
      return;
    }

    if (newValue === this.props.value) {
      return;
    }

    this.props.onChange(newValue);
  }
}
