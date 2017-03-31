import React, {Component} from "react";

import Example, {CodeSample} from "./Example";
import PropDocumentation from "./PropDocumentation";
import View from "./View";
import {SegmentedControl} from "src";
import {DollarAmount} from "src";

import "./DollarAmountView.less";


export default class DollarAmountView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      number: DollarAmountView.NumberOptions.MANY,
      alwaysShowCents: "no",
      zeroIsFree: "no",
    };
  }

  renderConfig() {
    const {cssClass, NumberOptions} = DollarAmountView;
    const {number, alwaysShowCents, zeroIsFree} = this.state;

    return (
      <div className={cssClass.CONFIG_CONTAINER}>
        <div className={cssClass.CONFIG}>
          Amount:
          <SegmentedControl
            className={cssClass.CONFIG_OPTIONS}
            onSelect={value => this.setState({number: value})}
            options={Object.keys(NumberOptions).map(n => ({content: n, value: NumberOptions[n]}))}
            value={number}
          />
        </div>
        <div className={cssClass.CONFIG}>
          Dollar Format:
          <SegmentedControl
            className={cssClass.CONFIG_OPTIONS}
            onSelect={value => this.setState({alwaysShowCents: value})}
            options={[
              {content: "Regular", value: "no"},
              {content: "Always Show Cents", value: "yes"},
            ]}
            value={alwaysShowCents}
          />
          <SegmentedControl
            className={cssClass.CONFIG_OPTIONS}
            onSelect={value => this.setState({zeroIsFree: value})}
            options={[
              {content: "Regular", value: "no"},
              {content: "Zero is 'Free'", value: "yes"},
            ]}
            value={zeroIsFree}
          />
        </div>
      </div>
    );
  }

  render() {
    const {cssClass} = DollarAmountView;
    let {number, alwaysShowCents, zeroIsFree} = this.state;

    alwaysShowCents = alwaysShowCents === "yes";
    zeroIsFree = zeroIsFree === "yes";

    return (
      <View className={cssClass.CONTAINER} title="DollarAmount" sourcePath="src/DollarAmount/DollarAmount.jsx">
	<div className={cssClass.INTRO}>
	  <p>Provides a convenient wrapper for displaying dollar values.</p>
	  <CodeSample>
	    {`
	      import {DollarAmount} from "clever-components";
	    `}
	  </CodeSample>
	</div>

	<Example
	  code={`
	    <p>Base Value: <DollarAmount alwaysShowCents={alwaysShowCents} zeroIsFree={zeroIsFree}>{number}</DollarAmount></p>
	    <p>Plus a smidge: <DollarAmount alwaysShowCents={alwaysShowCents} zeroIsFree={zeroIsFree}>{number + 0.3333}</DollarAmount></p>
	  `}
	  title="Defaults to not showing cents if the value is an integer, but showing cents if value is a float"
	>
	  <p>Base Value: <DollarAmount alwaysShowCents={alwaysShowCents} zeroIsFree={zeroIsFree}>{number}</DollarAmount></p>
	  <p>Plus a smidge: <DollarAmount alwaysShowCents={alwaysShowCents} zeroIsFree={zeroIsFree}>{number + 0.3333}</DollarAmount></p>
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
	      description: "Optional additional classname to apply to the DollarAmount span.",
	    },
	    {
	      name: "alwaysShowCents",
	      type: "bool",
	      description: "Always include two decimal points, even if the value is an integer",
	      defaultValue: "false",
	    },
	    {
	      name: "zeroIsFree",
	      type: "bool",
	      description: "A value of zero should be represented as the string 'Free'",
	      defaultValue: "false",
	    },
	  ]}
	  className={cssClass.PROPS}
	/>
      </View>
    );
  }
}

DollarAmountView.NumberOptions = {
  ZERO: 0,
  ONE: 1,
  DECIMAL: 123.123415,
  FEW: 500,
  MANY: 51234,
  LEGION: 92345678,
};

DollarAmountView.cssClass = {
  CONFIG_CONTAINER: "DollarAmountView--configContainer",
  CONFIG_OPTIONS: "DollarAmountView--configOptions",
  CONFIG: "DollarAmountView--config",
  CONTAINER: "DollarAmountView",
  INTRO: "DollarAmountView--intro",
  PROPS: "DollarAmountView--props",
};
