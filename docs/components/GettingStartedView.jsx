import React from "react";

import View from "./View";


export default function GettingStartedView() {
  const {cssClass} = GettingStartedView;

  return (
    <View className={cssClass.CONTAINER} title="Getting Started">
      TODO
      * how to install components
      * use usage section from readme
      CONTRIBUTING
      Testing
      Testing in multiple browsers (browserstack)
      PR Template
      Bump version
      Manually deploying examples with deploy script
    </View>
  );
}

GettingStartedView.cssClass = {
  CONTAINER: "GettingStartedView",
};
