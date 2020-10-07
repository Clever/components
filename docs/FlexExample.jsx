import classnames from "classnames";
import React from "react";

import { Button } from "../src/Button/Button";
import { FlexBox, FlexItem, ItemAlign, Justify } from "../src/flex";

import "./FlexExample.less";
import "../src/less/spacing.less";

export default function FlexExample() {
  const { cssClass } = FlexExample;

  return (
    <div className={cssClass.CONTAINER}>
      <h2>Simple</h2>
      <p>A FlexBox may contain regular HTML elements.</p>
      <FlexBox className={classnames(cssClass.BOX, cssClass.BOX_MIN_WIDTH)}>
        <div className={cssClass.ITEM}>
          <span className={classnames(cssClass.fa("exclamation-triangle"), cssClass.ALERT)} />
        </div>
        <div className={cssClass.ITEM}>You have received a notification!</div>
        <Button className={cssClass.ITEM} type="linkPlain" value="Got it" />
      </FlexBox>

      <h2>With grow-enabled item</h2>
      <p>
        FlexItem children with <code>grow={"{true}"}</code> will fill any available space.
      </p>
      <FlexBox className={classnames(cssClass.BOX, cssClass.BOX_MIN_WIDTH)}>
        <div className={cssClass.ITEM}>
          <span className={classnames(cssClass.fa("exclamation-triangle"), cssClass.ALERT)} />
        </div>
        <FlexItem className={cssClass.ITEM} grow>
          You have received a notification!
        </FlexItem>
        <Button className={cssClass.ITEM} type="linkPlain" value="Got it" />
      </FlexBox>

      <h2>FlexBox as FlexItem</h2>
      <p>
        FlexBoxes can be nested as any other elements. FlexItem properties, such as{" "}
        <code>grow</code> can also be applied for FlexItem behavior.
      </p>
      <FlexBox className={classnames(cssClass.BOX, cssClass.BOX_MIN_WIDTH)}>
        <FlexBox className={cssClass.ITEM} alignItems={ItemAlign.CENTER}>
          <span className={cssClass.fa("trophy")} />
        </FlexBox>
        <FlexBox className={cssClass.ITEM} grow>
          <FlexItem className={cssClass.ITEM} grow>
            <h3>100m</h3>
            <p>World record: 9.58s</p>
            <p>Record holder: Usain Bolt</p>
            <p>Last updated: Aug 16, 2009</p>
          </FlexItem>
          <FlexItem className={cssClass.ITEM} grow>
            <h3>200m</h3>
            <p>World record: 19.19s</p>
            <p>Record holder: Usain Bolt</p>
            <p>Last updated: Aug 20, 2009</p>
          </FlexItem>
        </FlexBox>
        <Button className={cssClass.ITEM} type="linkPlain" value="Close" />
      </FlexBox>

      <h2>With wrapped FlexItems</h2>
      <p>
        Setting <code>wrap={"{true}"}</code> causes FlexBox children to wrap to the next line when
        there isn't enough space on one line.
      </p>
      <p>
        FlexBox and FlexItem are divs by default but can be rendered as any element or component.
        Here, the FlexBox is rendered as a <code>{"<ul>"}</code> and the FlexItems as{" "}
        <code>{"<li>"}</code>s.
      </p>
      <FlexBox
        className={classnames(cssClass.BOX, cssClass.BOX_TINY, cssClass.RESIZABLE_X)}
        component="ul"
        wrap
      >
        {["ambulance", "car", "taxi", "bus", "train", "truck", "subway"].map((faIcon, i) => (
          <FlexBox className={cssClass.ITEM} component="li" grow justify={Justify.CENTER} key={i}>
            <span className={cssClass.fa(faIcon)} />
          </FlexBox>
        ))}
      </FlexBox>

      <h2>Column-direction FlexBox</h2>
      <p>
        Setting <code>column={"{true}"}</code> causes FlexBox children to be arranged vertically.
        FlexItem properties such as <code>grow</code> now act along the vertical axis.
      </p>
      <FlexBox
        className={classnames(cssClass.BOX, cssClass.RESIZABLE_Y)}
        column
        component="ul"
        alignItems={ItemAlign.START}
      >
        {["ambulance", "car", "taxi", "bus", "train"].map((faIcon, i) => (
          <FlexBox
            className={cssClass.ITEM}
            component="li"
            grow
            alignItems={ItemAlign.CENTER}
            key={i}
          >
            <span className={cssClass.fa(faIcon)} />
          </FlexBox>
        ))}
      </FlexBox>
    </div>
  );
}

FlexExample.cssClass = {
  ALERT: "color--alert--orange",
  BOX: "FlexExample--box",
  BOX_MIN_WIDTH: "FlexExample--box--minWidth",
  BOX_TINY: "FlexExample--box--tiny",
  CONTAINER: "FlexExample",
  ITEM: "FlexExample--item",
  RESIZABLE_X: "FlexExample--box--resizable--x",
  RESIZABLE_Y: "FlexExample--box--resizable--y",

  fa: fontAwesomeClass => `fa fa-fw fa-${fontAwesomeClass}`,
};
