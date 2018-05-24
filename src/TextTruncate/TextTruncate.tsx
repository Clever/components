import * as classnames from "classnames";
import * as PropTypes from "prop-types";
import * as React from "react";

import {Button} from "../Button/Button";

import "./TextTruncate.less";

const propTypes = {
  className: PropTypes.string,
  text: PropTypes.string.isRequired,
  more: PropTypes.string,
  less: PropTypes.string,
  lines: PropTypes.number,
  characters: PropTypes.number,
};

const defaultProps = {
  characters: 300,
  more: "Show more",
  less: "Show less",
};

const cssClass = {
  CONTAINER: "TextTruncate",
  TEXT: "TextTruncate--text",
};

/**
 * Truncate long text
 * Comes with read more/less toggle
 * Adapted from https://www.npmjs.com/package/react-truncate#integrated-example-for-toggling-read-more-text
 */
export default class TextTruncate extends React.PureComponent {
  static propTypes = propTypes;
  static defaultProps = defaultProps;
  static cssClass = cssClass;

  state = {
    truncated: true,
  };

  toggleTruncation(event) {
    event.preventDefault();

    this.setState({truncated: !this.state.truncated});
  }

  truncate(text) {
    return text.substring(0, this.props.characters);
  }

  render() {
    const {className, text, more, less, characters} = this.props;
    const {truncated} = this.state;

    if (text.length < characters) {
      return (<div className={classnames(cssClass.CONTAINER, className)}>
        {text}
      </div>);
    }

    return (
      <div>
        {truncated ?
          <div className={classnames(cssClass.CONTAINER, className)}>
            {this.truncate(text)}
            <Button type="linkPlain" onClick={(e) => this.toggleTruncation(e)} value={`... ${more}`} />
          </div> :
          <div className={classnames(cssClass.CONTAINER, className)}>
            {text} <Button type="linkPlain" onClick={(e) => this.toggleTruncation(e)} value={less} />
          </div>
        }
      </div>
    );
  }

  _handlePerformAction = () => this.props.onPerformAction("action performed");
}
