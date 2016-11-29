import React, {PureComponent} from "react";

import View from "./View";

export default class PageLayoutView extends PureComponent {
  render() {
    const {cssClass} = PageLayoutView;

    return (
      <View className={cssClass.CONTAINER} title="Page Layouts">
        TODO
      </View>
    );
  }
}

PageLayoutView.cssClass = {
  CONTAINER: "PageLayoutView",
};
