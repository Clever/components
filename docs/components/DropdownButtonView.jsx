/* eslint-disable no-alert */
import * as React from "react";

import Example from "./Example";
import View from "./View";
import {DropdownButton} from "src";

import "./DropdownButtonView.less";


export default function DropdownButtonView() {
  const {cssClass} = DropdownButtonView;
  const options = [
    {
      value: "Option 1",
      key: "1",
      onClick: () => alert("Option 1"),
    },
    {
      value: "Option 2",
      key: "2",
      onClick: () => alert("Option 2"),
    },
    {
      value: "Long option to see with text wrapping",
      key: "3",
      onClick: () => alert("Really long option"),
    },
  ];

  return (
    <View className={cssClass.CONTAINER} title="DropdownButton">
      <Example
        title="A note on options"
        code={`
          const options = [
            {
              value: "Option 1",
              key: "1",
              onClick: () => alert("Option 1"),
            },
            {
              value: "Option 2",
              key: "2",
              onClick: () => alert("Option 2"),
            },
            {
              value: "Long option to see with text wrapping",
              key: "3",
              onClick: () => alert("Really long option"),
            },
          ];
        `}
      >
        <span>In all the below examples, the options are defined as follows:</span>
      </Example>
      <Example
        title="DropdownButton Sizing"
        code={`
          <DropdownButton type="primary" size="large" value="Large" onClick={() => alert("Large")} options={options} />
          <DropdownButton type="primary" size="regular" value="Regular" options={options} />
          <DropdownButton type="primary" size="small" value="Small" options={options} />
        `}
      >
        <DropdownButton type="primary" size="large" value="Large" options={options} />
        <DropdownButton type="primary" size="regular" value="Regular" options={options} />
        <DropdownButton type="primary" size="small" value="Small" options={options} />
      </Example>

      <Example
        title="DropdownButton Fixed Width"
        code={`
          <DropdownButton type="primary" size="large" value="Large" onClick={() => alert("Large")} width="200px" options={options} />
          <DropdownButton type="primary" size="regular" value="Regular" width="175px" options={options} />
          <DropdownButton type="primary" size="small" value="Small" width="100px" options={options} />
        `}
      >
        <DropdownButton type="primary" size="large" value="Large" width="200px" options={options} />
        <DropdownButton type="primary" size="regular" value="Regular" width="175px" options={options} />
        <DropdownButton type="primary" size="small" value="Small" width="100px" options={options} />
      </Example>

      <Example
        title="DropdownButton DropdownWidth"
        code={`
          <DropdownButton type="primary" size="large" value="Large" onClick={() => alert("Large")} dropdownWidth="300px" options={options} />
          <DropdownButton type="primary" size="regular" value="Regular" dropdownWidth="100px" options={options} />
          <DropdownButton type="primary" size="small" value="Small" dropdownWidth="250px" options={options} />
        `}
      >
        <DropdownButton type="primary" size="large" value="Large" dropdownWidth="300px" options={options} />
        <DropdownButton type="primary" size="regular" value="Regular" dropdownWidth="100px" options={options} />
        <DropdownButton type="primary" size="small" value="Small" dropdownWidth="250px" options={options} />
      </Example>

      <Example
        title="DropdownButton Types"
        code={`
          <DropdownButton type="primary" value="Primary" options={options} />
          <DropdownButton type="secondary" value="Secondary" options={options} />
          <DropdownButton type="destructive" value="Destructive" options={options} />
          <DropdownButton disabled value="Disabled" options={options} />
        `}
      >
        <DropdownButton type="primary" value="Primary" options={options} />
        <DropdownButton type="secondary" value="Secondary" options={options} />
        <DropdownButton type="destructive" value="Destructive" options={options} />
        <DropdownButton disabled value="Disabled" options={options} />
      </Example>

      <Example
        title="DropdownButton-as-Link"
        code={`
          <DropdownButton type="primary" href="http://lmgtfy.com/?q=button-as-link" value="LMGTFY" options={options} />
          <DropdownButton type="secondary" href="http://lmgtfy.com/?q=button-as-link" value="LMGTFY" options={options} />
          <DropdownButton type="destructive" href="http://lmgtfy.com/?q=button-as-link" value="LMGTFY" options={options} />
          <DropdownButton disabled href="http://lmgtfy.com/?q=button-as-link" value="LMGTFY" options={options} />
        `}
      >
        <DropdownButton type="primary" href="http://lmgtfy.com/?q=button-as-link" value="LMGTFY" options={options} />
        <DropdownButton type="secondary" href="http://lmgtfy.com/?q=button-as-link" value="LMGTFY" options={options} />
        <DropdownButton type="destructive" href="http://lmgtfy.com/?q=button-as-link" value="LMGTFY" options={options} />
        <DropdownButton disabled href="http://lmgtfy.com/?q=button-as-link" value="LMGTFY" options={options} />
      </Example>

      <Example
        title="DropdownButton with HTML content"
        code={`
          <DropdownButton type="primary" value={<span className="fa fa-search" />} options={options} />
          <DropdownButton
            type="destructive"
            value={(
              <div>
                <span className="fa fa-trash" />
                {" "}
                Remove
              </div>
            )}
          options={options} />
          <DropdownButton
            disabled
            value={(
              <div>
                <span className="fa fa-spin fa-spinner" />
                {" "}
                Saving...
              </div>
            )}
          options={options} />
        `}
      >
        <DropdownButton type="primary" value={<span className="fa fa-search" />} options={options} />
        <DropdownButton
          type="destructive"
          value={(
            <div>
              <span className="fa fa-trash" />
              {" "}
              Remove
            </div>
          )}
          options={options}
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
          options={options}
        />
      </Example>
    </View>
  );
}

DropdownButtonView.cssClass = {
  CONTAINER: "DropdownButtonView",
};

