import React, {PureComponent} from "react";

import FlexExample from "../FlexExample";
import View from "./View";

export default class FlexBoxView extends PureComponent {
  render() {
    const {cssClass} = FlexBoxView;

    return (
      <View className={cssClass.CONTAINER} title="FlexBox">
        <FlexExample />
      </View>
    );
  }
}

FlexBoxView.cssClass = {
  CONTAINER: "FlexBoxView",
};
