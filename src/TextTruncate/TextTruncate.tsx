import * as classnames from "classnames";
import * as PropTypes from "prop-types";
import * as React from "react";

import {Button} from "../Button/Button";

const propTypes = {
  className: PropTypes.string,
  text: PropTypes.string.isRequired,
  showMoreLabel: PropTypes.string,
  showLessLabel: PropTypes.string,
  lines: PropTypes.number,
  maxCharsShown: PropTypes.number,
};

const defaultProps = {
  maxCharsShown: 300,
  showMoreLabel: "Show more",
  showLessLabel: "Show less",
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
    const {className, text, showMoreLabel, showLessLabel, maxCharsShown} = this.props;
    const {truncated} = this.state;

    if (text.length < maxCharsShown) {
      return (<div className={classnames(cssClass.CONTAINER, className)}>
        {text}
      </div>);
    }

    return (
      <div>
        {truncated ?
          <div className={classnames(cssClass.CONTAINER, className)}>
            {this.truncate(text)} ... <Button type="linkPlain" onClick={this.toggleTruncation} value={showMoreLabel} />
          </div> :
          <div className={classnames(cssClass.CONTAINER, className)}>
            {text} <Button type="linkPlain" onClick={(e) => this.toggleTruncation(e)} value={showLessLabel} />
          </div>
        }
      </div>
    );
  }
}
