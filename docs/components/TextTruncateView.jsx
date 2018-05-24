import * as React from "react";
import classNames from "classnames";
import loremIpsum from "lorem-ipsum";

import Example, {CodeSample, ExampleCode} from "./Example";
import PropDocumentation from "./PropDocumentation";
import View from "./View";
import {TextTruncate, FlexBox, ItemAlign, SegmentedControl, TextInput} from "src";

import "./TextTruncateView.less";

const cssClass = {
  CONFIG_CONTAINER: "TextTruncateView--configContainer",
  CONFIG_OPTIONS: "TextTruncateView--configOptions",
  USAGE: "TextTruncateView--usage",
  CONFIG: "TextTruncateView--config",
  CONFIG_INPUT_MORE: "TextTruncateView--input--more",
  CONFIG_INPUT_LESS: "TextTruncateView--input--less",
  CONTAINER: "TextTruncateView",
  INTRO: "TextTruncateView--intro",
  PROPS: "TextTruncateView--props",
};

export default class TextTruncateView extends React.PureComponent {
  static cssClass = cssClass;

  state = {
    characters: 300,
    more: "Show more",
    less: "Show less",
    showLongText: true,
  };

  constructor(props) {
    super(props);

    this.shortText = loremIpsum({count: 7, units: "words"});
    this.longText = loremIpsum({count: 25, units: "sentences"});
  }

  render() {
    const {characters, more, less, showLongText} = this.state;

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
              characters={characters}
              more={more}
              less={less}
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
    const {showLongText, characters, more, less} = this.state;

    return (
      <FlexBox alignItems={ItemAlign.CENTER} className={cssClass.CONFIG_CONTAINER} wrap>
        <div className={cssClass.CONFIG}>
          Text length:
          <SegmentedControl
            className={cssClass.CONFIG_OPTIONS}
            onSelect={value => this.setState({showLongText: value === "long"})}
            options={[
              {content: "Short", value: "short"},
              {content: "Long", value: "long"},
            ]}
            value={showLongText ? "long" : "short"}
          />
        </div>
        <div className={cssClass.CONFIG}>
          Character limit for truncation:
          <SegmentedControl
            className={cssClass.CONFIG_OPTIONS}
            onSelect={value => this.setState({characters: parseInt(value, 10)})}
            options={[
              {content: "0", value: "0"},
              {content: "300", value: "300"},
              {content: "1000", value: "1000"},
            ]}
            value={`${characters}`}
          />
        </div>
        <div className={cssClass.CONFIG}>
          <TextInput
            className={classNames(cssClass.CONFIG_OPTIONS, cssClass.CONFIG_INPUT_MORE)}
            id={cssClass.CONFIG_INPUT_MORE}
            label="'More' button"
            name={cssClass.CONFIG_INPUT_MORE}
            onChange={e => this.setState({more: e.target.value})}
            value={more}
          />
        </div>
        <div className={cssClass.CONFIG}>
          <TextInput
            className={classNames(cssClass.CONFIG_OPTIONS, cssClass.CONFIG_INPUT_LESS)}
            id={cssClass.CONFIG_INPUT_LESS}
            label="'Less' button"
            name={cssClass.CONFIG_INPUT_LESS}
            onChange={e => this.setState({less: e.target.value})}
            value={less}
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
            name: "more",
            type: "string",
            description: "Text for 'show more' clickable toggle",
            defaultValue: "Show more",
            optional: true,
          },
          {
            name: "less",
            type: "string",
            description: "Text for 'show less' clickable toggle",
            defaultValue: "Show less",
            optional: true,
          },
          {
            name: "characters",
            type: "number",
            description: "Number of characters to show before truncation",
            defaultValue: 300,
            optional: true,
          },
        ]}
        className={cssClass.PROPS}
      />
    );
  }
}
