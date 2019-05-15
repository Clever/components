import * as React from "react";

import Example, { CodeSample, ExampleCode } from "./Example";
import PropDocumentation from "./PropDocumentation";
import View from "./View";
import { WizardLayout, FlexBox, ItemAlign, Stepper } from "src";
import { WizardLayoutContent } from "./WizardLayoutContent";

import "./WizardLayoutView.less";

const cssClass = {
  CONFIG_CONTAINER: "WizardLayoutView--configContainer",
  CONFIG_OPTIONS: "WizardLayoutView--configOptions",
  CONFIG: "WizardLayoutView--config",
  CONFIG_TOGGLE: "WizardLayoutView--configToggle",
  CONTAINER: "WizardLayoutView",
  INTRO: "WizardLayoutView--intro",
  PROPS: "WizardLayoutView--props",
};

export default class WizardLayoutView extends React.PureComponent {
  static cssClass = cssClass;

  state = {
    showHeaderImg: true,
    customHelpContent: false,
    currentStep: "setAccess",
    completionStatus: {
      setAccess: false,
      singleSignOn: false,
      goals: false,
    },
    hideSaveAndExit: false,
  };

  render() {
    const { currentStep, showHeaderImg, customHelpContent, hideSaveAndExit } = this.state;

    const stepperSteps = [
      {
        id: "setAccess",
        description:
          "Select when your application should launch and who should have access to them",
        state: this.state.completionStatus.setAccess ? "SUCCESS" : "INCOMPLETE",
        title: "Configure applications",
      },
      {
        id: "singleSignOn",
        description: "Use Clever as your single sign on provider to save classroom time",
        state: this.state.completionStatus.singleSignOn ? "SUCCESS" : "INCOMPLETE",
        title: "Learn about Clever SSO",
      },
      {
        id: "goals",
        description: "Start improving your district's learning outcomes today with Clever Goals",
        state: this.state.completionStatus.goals ? "SUCCESS" : "INCOMPLETE",
        title: "Request a Clever Goals demo",
      },
    ];

    const stepper = (
      <Stepper
        onStepClick={id => this.setState({ currentStep: id })}
        steps={stepperSteps}
        currentStepID={currentStep}
      />
    );

    const _onSaveAndExit = () => {
      const completionStatus = {
        setAccess: false,
        singleSignOn: false,
        goals: false,
      };

      this.setState({ currentStep: WizardLayoutContent.firstStep, completionStatus });
    };

    const _onNextStep = () => {
      if (WizardLayoutContent[currentStep].nextStep) {
        const completionStatus = this.state;
        completionStatus[currentStep] = true;
        this.setState({
          currentStep: WizardLayoutContent[currentStep].nextStep,
          completionStatus,
        });
      } else {
        _onSaveAndExit();
      }
    };

    const _onPrevStep = () => {
      if (WizardLayoutContent[currentStep].prevStep) {
        const completionStatus = this.state;
        completionStatus[currentStep] = false;
        this.setState({
          currentStep: WizardLayoutContent[currentStep].prevStep,
          completionStatus,
        });
      }
    };

    const headerImg = (
      <img className="WizardLayoutView--headerImg" src="./assets/img/deweyFox.svg" />
    );

    return (
      <View
        className={cssClass.CONTAINER}
        title="WizardLayout"
        sourcePath="src/WizardLayout/WizardLayout.tsx"
      >
        <header className={cssClass.INTRO}>
          <p>
            This component's main purpose is to provide guidelines for implementing a guided wizard.
          </p>
          <p>
            This should be used instead of the old Wizard component because this version leaves
            logic in the hands of consumer.
          </p>
          <CodeSample>
            {`
              import {WizardLayout} from "clever-components";
              // OR
              import WizardLayout from "clever-components/dist/WizardLayout"; // Avoids importing all of clever-components.
            `}
          </CodeSample>
        </header>

        <Example title="Basic Usage:">
          <ExampleCode style={{ display: "flex", height: "35rem" }}>
            <WizardLayout
              className="Dewey--WizardLayout"
              sections={WizardLayoutContent[currentStep].sections}
              headerImg={showHeaderImg ? headerImg : null}
              helpContent={
                customHelpContent ? WizardLayoutContent[currentStep].helpContent : null
              }
              hideSaveAndExit={hideSaveAndExit}
              nextStepButtonText={
                WizardLayoutContent[currentStep].nextStepButtonText || null
              }
              onNextStep={_onNextStep}
              onPrevStep={_onPrevStep}
              onSaveAndExit={_onSaveAndExit}
              prevStepButtonDisabled={!WizardLayoutContent[currentStep].prevStep}
              prevStepButtonText={
                WizardLayoutContent[currentStep].prevStepButtonText || null
              }
              stepper={stepper}
              subtitle="Ensure a smooth upcoming school year by following a few easy steps below."
              title="Back to school guide"
            />
          </ExampleCode>
          {this._renderConfig()}
        </Example>

        {this._renderProps()}
      </View>
    );
  }

