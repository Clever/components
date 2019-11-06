import _ from "lodash";
import React, { Component } from "react";

import Example, { ExampleCode } from "./Example";
import PropDocumentation from "./PropDocumentation";
import View from "./View";
import { FormElementSize, SegmentedControl, Select, TextInput } from "src";

import "./SelectView.less";

export default class SelectView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      clearable: false,
      disabled: false,
      multi: false,
      readOnly: false,
      searchable: false,
      creatable: false,
      lazy: false,
      selectValue: null,
      required: false,
      error: "",
      size: FormElementSize.MEDIUM,
    };
  }

  onSelectChange(attribute, value) {
    this.setState({ [attribute]: value });
  }

  render() {
    const { cssClass } = SelectView;

    return (
      <View className={cssClass.CONTAINER} title="Select" sourcePath="src/Select/Select.tsx">
        <p>
          This component replaces the <code>select</code> input and allows users to select options
          from a list.
        </p>

        <Example>
          <div>
            <ExampleCode>
              <Select
                id="select"
                className={cssClass.INPUT}
                label="Select Label"
                disabled={this.state.disabled}
                clearable={this.state.clearable}
                searchable={this.state.searchable}
                creatable={this.state.creatable}
                lazy={this.state.lazy}
                creatablePromptFn={label => `Add new option: ${label}`}
                multi={this.state.multi}
                readOnly={this.state.readOnly}
                required={this.state.required}
                error={this.state.error}
                name="select"
                onChange={value => this.setState({ selectValue: value })}
                options={
                  !this.state.lazy &&
                  _.range(100).map(i => ({ label: `Option ${i + 1}`, value: `${i + 1}` }))
                }
                loadOptions={
                  this.state.lazy
                    ? async input => {
                        await new Promise(resolve => setTimeout(resolve, 1000));
                        const allOptions = _.range(100).map(i => ({
                          label: `Option ${i + 1}`,
                          value: `${i + 1}`,
                        }));
                        const options = allOptions.filter(x =>
                          x.label.toLowerCase().startsWith(input.toLowerCase()),
                        );
                        return { options };
                      }
                    : null
                }
                placeholder="Select Placeholder"
                value={this.state.selectValue}
                size={this.state.size}
              />
            </ExampleCode>
          </div>
          <label className={cssClass.CONFIG}>
            <input
              type="checkbox"
              checked={this.state.disabled}
              onChange={({ target }) => this.setState({ disabled: target.checked })}
            />{" "}
            Disabled
          </label>
          <label className={cssClass.CONFIG}>
            <input
              type="checkbox"
              checked={this.state.clearable}
              onChange={({ target }) => this.setState({ clearable: target.checked })}
            />{" "}
            Clearable
          </label>
          <label className={cssClass.CONFIG}>
            <input
              type="checkbox"
              checked={this.state.searchable}
              onChange={({ target }) => this.setState({ searchable: target.checked })}
            />{" "}
            Searchable
          </label>
          <label className={cssClass.CONFIG}>
            <input
              type="checkbox"
              checked={this.state.creatable}
              onChange={({ target }) => this.setState({ creatable: target.checked })}
            />{" "}
            Creatable
          </label>
          <label className={cssClass.CONFIG}>
            <input
              type="checkbox"
              checked={this.state.lazy}
              onChange={({ target }) => this.setState({ lazy: target.checked })}
            />{" "}
            Lazy
          </label>
          <label className={cssClass.CONFIG}>
            <input
              type="checkbox"
              checked={this.state.multi}
              onChange={({ target }) => {
                const multi = target.checked;
                let selectValue = this.state.selectValue;

                if (!multi && Array.isArray(selectValue)) {
                  selectValue = selectValue[0];
                }

                this.setState({ multi, selectValue });
              }}
            />{" "}
            Multi
          </label>
          <label className={cssClass.CONFIG}>
            <input
              type="checkbox"
              checked={this.state.readOnly}
              onChange={({ target }) => this.setState({ readOnly: target.checked })}
            />{" "}
            Read Only
          </label>
          <label className={cssClass.CONFIG}>
            <input
              type="checkbox"
              checked={this.state.required}
              onChange={({ target }) => this.setState({ required: target.checked })}
            />{" "}
            Required
          </label>
          <div className={cssClass.CONFIG}>
            <TextInput
              className={cssClass.CONFIG}
              label="Error"
              name="InputError"
              onChange={e => this.setState({ error: e.target.value })}
              value={this.state.error}
            />
          </div>
          <div className={cssClass.CONFIG}>
            Size:
            <SegmentedControl
              className={cssClass.CONFIG_OPTIONS}
              options={[
                { content: "small", value: FormElementSize.SMALL },
                { content: "medium", value: FormElementSize.MEDIUM },
                { content: "large", value: FormElementSize.LARGE },
                { content: "full-width", value: FormElementSize.FULL_WIDTH },
              ]}
              value={this.state.size}
              onSelect={value => this.setState({ size: value })}
            />
          </div>
        </Example>

        <PropDocumentation
          availableProps={[
            {
              name: "id",
              type: "String",
              description: "ID for the select element to be used by the label, must be unique",
            },
            {
              name: "name",
              type: "String",
              description: "Name for the select element",
            },
            {
              name: "className",
              type: "String",
              description: "Additional classname to apply to the select element",
              optional: true,
            },
            {
              name: "clearable",
              type: "Boolean",
              description: "Whether the selected value can be cleared",
              defaultValue: "False",
              optional: true,
            },
            {
              name: "creatable",
              type: "Boolean",
              description:
                "Whether to allow users to create custom new options. Only works when searchable enabled.",
              defaultValue: "False",
              optional: true,
            },
            {
              name: "creatablePromptFn",
              type: "Function",
              description:
                "If creatable is true, creatablePromptFn can be passed in to customize the prompt shown for creating a new option. The function should take the string entered by the user and returns a string to use as the prompt.",
              defaultValue: '(label) => `Create option "${label}"`',
              optional: true,
            },
            {
              name: "disabled",
              type: "Boolean",
              description: "Whether the select is disabled",
              defaultValue: "False",
              optional: true,
            },
            {
              name: "error",
              type: "String",
              description:
                "Error to show the user, hides the required label. Useful if using a 'creatable' select.",
              defaultValue: "",
              optional: true,
            },
            {
              name: "isLoading",
              type: "Boolean",
              description: "Whether to force displaying the loading spinner. Shouldn't be used and has no effect when 'lazy' is enabled since it handles loading on its own.",
              defaultValue: "False",
              optional: true,
            },
            {
              name: "filterOptions",
              type: "Function",
              description:
                "Function to filter options when searching - see react-select docs for more. " +
                "Signature: function(Array options, String filter, Array currentValues) returns Array",
              defaultValue: "a simple search function included in react-select",
              optional: true,
            },
            {
              name: "label",
              type: "String",
              description: "Label for the select element",
              optional: true,
            },
            {
              name: "multi",
              type: "Boolean",
              description: "Whether multiple options may be selected",
              defaultValue: "False",
              optional: true,
            },
            {
              name: "onFocus",
              type: "() => void",
              description: "Called when the component is focused",
              optional: true,
            },
            {
              name: "onChange",
              type: "Function",
              description: "Called with new value when it changes",
              optional: true,
            },
            {
              name: "optionRenderer",
              type: "Function",
              description:
                "A function that returns a custom display node for a specific select option. " +
                "Invoked with a single option as specified in options as the first argument and the index " +
                "of the option as the second",
              optional: true,
            },
            {
              name: "options",
              type: "{label: string; value: string}[]",
              description:
                "Possible options, must contain objects with label and value attributes. Must not be set if `lazy`.",
              optional: true,
            },
            {
              name: "lazy",
              type: "boolean",
              description:
                "Set to true to fetch options asynchronously using the `loadOptions` function.",
              defaultValue: "false",
              optional: true,
            },
            {
              name: "loadOptions",
              type:
                "(input: string) => Promise<{options: {label: string; value: string}[], complete: boolean}>",
              description:
                "Function to load options for a given search input. " +
                "Required if `lazy`. When the component is mounted, this function " +
                "will be called with the empty string as input to seed the default " +
                "set of options. Results are cached. If you set `complete` to `true` " +
                "in the return value to indicate that the set of options is the complete " +
                "set for that query, then more specific queries will not incur new " +
                "(unnecessary) calls to `loadOptions`.",
              optional: true,
            },
            {
              name: "placeholder",
              type: "String",
              description: "Placeholder text for the select element",
              optional: true,
            },
            {
              name: "searchable",
              type: "Boolean",
              description: "Whether or not the values in the dropdown are searchable",
              defaultValue: "False",
              optional: true,
            },
            {
              name: "noResultsText",
              type: "node",
              description: "Text to display when there are no results found in search",
              defaultValue: "'No results found'",
              optional: true,
            },
            {
              name: "value",
              type: "{label: string; value: string}",
              description: "Selected option. Must be updated by caller in the onChange",
              optional: true,
            },
            {
              name: "size",
              type: "string",
              description: (
                <p>
                  The size of the input. One of:
                  <br />
                  {Object.keys(FormElementSize).map(size => (
                    <span key={size}>
                      <code>FormElementSize.{size}</code>
                      <br />
                    </span>
                  ))}
                </p>
              ),
              optional: true,
              defaultValue: <code>FormElementSize.FULL_WIDTH</code>,
            },
          ]}
          className={cssClass.PROPS}
          title="Select"
        />
      </View>
    );
  }
}

SelectView.cssClass = {
  CONTAINER: "SelectView",
  INPUT: "SelectView--input",
  CONFIG: "SelectView--config",
  CONFIG_OPTIONS: "SelectView--configOptions",
};
