import React, {PureComponent} from "react";

import View from "./View";

export default class TypographyView extends PureComponent {
  render() {
    const {cssClass} = TypographyView;

    return (
      <View className={cssClass.CONTAINER} title="Typography">
        TODO
      </View>
    );
  }
}

TypographyView.cssClass = {
  CONTAINER: "TypographyView",
};
