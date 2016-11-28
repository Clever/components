import React, {PureComponent} from "react";

import View from "./View";
import WizardExample from "../WizardExample";

export default class WizardView extends PureComponent {
  render() {
    const {cssClass} = WizardView;

    return (
      <View className={cssClass.CONTAINER} title="Wizard">
        <WizardExample />
      </View>
    );
  }
}

WizardView.cssClass = {
  CONTAINER: "WizardView",
};
