import React from "react";

import Example from "./Example";
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
        <Example
          code={`
            <InfoPanel title="Info Panel Title">
              <InfoPanelColumn>
                <p>column 1 content</p>
              </InfoPanelColumn>
              <InfoPanelColumn>
                <p>column 2 content</p>
              </InfoPanelColumn>
            </InfoPanel>
          `}
        >
          <div>
            <InfoPanel title="Info Panel Title">
              <InfoPanelColumn>
                <p>column 1 content</p>
              </InfoPanelColumn>
              <InfoPanelColumn>
                <p>column 2 content</p>
              </InfoPanelColumn>
            </InfoPanel>
          </div>
        </Example>
      </View>
    );
  }

}

InfoPanelView.cssClass = {
  CONTAINER: "InfoPanelView",
};

