import * as _ from "lodash";
import * as classnames from "classnames";
import * as PropTypes from "prop-types";
import * as React from "react";

import Radio from "./Radio";
import WithKeyboardNav from "../WithKeyboardNav";

import "./RadioGroup.less";

const OPTION_PROP_TYPE = PropTypes.shape({
  id: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  label: PropTypes.node.isRequired,
  value: PropTypes.any,
});

const propTypes = {
  className: PropTypes.string,
  error: PropTypes.node,
  label: PropTypes.node,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(OPTION_PROP_TYPE).isRequired,
  selectedID: PropTypes.string,
};

const cssClass = {
  CONTAINER: "RadioGroup",
  LABEL: "RadioGroup--label",
  RADIO: "RadioGroup--radio",
};

const LABEL_ID_PREFIX = "RadioGroup--label";
let nextLabelIDSuffix = 0;
const getNextLabelID = () => `${LABEL_ID_PREFIX}--${nextLabelIDSuffix++}`;

/**
 * Form element that allows for a single, required selection from a small set of 2 or more options.
 */
export default class RadioGroup extends React.PureComponent {
  static propTypes = propTypes;
  static cssClass = cssClass;

  _labelID = getNextLabelID();
  _optionRefsByID = {};

  render() {
    const {className, label, onChange, options, selectedID} = this.props;

    const focusableOptionID = this._getFocusableOptionID(options);

    // TODO: Render error string if specified.
    return (
      <WithKeyboardNav
        currentID={focusableOptionID}
        itemIDs={options.map(o => (o.disabled ? undefined : o.id))}
        onChange={this._handleNavChange}
      >
        <div
          aria-labelledby={this._labelID}
          className={classnames(cssClass.CONTAINER, className)}
          role="radiogroup"
        >
          <div className={cssClass.LABEL} id={this._labelID}>
            {label}
          </div>
          {_.map(options, o => (
            <Radio
              checked={o.id === selectedID}
              className={cssClass.RADIO}
              disabled={!!o.disabled}
              id={o.id}
              key={o.id}
              onSelect={onChange}
              ref={ref => this._handleRadioRef(ref)}
              tabIndex={o.id === focusableOptionID ? 0 : -1}
              value={o.value}
            >
              {o.label}
            </Radio>
          ))}
        </div>
      </WithKeyboardNav>
    );
  }

  _handleRadioRef = ref => {
    if (ref) {
      this._optionRefsByID[ref.props.id] = ref;
    }
  };

  _handleNavChange = selectedID => {
    const selectedRadioRef = this._optionRefsByID[selectedID];
    if (!selectedRadioRef) {
      return;
    }

    selectedRadioRef.focus();
  };

  /**
   * This implements the roving tabindex pattern as described in the w3.org spec for radio groups:
   * https://www.w3.org/TR/wai-aria-practices-1.1/examples/radio/radio-1/radio-1.html
   *
   * We essentially set the tabindex for all options to -1 except the one that's currently selected
   * or the first non-disabled one in the list.
   */
  _getFocusableOptionID(options) {
    const {selectedID} = this.props;

    let focusableOptionID = null;
    _.forEach(options, option => {
      if (!option) {
        return;
      }

      // If we haven't found the selected option, pick the first non-disabled one.
      if (!option.disabled && focusableOptionID === null) {
        focusableOptionID = option.id;
        return;
      }

      // If there's a selected, non-disabled option, pick that as the focusable option.
      if (!option.disabled && option.id === selectedID) {
        focusableOptionID = option.id;
        return;
      }
    });

    return focusableOptionID;
  }
}
