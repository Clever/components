import {Button} from "src/Button/Button";

import React, {Component} from "react";
import MultiplePanelModals from "src/MultiplePanelModals";
import Example from "./Example"
import View from "./View";

import "./MultiplePanelModalsView.less";

const Classes = {
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

export default class MultiplePanelModalsView extends Component {
  state = {
    isModalOpen: false,
  };

  render() {
    return (
      <View
        className={Classes.CONTAINER}
        title="MultiplePanelModals"
        sourcePath="src/MultiplePanelModals/MultiplePanelModals.tsx"
      >
        <header className={Classes.INTRO}>
          <p>These modals have next/back buttons.</p>
          <p>They can be used in walkthroughs for multi-page information.</p>
        </header>

        <Example title="Basic Usage:">
          <Button
            type="primary"
            onClick={() => this.setState({isModalOpen: true})}
            value="Open Modal"
          />
          {this.state.isModalOpen && (
            <MultiplePanelModals
              closeModal={() => this.setState({isModalOpen: false})}
              componentArray={[
                {panel: panel1, title: "Page1", className: "FirstClass"},
                {panel: panel2, title: "Page2", className: "secondClass"},
                {panel: panel3, title: "Page3"},
              ]}
              onClickBack={() => console.log("GoingBackwards")}
              onClickLater={() => {
                this.setState({isModalOpen: false});
                console.log("remind me later");
              }}
              height="150px"
            />
          )}
        </Example>
      </View>
    );
  }
}
