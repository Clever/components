import assert from "assert";
import React from "react";
import sinon from "sinon";
import {shallow} from "enzyme";
import _ from "lodash";

import {Wizard} from "../src";
import WizardStep from "../src/Wizard/WizardStep";

class TestComponent extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return <div />;
  }
}

describe("WizardStep", () => {
  describe("description", () => {
    const descriptionText = "My great description";
    const testCases = [
      {
        title: "text",
        description: descriptionText,
        selector: ".Wizard--WizardStep--description > p",
      },
      {
        title: "non-text",
        description: <span>{descriptionText}</span>,
        selector: ".Wizard--WizardStep--description > span",
      },
      {
        title: "no",
        description: null,
        selector: ".Wizard--WizardStep--description",
      },
    ];

    testCases.forEach(({title, description, selector}) => {
      it(`displays ${title} descriptions`, () => {
        const renderedStep = shallow(<WizardStep
          title="title"
          description={description}
          Component={() => <div />}
          currentStep={0}
          totalSteps={1}
          updatePercentComplete={() => {}}
          calculatePercentComplete={() => {}}
          percentComplete={0}
          setWizardState={() => {}}
          wizardState={{}}
        />);

        const descriptionMatches = renderedStep.find(selector);
        assert.equal(descriptionMatches.length, description === null ? 0 : 1);
        if (description !== null) {
          assert.equal(descriptionMatches.text(), descriptionText);
        }
      });
    });
  });

  describe("help", () => {
    const helpText = "My great help";
    const testCases = [
      {
        title: "text",
        help: helpText,
        selector: ".Wizard--WizardStep--help > p",
      },
      {
        title: "non-text",
        help: <span>{helpText}</span>,
        selector: ".Wizard--WizardStep--help > span",
      },
      {
        title: "no",
        help: null,
        selector: ".Wizard--WizardStep--help",
      },
    ];

    testCases.forEach(({title, help, selector}) => {
      it(`displays ${title} help`, () => {
        const renderedStep = shallow(<WizardStep
          title="title"
          help={help}
          Component={() => <div />}
          currentStep={0}
          totalSteps={1}
          updatePercentComplete={() => {}}
          calculatePercentComplete={() => {}}
          percentComplete={0}
          setWizardState={() => {}}
          wizardState={{}}
        />);

        const helpMatches = renderedStep.find(selector);
        assert.equal(helpMatches.length, help === null ? 0 : 1);
        if (help !== null) {
          assert.equal(helpMatches.text(), helpText);
        }
      });
    });
  });

  describe("basic rendering", () => {
    it("displays correct step number and title", () => {
      const totalSteps = 10;
      const title = "My super cool title";
      for (let curStep = 0; curStep < totalSteps; ++curStep) {
        const renderedStep = shallow(<WizardStep
          title={title}
          Component={() => <div />}
          currentStep={curStep}
          totalSteps={totalSteps}
          updatePercentComplete={() => {}}
          calculatePercentComplete={() => {}}
          percentComplete={0}
          setWizardState={() => {}}
          wizardState={{}}
        />);
        const headingMatch = renderedStep.find("h1");
        assert.equal(headingMatch.length, 1);
        assert.equal(headingMatch.text(), `Step ${curStep + 1}: ${title}`);
      }
    });

    it("renders the component with setWizardState and wizardState", () => {
      const testState = {test: "data"};
      const testModification = {newTest: "newData"};
      const spySetWizardState = sinon.spy();
      const renderedStep = shallow(<WizardStep
        title="title"
        Component={TestComponent}
        currentStep={0}
        totalSteps={2}
        updatePercentComplete={() => {}}
        calculatePercentComplete={() => {}}
        percentComplete={0}
        setWizardState={spySetWizardState}
        wizardState={testState}
      />);
      const componentMatch = renderedStep.find(TestComponent);
      assert.equal(componentMatch.length, 1);
      assert(componentMatch.prop("setWizardState"));
      assert.equal(componentMatch.prop("wizardState"), testState);
      assert(!spySetWizardState.called);
      componentMatch.prop("setWizardState")(testModification);
      assert(spySetWizardState.calledOnce);
      assert(spySetWizardState.calledWith(testModification));
    });
  });

  describe("percentage complete", () => {
    it("is modified if the current step is the last one", () => {
      for (let totalSteps = 1; totalSteps < 10; ++totalSteps) {
        const spyUpdatePercentComplete = sinon.spy();
        const renderedStep = shallow(<WizardStep
          title="title"
          Component={TestComponent}
          currentStep={totalSteps - 1}
          totalSteps={totalSteps}
          updatePercentComplete={spyUpdatePercentComplete}
          calculatePercentComplete={() => 0}
          percentComplete={0}
          setWizardState={() => {}}
          wizardState={{}}
        />);
        const componentMatch = renderedStep.find(TestComponent);
        assert.equal(componentMatch.length, 1);
        assert(componentMatch.prop("setWizardState"));
        assert(!spyUpdatePercentComplete.called);
        componentMatch.prop("setWizardState")({});
        assert(spyUpdatePercentComplete.calledOnce);
      }
    });

    it("is modified if the new percentage decreases", () => {
      for (let totalSteps = 2; totalSteps < 10; ++totalSteps) {
        const spyUpdatePercentComplete = sinon.spy();
        const renderedStep = shallow(<WizardStep
          title="title"
          Component={TestComponent}
          currentStep={totalSteps - 2}
          totalSteps={totalSteps}
          updatePercentComplete={spyUpdatePercentComplete}
          calculatePercentComplete={() => 0}
          percentComplete={0.5}
          setWizardState={() => {}}
          wizardState={{}}
        />);
        const componentMatch = renderedStep.find(TestComponent);
        assert.equal(componentMatch.length, 1);
        assert(componentMatch.prop("setWizardState"));
        assert(!spyUpdatePercentComplete.called);
        componentMatch.prop("setWizardState")({});
        assert(spyUpdatePercentComplete.calledOnce);
      }
    });

    it("is not modified if the percentage increases and it is not the last step", () => {
      for (let totalSteps = 2; totalSteps < 10; ++totalSteps) {
        const spyUpdatePercentComplete = sinon.spy();
        const renderedStep = shallow(<WizardStep
          title="title"
          Component={TestComponent}
          currentStep={totalSteps - 2}
          totalSteps={totalSteps}
          updatePercentComplete={spyUpdatePercentComplete}
          calculatePercentComplete={() => 0.5}
          percentComplete={0.25}
          setWizardState={() => {}}
          wizardState={{}}
        />);
        const componentMatch = renderedStep.find(TestComponent);
        assert.equal(componentMatch.length, 1);
        assert(componentMatch.prop("setWizardState"));
        assert(!spyUpdatePercentComplete.called);
        componentMatch.prop("setWizardState")({});
        assert(!spyUpdatePercentComplete.calledOnce);
      }
    });

    it("is not modified if the percentage stays the same and it is not the last step", () => {
      for (let totalSteps = 2; totalSteps < 10; ++totalSteps) {
        const spyUpdatePercentComplete = sinon.spy();
        const renderedStep = shallow(<WizardStep
          title="title"
          Component={TestComponent}
          currentStep={totalSteps - 2}
          totalSteps={totalSteps}
          updatePercentComplete={spyUpdatePercentComplete}
          calculatePercentComplete={() => 0.5}
          percentComplete={0.5}
          setWizardState={() => {}}
          wizardState={{}}
        />);
        const componentMatch = renderedStep.find(TestComponent);
        assert.equal(componentMatch.length, 1);
        assert(componentMatch.prop("setWizardState"));
        assert(!spyUpdatePercentComplete.called);
        componentMatch.prop("setWizardState")({});
        assert(!spyUpdatePercentComplete.calledOnce);
      }
    });
  });
});

