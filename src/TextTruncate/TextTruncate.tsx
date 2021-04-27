import * as classnames from "classnames";
import * as PropTypes from "prop-types";
import * as React from "react";

import { Button } from "../Button/Button";
import RichText from "../RichText/RichText";
import Tooltip from "../Tooltip";

export interface Props {
  className?: string;
  text: string;
  showMoreLabel?: string;
  showLessLabel?: string;
  showTooltip?: boolean;
  lines?: number;
  maxCharsShown?: number;
  useRichText?: boolean;
  name?: string;
}

const propTypes = {
  className: PropTypes.string,
  text: PropTypes.string.isRequired,
  showMoreLabel: PropTypes.string,
  showLessLabel: PropTypes.string,
  showTooltip: PropTypes.node,
  lines: PropTypes.number,
  maxCharsShown: PropTypes.number,
  useRichText: PropTypes.bool,
  name: PropTypes.string,
};

const defaultProps = {
  maxCharsShown: 300,
  showMoreLabel: "Show more",
  showLessLabel: "Show less",
  showTooltip: false,
  useRichText: false,
};

const cssClass = {
  CONTAINER: "TextTruncate",
};

/**
 * Truncate long text
 * Comes with read more/less toggle
 */
export default class TextTruncate extends React.PureComponent<Props> {
  static propTypes = propTypes;
  static defaultProps = defaultProps;

  state = {
    truncated: true,
  };

  toggleTruncation = (event) => {
    event.preventDefault();

    this.setState({ truncated: !this.state.truncated });
  };

  truncate(text) {
    return text.substring(0, this.props.maxCharsShown);
  }

  render() {
    const {
      className,
      text,
      showMoreLabel,
      showLessLabel,
      showTooltip,
      maxCharsShown,
      useRichText,
      name,
    } = this.props;
    const { truncated } = this.state;

    // If text is null or undefined, return immediately
    if (!text) {
      return null;
    }

    const isTextTruncated = text.length > maxCharsShown;

    if (!isTextTruncated) {
      return (
        <div className={classnames(cssClass.CONTAINER, className)}>
          {useRichText ? <RichText text={text} /> : text}
        </div>
      );
    }

    const displayText = truncated ? `${this.truncate(text)}…` : text;
    const toggleText = truncated ? showMoreLabel : showLessLabel;
    const truncatedText = (
      <div className={classnames(cssClass.CONTAINER, className)}>
        {useRichText ? <RichText text={displayText} /> : displayText}{" "}
        <Button
          type="linkPlain"
          onClick={this.toggleTruncation}
          value={toggleText}
          ariaLabel={name && `${toggleText}: ${name}`}
        />
      </div>
    );

    if (showTooltip) {
      return (
        <Tooltip content={text} placement={Tooltip.Placement.BOTTOM}>
          {truncatedText}
        </Tooltip>
      );
    }
    return truncatedText;
  }
}
