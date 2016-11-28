import React, {Component} from "react";

import Example from "./Example";
import View from "./View";
import {ConfirmationButton} from "src";


export default class ConfirmationButtonView extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const {cssClass} = ConfirmationButtonView;

    return (
      <View className={cssClass.CONTAINER} title="ConfirmationButton">
        <Example
          code={`
            <ConfirmationButton
              type="primary"
              confirmButtonType="destructive"
              modalTitle="Are you sure?"
              onClick={() => console.log("ConfirmationButton: modal opened!")}
              onClose={() => console.log("ConfirmationButton: modal closed!")}
              onConfirm={() => console.log("ConfirmationButton: confirmed!")}
              value="Submit for confirmation"
            >
              <p>This action requires confirmation. Please confirm!</p>
            </ConfirmationButton>
          `}
        >
          <ConfirmationButton
            type="primary"
            confirmButtonType="destructive"
            modalTitle="Are you sure?"
            onClick={() => console.log("ConfirmationButton: modal opened!")}
            onClose={() => console.log("ConfirmationButton: modal closed!")}
            onConfirm={() => console.log("ConfirmationButton: confirmed!")}
            value="Submit for confirmation"
          >
            <p>This action requires confirmation. Please confirm!</p>
          </ConfirmationButton>
        </Example>
      </View>
    );
  }
}

ConfirmationButtonView.cssClass = {
  CONTAINER: "ConfirmationButtonView",
};
