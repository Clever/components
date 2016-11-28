import React, {PureComponent} from "react";

import View from "./View";

export default class FontView extends PureComponent {
  render() {
    const {cssClass} = FontView;

    return (
      <View className={cssClass.CONTAINER} title="Font">
        TODO
      </View>
    );
  }
}

FontView.cssClass = {
  CONTAINER: "FontView",
};
