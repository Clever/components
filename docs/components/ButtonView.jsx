import React from "react";

import Example from "./Example";
import PropDocumentation from "./PropDocumentation";
import View from "./View";
import {Button} from "src";

import "./ButtonView.less";


export default function ButtonView() {
  const {cssClass} = ButtonView;

  return (
    <View className={cssClass.CONTAINER} title="Button">
      <Example
        title="Button Sizing"
        code={`
          <Button type="primary" size="large" value="Large" />
          <Button type="primary" size="regular" value="Regular" />
          <Button type="primary" size="small" value="Small" />
        `}
      >
        <Button type="primary" size="large" value="Large" />
        <Button type="primary" size="regular" value="Regular" />
        <Button type="primary" size="small" value="Small" />
      </Example>

      <Example
        title="Button Types"
        code={`
          <Button type="primary" value="Primary" />
          <Button type="secondary" value="Secondary" />
          <Button type="destructive" value="Destructive" />
          <Button disabled value="Disabled" />
          <Button type="link" href="http://clever.com" value="Link" />
          <Button disabled type="link" href="http://clever.com" value="Disabled Link" />
          <Button type="linkPlain" href="http://google.com" value="plain link" />
        `}
      >
        <Button type="primary" value="Primary" />
        <Button type="secondary" value="Secondary" />
        <Button type="destructive" value="Destructive" />
        <Button disabled value="Disabled" />
        <Button type="link" href="http://clever.com" value="Link" />
        <Button disabled type="link" href="http://clever.com" value="Disabled Link" />
        <Button type="linkPlain" href="http://google.com" value="Plain Link" />
        <p>
          Here is a <Button type="linkPlain" href="//google.com" value="plain link" /> with no
          margin/padding.
          <br />
          Better suited for inline links than the
          regular <Button type="link" href="http://google.com" value="link button" />, which doesn't
          automatically match the text around it.
        </p>
      </Example>

      <Example
        title="Button-as-Link"
        code={`
          <Button type="primary" href="http://lmgtfy.com/?q=button-as-link" value="LMGTFY" />
          <Button type="secondary" href="http://lmgtfy.com/?q=button-as-link" value="LMGTFY" />
          <Button type="destructive" href="http://lmgtfy.com/?q=button-as-link" value="LMGTFY" />
          <Button disabled href="http://lmgtfy.com/?q=button-as-link" value="LMGTFY" />
        `}
      >
        <Button type="primary" href="http://lmgtfy.com/?q=button-as-link" value="LMGTFY" />
        <Button type="secondary" href="http://lmgtfy.com/?q=button-as-link" value="LMGTFY" />
        <Button type="destructive" href="http://lmgtfy.com/?q=button-as-link" value="LMGTFY" />
        <Button disabled href="http://lmgtfy.com/?q=button-as-link" value="LMGTFY" />
      </Example>

      <Example
        title="Button with HTML content"
        code={`
          <Button type="primary" value={<span className="fa fa-search" />} />
          <Button
            type="destructive"
            value={(
              <div>
                <span className="fa fa-trash" />
                {" "}
                Remove
              </div>
            )}
          />
          <Button
            disabled
            value={(
              <div>
                <span className="fa fa-spin fa-spinner" />
                {" "}
                Saving...
              </div>
            )}
          />
          <Button
            href="http://wikipedia.org"
            type="link"
            value={(
              <span>
                <span className="fa fa-external-link" />
                {" "}
                Learn more
              </span>
            )}
          />
        `}
      >
        <Button type="primary" value={<span className="fa fa-search" />} />
        <Button
          type="destructive"
          value={(
            <div>
              <span className="fa fa-trash" />
              {" "}
              Remove
            </div>
          )}
        />
        <Button
          disabled
          value={(
            <div>
              <span className="fa fa-spin fa-spinner" />
              {" "}
              Saving...
            </div>
          )}
        />
        <Button
          href="http://wikipedia.org"
          type="link"
          value={(
            <span>
              <span className="fa fa-external-link" />
              {" "}
              Learn more
            </span>
          )}
        />
      </Example>

      <PropDocumentation
        availableProps={[
          {
            name: "value",
            type: "string",
            description: "The text that appears on the button",
          },
          {
            name: "type",
            type: "String",
            description: "One of primary, secondary, destructive, link, linkPlain, plain",
            defaultValue: "secondary",
          },
          {
            name: "size",
            type: "String",
            description: "One of large, regular, small",
            defaultValue: "regular",
          },
          {
            name: "onClick",
            type: "Function",
            description: "Called when the user clicks on the button",
            optional: true,
          },
          {
            name: "href",
            type: "String",
            description: "If provided, cause the button to behave as a link",
            optional: true,
          },
          {
            name: "target",
            type:"String",
            description: "For links, either _self or _blank",
            defaultValue: "_blank",
            optional: true,
          },
          {
            name: "disabled",
            type: "Bool",
            description: "User interaction is disabled when true",
            defaultValue: "false",
            optional: true,
          },
          {
            name: "style",
            type: "Object",
            description: "Add custom styles (e.g. margin) if you must",
            optional: true,
          },
          {
            name: "className",
            type: "string",
            description: "Optional additional classname to apply to the button",
            optional: true,
          },
        ]}
        className={cssClass.PROPS}
      />
    </View>
  );
}

ButtonView.cssClass = {
  CONTAINER: "ButtonView",
};
