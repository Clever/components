import React, {PureComponent} from "react";

import PropDocumentation from "./PropDocumentation";
import FlexExample from "../FlexExample";
import View from "./View";

export default class FlexBoxView extends PureComponent {
  render() {
    const {cssClass} = FlexBoxView;

    return (
      <View className={cssClass.CONTAINER} title="FlexBox">
        <p>
          <code>FlexBox</code> provides a flex-enabled container as a convenience wrapper around the clever-components
          flex CSS classes. A <code>FlexBox</code> may contain any other renderable elements, including other
          <code>FlexBox</code> components or <code>FlexItems</code>.
        </p>
        <p>
          <code>FlexItem</code> similarly provides a convenience wrapper around flex item-specific CSS classes and may
          in turn contain any combination of React-supported elements.
        </p>
        <p>
          <strong>NOTE:</strong> Using a <code>FlexItem</code> properties have no effect on an element unless it is
          rendered within a <code>FlexBox</code> or other <code>display: flex</code> container. However <code>FlexBox</code>
          can be used without <code>FlexItem</code> in many cases.
        </p>
        <FlexExample />

        <PropDocumentation
          availableProps={[
            {
              name: "alignContent",
              type: "ContentAlign",
              description: "Sets the cross-axis alignment of multi-line content",
              defaultValue: "ContentAlign.STRETCH",
              optional: true,
            },
            {
              name: "alignItems",
              type: "ItemAlign",
              description: "Sets the cross-axis alignment of single-line content",
              defaultValue: "ItemAlign.STRETCH",
              optional: true,
            },
            {
              name: "children",
              type: "React Node",
              description: "The child items to render in the flex box",
              optional: true,
            },
            {
              name: "className",
              type: "String",
              description: "Additional classname to apply to the flex box",
              optional: true,
            },
            {
              name: "column",
              type: "Boolean",
              description: "Switches the flex box to a column-direction main axis. Child items will flow vertically.",
              defaultValue: "False",
              optional: true,
            },
            {
              name: "inline",
              type: "Boolean",
              description: "Enables the inline-flex display mode for the flex box. The flex box container will fit "
                + "the width of its content and share the line with any other inline elements. Similar to display: inline-block.",
              defaultValue: "False",
              optional: true,
            },
            {
              name: "justify",
              type: "Justify",
              description: "Sets the main-axis alignment of the flex box content",
              defaultValue: "Justify.START",
              optional: true,
            },
            {
              name: "wrap",
              type: "Boolean",
              description: "Causes child items to wrap if they are unable to fit on a single line. By default, flex items"
              + " will shrink up to their minimum widths without wrapping, eventually causing them to overflow their container."
              + " Wrap allows items to wrap to the multiple lines if necessary.",
              defaultValue: "False",
              optional: true,
            },
          ]}
          className={cssClass.PROPS}
          title="FlexBox"
        />

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
              type: "React Node",
              description: "The child items to render in the flex box",
              optional: true,
            },
            {
              name: "className",
              type: "String",
              description: "Additional classname to apply to the flex box",
              optional: true,
            },
            {
              name: "component",
              type: "Any",
              description: "Tagname of class for the wrapper component. FlexItem renders as a <div> by default. It can be made to "
              + "render as a different component by specifying the component tagname or class. e.g. <FlexItem component='li' /> "
              + "or <FlexItem component={Button} />",
              defaultValue: "div",
              optional: true,
            },
            {
              name: "grow",
              type: "Boolean",
              description: "Fluidly grows the item to fill any available space along the main axis",
              defaultValue: "False",
              optional: true,
            },
            {
              name: "justify",
              type: "Justify",
              description: "Sets the main-axis alignment of the flex box content",
              defaultValue: "Justify.START",
              optional: true,
            },
            {
              name: "noShrink",
              type: "Boolean",
              description: (
                <div>
                  Prevents the item from shrinking past its set width or width of its contents.
                  Equivalent to setting <code>flex-shrink</code> to 0.{" "}
                  <a
                    href="https://developer.mozilla.org/en-US/docs/Web/CSS/flex-shrink"
                    target="_blank"
                  >
                    Learn more
                  </a>
                </div>
              ),
              defaultValue: "False",
              optional: true,
            },
            {
              name: "wrap",
              type: "Boolean",
              description: "Causes child items to wrap if they are unable to fit on a single line. By default, flex items"
              + " will shrink up to their minimum widths without wrapping, eventually causing them to overflow their container."
              + " Wrap allows items to wrap to the multiple lines if necessary.",
              defaultValue: "False",
              optional: true,
            },
          ]}
          className={cssClass.PROPS}
          title="FlexItem"
        />
      </View>
    );
  }
}

FlexBoxView.cssClass = {
  CONTAINER: "FlexBoxView",
};
