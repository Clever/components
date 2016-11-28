import React, {Component} from "react";

import Example from "./Example";
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
        <Example
          title="Horizontal"
          code={`
            <ProgressBar percentage={this.state.progress} length="500px" />
            <ProgressBar percentage={this.state.progress} direction="left" length="500px" />
          `}
        >
          <ProgressBar percentage={this.state.progress} length="500px" />
          <ProgressBar percentage={this.state.progress} direction="left" length="500px" />
        </Example>
        <Example
          title="Vertical"
          code={`
            <ProgressBar percentage={this.state.progress} direction="down" length="200px" />
            <ProgressBar percentage={this.state.progress} direction="up" length="200px" />
          `}
        >
          <ProgressBar percentage={this.state.progress} direction="down" length="200px" />
          <ProgressBar percentage={this.state.progress} direction="up" length="200px" />
        </Example>
      </View>
    );
  }
}

ProgressBarView.cssClass = {
  CONTAINER: "ProgressBarView",
  PROGRESS_CONTROL: "ProgressBarView--progressControl",
  PROGRESS_INPUT: "ProgressBarView--progressInput",
};
