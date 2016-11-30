import React from "react";

import View from "./View";


export default function LessStyleGuideView() {
  const {cssClass} = LessStyleGuideView;

  return (
    <View className={cssClass.CONTAINER} title="Less Style Guide">
      TODO
    </View>
  );
}

LessStyleGuideView.cssClass = {
  CONTAINER: "LessStyleGuideView",
};
