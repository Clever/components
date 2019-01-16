import React, {PureComponent} from "react";

import Example, {CodeSample, ExampleCode} from "./Example";
import View from "./View";
import PropDocumentation from "./PropDocumentation";
import {Stepper, FlexBox, Grid, ItemAlign, TextInput, TextArea, sidebar} from "src";

import "./StepperView.less";

const cssClass = {
  CHECKBOX: "StepperView--checkbox",
  CHECKBOX_GROUP: "StepperView--checkboxes",
  CONTAINER: "StepperView",
  CONFIG_CONTAINER: "StepperView--configContainer",
  CONFIG_OPTIONS: "StepperView--configOptions",
  CONFIG_TOGGLE: "StepperView--configToggle",
  CONFIG: "StepperView--config",
  INTRO: "StepperView--intro",
  PROPS: "StepperView--props",
  TITLE: "StepperView--title",
};

export default class StepperView extends PureComponent {
  static cssClass = cssClass;

  state = {
    step1Title: "Step title",
    step1Description: "Step description",
    step1State: "INCOMPLETE",
    step1Optional: false,
    seekable: true,
    sticky: false,
    currentStep: "step3",
  };

  jumpToStep(id) {
    this.setState({
      currentStep: id,
    });
  }

  render() {
    const {Col, Row} = Grid;
    const {step1Title, step1Description, step1State, step1Optional, seekable,
      sticky, currentStep} = this.state;
    const steps = [
      {
        title: step1Title,
        description: step1Description,
        state: step1State,
        optional: step1Optional,
        id: "step1",
        label: "1",
      },
      {
        title: "Add applications",
        description: "Select all the apps your district uses so students and teachers have secure single sign-on access",
        state: "SUCCESS",
        id: "step2",
        label: "2",
      },
      {
        title: "Configure applications",
        description: "Select when your application should launch and who should have access to them",
        id: "step3",
        state: "INCOMPLETE",
        label: "3",
      },
      {
        title: "Get the most out of your investments",
        description: "Learn more about using your edtech investments in the most effective way",
        state: "WARNING",
        warning: "This step needs attention",
        id: "step4",
        label: "4",
      },
      {
        title: "Complete remaining semester rollover actions",
        description: "Complete our checklist to ensure students and teachers have a smooth transition after the holiday season",
        optional: true,
        state: "INCOMPLETE",
        id: "step5",
        label: "5",
      },
    ];

    const StickyStepper = sidebar(sticky, <Stepper
      className="ExampleStepper"
      currentStep={currentStep}
      steps={steps}
      onStepClick={seekable ? (id) => this.jumpToStep(id) : null }
    />);

    return (
      <View className={cssClass.CONTAINER} title="Stepper" sourcePath="src/Stepper/Stepper.tsx">
        <header className={cssClass.INTRO}>
          <p>
            The Stepper component displays progress through a sequence of steps. Each step consists of a state-managed graphic, title,
            description, and (for specific states) message.
          </p>
          <p>
            Steps can have the following states:
            success, current (active), default (inactive), warning, and optional.
          </p>
          <p>
            <b>Common use: </b>Use stepper as part of the wizard layout component.
          </p>
          <CodeSample>
            {`
              import {Stepper} from "clever-components";
              // OR
              import Stepper from "clever-components/dist/Stepper"; // Avoids importing all of clever-components.
            `}
          </CodeSample>
        </header>

        <Example title="Basic Usage:">
          <ExampleCode>
            <Grid>
              <Row grow>
                <Col span={4}>
                  <StickyStepper />
                </Col>
                <Col span={8}>
                  <span className={cssClass.TITLE}>
                    Current Step: {steps[currentStep] && steps[currentStep].title}
                  </span>
                  {this._renderConfig()}
                </Col>
              </Row>
            </Grid>
          </ExampleCode>
        </Example>
        {this._renderProps()}
      </View>
    );
  }

