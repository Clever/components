import * as React from "react";

import Example, { CodeSample, ExampleCode } from "./Example";
import PropDocumentation from "./PropDocumentation";
import View from "./View";
import { CheckboxGroup, FlexBox, ItemAlign } from "src";

import "./CheckboxGroupView.less";

const cssClass = {
  CONFIG_CONTAINER: "CheckboxGroupView--configContainer",
  CONFIG_OPTIONS: "CheckboxGroupView--configOptions",
  CONFIG: "CheckboxGroupView--config",
  CONFIG_TOGGLE: "CheckboxGroupView--configToggle",
  CONTAINER: "CheckboxGroupView",
  INTRO: "CheckboxGroupView--intro",
  PROPS: "CheckboxGroupView--props",
};

const OPTION_TYPE = `{
  id: string,
  checked?: boolean,
  disabled?: boolean,
  label: string,
  value?: any,
}`;

export default class CheckboxGroupView extends React.PureComponent {
  static cssClass = cssClass;

  state = {
    disableAll: false,
    emails: [
      { id: "marketing", label: "Marketing emails", checked: false },
      { id: "sales", label: "Sales emails", checked: false },
      { id: "releases", label: "Product release emails", checked: false },
      { id: "blogs", label: "Blog post emails", checked: false },
    ],
    showTitles: true,
    subjects: [
      { id: "maths", label: "Maths", checked: false },
      { id: "science", label: "Science", checked: false },
      { id: "socialStudies", label: "Social Studies", checked: false },
      { id: "macarena", label: "The Macarena", checked: true },
    ],
  };

  render() {
    const { disableAll, emails, showTitles, subjects } = this.state;
    const noEmailsSelected = emails.every((e) => !e.checked);
    const noSubjectsSelected = subjects.every((e) => !e.checked);

    return (
      <View
        className={cssClass.CONTAINER}
        title="CheckboxGroup"
        sourcePath="src/CheckboxGroup/CheckboxGroup.tsx"
      >
        <header className={cssClass.INTRO}>
          <p>
            The <code>CheckboxGroup</code> component presents a list of related, selectable options
            as{" "}
            <a href="/#/components/checkbox">
              <code>Checkbox</code>
            </a>{" "}
            components with a parent <code>Checkbox</code> that can be used to select/unselect all
            options with a single action.
          </p>
          <p>
            If only part of the set of sub-options is selected, the parent checkbox shows the
            partial select state.
          </p>
          <ul>
            <b>Common uses:</b>
            <li>Use a checkbox for optional opt-in/out form elements.</li>
            <li>
              Use checkboxes when a user may view and select one or multiple inputs within a form
              element.
            </li>
          </ul>
          <CodeSample>
            {`
              import {CheckboxGroup} from "clever-components";
              // OR
              import CheckboxGroup from "clever-components/dist/CheckboxGroup"; // Avoids importing all of clever-components.
            `}
          </CodeSample>
        </header>

        <Example title="Basic Usage:">
          <ExampleCode>
            <CheckboxGroup
              title={showTitles && "What subjects do you teach?"}
              label="I teach all the things"
              disabled={disableAll}
              error={noSubjectsSelected ? "Pick one - always a teacher!" : undefined}
              onChange={(newSubjects) => this.setState({ subjects: newSubjects })}
              options={subjects}
            />

            <CheckboxGroup
              title={showTitles && "Email Preferences"}
              label="Send me all emails"
              disabled={disableAll}
              error={noEmailsSelected ? "Select at least one email type!" : undefined}
              onChange={(newEmails) => this.setState({ emails: newEmails })}
              options={emails}
            />
          </ExampleCode>
          {this._renderConfig()}
        </Example>

        {this._renderProps()}
      </View>
    );
  }

  _renderConfig() {
    const { disableAll, showTitles } = this.state;

    return (
      <FlexBox alignItems={ItemAlign.CENTER} className={cssClass.CONFIG_CONTAINER} wrap>
        <label className={cssClass.CONFIG}>
          <input
            type="checkbox"
            checked={showTitles}
            className={cssClass.CONFIG_TOGGLE}
            onChange={({ target: { checked } }) => this.setState({ showTitles: checked })}
          />{" "}
          With Titles
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
      </FlexBox>
    );
  }

  _renderProps() {
    return (
      <PropDocumentation
        title="<CheckboxGroup /> Props"
        availableProps={[
          {
            name: "className",
            type: "string",
            description: "Optional additional CSS class name to apply to the container.",
            optional: true,
          },
          {
            name: "disabled",
            type: "bool",
            description: "Whether or not to disable all checkboxes in the group.",
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
            description: "Label for the global checkbox.",
          },
          {
            name: "onChange",
            type: (
              <code>
                <pre>{`function(Array<${OPTION_TYPE}>)`}</pre>
              </code>
            ),
            description: (
              <p>
                Option change event handler, called with the original options with their{" "}
                <code>checked</code> fields updated appropriately.
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
                Array of option items to display in the checkbox group.
                <br />
                The <code>value</code> field provides the convenience of receiving a custom value in
                the CheckboxGroup onChange event in addition to the selected ID to avoid having to
                do a value lookup.
              </p>
            ),
          },
          {
            name: "title",
            type: "React.Node",
            description: "Optional title for the checkbox group. Recommended for a11y purposes.",
            optional: true,
          },
        ]}
        className={cssClass.PROPS}
      />
    );
  }
}