  _renderConfig() {
    const { showHeaderImg, customHelpContent, hideSaveAndExit } = this.state;

    return (
      <FlexBox alignItems={ItemAlign.CENTER} className={cssClass.CONFIG_CONTAINER} wrap>
        <label className={cssClass.CONFIG}>
          <input
            type="checkbox"
            checked={showHeaderImg}
            className={cssClass.CONFIG_TOGGLE}
            onChange={e => this.setState({ showHeaderImg: e.target.checked })}
          />{" "}
          Header image
        </label>
        <label className={cssClass.CONFIG}>
          <input
            type="checkbox"
            checked={customHelpContent}
            className={cssClass.CONFIG_TOGGLE}
            onChange={e => this.setState({ customHelpContent: e.target.checked })}
          />{" "}
          Custom help content
        </label>
       <label className={cssClass.CONFIG}>
        <input
          type="checkbox"
          checked={hideSaveAndExit}
          className={cssClass.CONFIG_TOGGLE}
          onChange={e => this.setState({ hideSaveAndExit: e.target.checked })}
        />{" "}
        Hide save & exit button
      </label>
      </FlexBox>
    );
  }

  _renderProps() {
    return (
      <PropDocumentation
        title="<WizardLayout /> Props"
        availableProps={[
          {
            name: "className",
            type: "String",
            description: "Custom CSS class to be added to the component.",
            optional: true,
          },
          {
            name: "sections",
            type: "Object",
            description:
              "Array of objects with a title, subtitle, and content (React.Node to be displayed).",
          },
          {
            name: "headerImg",
            type: "String",
            description: "Path to image to be displayed in the header.",
            optional: true,
          },
          {
            name: "helpContent",
            type: "React.Element",
            description:
              "Optional React.Element to display helpful tips or links to the Help Center.",
            optional: true,
          },
          {
            name: "nextStepButtonDisabled",
            type: "Boolean",
            description: "Optional boolean determining if the next button is enabled",
            optional: true,
            defaultValue: "false",
          },
          {
            name: "nextStepButtonText",
            type: "String",
            description: "Optional next button text, 'Next step' by default",
            defaultValue: "Next step",
            optional: true,
          },
          {
            name: "onNextStep",
            type: "Function",
            description: "Called when user clicks on 'Next step' button.",
          },
          {
            name: "onPrevStep",
            type: "Function",
            description: "Called when user clicks on 'Previous step' button.",
          },
          {
            name: "hideOnSaveAndExit",
            type: "Boolean",
            description: "Optional boolean determining if the save & exit button is hidden",
            optional: true,
            defaultValue: "false",
          },
          {
            name: "onSaveAndExit",
            type: "Function",
            description: "Called when user clicks on 'Save & exit' button.",
            optional: true,
          },
          {
            name: "prevStepButtonDisabled",
            type: "Boolean",
            description: "Optional boolean determining if the previous button is enabled",
            optional: true,
            defaultValue: "false",
          },
          {
            name: "prevStepButtonText",
            type: "String",
            description: "Optional previous button text, 'Previous step' by default",
            optional: true,
            defaultValue: "Previous Step",
          },
          {
            name: "stepper",
            type: "React.Node",
            description: "Stepper component to be used in the sidebar of the wizard.",
          },
          {
            name: "subtitle",
            type: "String",
            description: "Subtitle string to be displayed in the header.",
          },
          {
            name: "title",
            type: "String",
            description: "Title string to be displayed in the header.",
          },
        ]}
        className={cssClass.PROPS}
      />
    );
  }
}
