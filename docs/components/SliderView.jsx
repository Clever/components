import * as React from "react";
import moment from "moment";

import Example, {CodeSample, ExampleCode} from "./Example";
import PropDocumentation from "./PropDocumentation";
import View from "./View";
import {Slider, FlexBox, ItemAlign} from "src";

import "./SliderView.less";

const cssClass = {
  CONFIG_CONTAINER: "SliderView--configContainer",
  CONFIG_OPTIONS: "SliderView--configOptions",
  CONFIG: "SliderView--config",
  CONFIG_TOGGLE: "SliderView--configToggle",
  CONTAINER: "SliderView",
  DISPLAY_VALUE: "SliderView--displayValue",
  INTRO: "SliderView--intro",
  PROPS: "SliderView--props",
};

export default class SliderView extends React.PureComponent {
  static cssClass = cssClass;

  render() {
    return (
      <View
        className={cssClass.CONTAINER}
        title="Slider"
        sourcePath="src/Slider/Slider.tsx"
      >
        <header className={cssClass.INTRO}>
          <p>TODO: Describe your component/state it's purpose</p>
          <p>TODO(optional): Describe scenarios where the component might be useful.</p>
          <CodeSample>
            {`
              import {Slider} from "clever-components";
            `}
          </CodeSample>
        </header>

        <SingleSliderDemo />

        <MultiSliderDemo />

        {this._renderProps()}
      </View>
    );
  }

  // TODO: Update prop documentation.
  _renderProps() {
    return (
      <PropDocumentation
        title="<Slider /> Props"
        availableProps={[
          {
            name: "children",
            type: "React.Node",
            description: "Slider content.",
          },
          {
            name: "className",
            type: "string",
            description: "Optional additional CSS class name to apply to the container.",
            optional: true,
          },
          {
            name: "onPerformAction",
            type: "Function",
            description: "Handler function for the performAction event.",
          },
        ]}
        className={cssClass.PROPS}
      />
    );
  }

  _handleChangeSingle = valueSingle => this.setState({valueSingle});
}

class SingleSliderDemo extends React.PureComponent {
  state = {
    disabled: false,
    max: 100,
    min: 0,
    markIntervals: false,
    withIntervals: false,
    withCustomMarks: true,
    withTooltips: true,
    value: 30,
  };

  render() {
    const {
      disabled,
      markIntervals,
      max,
      min,
      value,
      withIntervals,
      withCustomMarks,
      withTooltips,
    } = this.state;

    return (
      <Example title="Single-Value Slider:">
        <div className={cssClass.DISPLAY_VALUE} style={{opacity: value / 100}}>
          {formatPercentage(value)}
        </div>
        <ExampleCode>
          <Slider
            className="my--custom--class"
            disabled={disabled}
            intervalSize={withIntervals ? 10 : null}
            markIntervals={markIntervals}
            marks={withCustomMarks ? {
              0: "0%",
              50: "50%",
              100: "100%",
            } : null}
            max={max}
            min={min}
            onChange={this._handleChange}
            tooltipFn={withTooltips ? formatPercentage : null}
            value={value}
          />
        </ExampleCode>
        {this._renderConfig()}
      </Example>
    );
  }

  _renderConfig() {
    const {disabled, markIntervals, withIntervals, withCustomMarks, withTooltips} = this.state;

    return (
      <FlexBox alignItems={ItemAlign.CENTER} className={cssClass.CONFIG_CONTAINER} wrap>
        <label className={cssClass.CONFIG}>
          <input
            type="checkbox"
            checked={disabled}
            className={cssClass.CONFIG_TOGGLE}
            onChange={this._handleDisabledChange}
          />{" "}
          Disabled
        </label>
        <label className={cssClass.CONFIG}>
          <input
            type="checkbox"
            checked={withTooltips}
            className={cssClass.CONFIG_TOGGLE}
            onChange={this._handleTooltipChange}
          />{" "}
          Show tooltips
        </label>
        <label className={cssClass.CONFIG}>
          <input
            type="checkbox"
            checked={withCustomMarks}
            className={cssClass.CONFIG_TOGGLE}
            onChange={this._handleMarksChange}
          />{" "}
          Show custom marks
        </label>
        <label className={cssClass.CONFIG}>
          <input
            type="checkbox"
            checked={withIntervals}
            className={cssClass.CONFIG_TOGGLE}
            onChange={this._handleIntervalsChange}
          />{" "}
          Explicit intervals
        </label>
        {withIntervals && (
          <label className={cssClass.CONFIG}>
            <input
              disabled={!withIntervals}
              type="checkbox"
              checked={markIntervals}
              className={cssClass.CONFIG_TOGGLE}
              onChange={this._handleIntervalMarksChange}
            />{" "}
            Mark intervals
          </label>
        )}
      </FlexBox>
    );
  }

