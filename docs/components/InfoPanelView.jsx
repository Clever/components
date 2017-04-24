import React from "react";

import Example from "./Example";
import PropDocumentation from "./PropDocumentation";
import View from "./View";
import {InfoPanel, InfoPanelColumn} from "src";

import "./TextAreaView.less";

export default class InfoPanelView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      disabled: false,
      readOnly: false,
      required: false,
      inputValue: "",
    };
  }

  render() {
    const {cssClass} = InfoPanelView;

    return (
      <View className={cssClass.CONTAINER} title="InfoPanel">
        <Example>
          <InfoPanel title="Info Panel Title">
            <InfoPanelColumn>
              <p>column 1 content</p>
            </InfoPanelColumn>
            <InfoPanelColumn>
              <p>column 2 content</p>
            </InfoPanelColumn>
          </InfoPanel>
        </Example>

        <PropDocumentation
          availableProps={[
            {
              name: "children",
              type: "InfoPanelColumn",
              description: "The child columns to render",
            },
            {
              name: "className",
              type: "String",
              description: "Additional classname to apply to the InfoPanel",
              optional: true,
            },
            {
              name: "footer",
              type: "React Node",
              description: "Content to render in the InfoPanel footer",
              optional: true,
            },
            {
              name: "title",
              type: "String",
              description: "The InfoPanel title",
            },
          ]}
          className={cssClass.PROPS}
          title="InfoPanel"
        />

        <PropDocumentation
          availableProps={[
            {
              name: "children",
              type: "InfoPanelColumn",
              description: "The children elements to render in the column",
            },
            {
              name: "className",
              type: "String",
              description: "Additional classname to apply to the InfoPanelColumn",
              optional: true,
            },
          ]}
          className={cssClass.PROPS}
          title="InfoPanelColumn"
        />
      </View>
    );
  }

}

InfoPanelView.cssClass = {
  CONTAINER: "InfoPanelView",
};

