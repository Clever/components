import * as React from "react";

import Example from "./Example";
import View from "./View";
import {DropdownButton} from "src";

import "./DropdownButtonView.less";


export default function DropdownButtonView() {
  const {cssClass} = DropdownButtonView;

  return (
    <View className={cssClass.CONTAINER} title="DropdownButton">
      <Example
        title="DropdownButton Sizing"
        code={`
          <DropdownButton type="primary" size="large" value="Large" />
          <DropdownButton type="primary" size="regular" value="Regular" />
          <DropdownButton type="primary" size="small" value="Small" />
        `}
      >
        <DropdownButton type="primary" size="large" value="Large" />
        <DropdownButton type="primary" size="regular" value="Regular" />
        <DropdownButton type="primary" size="small" value="Small" />
      </Example>

      <Example
        title="DropdownButton Types"
        code={`
          <DropdownButton type="primary" value="Primary" />
          <DropdownButton type="secondary" value="Secondary" />
          <DropdownButton type="destructive" value="Destructive" />
          <DropdownButton disabled value="Disabled" />
          <DropdownButton type="link" href="http://clever.com" value="Link" />
          <DropdownButton disabled type="link" href="http://clever.com" value="Disabled Link" />
          <DropdownButton type="linkPlain" href="http://google.com" value="plain link" />
        `}
      >
        <DropdownButton type="primary" value="Primary" />
        <DropdownButton type="secondary" value="Secondary" />
        <DropdownButton type="destructive" value="Destructive" />
        <DropdownButton disabled value="Disabled" />
        <DropdownButton type="link" href="http://clever.com" value="Link" />
        <DropdownButton disabled type="link" href="http://clever.com" value="Disabled Link" />
        <DropdownButton type="linkPlain" href="http://google.com" value="Plain Link" />
        <p>
          Here is a <DropdownButton type="linkPlain" href="//google.com" value="plain link" /> with no
          margin/padding.
          <br />
          Better suited for inline links than the
          regular <DropdownButton type="link" href="http://google.com" value="link button" />, which doesn't
          automatically match the text around it.
        </p>
      </Example>

      <Example
        title="DropdownButton-as-Link"
        code={`
          <DropdownButton type="primary" href="http://lmgtfy.com/?q=button-as-link" value="LMGTFY" />
          <DropdownButton type="secondary" href="http://lmgtfy.com/?q=button-as-link" value="LMGTFY" />
          <DropdownButton type="destructive" href="http://lmgtfy.com/?q=button-as-link" value="LMGTFY" />
          <DropdownButton disabled href="http://lmgtfy.com/?q=button-as-link" value="LMGTFY" />
        `}
      >
        <DropdownButton type="primary" href="http://lmgtfy.com/?q=button-as-link" value="LMGTFY" />
        <DropdownButton type="secondary" href="http://lmgtfy.com/?q=button-as-link" value="LMGTFY" />
        <DropdownButton type="destructive" href="http://lmgtfy.com/?q=button-as-link" value="LMGTFY" />
        <DropdownButton disabled href="http://lmgtfy.com/?q=button-as-link" value="LMGTFY" />
      </Example>

      <Example
        title="DropdownButton with HTML content"
        code={`
          <DropdownButton type="primary" value={<span className="fa fa-search" />} />
          <DropdownButton
            type="destructive"
            value={(
              <div>
                <span className="fa fa-trash" />
                {" "}
                Remove
              </div>
            )}
          />
          <DropdownButton
            disabled
            value={(
              <div>
                <span className="fa fa-spin fa-spinner" />
                {" "}
                Saving...
              </div>
            )}
          />
          <DropdownButton
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
        <DropdownButton type="primary" value={<span className="fa fa-search" />} />
        <DropdownButton
          type="destructive"
          value={(
            <div>
              <span className="fa fa-trash" />
              {" "}
              Remove
            </div>
          )}
        />
        <DropdownButton
          disabled
          value={(
            <div>
              <span className="fa fa-spin fa-spinner" />
              {" "}
              Saving...
            </div>
          )}
        />
        <DropdownButton
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
    </View>
  );
}

DropdownButtonView.cssClass = {
  CONTAINER: "DropdownButtonView",
};

