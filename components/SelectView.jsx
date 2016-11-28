import _ from "lodash";
import React, {Component} from "react";

import Example from "./Example";
import View from "./View";
import {Select} from "src";

import "./SelectView.less";


export default class SelectView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      clearable: false,
      disabled: false,
      multi: false,
      searchable: false,
      selectValue: null,
    };
  }

  onSelectChange(attribute, value) {
    this.setState({[attribute]: value});
  }

  render() {
    const {cssClass} = SelectView;

    return (
      <View className={cssClass.CONTAINER} title="Select">
        <Example
          code={`
            <Select
              id="select"
              label="Select Label"
              disabled={this.state.disabled}
              clearable={this.state.clearable}
              searchable={this.state.searchable}
              multi={this.state.multi}
              name="select"
              onChange={value => this.setState({selectValue: value})}
              options={_.range(100).map(i => ({label: \`Option \${i + 1}\`, value: \`\${i + 1}\`}))}
              placeholder="Select Placeholder"
              value={this.state.selectValue}
            />
          `}
        >
          <div className={cssClass.INPUT_CONTAINER}>
            <Select
              id="select"
              label="Select Label"
              disabled={this.state.disabled}
              clearable={this.state.clearable}
              searchable={this.state.searchable}
              multi={this.state.multi}
              name="select"
              onChange={value => this.setState({selectValue: value})}
              options={_.range(100).map(i => ({label: `Option ${i + 1}`, value: `${i + 1}`}))}
              placeholder="Select Placeholder"
              value={this.state.selectValue}
            />
          </div>
          <label className={cssClass.CONFIG}>
            <input
              type="checkbox"
              checked={this.state.disabled}
              onChange={({target}) => this.setState({disabled: target.checked})}
            />
            {" "}
            Disabled
          </label>
          <label className={cssClass.CONFIG}>
            <input
              type="checkbox"
              checked={this.state.clearable}
              onChange={({target}) => this.setState({clearable: target.checked})}
            />
            {" "}
            Clearable
          </label>
          <label className={cssClass.CONFIG}>
            <input
              type="checkbox"
              checked={this.state.searchable}
              onChange={({target}) => this.setState({searchable: target.checked})}
            />
            {" "}
            Searchable
          </label>
          <label className={cssClass.CONFIG}>
            <input
              type="checkbox"
              checked={this.state.multi}
              onChange={({target}) => {
                const multi = target.checked;
                let selectValue = this.state.selectValue;

                if (!multi && Array.isArray(selectValue)) {
                  selectValue = selectValue[0];
                }

                this.setState({multi, selectValue});
              }}
            />
            {" "}
            Multi
          </label>
        </Example>
      </View>
    );
  }
}

SelectView.cssClass = {
  CONFIG: "SelectView--config",
  CONTAINER: "SelectView",
  INPUT_CONTAINER: "SelectView--inputContainer",
};
