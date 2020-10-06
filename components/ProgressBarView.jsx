import classnames from "classnames";
import * as React from "react";

import Example, { CodeSample, ExampleCode } from "./Example";
import PropDocumentation from "./PropDocumentation";
import View from "./View";
import { FlexBox, ItemAlign, ProgressBar, SegmentedControl, Select, TextInput } from "src";

import "./ProgressBarView.less";

const cssClass = {
  PROGRESS_BAR: "ProgressBarView--progressBar",
  CONFIG_CONTAINER: "ProgressBarView--configContainer",
  CONFIG: "ProgressBarView--config",
  CONFIG_OPTIONS: "ProgressBarView--configOptions",
  DROPDOWN_COLOR: "ProgressBarView--dropdown--color",
  DROPDOWN_SIZE: "ProgressBarView--dropdown--size",
  DROPDOWN_LABEL: "ProgressBarView--dropdown--showLabel",
  INTRO: "ProgressBarView--intro",
};

const Color = {
  BLUE: "blue",
  GREEN: "green",
  PURPLE: "purple",
  TEAL: "teal",
  CHANGING: "changing",
};

const ShowLabel = {
  NONE: "none",
  TOP_LEFT: "top-left",
  TOP_MIDDLE: "top-middle",
  TOP_RIGHT: "top-right",
  BOTTOM_LEFT: "bottom-left",
  BOTTOM_MIDDLE: "bottom-middle",
  BOTTOM_RIGHT: "bottom-right",
};

export default class ProgressBarView extends React.PureComponent {
  static cssClass = cssClass;

  state = {
    color: "blue",
    fill: 50,
    size: "medium",
    width: 100,
    showLabel: "top-left",
    labelType: "percentage",
    label: "",
    striped: false,
    inactive: false,
    markNumbers: "25,50,75",
  };

  render() {
    const {
      color,
      fill,
      size,
      width,
      striped,
      inactive,
      showLabel,
      label,
      labelType,
      markNumbers,
    } = this.state;

    return (
      <View
        className={cssClass.CONTAINER}
        title="ProgressBar"
        sourcePath="src/ProgressBar/ProgressBar.tsx"
      >
        <header className={cssClass.INTRO}>
          <p>This is a progress bar.</p>
          <CodeSample>
            {`
              import {ProgressBar} from "clever-components";
              // OR
              import ProgressBar from "clever-components/dist/ProgressBar"; // Avoids importing all of clever-components.
            `}
          </CodeSample>
        </header>

        <Example title="Basic Usage">
          <ExampleCode>
            <ProgressBar
              className="my--custom--class"
              color={color}
              fill={fill}
              size={size}
              width={width}
              striped={striped}
              inactive={inactive}
              showLabel={showLabel}
              labelType={labelType}
              label={label}
              markNumbers={markNumbers.split(",").map(Number)}
              // markNumbers stored as string on this page for testing config so needs conversion
            />
          </ExampleCode>
          {this._renderConfig()}
        </Example>

        <PropDocumentation
          availableProps={[
            {
              name: "className",
              type: "String",
              description: "Any additional classes to add to ProgressBar.",
              optional: true,
            },
            {
              name: "color",
              type: "String",
              description: "The color of the fill. Any of blue, green, purple, teal, or changing.",
              defaultValue: "blue",
              optional: true,
            },
            {
              name: "width",
              type: "Number",
              description:
                "Width of the progres bar in percentage. There is a minimum allowed width (in px) for each size.",
              defaultValue: "100",
              optional: true,
            },
            {
              name: "fill",
              type: "Number",
              description: "How much of the progress bar should be filled in percentage.",
              defaultValue: "0",
              optional: true,
            },
            {
              name: "size",
              type: "String",
              description:
                "The size (thickness) of the progress bar. Any of thin, medium, or thick.",
              defaultValue: "medium",
              optional: true,
            },
            {
              name: "style",
              type: "Object",
              description: "Add custom styles (e.g. margin) if you must.",
              optional: true,
            },
            {
              name: "striped",
              type: "Boolean",
              description: "Whether the fill color should have a striped effect.",
              defaultValue: "false",
              optional: true,
            },
            {
              name: "inactive",
              type: "Object",
              description: "Whether the progress bar should be rendered as inactive.",
              defaultValue: "false",
              optional: true,
            },
            {
              name: "showLabel",
              type: "Object",
              description:
                "Whether to add a label to the progress bar. Any of top-left, top-middle, top-right, bottom-left, bottom-middle, bottom-right.",
              optional: true,
            },
            {
              name: "labelType",
              type: "Object",
              description:
                "The label type to show. Only applicable if showLabel is set. A value of `percentage` will render the percentage. Any other value will be shown as is.",
              defaultValue: "percentage",
              optional: true,
            },
            {
              name: "label",
              type: "String",
              description: "The label type to show. Only applicable if showLabel is set.",
              defaultValue: "",
              optional: true,
            },
            {
              name: "markNumbers",
              type: "Array<number>",
              description:
                "Places a mark at each number in the progress bar. Numbers should be in increasing order and between 0 and 100",
              defaultValue: "[]",
              optional: true,
            },
          ]}
          className={cssClass.PROPS}
          title="ProgressBar"
        />
      </View>
    );
  }

