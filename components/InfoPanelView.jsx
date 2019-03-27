import React from "react";

import Example, { ExampleCode } from "./Example";
import PropDocumentation from "./PropDocumentation";
import View from "./View";
import { FlexBox, InfoPanel, InfoPanelColumn } from "src";

import "./TextAreaView.less";

export default class InfoPanelView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      disabled: false,
      readOnly: false,
      required: false,
      inputValue: "",
      collapsible: false,
      footer: false,
      hideTitle: false,
    };
  }

  _renderCheckbox(id) {
    const { cssClass } = InfoPanelView;

    return (
      <label className={cssClass.CONFIG}>
        <input
          checked={this.state[id]}
          type="checkbox"
          onChange={e => this.setState({ [id]: e.target.checked })}
        />
        &nbsp;
        {id}
      </label>
    );
  }

  render() {
    const { cssClass } = InfoPanelView;
    const { collapsible, footer, hideTitle } = this.state;

    return (
      <View className={cssClass.CONTAINER} title="InfoPanel">
        <Example>
          <ExampleCode>
            <InfoPanel
              title="Info Panel Title"
              collapsible={collapsible}
              footer={footer ? "footer content" : null}
              hideTitle={hideTitle}
            >
              <InfoPanelColumn>
                <p>column 1 content</p>
              </InfoPanelColumn>
              <InfoPanelColumn>
                <p>column 2 content</p>
              </InfoPanelColumn>
            </InfoPanel>
          </ExampleCode>
          <FlexBox className={cssClass.CONFIG_CONTAINER}>
            {this._renderCheckbox("collapsible")}
            {this._renderCheckbox("footer")}
            {this._renderCheckbox("hideTitle")}
          </FlexBox>
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
              optional: true,
            },
            {
              name: "hideTitle",
              type: "Boolean",
              description:
                "Determines if the title header should be hidden. No effect if collapsible is true",
              optional: true,
            },
            {
              name: "collapsible",
              type: "Boolean",
              description: "True if InfoPanel content can collapse into the title",
              optional: true,
            },
            {
              name: "defaultOpen",
              type: "Boolean",
              description:
                "Used in conjunction with collapsible. True if the InfoPanel should be open on loading",
              optional: true,
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
  CONFIG: "TextAreaView--configContainer",
  CONFIG_CONTAINER: "TextAreaView--config",
};
