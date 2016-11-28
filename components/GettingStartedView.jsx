import React from "react";

import View from "./View";


export default function GettingStartedView() {
  const {cssClass} = GettingStartedView;

  return (
    <View className={cssClass.CONTAINER} title="Getting Started">
      TODO
    </View>
  );
}

GettingStartedView.cssClass = {
  CONTAINER: "GettingStartedView",
};
