import React, {PureComponent} from "react";

import View from "./View";

export default class ColorsView extends PureComponent {
  render() {
    const {cssClass} = ColorsView;

    return (
      <View className={cssClass.CONTAINER} title="Colors">
        TODO
      </View>
    );
  }
}

ColorsView.cssClass = {
  CONTAINER: "ColorsView",
};
