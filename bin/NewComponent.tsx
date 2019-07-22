import * as classnames from "classnames";
import * as React from "react";

import { Button } from "../Button/Button";

import "./NewComponent.less";

export interface Props {
  children: React.ReactNode;
  className?: string;
  onPerformAction: (arg?: string) => any;
}

// TODO: Uncomment if this component is stateful, and pass State to PureComponent. Remove otherwise.
// interface State {
//   sampleState1: boolean;
//   sampleState2: string;
// }

export const cssClass = {
  CONTAINER: "NewComponent",
  SUB_ELEMENT: "NewComponent--subElement",
};

/**
 * TODO: Add short description.
 */
export class NewComponent extends React.PureComponent<Props> {
  // TODO: Uncomment if this component is stateful. Remove otherwise.
  // state = {
  //   sampleState1: false,
  //   sampleState2: "foo",
  // };

  render() {
    const { children, className } = this.props;

    return (
      <div className={classnames(cssClass.CONTAINER, className)}>
        <h3>TODO</h3>
        <p>{children}</p>
        <div className={cssClass.SUB_ELEMENT}>
          <Button
            onClick={this._handlePerformAction}
            type={Button.Type.PRIMARY}
            value="Do something"
          />
        </div>
      </div>
    );
  }

  _handlePerformAction = () => this.props.onPerformAction("action performed");
}
