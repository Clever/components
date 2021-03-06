import * as classnames from "classnames";
import * as PropTypes from "prop-types";
import * as React from "react";
import * as CopyToClipboard from "react-copy-to-clipboard";

import { Button } from "../Button/Button";
import FlexBox from "../flex/FlexBox";
import ItemAlign from "../flex/ItemAlign";

import "./CopyContainer.less";

export interface Props {
  children?: React.ReactNode;
  copyText?: string;
  buttonLabel?: string;
  className?: string;
  buttonType?: "linkPlain" | "primary" | "secondary";
  onCopyClick?: () => void;
}

interface State {
  copied: boolean;
}

const propTypes = {
  children: PropTypes.node,
  copyText: PropTypes.string,
  buttonLabel: PropTypes.string,
  className: PropTypes.string,
  onCopyClick: PropTypes.func,
};

export const cssClass = {
  CONTAINER: "CopyContainer",
  BUTTON: "CopyContainer--button",
};

/**
 * This component is useful when you want to make some text copyable.
 * It wraps the CopyToClipboard component.
 */
export default class CopyContainer extends React.PureComponent<Props, State> {
  static propTypes = propTypes;

  constructor(props: Props) {
    super(props);
    this._onCopy = this._onCopy.bind(this);
    this.state = {
      copied: false,
    };
  }

  _onCopy() {
    const { onCopyClick } = this.props;
    this.setState({ copied: true });
    if (onCopyClick) onCopyClick();
    window.setTimeout(() => this.setState({ copied: false }), 2 * 1000);
  }

  render() {
    const { children, copyText, buttonLabel, className, buttonType = "linkPlain" } = this.props;
    const { copied } = this.state;

    const copyLabel = !copied ? buttonLabel || "Copy" : "Copied!";

    return (
      <FlexBox alignItems={ItemAlign.CENTER} className={classnames(cssClass.CONTAINER, className)}>
        {children}
        <FlexBox alignItems={ItemAlign.START} grow>
          <CopyToClipboard text={copyText || children || ""} onCopy={this._onCopy}>
            <Button className={cssClass.BUTTON} type={buttonType} value={copyLabel} />
          </CopyToClipboard>
        </FlexBox>
      </FlexBox>
    );
  }
}
