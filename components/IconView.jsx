import _ from "lodash";
import React, {PureComponent} from "react";

import Example from "./Example";
import View from "./View";
import {Icon, SegmentedControl} from "src";

import "./IconView.less";


export default class IconView extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {size: Icon.sizes.MEDIUM};
  }

  render() {
    const {cssClass} = IconView;

    return (
      <View className={cssClass.CONTAINER} title="Icon">
        <Example
          code={`
            <Icon size={Icon.sizes.MEDIUM} name={Icon.names.BLOCKS} />
          `}
        >
          <SegmentedControl
            onSelect={s => this.setState({size: s})}
            options={[
              {content: "Small", value: Icon.sizes.SMALL},
              {content: "Medium (default)", value: Icon.sizes.MEDIUM},
              {content: "Large", value: Icon.sizes.LARGE},
            ]}
            value={this.state.size}
          />
          <ul>
            {_.map(Icon.names, name =>
              <li key={name}>
                <Icon size={this.state.size} name={name} />
                <label>{name}</label>
              </li>
            )}
          </ul>
        </Example>
      </View>
    );
  }
}

IconView.cssClass = {
  CONTAINER: "IconView",
};