  _renderConfig() {
    const {
      color,
      fill,
      size,
      width,
      striped,
      inactive,
      showLabel,
      label,
      labelType,
      markNumbers,
    } = this.state;

    return (
      <FlexBox alignItems={ItemAlign.CENTER} className={cssClass.CONFIG_CONTAINER} wrap>
        <div className={cssClass.CONFIG}>
          <Select
            className={classnames(cssClass.CONFIG_OPTIONS, cssClass.DROPDOWN_COLOR)}
            id={cssClass.DROPDOWN_COLOR}
            label="Color"
            name={cssClass.DROPDOWN_COLOR}
            onChange={({ value }) => this.setState({ color: value })}
            options={Object.keys(Color).map((key) => ({
              label: key,
              value: Color[key],
            }))}
            value={color}
          />
        </div>
        <div className={cssClass.CONFIG}>
          Size:
          <SegmentedControl
            className={cssClass.CONFIG_OPTIONS}
            onSelect={(value) => this.setState({ size: value })}
            options={[
              { content: "Thin", value: "thin" },
              { content: "Medium", value: "medium" },
              { content: "Thick", value: "thick" },
            ]}
            value={size}
          />
        </div>
        <div className={cssClass.CONFIG}>
          Fill:{" "}
          <input
            className={cssClass.CONFIG_OPTIONS}
            type="number"
            max={100}
            min={0}
            step={1}
            value={fill}
            onChange={({ target }) => this.setState({ fill: parseFloat(target.value) })}
          />
        </div>
        <div className={cssClass.CONFIG}>
          Width:{" "}
          <input
            className={cssClass.CONFIG_OPTIONS}
            type="number"
            max={100}
            min={0}
            step={1}
            value={width}
            onChange={({ target }) => this.setState({ width: parseFloat(target.value) })}
          />
        </div>
        <div className={cssClass.CONFIG}>
          <Select
            className={classnames(cssClass.CONFIG_OPTIONS, cssClass.DROPDOWN_LABEL)}
            id={cssClass.DROPDOWN_LABEL}
            label="Label"
            name={cssClass.DROPDOWN_LABEL}
            onChange={({ value }) => this.setState({ showLabel: value })}
            options={Object.keys(ShowLabel).map((key) => ({
              label: key,
              value: ShowLabel[key],
            }))}
            value={showLabel}
          />
        </div>
        <div className={cssClass.CONFIG}>
          <TextInput
            className={cssClass.CONFIG_OPTIONS}
            onChange={(e) => this.setState({ labelType: e.target.value })}
            label="Label Type"
            name="ProgressBarView--label--type"
            placeholder="Label Type"
            value={labelType}
          />
        </div>
        <div className={cssClass.CONFIG}>
          <TextInput
            className={cssClass.CONFIG_OPTIONS}
            label="label"
            name="label"
            value={label}
            onChange={({ target }) => this.setState({ label: target.value })}
          />
        </div>
        <label className={cssClass.CONFIG}>
          <input
            type="checkbox"
            checked={striped}
            className={cssClass.CONFIG_TOGGLE}
            onChange={(e) => this.setState({ striped: e.target.checked })}
          />{" "}
          Striped
        </label>
        <label className={cssClass.CONFIG}>
          <input
            type="checkbox"
            checked={inactive}
            className={cssClass.CONFIG_TOGGLE}
            onChange={(e) => this.setState({ inactive: e.target.checked })}
          />{" "}
          Inactive
        </label>
        <div className={cssClass.CONFIG}>
          <TextInput
            className={cssClass.CONFIG_OPTIONS}
            label="markNumbers"
            name="markNumbers"
            value={markNumbers}
            onChange={(e) => this.setState({ markNumbers: e.target.value })}
          />
        </div>
      </FlexBox>
    );
  }
}

ProgressBarView.cssClass = {
  CONTAINER: "ProgressBarView",
  PROGRESS_CONTROL: "ProgressBarView--progressControl",
  PROGRESS_INPUT: "ProgressBarView--progressInput",
};
