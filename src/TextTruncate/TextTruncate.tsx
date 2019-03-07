import * as classnames from "classnames";
import * as PropTypes from "prop-types";
import * as React from "react";

import {Button} from "../Button/Button";
import RichText from "../RichText/RichText";

const propTypes = {
  className: PropTypes.string,
  text: PropTypes.string.isRequired,
  showMoreLabel: PropTypes.string,
  showLessLabel: PropTypes.string,
  lines: PropTypes.number,
  maxCharsShown: PropTypes.number,
  useRichText: PropTypes.bool,
};

const defaultProps = {
  maxCharsShown: 300,
  showMoreLabel: "Show more",
  showLessLabel: "Show less",
  useRichText: false,
};

const cssClass = {
  CONTAINER: "TextTruncate",
};

/**
 * Truncate long text
 * Comes with read more/less toggle
 */
export default class TextTruncate extends React.PureComponent {
  static propTypes = propTypes;
  static defaultProps = defaultProps;
  static cssClass = cssClass;

  state = {
    truncated: true,
  };

  toggleTruncation = (event) => {
    event.preventDefault();

    this.setState({truncated: !this.state.truncated});
  }

  truncate(text) {
    return text.substring(0, this.props.maxCharsShown);
  }

  render() {
    const {className, text, showMoreLabel, showLessLabel, maxCharsShown, useRichText} = this.props;
    const {truncated} = this.state;

    if (text.length < maxCharsShown) {
      return (<div className={classnames(cssClass.CONTAINER, className)}>
        {useRichText ? <RichText text={text} /> : text}
      </div>);
    }

    const displayText = truncated ? `${this.truncate(text)}…` : text;
    return (<div className={classnames(cssClass.CONTAINER, className)}>
      {useRichText ? <RichText text={displayText} /> : displayText}
      {" "}
      <Button type="linkPlain" onClick={this.toggleTruncation} value={truncated ? showMoreLabel : showLessLabel} />
    </div>);
  }
}
