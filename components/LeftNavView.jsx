import React, {PureComponent} from "react";

import View from "./View";
import LeftNavExample from "../LeftNavExample";

export default class LeftNavView extends PureComponent {
  render() {
    const {cssClass} = LeftNavView;

    return (
      <View className={cssClass.CONTAINER} title="LeftNav">
        <LeftNavExample />
      </View>
    );
  }
}

LeftNavView.cssClass = {
  CONTAINER: "LeftNavView",
};
