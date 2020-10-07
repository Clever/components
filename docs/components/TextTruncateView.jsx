import * as React from "react";
import classNames from "classnames";
import loremIpsum from "lorem-ipsum";

import Example, { CodeSample, ExampleCode } from "./Example";
import PropDocumentation from "./PropDocumentation";
import View from "./View";
import { TextTruncate, FlexBox, ItemAlign, SegmentedControl, TextInput } from "src";

import "./TextTruncateView.less";

const cssClass = {
  CONFIG_CONTAINER: "TextTruncateView--configContainer",
  CONFIG_OPTIONS: "TextTruncateView--configOptions",
  USAGE: "TextTruncateView--usage",
  CONFIG: "TextTruncateView--config",
  CONFIG_INPUT_MORE: "TextTruncateView--input--showMoreLabel",
  CONFIG_INPUT_LESS: "TextTruncateView--input--showLessLabel",
  CONTAINER: "TextTruncateView",
  INTRO: "TextTruncateView--intro",
  PROPS: "TextTruncateView--props",
};

export default class TextTruncateView extends React.PureComponent {
  static cssClass = cssClass;

  state = {
    maxCharsShown: 300,
    showMoreLabel: "Show more",
    showLessLabel: "Show less",
    showLongText: true,
    useRichText: false,
  };

  constructor(props) {
    super(props);

    this.shortText = loremIpsum({ count: 7, units: "words" });
    this.longText = loremIpsum({ count: 4, units: "paragraphs" });
  }

  render() {
    const { maxCharsShown, showMoreLabel, showLessLabel, showLongText, useRichText } = this.state;

    return (
      <View
        className={cssClass.CONTAINER}
        title="TextTruncate"
        sourcePath="src/TextTruncate/TextTruncate.tsx"
      >
        <header className={cssClass.INTRO}>
          <p>Truncate text with read more/less toggle</p>
          <CodeSample>
            {`
              import {TextTruncate} from "clever-components";
              // OR
              import TextTruncate from "clever-components/dist/TextTruncate"; // Avoids importing all of clever-components.
            `}
          </CodeSample>
        </header>

        <Example title="Basic Usage:">
          <ExampleCode>
            <TextTruncate
              className={cssClass.USAGE}
              maxCharsShown={maxCharsShown}
              showMoreLabel={showMoreLabel}
              showLessLabel={showLessLabel}
              useRichText={useRichText}
              text={showLongText ? this.longText : this.shortText}
            />
          </ExampleCode>
          {this._renderConfig()}
        </Example>

        {this._renderProps()}
      </View>
    );
  }

  _renderConfig() {
    const { showLongText, maxCharsShown, showMoreLabel, showLessLabel, useRichText } = this.state;

    return (
      <FlexBox alignItems={ItemAlign.CENTER} className={cssClass.CONFIG_CONTAINER} wrap>
        <div className={cssClass.CONFIG}>
          Text length:
          <SegmentedControl
            className={cssClass.CONFIG_OPTIONS}
            onSelect={value => this.setState({ showLongText: value === "long" })}
            options={[{ content: "Short", value: "short" }, { content: "Long", value: "long" }]}
            value={showLongText ? "long" : "short"}
          />
        </div>
        <div className={cssClass.CONFIG}>
          Rich text:
          <SegmentedControl
            className={cssClass.CONFIG_OPTIONS}
            onSelect={value => this.setState({ useRichText: value === "rich" })}
            options={[{ content: "Rich", value: "rich" }, { content: "Normal", value: "normal" }]}
            value={useRichText ? "rich" : "normal"}
          />
        </div>
        <div className={cssClass.CONFIG}>
          Character limit for truncation:
          <SegmentedControl
            className={cssClass.CONFIG_OPTIONS}
            onSelect={value => this.setState({ maxCharsShown: parseInt(value, 10) })}
            options={[
              { content: "0", value: "0" },
              { content: "300", value: "300" },
              { content: "1000", value: "1000" },
            ]}
            value={`${maxCharsShown}`}
          />
        </div>
        <div className={cssClass.CONFIG}>
          <TextInput
            className={classNames(cssClass.CONFIG_OPTIONS, cssClass.CONFIG_INPUT_MORE)}
            id={cssClass.CONFIG_INPUT_MORE}
            label="'Show more' label"
            name={cssClass.CONFIG_INPUT_MORE}
            onChange={e => this.setState({ showMoreLabel: e.target.value })}
            value={showMoreLabel}
          />
        </div>
        <div className={cssClass.CONFIG}>
          <TextInput
            className={classNames(cssClass.CONFIG_OPTIONS, cssClass.CONFIG_INPUT_LESS)}
            id={cssClass.CONFIG_INPUT_LESS}
            label="'Show less' label"
            name={cssClass.CONFIG_INPUT_LESS}
            onChange={e => this.setState({ showLessLabel: e.target.value })}
            value={showLessLabel}
          />
        </div>
      </FlexBox>
    );
  }

  _renderProps() {
    return (
      <PropDocumentation
        title="<TextTruncate /> Props"
        availableProps={[
          {
            name: "text",
            type: "string",
            description: "TextTruncate content",
          },
          {
            name: "className",
            type: "string",
            description: "Optional additional CSS class name to apply to the container.",
            optional: true,
          },
          {
            name: "showMoreLabel",
            type: "string",
            description: "Text for 'show more' clickable toggle",
            defaultValue: "Show more",
            optional: true,
          },
          {
            name: "showLessLabel",
            type: "string",
            description: "Text for 'show less' clickable toggle",
            defaultValue: "Show less",
            optional: true,
          },
          {
            name: "maxCharsShown",
            type: "number",
            description: "Number of characters to show before truncation",
            defaultValue: 300,
            optional: true,
          },
          {
            name: "useRichText",
            type: "boolean",
            description: "Whether to render the text via the RichText component",
            defaultValue: "false",
            optional: true,
          },
          {
            name: "name",
            type: "string",
            description: "Name appended to the toggle button aria label",
            optional: true,
          },
        ]}
        className={cssClass.PROPS}
      />
    );
  }
}
