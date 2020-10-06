import _ from "lodash";
import Fade from "react-bootstrap/lib/Fade";
import React, { Component } from "react";
import { Link } from "react-router";

import Example, { CodeSample, ExampleCode } from "./Example";
import Hello from "./DropdownButtonViewData";
import PropDocumentation from "./PropDocumentation";
import View from "./View";
import { Button, DropdownButton, FlexBox, ItemAlign, SegmentedControl } from "src";
import FontAwesome from "react-fontawesome";

import "./DropdownButtonView.less";

export default class DropdownButtonView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      disabled: "0",
      goodbye: true,
      hello: "placeholder",
      samples: {},
      size: DropdownButton.Size.M,
      type: DropdownButton.Type.PRIMARY,
      arrowType: DropdownButton.ArrowType.CARET,
    };

    this.byeTimerID = null;
  }

  componentWillMount() {
    this.moreSamples();
  }

  moreSamples() {
    this.setState({ samples: _.sampleSize(Hello, 5) });
  }

  say(hello) {
    this.setState({ hello, goodbye: false });
    this.bye();
  }

  bye() {
    window.clearTimeout(this.byeTimerID);
    this.byeTimerID = window.setTimeout(() => this.setState({ goodbye: true }), 1500);
  }

  renderConfig() {
    const { Size, Type } = DropdownButton;
    const { cssClass } = DropdownButtonView;
    const { disabled, size, type, arrowType } = this.state;

    return (
      <FlexBox className={cssClass.CONFIG_CONTAINER}>
        <div className={cssClass.CONFIG}>
          Size:
          <SegmentedControl
            className={cssClass.CONFIG_OPTIONS}
            onSelect={(value) => this.setState({ size: value })}
            options={_.values(DropdownButton.Size).map((s) => ({
              content: s,
              value: s,
              disabled: type === Type.DESTRUCTIVE && s === Size.S,
            }))}
            value={size}
          />
        </div>
        <div className={cssClass.CONFIG}>
          Type:
          <SegmentedControl
            className={cssClass.CONFIG_OPTIONS}
            onSelect={(value) => this.setState({ type: value })}
            options={_.values(DropdownButton.Type).map((t) => ({
              content: t,
              value: t,
              disabled: size === Size.S && t === Type.DESTRUCTIVE,
            }))}
            value={type}
          />
        </div>
        <div className={cssClass.CONFIG}>
          Disabled:
          <SegmentedControl
            className={cssClass.CONFIG_OPTIONS}
            onSelect={(value) => this.setState({ disabled: value })}
            options={[
              { content: "false", value: "0" },
              { content: "true", value: "1" },
            ]}
            value={disabled}
          />
        </div>
        <div className={cssClass.CONFIG}>
          ArrowType:
          <SegmentedControl
            className={cssClass.CONFIG_OPTIONS}
            onSelect={(value) => this.setState({ arrowType: value })}
            options={_.values(DropdownButton.ArrowType).map((t) => ({
              content: t,
              value: t,
            }))}
            value={arrowType}
          />
        </div>
      </FlexBox>
    );
  }

  render() {
    const { Option } = DropdownButton;
    const { cssClass } = DropdownButtonView;
    const { goodbye, hello, samples, size, type, arrowType } = this.state;
    const disabled = this.state.disabled === "1";
    const emptyArray = [];

    return (
      <View
        className={cssClass.CONTAINER}
        title="DropdownButton"
        sourcePath="src/DropdownButton/DropdownButton.tsx"
      >
        <div className={cssClass.INTRO}>
          <p>
            Provides a multi-action button with a primary action and a toggle-enabled dropdown
            displaying a menu of secondary actions.
          </p>
          <p>
            Builds on the <Link to="/components/button">Button</Link> component and supports a
            subset of the configuration thereof, including size and color options.
          </p>
          <CodeSample>
            {`
              import {DropdownButton} from "clever-components";
              const {Option} = DropdownButton;
            `}
          </CodeSample>
        </div>

        <Example title="Basic Usage:">
          <Fade in={!goodbye} timeout={1000}>
            <span className={cssClass.HELLO}>{hello}</span>
          </Fade>
          <FlexBox alignItems={ItemAlign.CENTER}>
            <ExampleCode>
              <DropdownButton
                disabled={disabled}
                label={
                  <div>
                    <FontAwesome name="thumbs-up" /> Say hello
                  </div>
                }
                onClick={() => this.say("Hello")}
                size={size}
                type={type}
                arrowType={arrowType}
              >
                {Object.keys(samples).map((countryCode) => (
                  <Option key={countryCode} onClick={() => this.say(samples[countryCode].hello)}>
                    {samples[countryCode].country}
                  </Option>
                ))}
              </DropdownButton>
            </ExampleCode>
            <Button
              className={cssClass.MORE_SAMPLES}
              onClick={() => this.moreSamples()}
              type="linkPlain"
              value={<span className="fa fa-refresh" />}
            />
          </FlexBox>
          {this.renderConfig()}
        </Example>

        <Example title="With Fixed Width:">
          <ExampleCode>
            <DropdownButton
              className={cssClass.DROPDOWN_WIDTH_400PX}
              disabled={disabled}
              label="A really really long label"
              size={size}
              type={type}
              arrowType={arrowType}
            >
              <Option>Another really really long label.</Option>
              <Option>
                Secondary option labels will wrap if they are longer than the main one.
              </Option>
            </DropdownButton>
          </ExampleCode>
          {this.renderConfig()}
        </Example>

        <Example title="With HREFs:">
          <ExampleCode>
            <DropdownButton
              disabled={disabled}
              label="EdTech News"
              href="http://google.com/search?q=edtech+news"
              size={size}
              type={type}
              arrowType={arrowType}
            >
              <Option href="http://www.centerdigitaled.com">Converge</Option>
              <Option href="http://www.example.com" disabled>
                Disabled Option
              </Option>
              <Option href="http://www.edsurge.com">EdSurge</Option>
              <Option href="http://www.edtechmagazine.com">EdTech Magazine</Option>
              <Option href="http://www.techlearning.com">Tech & Learning</Option>
            </DropdownButton>
          </ExampleCode>
          {this.renderConfig()}
        </Example>

        <Example title="With Single-Button Fallback:">
          <p>If no options are available, no toggle is rendered with the primary action.</p>
          <ExampleCode>
            <DropdownButton
              disabled={disabled}
              label="Primary action"
              size={size}
              type={type}
              arrowType={arrowType}
            >
              {emptyArray.map((secondaryAction) => (
                <Option key={secondaryAction}>{secondaryAction}</Option>
              ))}
            </DropdownButton>
          </ExampleCode>
          {this.renderConfig()}
        </Example>

        <PropDocumentation
          title="<DropdownButton /> Props"
          availableProps={[
            {
              name: "children",
              type: "DropdownButton.Option | DropdownButton.Option[]",
              description: "The secondary options shown in the dropdown.",
            },
            {
              name: "className",
              type: "string",
              description: "Optional additional CSS class name to apply to the count span.",
            },
            {
              name: "disabled",
              type: "boolean",
              description: "Disables the button if specified.",
              defaultValue: "false",
            },
            {
              name: "href",
              type: "string",
              description:
                "Optional URL for the main action button. The button is rendered as an anchor " +
                "element if `href`` is specified.",
            },
            {
              name: "label",
              type: "node",
              description: "Label for the main action button.",
            },
            {
              name: "onClick",
              type: "function",
              description: "onClick event handler for the main action button.",
            },
            {
              name: "size",
              type: "DropdownButton.Size",
              description: "The button size - affects sizing for the whole component.",
              defaultValue: "DropdownButton.Size.M",
            },
            {
              name: "target",
              type: "string",
              description: (
                <div>
                  <p>The window target for the link button, if `href` is specified.</p>
                  <p>
                    Supports <code>_self</code> and <code>_blank</code>.
                  </p>
                </div>
              ),
              defaultValue: "_blank",
            },
            {
              name: "type",
              type: "DropdownButton.Type",
              description: "The button type - affects secondary action buttons as well.",
              defaultValue: "DropdownButton.Type.PRIMARY",
            },
            {
              name: "arrowType",
              type: "Dropdown.ArrowType",
              description: "This determines the arrow type for the dropdown button",
              defaultValue: "DropdownButton.ArrowType.CARET",
              optional: true,
            },
          ]}
          className={cssClass.PROPS}
        />

        <PropDocumentation
          title="<DropdownButton.Option /> Props"
          availableProps={[
            {
              name: "children",
              type: "React Node",
              description: "The label for the option button.",
            },
            {
              name: "className",
              type: "string",
              description: "Optional additional CSS class name to apply to the count span.",
            },
            {
              name: "disabled",
              type: "boolean",
              description: "Disables the option button if specified.",
              defaultValue: "false",
            },
            {
              name: "href",
              type: "string",
              description:
                "Optional URL for the main action button. The button is rendered as an anchor " +
                "element if `href`` is specified.",
            },
            {
              name: "onClick",
              type: "function",
              description: "onClick event handler for the option button.",
            },
            {
              name: "size",
              type: "DropdownButton.Size",
              description: "The button size - affects sizing for the whole component.",
              defaultValue: "DropdownButton.Size.M",
            },
            {
              name: "target",
              type: "string",
              description: (
                <div>
                  <p>The window target for the link button, if `href` is specified.</p>
                  <p>
                    Supports <code>_self</code> and <code>_blank</code>.
                  </p>
                </div>
              ),
              defaultValue: "_blank",
            },
          ]}
          className={cssClass.PROPS}
        />
      </View>
    );
  }
}

DropdownButtonView.cssClass = {
  CONFIG_CONTAINER: "DropdownButtonView--configContainer",
  CONFIG_OPTIONS: "DropdownButtonView--configOptions",
  CONFIG: "DropdownButtonView--config",
  CONTAINER: "DropdownButtonView",
  DROPDOWN_WIDTH_400PX: "DropdownButtonView--dropdown--400px",
  HELLO: "DropdownButtonView--hello",
  INTRO: "DropdownButtonView--intro",
  MORE_SAMPLES: "DropdownButtonView--moreSamples",
  PROPS: "DropdownButtonView--props",
};
