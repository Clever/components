import React, {PureComponent} from "react";

import View from "./View";
import PropDocumentation from "./PropDocumentation";
import LeftNavExample from "../LeftNavExample";

export default class LeftNavView extends PureComponent {
  render() {
    const {cssClass} = LeftNavView;

    return (
      <View className={cssClass.CONTAINER} title="LeftNav">
        <p>
          <code>LeftNav</code> is a navigation sidebar component designed to be anchored to
          the left side of the page. It takes as its children a list consisting of top-level
          links (<code>LeftNav.NavLink</code>) as well as groups of nested links
          (<code>LeftNav.NavGroup</code>). Nested links are rendered in a slide-out drawer.
        </p>

        <LeftNavExample />

        <PropDocumentation
          availableProps={[
            {
              name: "children",
              type: "Array<Union<LeftNav.NavLink,LeftNav.NavGroup",
              description: "The links and link groups to render in the nav",
              optional: true,
            },
            {
              name: "className",
              type: "String",
              description: "Any additional classes to add to LeftNav",
              optional: true,
            },
            {
              name: "collapsed",
              type: "Boolean",
              description: "Shrinks the main navigation to just icons",
              defaultValue: false,
              optional: true,
            },
          ]}
          className={cssClass.PROPS}
          title="LeftNav"
        />

        <PropDocumentation
          availableProps={[
            {
              name: "className",
              type: "String",
              description: "Any additional classes to add to NavGroup",
              optional: true,
            },
            {
              name: "icon",
              type: "Node",
              description: "The node to render as the link icon",
              optional: true,
            },
            {
              name: "id",
              type: "String",
              description: "Unique identifier for this group",
            },
            {
              name: "label",
              type: "String",
              description: "The label to render as the link text",
            },
          ]}
          className={cssClass.PROPS}
          title="NavGroup"
        />

        <PropDocumentation
          availableProps={[
            {
              name: "className",
              type: "String",
              description: "Any additional classes to add to NavLink",
              optional: true,
            },
            {
              name: "icon",
              type: "Node",
              description: "The node to render as the link icon. Top level links should have an icon.",
              optional: true,
            },
            {
              name: "label",
              type: "String",
              description: "The label to render as the link text",
            },
            {
              name: "onClick",
              type: "Function",
              description: "Handler to call when the link is clicked",
              optional: true,
            },
            {
              name: "selected",
              type: "Boolean",
              description: "Whether or not to render the link as selected",
              defaultValue: false,
              optional: true,
            },
          ]}
          className={cssClass.PROPS}
          title="NavLink"
        />

      </View>
    );
  }
}

LeftNavView.cssClass = {
  CONTAINER: "LeftNavView",
};
