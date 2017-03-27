import React, {Component} from "react";
import {Link} from "react-router";

import Example, {CodeSample} from "./Example";
import PropDocumentation from "./PropDocumentation";
import View from "./View";
import {Count, SegmentedControl} from "src";

import "./CountView.less";


export default class CountView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      number: CountView.NumberOptions.MANY,
      numberFormat: "regular",
    };
  }

  renderConfig() {
    const {cssClass, NumberOptions} = CountView;
    const {number, numberFormat} = this.state;

    return (
      <div className={cssClass.CONFIG_CONTAINER}>
        <div className={cssClass.CONFIG}>
          Number:
          <SegmentedControl
            className={cssClass.CONFIG_OPTIONS}
            onSelect={value => this.setState({number: value})}
            options={Object.keys(NumberOptions).map(n => ({content: n, value: NumberOptions[n]}))}
            value={number}
          />
        </div>
        <div className={cssClass.CONFIG}>
          Number Format:
          <SegmentedControl
            className={cssClass.CONFIG_OPTIONS}
            onSelect={value => this.setState({numberFormat: value})}
            options={[
              {content: "Regular", value: "regular"},
              {content: "Short", value: "short"},
            ]}
            value={numberFormat}
          />
        </div>
      </div>
    );
  }

  render() {
    const {cssClass} = CountView;
    const {number, numberFormat} = this.state;

    const shouldShorten = numberFormat === "short";

    return (
      <View className={cssClass.CONTAINER} title="Count" sourcePath="src/Count/Count.jsx">
        <div className={cssClass.INTRO}>
          <p>Provides a convenient wrapper for displaying counts of things.</p>
          <p>
            Renders a span containing a formatted number, using
            the <Link to={{pathname: "/components/number"}}>Number</Link> component, followed by the
            given singular or plural form of the subject, depending on the number.
          </p>
          <CodeSample>
            {`
              import {Count} from "clever-components";
            `}
          </CodeSample>
        </div>

        <Example
          code={`
            🐝 <Count short={shouldShorten} singular="bee">{number}</Count>
          `}
          title="Defaults to the singular form with an appended 's' if no plural is given:"
        >
          🐝 <Count short={shouldShorten} singular="bee">{number}</Count>
          {this.renderConfig()}
        </Example>

        <Example
          code={`
            🐝 <Count short={shouldShorten} singular="bee. 😐" plural="BEES!! 😱">{number}</Count>
          `}
          title="A custom plural form can be specified:"
        >
          🐝 <Count short={shouldShorten} singular="bee. 😐" plural="BEES!! 😱">{number}</Count>
          {this.renderConfig()}
        </Example>

        <Example
          code={`
            🐝
            {" "}
            <Count
              short={shouldShorten}
              singular="bee. 😐"
              plural="BEES!! 😱"
              zeroOverride="🚫😌"
            >
              {number}
            </Count>
          `}
          title="Specify `zeroOverride` to modify the text in the 0 case:"
        >
          🐝
          {" "}
          <Count
            short={shouldShorten}
            singular="bee. 😐"
            plural="BEES!! 😱"
            zeroOverride="🚫😌"
          >
            {number}
          </Count>
          {this.renderConfig()}
        </Example>

        <PropDocumentation
          availableProps={[
            {
              name: "children",
              type: "number or string",
              description: "The number (or string representation thereof).",
              defaultValue: "0",
            },
            {
              name: "className",
              type: "string",
              description: "Optional additional classname to apply to the count span.",
            },
            {
              name: "plural",
              type: "string",
              description: "Optional plural form of the subject.",
              defaultValue: "<singular>s",
            },
            {
              name: "singular",
              type: "string",
              description: "Singular form of the subject.",
            },
            {
              name: "short",
              type: "bool",
              description: "Whether or not long counts should be shortened.",
              defaultValue: "false",
            },
            {
              name: "zeroOverride",
              type: "string",
              description: "Optional content override for the 0 case.",
            },
          ]}
          className={cssClass.PROPS}
        />
      </View>
    );
  }
}

CountView.NumberOptions = {
  ZERO: "0",
  ONE: "1",
  FEW: "500",
  MANY: "51234",
  LEGION: "92345678",
};

CountView.cssClass = {
  CONFIG_CONTAINER: "CountView--configContainer",
  CONFIG_OPTIONS: "CountView--configOptions",
  CONFIG: "CountView--config",
  CONTAINER: "CountView",
  INTRO: "CountView--intro",
  PROPS: "CountView--props",
};
