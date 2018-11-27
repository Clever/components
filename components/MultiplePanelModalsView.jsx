import * as React from "react";

import Example, {CodeSample, ExampleCode} from "./Example";
import PropDocumentation from "./PropDocumentation";
import View from "./View";
import {MultiplePanelModals, FlexBox, ItemAlign, SegmentedControl, Button} from "src";

import "./MultiplePanelModalsView.less";

const cssClass = {
  CONFIG_CONTAINER: "MultiplePanelModalsView--configContainer",
  CONFIG_OPTIONS: "MultiplePanelModalsView--configOptions",
  CONFIG: "MultiplePanelModalsView--config",
  CONFIG_TOGGLE: "MultiplePanelModalsView--configToggle",
  CONTAINER: "MultiplePanelModalsView",
  INTRO: "MultiplePanelModalsView--intro",
  PROPS: "MultiplePanelModalsView--props",
};

const panel1 = "Displaying plain text.";
const panel2 = <p>Content in here</p>;
const panel3 = (
  <Button
    value="This is a button."
    type="link"
    onClick={() => this.setState({isModalOpen: false})}
  />
);

export default class MultiplePanelModalsView extends React.PureComponent {
  static cssClass = cssClass;

  state = {
    height: "150px",
    startingPanel: "0",
    isModalOpen: false,
  };

  render() {
    const {rightButtonDisabled, height, startingPanel} = this.state;

    return (
      <View
        className={cssClass.CONTAINER}
        title="MultiplePanelModals"
        sourcePath="src/MultiplePanelModals/MultiplePanelModals.tsx"
      >
        <header className={cssClass.INTRO}>
          <p>
            This component wraps content and displays it in a modal with multiple pages, or panels.
          </p>
          <p>
            By default, the first panel buttons will say "Remind me later" and "Next". The middle panels will say "Back"
            and "Next". The last panel buttons will say "Back" and "Done". You can override these default names by
            adding button names for specific panels.
          </p>
          <p>
            You can optionally add a default onClick function for each button that will trigger for every panel. If you
            want more granularity, you can add an onClick function for a specific panel. The onClick function for the
            panel will overwrite the default onClick function.
          </p>
          <CodeSample>
            {`
              import {MultiplePanelModals} from "clever-components";
              // OR
              import MultiplePanelModals from "clever-components/dist/MultiplePanelModals"; // Avoids importing all of clever-components.
            `}
          </CodeSample>
        </header>

        <Example title="Basic Usage:">
          <ExampleCode>
            <Button
              type="primary"
              onClick={() => this.setState({isModalOpen: true})}
              value="Open Modal"
            />
            {this.state.isModalOpen && (
            <MultiplePanelModals
              closeModal={() => this.setState({isModalOpen: false})}
              componentArray={[
                {
                  panel: panel1,
                  title: "Page1",
                  panelClassName: "FirstClass",
                  overrideOnClickLeftButton: () => this.setState({isModalOpen: false}),
                },
                {
                  panel: panel2,
                  title: "Page2",
                  panelClassName: "secondClass",
                  leftButtonName: "override the name back",
                  overrideOnClickRightButton: () => console.log("new action after clicking button 2 on the second page"),
                },
                {
                  panel: panel3,
                  title: "Page3",
                },
              ]}
              defaultOnClickLeftButton={() => console.log("GoingBackwards")}
              defaultOnClickRightButton={() => console.log("clicked button 2")}
              rightButtonDisabled={rightButtonDisabled}
              height={height}
              startingPanel={parseInt(startingPanel, 10)}
            />)}
          </ExampleCode>
          {this._renderConfig()}
        </Example>

        {this._renderProps()}
      </View>
    );
  }

