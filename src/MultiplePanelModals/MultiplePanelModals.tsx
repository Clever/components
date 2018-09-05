import * as classnames from "classnames";
import * as PropTypes from "prop-types";
import * as React from "react";

import {Button} from "../Button/Button";

import "./MultiplePanelModals.less";

const propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  onPerformAction: PropTypes.func.isRequired,
};

const cssClass = {
  CONTAINER: "MultiplePanelModals",
  SUB_ELEMENT: "MultiplePanelModals--subElement",
};

/**
 * TODO: Add short description.
 */
export default class MultiplePanelModals extends React.PureComponent {
  static propTypes = propTypes;
  static cssClass = cssClass;

  // TODO: Uncomment if this component is stateful. Remove otherwise.
  // state = {
  //   sampleState1: false,
  //   sampleState2: "foo",
  // };

  render() {
    const {children, className} = this.props;

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
