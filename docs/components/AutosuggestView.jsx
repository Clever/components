import * as React from "react";

import Example, { CodeSample, ExampleCode } from "./Example";
import PropDocumentation from "./PropDocumentation";
import View from "./View";
import { Autosuggest, Checkbox, FlexBox, FormElementSize, ItemAlign, SegmentedControl, TextInput } from "src";

import { suggestionsList } from "./AutosuggestData";
import "./AutosuggestView.less";

const cssClass = {
  CONFIG_CONTAINER: "AutosuggestView--configContainer",
  CONFIG_OPTIONS: "AutosuggestView--configOptions",
  CONFIG: "AutosuggestView--config",
  CONFIG_TOGGLE: "AutosuggestView--configToggle",
  CONTAINER: "AutosuggestView",
  INTRO: "AutosuggestView--intro",
  PROPS: "AutosuggestView--props",
};

const getSuggestions = value => {
  const inputValue = value.trim().toLowerCase();
  const inputLength = inputValue.length;

  return inputLength === 0 ? [] : suggestionsList.filter(lang =>
    lang.label.toLowerCase().slice(0, inputLength) === inputValue
  );
};

export default class AutosuggestView extends React.PureComponent {
  static cssClass = cssClass;

  state = {
    size: "medium",
    optionToggle2: true,
    placeholder: "Type to search...",
    value: "",
    highlightFirstSuggestion: true,
  };

  render() {
    const { highlightFirstSuggestion, placeholder, size, value } = this.state;

    return (
      <View
        className={cssClass.CONTAINER}
        title="Autosuggest"
        sourcePath="src/Autosuggest/Autosuggest.tsx"
      >
        <header className={cssClass.INTRO}>
          <p>This is a component that provides suggestions as a user types.</p>
          <p>
            It wraps another component, also called{" "}
            <a
              href="https://github.com/moroshko/react-autosuggest"
              target="_blank"
            >Autosuggest</a>
            , which was made with accessibility in mind. For that reason, this component is fully
            accessible and can be used in the student experience.
          </p>
          <CodeSample>
            {`
              import {Autosuggest} from "clever-components";
              // OR
              import Autosuggest from "clever-components/dist/Autosuggest"; // Avoids importing all of clever-components.
            `}
          </CodeSample>
        </header>

        <Example title="Basic Usage:">
          <ExampleCode>
            <Autosuggest
              highlightFirstSuggestion={highlightFirstSuggestion}
              onChange={(event, { newValue }) => this.setState({ value: newValue })}
              onSuggestionsFetchRequested={async (value) => getSuggestions(value)}
              onSuggestionSelected={(event, { suggestion }) => console.log(suggestion)}
              placeholder={placeholder}
              size={size}
              value={value}
            />
          </ExampleCode>
          {this._renderConfig()}
        </Example>

        {this._renderProps()}
      </View>
    );
  }

  _renderConfig() {
    const { size, highlightFirstSuggestion, placeholder } = this.state;

    return (
      <FlexBox alignItems={ItemAlign.CENTER} className={cssClass.CONFIG_CONTAINER} wrap>
        <div className={cssClass.CONFIG}>
          Size:
          <SegmentedControl
            className={cssClass.CONFIG_OPTIONS}
            onSelect={value => this.setState({ size: value })}
            options={[
              { content: "Small", value: FormElementSize.SMALL },
              { content: "Medium", value: FormElementSize.MEDIUM },
              { content: "Large", value: FormElementSize.LARGE },
            ]}
            value={size}
          />
        </div>
        <label className={cssClass.CONFIG}>
          <Checkbox
            checked={highlightFirstSuggestion}
            onChange={newState =>
              this.setState({ highlightFirstSuggestion: newState.checked })
            }
          >
            Highlight first suggestion
          </Checkbox>
        </label>
        <label className={cssClass.CONFIG}>
          <TextInput
            label="Placeholder"
            name="placeholder"
            placeholder="Placeholder text"
            placeholderCaps={false}
            onChange={e => this.setState({ placeholder: e.target.value })}
            value={placeholder}
            size={FormElementSize.SMALL}
          />
        </label>
      </FlexBox>
    );
  }

  _renderProps() {
    return (
      <PropDocumentation
        title="<Autosuggest /> Props"
        availableProps={[
          {
            name: "className",
            type: "string",
            description: "Optional additional CSS class name to apply to the container",
            optional: true,
          },
          {
            name: "highlightFirstSuggestion",
            type: "boolean",
            description: "Whether to highlight the first suggestion automatically",
            defaultValue: "true",
            optional: true,
          },
          {
            name: "id",
            type: "string",
            description: "The id passed to ReactAutosuggest",
            optional: true,
          },
          {
            name: "onChange",
            type: "Function",
            description: "Called when value of input changes",
          },
          {
            name: "onSuggestionSelected",
            type: "Function",
            description: "Called when a suggestion is selected",
            optional: true,
          },
          {
            name: "onSuggestionsFetchRequested",
            type: "Function",
            description: "Called when the suggestions list should be recomputed",
          },
          {
            name: "placeholder",
            type: "string",
            description: "Placeholder text of the input",
            optional: true,
          },
          {
            name: "renderSuggestion",
            type: "Function",
            description: "Allows customizing appearance of each suggestion",
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
            defaultValue: <code>FormElementSize.MEDIUM</code>,
          },
          {
            name: "value",
            type: "string",
            description: "Value of input",
          },
        ]}
        className={cssClass.PROPS}
      />
    );
  }
}
