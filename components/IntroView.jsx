import React from "react";

import View from "./View";


export default function IntroView() {
  const {cssClass} = IntroView;

  return (
    <View className={cssClass.CONTAINER} title="Introduction">
      TODO
    </View>
  );
}

IntroView.cssClass = {
  CONTAINER: "IntroView",
};
