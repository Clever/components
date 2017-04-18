import React, {PureComponent} from "react";

import View from "./View";
import PropDocumentation from "./PropDocumentation";
import TabBarExample from "../TabBarExample";

export default class TabBarView extends PureComponent {
  render() {
    const {cssClass} = TabBarView;

    return (
      <View className={cssClass.CONTAINER} title="TabBar">
        <TabBarExample />

        <PropDocumentation
          availableProps={[
            {
              name: "alignSelf",
              type: "ItemAlign",
              description: "Sets the cross-axis alignment of this flex item only",
              defaultValue: "ItemAlign.STRETCH",
              optional: true,
            },
            {
              name: "children",
              type: "Tab or Array<Tab>",
              description: "The tabs to render in the tab bar",
              optional: true,
            },
            {
              name: "className",
              type: "String",
              description: "Additional classname to apply to the InfoPanel",
              optional: true,
            },
            {
              name: "justify",
              type: "Justify",
              description: "Sets the horizontal alignment of the tab bar tabs.",
              defaultValue: "Justify.START",
              optional: true,
            },
            {
              name: "size",
              type: "TabBar.Size",
              description: "Controls the size of the tabs in the tab bar",
              defaultValue: "TabBar.Size.MEDIUM",
              optional: true,
            },
          ]}
          className={cssClass.PROPS}
          title="TabBar"
        />

        <PropDocumentation
          availableProps={[
            {
              name: "id",
              type: "Any",
              description: "The id of the tab. This must be unique in comparison to sibling tabs",
              defaultValue: "False",
            },
            {
              name: "children",
              type: "React Node",
              description: "The child items to render as the tab button label",
              optional: true,
            },
            {
              name: "className",
              type: "String",
              description: "Additional classname to apply to the InfoPanel",
              optional: true,
            },
            {
              name: "component",
              type: "Any",
              description: "Tagname of class for the wrapper component. Tab renders as a <button> by default (or "
              + "a <a> if the href prop is specified). It can be made to render as a different component by specifying "
              + "the component tagname or class. e.g. <Tab component={ReactRouter.Link} />",
              defaultValue: "button or a if href available",
              optional: true,
            },
            {
              name: "disabled",
              type: "Boolean",
              description: "Whether or not the tab is disabled. Disabled tabs will not emit onSelect events",
              defaultValue: "False",
              optional: true,
            },
            {
              name: "href",
              type: "String",
              description: "Causes the Tab to be rendered as an anchor element with the given href. Additional anchor "
              + "props, such as target, will be passed through to the anchor if specified",
              optional: true,
            },
            {
              name: "onSelect",
              type: "Function",
              description: "The select event handler for the tab, invoked with the id of the tab when it is clicked",
              defaultValue: "False",
              optional: true,
            },
            {
              name: "selected",
              type: "Boolean",
              description: "Whether or not the tab is currently selected. Note: Selected tabs will emit onSelect events",
              defaultValue: "False",
              optional: true,
            },
          ]}
          className={cssClass.PROPS}
          title="Tab"
        />
      </View>
    );
  }
}

TabBarView.cssClass = {
  CONTAINER: "TabBarView",
};
