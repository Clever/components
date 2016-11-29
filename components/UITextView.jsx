import React, {PureComponent} from "react";

import View from "./View";

export default class UITextView extends PureComponent {
  render() {
    const {cssClass} = UITextView;

    return (
      <View className={cssClass.CONTAINER} title="UI Text">
        TODO
      </View>
    );
  }
}

UITextView.cssClass = {
  CONTAINER: "UITextView",
};
