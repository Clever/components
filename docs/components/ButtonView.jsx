import React from "react";
import { Link } from "react-router";

import Example, { ExampleCode } from "./Example";
import PropDocumentation from "./PropDocumentation";
import View from "./View";
import { Button } from "src";

import "./ButtonView.less";

let _focusExampleRef;

export default function ButtonView() {
  const { cssClass } = ButtonView;

  return (
    <View className={cssClass.CONTAINER} title="Button" sourcePath="src/Button/Button.tsx">
      <p>This is a set of button components with various sizes and types.</p>
      <p>
        See also: <Link to="/components/confirmation-button">Confirmation Button</Link>
        {" | "}
        <Link to="/components/dropdown-button">Dropdown Button</Link>
        {" | "}
        <Link to="/components/modal-button">Modal Button</Link>
      </p>
      <Example title="Button Sizing">
        <Button type="primary" size="large" value="Large" />
        <Button type="primary" size="regular" value="Regular" />
        <Button type="primary" size="small" value="Small" />
      </Example>

      <Example title="Button Types">
        <ExampleCode>
          <Button type="primary" value="Primary" />
          <Button type="secondary" value="Secondary" />
          <Button type="destructive" value="Destructive" />
          <Button type="secondaryDestructive" value="Secondary Destructive" />
          <Button disabled value="Disabled" />
          <Button type="link" href="http://clever.com" value="Link" />
          <Button disabled type="link" href="http://clever.com" value="Disabled Link" />
          <Button type="linkPlain" href="http://google.com" value="Plain Link" />
        </ExampleCode>
        <p>
          <br />
          Here is an{" "}
          <Button
            type="linkPlain"
            href="//google.com"
            value="underlined plain link"
            underlined
          />{" "}
          with no margin/padding.
          <br />
          Better suited for inline links than the regular{" "}
          <Button type="link" href="http://google.com" value="link button" />, which doesn't
          automatically match the text around it.
        </p>
      </Example>

      <Example title="Button-as-Link">
        <Button type="primary" href="http://lmgtfy.com/?q=button-as-link" value="LMGTFY" />
        <Button type="secondary" href="http://lmgtfy.com/?q=button-as-link" value="LMGTFY" />
        <Button type="destructive" href="http://lmgtfy.com/?q=button-as-link" value="LMGTFY" />
        <Button disabled href="http://lmgtfy.com/?q=button-as-link" value="LMGTFY" />
      </Example>

      <Example title="Button with HTML content">
        <Button type="primary" value={<span className="fa fa-search" />} />
        <Button type="destructive">
          <div>
            <span className="fa fa-trash" /> Remove
          </div>
        </Button>
        <Button disabled>
          <div>
            <span className="fa fa-spin fa-spinner" /> Saving...
          </div>
        </Button>
        <Button href="http://wikipedia.org" type="link">
          <span>
            <span className="fa fa-external-link" /> Learn more
          </span>
        </Button>
      </Example>

      <h3>API:</h3>

      <Example
        title={
          <span>
            <code>focus()</code>/<code>blur()</code>
          </span>
        }
      >
        <ExampleCode>
          <Button
            ref={(ref) => {
              _focusExampleRef = ref;
            }}
            type="destructive"
          >
            Focus on me!
          </Button>

          <Button
            onClick={() => {
              _focusExampleRef.focus();
              window.setTimeout(() => _focusExampleRef.blur(), 1000);
            }}
            size={Button.Size.S}
            type="link"
          >
            <span>
              <code>focus()</code> ...but just for a second
            </span>
          </Button>
        </ExampleCode>
      </Example>

      <PropDocumentation
        availableProps={[
          {
            name: "children",
            type: "ReactNode",
            optional: true,
            description:
              "The content that appears in the button, and takes precedence over 'value'",
          },
          {
            name: "value",
            type: "ReactNode",
            optional: true,
            description:
              "(Deprecated, use children instead) The content that appears in the button if children are not specified",
          },
          {
            name: "type",
            type: "String",
            description: "One of primary, secondary, destructive, link, linkPlain, plain",
            optional: true,
            defaultValue: "secondary",
          },
          {
            name: "size",
            type: "String",
            description: "One of large, regular, small",
            optional: true,
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
            type: "String",
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
          {
            name: "submit",
            type: "Bool",
            description: "Behaves as a submit button when true",
            optional: true,
            defaultValue: "false",
          },
          {
            name: "underlined",
            type: "Bool",
            description: "Optional border-bottom for plain links",
            optional: true,
            defaultValue: "false",
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
