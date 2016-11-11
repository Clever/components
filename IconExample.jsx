import React from "react";
import lodash from "lodash";

import {Icon, SegmentedControl} from "../src";

import "./IconExample.less";

export default class IconExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = {size: Icon.sizes.MEDIUM};
  }

  render() {
    const {cssClass} = IconExample;

    return (
      <div className={cssClass.CONTAINER}>
        <a name="icon">
          <h1>Icon</h1>
        </a>
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
          {lodash.values(Icon.names).map(name =>
            <li key={name}>
              <Icon size={this.state.size} name={name} />
              <label>{name}</label>
            </li>
          )}
        </ul>
      </div>
    );
  }
}

IconExample.cssClass = {
  CONTAINER: "IconExample",
};