  _renderConfig() {
    const {Col, Row} = Grid;
    const {step1Title, step1Description} = this.state;

    return (
      <FlexBox alignItems={ItemAlign.CENTER} className={cssClass.CONFIG_CONTAINER} wrap>
        <Grid>
          <Row grow>
            <Col span={6}>
              <div className={cssClass.CONFIG}>
                <TextInput
                  className={cssClass.CONFIG_OPTIONS}
                  onChange={e => this.setState({step1Title: e.target.value})}
                  label="Step 1 Title"
                  name="StepperView--title"
                  placeholder="Step 1 Title"
                  value={step1Title}
                />
              </div>
              <div className={cssClass.CONFIG}>
                <TextArea
                  className={cssClass.CONFIG_OPTIONS}
                  onChange={e => this.setState({step1Description: e.target.value})}
                  label="Step 1 Description"
                  name="StepperView--description"
                  placeholder="Step 1 Description"
                  value={step1Description}
                  autoResize
                />
              </div>
            </Col>
            <Col span={6}>
              {this._renderCheckboxes()}
            </Col>
          </Row>
        </Grid>
      </FlexBox>
    );
  }

  _renderCheckboxes() {
    const {seekable, sticky, step1State, step1Optional} = this.state;

    return (
      <div className={cssClass.CHECKBOX_GROUP}>
        <label className={cssClass.CONFIG}>
          <input
            type="checkbox"
            checked={seekable}
            className={cssClass.CONFIG_TOGGLE}
            onChange={e => this.setState({seekable: e.target.checked})}
          />{" "}
          seekable
        </label>
        <label className={cssClass.CONFIG}>
          <input
            type="checkbox"
            checked={sticky}
            className={cssClass.CONFIG_TOGGLE}
            onChange={e => this.setState({sticky: e.target.checked})}
          />{" "}
          sticky sidebar
        </label>
        <label className={cssClass.CONFIG}>
          <input
            type="checkbox"
            checked={step1State === "INCOMPLETE"}
            className={cssClass.CONFIG_TOGGLE}
            onChange={() => this.setState({step1State: "INCOMPLETE"})}
          />{" "}
          Step 1 - incomplete
        </label>
        <label className={cssClass.CONFIG}>
          <input
            type="checkbox"
            checked={step1State === "SUCCESS"}
            className={cssClass.CONFIG_TOGGLE}
            onChange={() => this.setState({step1State: "SUCCESS"})}
          />{" "}
          Step 1 - success
        </label>
        <label className={cssClass.CONFIG}>
          <input
            type="checkbox"
            checked={step1State === "WARNING"}
            className={cssClass.CONFIG_TOGGLE}
            onChange={() => this.setState({step1State: "WARNING"})}
          />{" "}
          Step 1 - warning
        </label>
        <label className={cssClass.CONFIG}>
          <input
            type="checkbox"
            checked={step1Optional}
            className={cssClass.CONFIG_TOGGLE}
            onChange={e => this.setState({step1Optional: e.target.checked})}
          />{" "}
          Step 1 - optional
        </label>
      </div>
    );
  }

  _renderProps() {
    return (
      <div>
        <PropDocumentation
          availableProps={[
            {
              name: "steps",
              type: "Array<step>",
              description: "Indicates the order and details of steps to be included",
            },
            {
              name: "className",
              type: "String",
              description: "Additional classname to apply to the wizard",
              optional: true,
            },
            {
              name: "currentStep",
              type: "Number or String",
              description: "The id of the current step",
              defaultValue: 0,
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
              description: "Add custom styles to the stepper",
              optional: true,
            },
            {
              name: "stickySidebar",
              type: "boolean",
              description: "Whether the sidebar should be fixed vertically",
              defaultValue: "false",
              optional: true,
            },
            {
              name: "onStepClick",
              type: "Function",
              description: "Action to occur when a step is clicked. Passes an object of utility methods that"
              + " affect the Stepper's state",
            },
          ]}
          className={cssClass.PROPS}
          title="Stepper"
        />

        <PropDocumentation
          availableProps={[
            {
              name: "title",
              type: "String",
              description: "Title of the step",
            },
            {
              name: "description",
              type: "String",
              description: "Description of the step",
            },
            {
              name: "state",
              type: "enum",
              description: "One of INCOMPLETE, SUCCESS, WARNING",
              defaultValue: "INCOMPLETE",
              optional: false,
            },
            {
              name: "warning",
              type: "string",
              description: "warning text",
              defaultValue: "We ran into an error on this step",
              optional: true,
            },
            {
              name: "optional",
              type: "Boolean",
              description: "Whether or not the step should be optional",
              defaultValue: "False",
              optional: true,
            },
          ]}
          className={cssClass.PROPS}
          title="step"
        />
      </div>
    );
  }
}