describe("Wizard", () => {
  describe("description", () => {
    const descriptionText = "My great description";
    const testCases = [
      {
        title: "text",
        description: descriptionText,
        selector: "p.Wizard--description",
      },
      {
        title: "non-text",
        description: <span>{descriptionText}</span>,
        selector: ".Wizard--description > span",
      },
    ];

    testCases.forEach(({title, description, selector}) => {
      it(`displays ${title} descriptions`, () => {
        const renderedWizard = shallow(<Wizard
          title="title"
          description={description}
          onComplete={() => {}}
          steps={[{title: "step", validate: () => {}, component: TestComponent}]}
        />);

        const descriptionMatches = renderedWizard.find(selector);
        assert.equal(descriptionMatches.length, 1);
        assert.equal(descriptionMatches.text(), descriptionText);
      });
    });
  });

  describe("navigation", () => {
    it("updates the displayed step upon next button click", () => {
      const renderedWizard = shallow(<Wizard
        title="title"
        description="descritpion"
        onComplete={() => {}}
        steps={[
          {title: "step1", validate: () => true, component: TestComponent},
          {title: "step2", validate: () => true, component: TestComponent},
        ]}
      />);
      const nextBtnMatch = renderedWizard.find(".Wizard--nextButton");
      assert.equal(nextBtnMatch.length, 1);
      assert.strictEqual(nextBtnMatch.prop("disabled"), false);
      assert.strictEqual(renderedWizard.state("currentStep"), 0);
      nextBtnMatch.simulate("click");
      assert.strictEqual(renderedWizard.state("currentStep"), 1);
    });

    it("doesn't show the prev button if first step", () => {
      const renderedWizard = shallow(<Wizard
        title="title"
        description="description"
        onComplete={() => {}}
        steps={[{title: "step", validate: () => {}, component: TestComponent}]}
      />);
      assert.equal(renderedWizard.find(".Wizard--prevButton").length, 0);
    });

    it("updates the displayed step upon prev button click", () => {
      const renderedWizard = shallow(<Wizard
        title="title"
        description="descritpion"
        onComplete={() => {}}
        steps={[
          {title: "step1", validate: () => true, component: TestComponent},
          {title: "step2", validate: () => true, component: TestComponent},
        ]}
      />);
      const nextBtnMatch = renderedWizard.find(".Wizard--nextButton");
      assert.equal(nextBtnMatch.length, 1);

      nextBtnMatch.simulate("click");

      assert.strictEqual(renderedWizard.state("currentStep"), 1);
      const prevBtnMatch = renderedWizard.find(".Wizard--prevButton");
      assert.equal(prevBtnMatch.length, 1);

      prevBtnMatch.simulate("click");

      assert.strictEqual(renderedWizard.state("currentStep"), 0);
      const newPrevBtnMatch = renderedWizard.find(".Wizard--prevButton");
      assert.equal(newPrevBtnMatch.length, 0);
    });

    it("doesn't update the displayed step upon next button click if last step, calls onComplete", () => {
      const onCompleteSpy = sinon.spy();
      const renderedWizard = shallow(<Wizard
        title="title"
        description="descritpion"
        onComplete={onCompleteSpy}
        steps={[{title: "step", validate: () => true, component: TestComponent}]}
      />);
      const nextBtnMatch = renderedWizard.find(".Wizard--nextButton");
      assert.equal(nextBtnMatch.length, 1);
      assert(!onCompleteSpy.called);
      assert.strictEqual(nextBtnMatch.prop("disabled"), false);
      nextBtnMatch.simulate("click");
      assert(onCompleteSpy.calledOnce);
    });

    it("updates the percentage complete upon navigation", () => {
      let valid = false;
      const renderedWizard = shallow(<Wizard
        title="title"
        description="descritpion"
        onComplete={() => {}}
        steps={[
          {title: "step1", validate: () => valid, component: TestComponent},
          {title: "step2", validate: () => false, component: TestComponent},
        ]}
      />);

      assert.strictEqual(renderedWizard.state("percentComplete"), 0);
      valid = true;

      const nextBtnMatch = renderedWizard.find(".Wizard--nextButton");
      assert.equal(nextBtnMatch.length, 1);

      nextBtnMatch.simulate("click");

      assert.strictEqual(renderedWizard.state("percentComplete"), 0.5);
    });
  });

  describe("sidebar", () => {
    it("displays all steps in the sidebar", () => {
      const steps = [
        {title: "step1", validate: () => false, component: TestComponent},
        {title: "step2", validate: () => false, component: TestComponent},
        {title: "step3", validate: () => false, component: TestComponent},
        {title: "step4", validate: () => false, component: TestComponent},
      ];
      const renderedWizard = shallow(<Wizard
        title="title"
        description="description"
        onComplete={() => {}}
        steps={steps}
      />);

      const stepMatches = renderedWizard.find(".Wizard--stepsDisplay li");
      assert.equal(stepMatches.length, steps.length);
      for (let i = 0; i < steps.length; ++i) {
        assert.equal(stepMatches.at(i).text(), steps[i].title);
      }
    });

    it("displays whether or not steps are valid in the sidebar", () => {
      const steps = [
        {title: "step1", validate: () => false, component: TestComponent},
        {title: "step2", validate: () => true, component: TestComponent},
        {title: "step3", validate: () => true, component: TestComponent},
        {title: "step4", validate: () => false, component: TestComponent},
      ];
      const renderedWizard = shallow(<Wizard
        title="title"
        description="description"
        onComplete={() => {}}
        steps={steps}
      />);

      const stepMatches = renderedWizard.find(".Wizard--stepsDisplay li");
      assert.equal(stepMatches.length, steps.length);
      for (let i = 0; i < steps.length; ++i) {
        assert.equal(stepMatches.at(i).text(), steps[i].title);
        if (steps[i].validate()) {
          assert.strictEqual(stepMatches.at(i).find(".Wizard--stepsDisplay--valid").length, 1);
        } else {
          assert.strictEqual(stepMatches.at(i).find(".Wizard--stepsDisplay--valid").length, 0);
        }
      }
    });

    it("displays the current step in the sidebar", () => {
      const steps = [
        {title: "step1", validate: () => false, component: TestComponent},
        {title: "step2", validate: () => true, component: TestComponent},
        {title: "step3", validate: () => true, component: TestComponent},
        {title: "step4", validate: () => false, component: TestComponent},
      ];
      const renderedWizard = shallow(<Wizard
        title="title"
        description="description"
        onComplete={() => {}}
        steps={steps}
      />);

      for (let curStep = 0; curStep < steps.length; ++curStep) {
        const stepMatches = renderedWizard.find(".Wizard--stepsDisplay li");
        assert.strictEqual(stepMatches.length, steps.length);
        assert.strictEqual(renderedWizard.find(".Wizard--stepsDisplay--currentStep").length, 1);
        assert.strictEqual(
          renderedWizard.find(".Wizard--stepsDisplay--step")
          .not(".Wizard--stepsDisplay--currentStep").length, 3);
        assert.strictEqual(stepMatches.at(curStep).find(".Wizard--stepsDisplay--currentStep").length, 1);

        const nextButton = renderedWizard.find(".Wizard--nextButton");
        assert.strictEqual(nextButton.length, 1);
        nextButton.simulate("click");
      }

      for (let curStep = steps.length - 1; curStep >= 0; --curStep) {
        const stepMatches = renderedWizard.find(".Wizard--stepsDisplay li");
        assert.strictEqual(stepMatches.length, steps.length);
        assert.strictEqual(renderedWizard.find(".Wizard--stepsDisplay--currentStep").length, 1);
        assert.strictEqual(
          renderedWizard.find(".Wizard--stepsDisplay--step")
          .not(".Wizard--stepsDisplay--currentStep").length, 3);
        assert.strictEqual(stepMatches.at(curStep).find(".Wizard--stepsDisplay--currentStep").length, 1);

        if (curStep !== 0) {
          const prevButton = renderedWizard.find(".Wizard--prevButton");
          assert.strictEqual(prevButton.length, 1);
          prevButton.simulate("click");
        }
      }
    });

    it("makes sidebar steps clickable if the seekable flag is present", () => {
      const steps = [
        {title: "step1", validate: () => false, component: TestComponent},
        {title: "step2", validate: () => true, component: TestComponent},
        {title: "step3", validate: () => true, component: TestComponent},
        {title: "step4", validate: () => false, component: TestComponent},
      ];
      const renderedWizard = shallow(<Wizard
        title="title"
        description="description"
        onComplete={() => {}}
        steps={steps}
        seekable
      />);

      const stepMatches = renderedWizard.find(
        ".Wizard--stepsDisplay li Button.Wizard--stepsDisplay--stepButton"
      );
      assert.equal(stepMatches.length, steps.length);
      for (let i = 0; i < steps.length; ++i) {
        assert.equal(shallow(stepMatches.at(i).prop("value")).text(), steps[i].title);
        assert.equal(stepMatches.at(i).prop("type"), "link");
      }
    });
  });

  describe("wizardButtons", () => {
    it("shows wizard buttons if present", () => {
      const wizardButtons = [
        {
          handler: () => {},
          buttonValue: "btn1",
        },
        {
          handler: () => {},
          buttonValue: "btn2",
        },
      ];
      const renderedWizard = shallow(<Wizard
        title="title"
        description="description"
        onComplete={() => {}}
        steps={[{title: "step", validate: () => {}, component: TestComponent}]}
        wizardButtons={wizardButtons}
        seekable
      />);

      const controlsMatched = renderedWizard.find(".Wizard--controls Button");
      assert.strictEqual(controlsMatched.length, wizardButtons.length);

      for (let i = 0; i < wizardButtons.length; ++i) {
        assert.strictEqual(controlsMatched.at(i).prop("value"), wizardButtons[i].buttonValue);
      }
    });

    it("doesn't display wizardButtons if not present", () => {
      const renderedWizard = shallow(<Wizard
        title="title"
        description="description"
        onComplete={() => {}}
        steps={[{title: "step", validate: () => {}, component: TestComponent}]}
        seekable
      />);

      const controlsMatched = renderedWizard.find(".Wizard--controls Button");
      assert.strictEqual(controlsMatched.length, 0);
    });

    it("provides data and utility functions to button action", () => {
      const wizardButtons = [
        {
          handler: sinon.spy(),
          buttonValue: "btn1",
        },
        {
          handler: sinon.spy(),
          buttonValue: "btn2",
        },
      ];
      const renderedWizard = shallow(<Wizard
        title="title"
        description="description"
        onComplete={() => {}}
        steps={[{title: "step", validate: () => {}, component: TestComponent}]}
        wizardButtons={wizardButtons}
        seekable
      />);

      const controlsMatched = renderedWizard.find(".Wizard--controls Button");
      assert.strictEqual(controlsMatched.length, wizardButtons.length);

      for (let i = 0; i < wizardButtons.length; ++i) {
        const spy = wizardButtons[i].handler;
        assert(!spy.called);
        controlsMatched.at(i).simulate("click");
        assert(spy.calledOnce);
        const args = spy.args[0];
        assert.deepEqual(args[0], {});
        assert(_.includes(_.keys(args[1]), "resetWizard"));
      }
    });
  });
});
