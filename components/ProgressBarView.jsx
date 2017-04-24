import React, {Component} from "react";

import Example from "./Example";
import PropDocumentation from "./PropDocumentation";
import View from "./View";
import {ProgressBar} from "src";

import "./ProgressBarView.less";


export default class ProgressBarView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      progress: 0.5,
    };
  }

  render() {
    const {cssClass} = ProgressBarView;

    return (
      <View className={cssClass.CONTAINER} title="ProgressBar">
        <h3 className={cssClass.PROGRESS_CONTROL}>
          <label>
            Percentage:
            {" "}
            <input
              className={cssClass.PROGRESS_INPUT}
              type="number"
              max={1}
              min={0}
              step={0.1}
              value={this.state.progress}
              onChange={({target}) => this.setState({progress: parseFloat(target.value)})}
            />
          </label>
        </h3>
        <Example title="Horizontal">
          <ProgressBar percentage={this.state.progress} length="500px" />
          <ProgressBar percentage={this.state.progress} direction="left" length="500px" />
        </Example>
        <Example title="Vertical">
          <ProgressBar percentage={this.state.progress} direction="down" length="200px" />
          <ProgressBar percentage={this.state.progress} direction="up" length="200px" />
        </Example>

        <PropDocumentation
          availableProps={[
            {
              name: "className",
              type: "String",
              description: "Any additional classes to add to ProgressBar",
              optional: true,
            },
            {
              name: "direction",
              type: "String",
              description: "The direction the bar should fill up. Any of up, down, left, or right",
              defaultValue: "right",
              optional: true,
            },
            {
              name: "length",
              type: "String",
              description: "CSS size string for how long the progress bar should be. Non-percentage for vertical bars.",
              defaultValue: "100%",
              optional: true,
            },
            {
              name: "percentage",
              type: "Number",
              description: "How much of the progress bar should be filled in",
              optional: true,
            },
            {
              name: "style",
              type: "Object",
              description: "Add custom styles (e.g. margin) if you must",
              optional: true,
            },
          ]}
          className={cssClass.PROPS}
          title="ProgressBar"
        />
      </View>
    );
  }
}

ProgressBarView.cssClass = {
  CONTAINER: "ProgressBarView",
  PROGRESS_CONTROL: "ProgressBarView--progressControl",
  PROGRESS_INPUT: "ProgressBarView--progressInput",
};
