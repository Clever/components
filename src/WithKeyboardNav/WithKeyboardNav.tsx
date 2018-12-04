import * as _ from "lodash";
import * as PropTypes from "prop-types";
import * as React from "react";
import * as ReactDOM from "react-dom";

import KeyCode from "../utils/KeyCode";

const propTypes = {
  backKeys: PropTypes.arrayOf(PropTypes.oneOf(Object.values(KeyCode))),
  children: PropTypes.node,
  currentID: PropTypes.string,
  forceTabKey: PropTypes.bool,
  forwardKeys: PropTypes.arrayOf(PropTypes.oneOf(Object.values(KeyCode))),
  itemIDs: PropTypes.arrayOf(PropTypes.string).isRequired,
  noWrap: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
};

/**
 * Wrapper component that enables keyboard navigation through a specified ordered list of items.
 * Emits navigation events with the ID of the next item to focus on - it's up to the client to move
 * focus as needed and update the currentID prop accordingly.
 */
export default class WithKeyboardNav extends React.PureComponent {
  static propTypes = propTypes;

  static defaultProps = {
    backKeys: [KeyCode.ARROW_LEFT, KeyCode.ARROW_UP],
    forwardKeys: [KeyCode.ARROW_RIGHT, KeyCode.ARROW_DOWN],
  };

  _element = null;

  componentDidMount() {
    this._element = ReactDOM.findDOMNode(this);
    if (this._element) {
      this._element.addEventListener("keydown", this._handleKeyDown);
    }
  }

  componentWillUnmount() {
    if (this._element) {
      this._element.removeEventListener("keydown", this._handleKeyDown);
    }
  }

  render() {
    return this.props.children;
  }

  _handleKeyDown = event => {
    const {backKeys, forwardKeys, forceTabKey} = this.props;

    if (!_.isString(event.key)) {
      return;
    }

    if (new Set(forwardKeys).has(event.key)) {
      this._move(1, event);
      return;
    }

    if (new Set(backKeys).has(event.key)) {
      this._move(-1, event);
      return;
    }

    if (forceTabKey && event.key === KeyCode.TAB) {
      this._move(event.shiftKey ? -1 : 1, event);
      return;
    }
  };

  _move(amount, event) {
    const {currentID, noWrap, onChange} = this.props;

    const itemIDs = _.compact(this.props.itemIDs);
    const currentIndex = itemIDs.indexOf(currentID);
    const numItems = itemIDs.length;

    const rawNextIndex = currentIndex + amount;
    let adjustedNextIndex = rawNextIndex;
    if (noWrap) {
      adjustedNextIndex = Math.max(0, Math.min(adjustedNextIndex, numItems - 1));
    }

    if (adjustedNextIndex < 0) {
      adjustedNextIndex = numItems + adjustedNextIndex;
    }

    adjustedNextIndex = adjustedNextIndex % numItems;

    if (adjustedNextIndex === currentIndex) {
      return;
    }

    onChange(itemIDs[adjustedNextIndex]);
    event.preventDefault();
  }
}
