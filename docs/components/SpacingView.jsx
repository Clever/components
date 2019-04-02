import React, { PureComponent } from "react";

import View from "./View";

export default class SpacingView extends PureComponent {
  render() {
    const { cssClass } = SpacingView;

    return (
      <View className={cssClass.CONTAINER} title="Spacing">
        TODO
      </View>
    );
  }
}

SpacingView.cssClass = {
  CONTAINER: "SpacingView",
};
