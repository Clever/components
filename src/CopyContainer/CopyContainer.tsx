import * as classnames from "classnames";
import * as PropTypes from "prop-types";
import * as React from "react";
import * as CopyToClipboard from "react-copy-to-clipboard";

import {Button} from "../Button/Button";
import FlexBox from "../flex/FlexBox";
import ItemAlign from "../flex/ItemAlign";

import "./CopyContainer.less";

const propTypes = {
  children: PropTypes.node,
  copyText: PropTypes.string,
  className: PropTypes.string,
};

const cssClass = {
  CONTAINER: "CopyContainer",
  BUTTON: "CopyContainer--button",
};

/**
 * This component is useful when you want to make some text copyable.
 * It wraps the CopyToClipboard component.
 */
export default class CopyContainer extends React.PureComponent {
  static propTypes = propTypes;
  static cssClass = cssClass;

  state = {
    copied: false,
  }

  _onCopy() {
    this.setState({copied: true});
    window.setTimeout(() => this.setState({copied: false}), 2 * 1000);
  }

  render() {
    const {children, copyText, className} = this.props;
    const {copied} = this.state;

    const copyLabel = !copied ? "Copy" : "Copied!";

    return (
      <FlexBox alignItems={ItemAlign.CENTER} className={classnames(cssClass.CONTAINER, className)}>
        {children}
        <FlexBox alignItems={ItemAlign.START} grow>
          <CopyToClipboard text={copyText || children || ""} onCopy={() => this._onCopy()}>
            <Button className={cssClass.BUTTON} type="linkPlain" value={copyLabel} />
          </CopyToClipboard>
        </FlexBox>
      </FlexBox>
    );
  }
}
