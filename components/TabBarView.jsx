import React, {PureComponent} from "react";

import View from "./View";
import TabBarExample from "../TabBarExample";

export default class TabBarView extends PureComponent {
  render() {
    const {cssClass} = TabBarView;

    return (
      <View className={cssClass.CONTAINER} title="TabBar">
        <TabBarExample />
      </View>
    );
  }
}

TabBarView.cssClass = {
  CONTAINER: "TabBarView",
};