  _handleChange = value => this.setState({value});
  _handleDisabledChange = e => this.setState({disabled: e.target.checked});
  _handleIntervalsChange = e => this.setState({
    withIntervals: e.target.checked,
    markIntervals: e.target.checked,
  });
  _handleIntervalMarksChange = e => this.setState({markIntervals: e.target.checked});
  _handleMarksChange = e => this.setState({withCustomMarks: e.target.checked});
  _handleTooltipChange = e => this.setState({withTooltips: e.target.checked});
}

function formatPercentage(value) {
  return `${value}%`;
}

const MIN_DATE = new Date("July 06, 1991, 14:00");
const MAX_DATE = new Date("July 08, 1991, 16:00");
const DAY_BOUNDARIES = getDayBoundaries(MIN_DATE, MAX_DATE);

class MultiSliderDemo extends React.PureComponent {
  state = {
    dateEnd: +moment(MAX_DATE).subtract(11, "hours"),
    dateStart: +moment(MIN_DATE).add(4, "hours"),
    disabled: false,
    max: +MAX_DATE,
    min: +MIN_DATE,
    markIntervals: false,
    withIntervals: false,
    withCustomMarks: true,
    withTooltips: true,
  };

  render() {
    const {
      dateEnd,
      dateStart,
      disabled,
      markIntervals,
      max,
      min,
      withIntervals,
      withCustomMarks,
      withTooltips,
    } = this.state;

    return (
      <Example title="Multi-Value Slider:">
        <div className={cssClass.DISPLAY_VALUE}>
          {formatDateTime(dateStart)} &mdash; {formatDateTime(dateEnd)}
        </div>
        <ExampleCode>
          <Slider
            className="my--custom--class"
            disabled={disabled}
            intervalSize={withIntervals ? moment.duration(2, "hours").asMilliseconds() : null}
            markIntervals={markIntervals}
            marks={withCustomMarks ? {
              [+MIN_DATE]: formatTime(MIN_DATE),
              ...DAY_BOUNDARIES,
              [+MAX_DATE]: formatTime(MAX_DATE),
            } : null}
            max={max}
            min={min}
            onChange={this._handleChange}
            tooltipFn={withTooltips ? d => formatDateTime(d) : null}
            value={[dateStart, dateEnd]}
          />
        </ExampleCode>
        {this._renderConfig()}
      </Example>
    );
  }

  _renderConfig() {
    const {disabled, markIntervals, withIntervals, withCustomMarks, withTooltips} = this.state;

    return (
      <FlexBox alignItems={ItemAlign.CENTER} className={cssClass.CONFIG_CONTAINER} wrap>
        <label className={cssClass.CONFIG}>
          <input
            type="checkbox"
            checked={disabled}
            className={cssClass.CONFIG_TOGGLE}
            onChange={this._handleDisabledChange}
          />{" "}
          Disabled
        </label>
        <label className={cssClass.CONFIG}>
          <input
            type="checkbox"
            checked={withTooltips}
            className={cssClass.CONFIG_TOGGLE}
            onChange={this._handleTooltipChange}
          />{" "}
          Show tooltips
        </label>
        <label className={cssClass.CONFIG}>
          <input
            type="checkbox"
            checked={withCustomMarks}
            className={cssClass.CONFIG_TOGGLE}
            onChange={this._handleMarksChange}
          />{" "}
          Show custom marks
        </label>
        <label className={cssClass.CONFIG}>
          <input
            type="checkbox"
            checked={withIntervals}
            className={cssClass.CONFIG_TOGGLE}
            onChange={this._handleIntervalsChange}
          />{" "}
          Explicit intervals
        </label>
        {withIntervals && (
          <label className={cssClass.CONFIG}>
            <input
              disabled={!withIntervals}
              type="checkbox"
              checked={markIntervals}
              className={cssClass.CONFIG_TOGGLE}
              onChange={this._handleIntervalMarksChange}
            />{" "}
            Mark intervals
          </label>
        )}
      </FlexBox>
    );
  }

  _handleChange = ([dateStart, dateEnd]) => this.setState({dateStart, dateEnd});
  _handleDisabledChange = e => this.setState({disabled: e.target.checked});
  _handleIntervalsChange = e => this.setState({
    withIntervals: e.target.checked,
    markIntervals: e.target.checked,
  });
  _handleIntervalMarksChange = e => this.setState({markIntervals: e.target.checked});
  _handleMarksChange = e => this.setState({withCustomMarks: e.target.checked});
  _handleTooltipChange = e => this.setState({withTooltips: e.target.checked});
}

function formatDate(date) {
  return moment(date).format("MMM DD");
}

function formatTime(date) {
  return moment(date).format("LT");
}

function formatDateTime(date) {
  return `${formatDate(date)}, ${formatTime(date)}`;
}

function getDayBoundaries(minDate, maxDate) {
  const boundaries = {};

  const nextDate = moment(minDate).startOf("day");
  while (nextDate.isBefore(maxDate)) {
    if (nextDate.isAfter(minDate)) {
      boundaries[+nextDate] = formatDate(nextDate);
    }
    nextDate.add(1, "day");
  }

  return boundaries;
}
