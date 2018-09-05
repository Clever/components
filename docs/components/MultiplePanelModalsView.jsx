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
    const {height, startingPanel} = this.state;

    return (
      <View
        className={cssClass.CONTAINER}
        title="MultiplePanelModals"
        sourcePath="src/MultiplePanelModals/MultiplePanelModals.tsx"
      >
        <header className={cssClass.INTRO}>
          <p>Modals with multiple pages. You can choose the starting location and height.</p>
            <p>By default, the first panel buttons will say "Remind me later" and "Next".
              Middle panels will say "Back" and "Next". Last panel buttons will say "Back" and "Done".</p>
            <p>All buttons and functions for the buttons can be overridden; functions that override the default will
              replace them.</p>
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
                  overrideOnClickButton1: () => this.setState({isModalOpen: false}),
                },
                {
                  panel: panel2,
                  title: "Page2",
                  panelClassName: "secondClass",
                  firstButtonName: "override the name back",
                  overrideOnClickButton2: () => console.log("new action after clicking button 2 on the second page"),
                },
                {
                  panel: panel3,
                  title: "Page3",
                },
              ]}
              defaultOnClickButton1={() => console.log("GoingBackwards")}
              defaultOnClickButton2={() => console.log("clicked button 2")}
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
    const {height, startingPanel} = this.state;

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
          Starting Panel:
          <SegmentedControl
            className={cssClass.CONFIG_OPTIONS}
            onSelect={value => this.setState({startingPanel: value})}
            options={[
              {content: "page 1", value: "0"},
              {content: "page 2", value: "1"},
              {content: "page 3", value: "2"},
            ]}
            value={startingPanel}
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
              description: "An array of MultiplePanelModals's content. Object information is included below.",
            },
            {
              name: "closeModal",
              type: "Function",
              description: "Handler function to close the modal. Called upon clicking the second button on the last " +
              "page, outside the modal, or the x.",
            },
            {
              name: "className",
              type: "String",
              description: "Optional additional CSS class name to apply to the div surrounding the modals.",
              optional: true,
            },
            {
              name: "defaultOnClickButton1",
              type: "Function",
              description: "Default handler function for the first (left) button.",
              optional: true,
            },
            {
              name: "defaultOnClickButton2",
              type: "Function",
              description: "Default handler function for the second (right) button.",
              optional: true,
            },
            {
              name: "height",
              type: "String",
              description: "Standard height for all modals. If not provided, height is auto-generated",
              optional: true,
            },
            {
              name: "startingPanel",
              type: "Number",
              description: "index of componentArray that indicates the first panel that should show up.",
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
              name: "firstButtonName",
              type: "String",
              description: "If this is provided, it will replace the default first (left) button name for this panel.",
              optional: true,
            },
            {
              name: "overrideOnClickButton1",
              type: "Function",
              description: "If this is provided, it will replace the defaultOnClickButton1 function for this panel.",
              optional: true,
            },
            {
              name: "secondButtonName",
              type: "String",
              description: "If this is provided, it will replace the default second (right) button name for this panel.",
              optional: true,
            },
            {
              name: "overrideOnClickButton2",
              type: "Function",
              description: "If this is provided, it will replace the defaultOnClickButton2 function for this panel.",
              optional: true,
            },
          ]}
        />
      </div>
    );
  }
}
