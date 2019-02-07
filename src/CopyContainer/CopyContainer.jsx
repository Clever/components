import classnames from "classnames";
import * as PropTypes from "prop-types";
import React, {useState} from "react";
import CopyToClipboard from "react-copy-to-clipboard";

import {Button} from "../Button/Button";
import FlexBox from "../flex/FlexBox";
import ItemAlign from "../flex/ItemAlign";

import "./CopyContainer.less";

const propTypes = {
  children: PropTypes.node,
  copyText: PropTypes.string,
  buttonLabel: PropTypes.string,
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
const CopyContainer = (props) => {
  const {children, copyText, buttonLabel, className} = props;
  const [copied, setCopied] = useState(false);
  const copyLabel = !copied ? (buttonLabel || "Copy") : "Copied!";

  const onCopy = () => {
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2 * 1000);
  };

  return (
    <FlexBox alignItems={ItemAlign.CENTER} className={classnames(cssClass.CONTAINER, className)}>
      {children}
      <FlexBox alignItems={ItemAlign.START} grow>
        <CopyToClipboard text={copyText || children || ""} onCopy={onCopy}>
          <Button className={cssClass.BUTTON} type="linkPlain" value={copyLabel} />
        </CopyToClipboard>
      </FlexBox>
    </FlexBox>
  );
};

CopyContainer.cssClass = cssClass;
CopyContainer.propTypes = propTypes;

export default CopyContainer;
