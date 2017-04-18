import React, {PureComponent} from "react";

import View from "./View";
import PropDocumentation from "./PropDocumentation";
import WizardExample from "../WizardExample";

export default class WizardView extends PureComponent {
  render() {
    const {cssClass} = WizardView;

    return (
      <View className={cssClass.CONTAINER} title="Wizard">
        <WizardExample />

        <PropDocumentation
          availableProps={[
            {
              name: "description",
              type: "String",
              description: "Description of the wizard",
            },
            {
              name: "onComplete",
              type: "Function",
              description: "Defines what happens when all steps are valid, and the user clicks the next button past final step",
            },
            {
              name: "steps",
              type: "Array<step>",
              description: "Steps in the wizard",
            },
            {
              name: "title",
              type: "String",
              description: "Title of the wizard",
            },

            {
              name: "className",
              type: "String",
              description: "Additional classname to apply to the wizard",
              optional: true,
            },
            {
              name: "help",
              type: "String or React Node",
              description: "Global help text to display next to form. Can be overridden by a step that has its own help property",
              optional: true,
            },
            {
              name: "hideProgressBar",
              type: "Boolean",
              description: "Whether or not to hide the progress bar from the sidebar",
              defaultValue: "False",
              optional: true,
            },
            {
              name: "initialWizardData",
              type: "Object",
              description: "Initial data to seed wizardState. Useful for saving the state of a form for later",
              defaultValue: "{}",
              optional: true,
            },
            {
              name: "nextButtonValue",
              type: "String or React Node",
              description: "Global text to display on next buttons in form. Can be overridden by a step that has its own"
              + " nextButtonValue property.",
              defaultValue: "Next",
              optional: true,
            },
            {
              name: "prevButtonValue",
              type: "String or React Node",
              description: "Global text to display on prev buttons in form. Can be overridden by a step that has its own"
              + " prevButtonValue property.",
              defaultValue: "Prev",
              optional: true,
            },
            {
              name: "seekable",
              type: "Boolean",
              description: "Whether or not you can skip to other steps before completing the current one",
              defaultValue: "False",
              optional: true,
            },
            {
              name: "style",
              type: "Object",
              description: "Add custom styles to the wizard",
              optional: true,
            },
            {
              name: "wizardButtons",
              type: "Array<wizardButton>",
              description: "Buttons to show in sidebar",
              defaultValue: "[]",
              optional: true,
            },
          ]}
          className={cssClass.PROPS}
          title="Wizard"
        />

        <PropDocumentation
          availableProps={[
            {
              name: "component",
              type: "React Node",
              description: "Components to display for this step. Provided with wizardState and setWizardState props,"
              + " allowing to get and set the data inputted into the wizard",
            },
            {
              name: "description",
              type: "String",
              description: "Description of the step",
            },
            {
              name: "title",
              type: "String",
              description: "Title of the step",
            },
            {
              name: "validate",
              type: "Function",
              description: "Validates if the current step is complete. Provided wizardState as an argument, which this"
              + " function is expected to examine for validity",
            },
            {
              name: "className",
              type: "String",
              description: "Additional classname to apply to the step",
              optional: true,
            },
            {
              name: "help",
              type: "String or React Node",
              description: "Help text to display for this step",
              optional: true,
            },
            {
              name: "onStepComplete",
              type: "Function",
              description: "A custom action to be performed before navigating to the next step in the Wizard. The function"
              + " provided wizardState as an argument and should return a promise. The wizard will only proceed to the next"
              + " step if the returned promise resolves to a truthy value.",
              optional: true,
            },
            {
              name: "props",
              type: "Object",
              description: "Props to provide to the component. If present, wizardState and setWizardState props are filtered out.",
              defaultValue: "{}",
              optional: true,
            },
          ]}
          className={cssClass.PROPS}
          title="step"
        />

        <PropDocumentation
          availableProps={[
            {
              name: "buttonValue",
              type: "String or React Node",
              description: "Value to display on the button",
            },
            {
              name: "handler",
              type: "Function",
              description: "Action to occur when button is clicked. Passed the wizardState and an object of utility methods that"
              + " affect the wizard's state",
            },
            {
              name: "buttonClassName",
              type: "String",
              description: "Additional classname to apply to the button",
            },
          ]}
          className={cssClass.PROPS}
          title="wizardButton"
        />

        <p><strong>wizardButton handler utility methods</strong></p>
        <p>
          <code>resetWizard</code>: Clears and re-initializes the state of the wizard.
        </p>

      </View>
    );
  }
}

WizardView.cssClass = {
  CONTAINER: "WizardView",
};