  _renderConfig() {
    const {rightButtonDisabled, height, startingPanel} = this.state;

    return (
      <FlexBox alignItems={ItemAlign.CENTER} className={cssClass.CONFIG_CONTAINER} wrap>
        <div className={cssClass.CONFIG}>
          Height:
          <SegmentedControl
            className={cssClass.CONFIG_OPTIONS}
            onSelect={value => this.setState({height: value})}
            options={[
              {content: "150px", value: "150px"},
              {content: "300px", value: "300px"},
              {content: "450px", value: "450px"},
            ]}
            value={height}
          />
        </div>
        <div className={cssClass.CONFIG}>
          Starting panel:
          <SegmentedControl
            className={cssClass.CONFIG_OPTIONS}
            onSelect={value => this.setState({startingPanel: value})}
            options={[
              {content: "Page 1", value: "0"},
              {content: "Page 2", value: "1"},
              {content: "Page 3", value: "2"},
            ]}
            value={startingPanel}
          />
        </div>
        <div className={cssClass.CONFIG}>
          Disabled right button:
          <SegmentedControl
            className={cssClass.CONFIG_OPTIONS}
            onSelect={value => this.setState({rightButtonDisabled: value})}
            options={[
              {content: "True", value: true},
              {content: "False", value: false},
            ]}
            value={rightButtonDisabled}
          />
        </div>
      </FlexBox>
    );
  }

  _renderProps() {
    return (
      <div>
        <PropDocumentation
          title="<MultiplePanelModals /> Props"
          availableProps={[
            {
              name: "componentArray",
              type: "Array of objects",
              description: "An array of MultiplePanelModals's content. Each item of the array corresponds to one " +
              "panel. Object information is included below.",
            },
            {
              name: "closeModal",
              type: "Function",
              description: "Handler function to close the modal. Called upon clicking the right button on the last " +
              "page, outside the modal, or the x.",
            },
            {
              name: "className",
              type: "String",
              description: "Optional additional CSS class name to apply to the div surrounding the modals.",
              optional: true,
            },
            {
              name: "defaultOnClickLeftButton",
              type: "Function",
              description: "Default handler function for the left button. It triggers on every left button click " +
              "unless there is a left-button override in the panel.",
              optional: true,
            },
            {
              name: "defaultOnClickRightButton",
              type: "Function",
              description: "Default handler function for the right button. It triggers on every right button click " +
              "unless there is a right-button override in the panel.",
              optional: true,
            },
            {
              name: "height",
              type: "String",
              description: "Standard height for all panels. If not provided, height is auto-generated",
              optional: true,
            },
            {
              name: "startingPanel",
              type: "Number",
              description: "Index of componentArray that indicates the first panel that should show up.",
              optional: true,
              defaultValue: "0",
            },
          ]}
          className={cssClass.PROPS}
        />
        <PropDocumentation
          title="Object in the componentArray"
          availableProps={[
            {
              name: "title",
              type: "String",
              description: "Title of this panel.",
            },
            {
              name: "panelClassName",
              type: "String",
              description: "ClassName for this panel.",
              optional: true,
            },
            {
              name: "focusLocked",
              type: "Boolean",
              description: "Whether or not focus stays within the modal when tabbing for this panel.",
              defaultValue: "true",
              optional: true,
            },
            {
              name: "width",
              type: "Number",
              description: "The width of the modal for this panel.",
              defaultValue: "400px",
              optional: true,
            },
            {
              name: "panel",
              type: "Any",
              description: "Content of the panel.",
            },
            {
              name: "leftButtonName",
              type: "String",
              description: "If this is provided, it will replace the default left button's name for this panel.",
              optional: true,
            },
            {
              name: "overrideOnClickLeftButton",
              type: "Function",
              description: "If this is provided, it will be the only function called upon clicking the left button " +
              "for this panel.",
              optional: true,
            },
            {
              name: "rightButtonName",
              type: "String",
              description: "If this is provided, it will replace the default right button's name for this " +
              "panel.",
              optional: true,
            },
            {
              name: "overrideOnClickRightButton",
              type: "Function",
              description: "If this is provided, it will be the only function called upon clicking the right button " +
              "for this panel.",
              optional: true,
            },
            {
              name: "rightButtonDisabled",
              type: "Boolean",
              description: "Whether the right button is disabled. The parent component should manage any state required to derive this value.",
              optional: true,
              defaultValue: false,
            },
          ]}
        />
      </div>
    );
  }
}
