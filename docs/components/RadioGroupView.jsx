import * as React from "react";

import Example, { CodeSample, ExampleCode } from "./Example";
import PropDocumentation from "./PropDocumentation";
import View from "./View";
import { RadioGroup, FlexBox, ItemAlign } from "src";

import "./RadioGroupView.less";

const cssClass = {
  CONFIG_CONTAINER: "RadioGroupView--configContainer",
  CONFIG_OPTIONS: "RadioGroupView--configOptions",
  CONFIG: "RadioGroupView--config",
  CONFIG_TOGGLE: "RadioGroupView--configToggle",
  CONTAINER: "RadioGroupView",
  INTRO: "RadioGroupView--intro",
  PROPS: "RadioGroupView--props",
};

const OPTION_TYPE = `{
  id: string,
  disabled?: boolean,
  label: string,
  lang?: string,
  value?: any,
}`;

export default class RadioGroupView extends React.PureComponent {
  static cssClass = cssClass;

  state = {
    disableAll: false,
    selectedCity: null,
    selectedEmoji: null,
    selectedFood: null,
    showError: false,
    requireSelection: false,
  };

  render() {
    const {
      disableAll,
      requireSelection,
      selectedCity,
      selectedEmoji,
      selectedFood,
      showError,
    } = this.state;

    return (
      <View
        className={cssClass.CONTAINER}
        title="RadioGroup"
        sourcePath="src/RadioGroup/RadioGroup.tsx"
      >
        <header className={cssClass.INTRO}>
          <p>
            This is a form element that allows for a single, required selection from a small set of
            2 or more choices.
          </p>
          <p>
            <b>Common use:</b> Use radio buttons when the user must make a single selection from a
            list and when you want to expose all available options. If there are many options,
            consider using the{" "}
            <a href="/#/components/select">
              <code>Select</code>
            </a>{" "}
            component.
          </p>
          <p>
            Follows the roving tabindex convention for tab navigation between a radio group and
            other form components: see{" "}
            <a href="https://www.w3.org/TR/wai-aria-practices-1.1/#radiobutton">
              Radio Group WAI-ARIA Spec
            </a>
            .
          </p>
          <CodeSample>
            {`
              import { RadioGroup } from "clever-components";
              // OR
              import RadioGroup from "clever-components/dist/RadioGroup"; // Avoids importing all of clever-components.
            `}
          </CodeSample>
        </header>

        <Example title="Basic Usage:">
          <p>
            Use the <code>TAB</code> key to move between radio groups and use the arrow keys to move
            within radio groups.
          </p>
          <ExampleCode>
            <RadioGroup
              label="Favourite City"
              onChange={(id) => this.setState({ selectedCity: id })}
              options={[
                { id: "london", label: "London", disabled: disableAll },
                { id: "paris", label: "Paris", disabled: disableAll },
                { id: "sanFrancisco", label: "San Francisco", disabled: disableAll },
                {
                  id: "none",
                  label: "None of the above",
                  disabled: requireSelection || disableAll,
                },
              ]}
              selectedID={selectedCity}
            />

            <RadioGroup
              label="Favourite Food:"
              error={showError ? "You have questionable taste." : undefined}
              onChange={(id) => this.setState({ selectedFood: id })}
              options={[
                { id: "pies", label: "Pies", disabled: disableAll },
                { id: "crepes", label: "Crepes", disabled: disableAll },
                { id: "waffles", label: "Waffles", disabled: disableAll },
                {
                  id: "none",
                  label: "None of the above",
                  disabled: requireSelection || disableAll,
                },
              ]}
              selectedID={selectedFood}
            />

            <h4 id="emoji-selector-label">Favourite Emoji: (label outside of RadioGroup)</h4>
            <RadioGroup
              ariaLabelledBy="emoji-selector-label"
              onChange={(id) => this.setState({ selectedEmoji: id })}
              options={[
                { id: "bear", label: "🐻", disabled: disableAll },
                { id: "sloth", label: "🦥", disabled: disableAll },
                { id: "orangutan", label: "🦧", disabled: disableAll },
                {
                  id: "none",
                  label: "None of the above",
                  disabled: requireSelection || disableAll,
                },
              ]}
              selectedID={selectedEmoji}
            />
          </ExampleCode>
          {this._renderConfig()}
        </Example>

        {this._renderProps()}
      </View>
    );
  }

  _renderConfig() {
    const { disableAll, requireSelection, showError } = this.state;

    return (
      <FlexBox alignItems={ItemAlign.CENTER} className={cssClass.CONFIG_CONTAINER} wrap>
        <label className={cssClass.CONFIG}>
          <input
            type="checkbox"
            checked={requireSelection}
            className={cssClass.CONFIG_TOGGLE}
            onChange={({ target: { checked } }) => this.setState({ requireSelection: checked })}
          />{" "}
          Disable "None" option
        </label>
        <label className={cssClass.CONFIG}>
          <input
            type="checkbox"
            checked={disableAll}
            className={cssClass.CONFIG_TOGGLE}
            onChange={({ target: { checked } }) => this.setState({ disableAll: checked })}
          />{" "}
          Disable All
        </label>
        <label className={cssClass.CONFIG}>
          <input
            type="checkbox"
            checked={showError}
            className={cssClass.CONFIG_TOGGLE}
            onChange={({ target: { checked } }) => this.setState({ showError: checked })}
          />{" "}
          Show Error
        </label>
      </FlexBox>
    );
  }

  _renderProps() {
    return (
      <PropDocumentation
        title="<RadioGroup /> Props"
        availableProps={[
          {
            name: "ariaLabelledBy",
            type: "string",
            description:
              "Optional element ID to use as the aria-labelledby attribute. Use ONLY if the label prop is not used.",
            optional: true,
          },
          {
            name: "className",
            type: "string",
            description: "Optional additional CSS class name to apply to the container.",
            optional: true,
          },
          {
            name: "disabled",
            type: "bool",
            description: "Whether or not to disable all radio buttons in the group.",
            optional: true,
          },
          {
            name: "error",
            type: "React.Node",
            description: <p>Error text to display, if any.</p>,
            optional: true,
          },
          {
            name: "label",
            type: "React.Node",
            description: "Optional title label for the radio group. Recommended for a11y purposes.",
            optional: true,
          },
          {
            name: "onChange",
            type: "Function(radioID, value)",
            description: (
              <p>
                Option change event handler, called with the ID and value (if available) of the
                selected option when it changes.
              </p>
            ),
          },
          {
            name: "options",
            type: (
              <code>
                <pre>{`Array<${OPTION_TYPE}>`}</pre>
              </code>
            ),
            description: (
              <p>
                Array of option items to display in the radio group.
                <br />
                The <code>value</code> field provides the convenience of receiving a custom value in
                the RadioGroup onChange event in addition to the selected ID to avoid having to do a
                value lookup.
              </p>
            ),
          },
          {
            name: "selectedID",
            type: "string",
            description: "ID of the currently selected option, if any.",
            optional: true,
          },
        ]}
        className={cssClass.PROPS}
      />
    );
  }
}
