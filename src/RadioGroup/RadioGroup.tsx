import * as _ from "lodash";
import * as classnames from "classnames";
import * as React from "react";

import FormError from "../FormError";
import Radio, { Props as RadioProps } from "./Radio";
import WithKeyboardNav from "../WithKeyboardNav";

import "./RadioGroup.less";

interface Option<IDType extends string = string, ValueType = any> {
  id: IDType;
  disabled?: boolean;
  label: React.ReactNode;
  /** A BCP47 language tag. */
  lang?: string;
  value?: ValueType;
  additionalText?: string;
}

export interface Props<OptionIDType extends string, OptionValueType> {
  ariaLabelledBy?: string;
  className?: string;
  disabled?: boolean;
  error?: React.ReactNode;
  label?: React.ReactNode;
  onChange: RadioProps<OptionIDType, OptionValueType>["onSelect"];
  options: Option<OptionIDType, OptionValueType>[];
  selectedID?: OptionIDType;
}

const cssClass = {
  CONTAINER: "RadioGroup",
  LABEL: "RadioGroup--label",
  RADIO: "RadioGroup--radio",
  RADIO_SELECTED_WITH_ADDITIONAL_TEXT: "RadioGroup--radio--selectedWithAdditionalText",
  ADDITIONAL_TEXT: "RadioGroup--additionalText",
};

const LABEL_ID_PREFIX = "RadioGroup--label";
let nextLabelIDSuffix = 0;
const getNextLabelID = () => `${LABEL_ID_PREFIX}--${nextLabelIDSuffix++}`;

/**
 * Form element that allows for a single, required selection from a small set of 2 or more options.
 */
export default class RadioGroup<
  OptionIDType extends string = string,
  OptionValueType = any
> extends React.PureComponent<Props<OptionIDType, OptionValueType>> {
  _labelID = getNextLabelID();
  _optionRefsByID = {};

  render() {
    const {
      ariaLabelledBy,
      className,
      disabled,
      error,
      label,
      onChange,
      options,
      selectedID,
    } = this.props;

    if (ariaLabelledBy && label) {
      console.warn(
        "You should not pass both `ariaLabelledBy` and `label` props. The `ariaLabelledBy` prop is ignored.",
      );
    }

    const labelID = label || !ariaLabelledBy ? this._labelID : ariaLabelledBy;
    const focusableOptionID = this._getFocusableOptionID(options);

    return (
      <WithKeyboardNav
        currentID={focusableOptionID}
        itemIDs={options.map((o) => (o.disabled ? undefined : o.id))}
        onChange={this._handleNavChange}
      >
        <div
          aria-labelledby={labelID}
          className={classnames(cssClass.CONTAINER, className)}
          role="radiogroup"
        >
          {!ariaLabelledBy && (
            <div className={cssClass.LABEL} id={labelID}>
              {label}
            </div>
          )}
          {error && <FormError>{error}</FormError>}
          {_.map(options, (o) => {
            const isSelectedAndHasAdditionalText = o.id === selectedID && o.additionalText;
            return (
              <>
                <Radio<OptionIDType, OptionValueType>
                  checked={o.id === selectedID}
                  className={classnames(
                    cssClass.RADIO,
                    isSelectedAndHasAdditionalText && cssClass.RADIO_SELECTED_WITH_ADDITIONAL_TEXT,
                  )}
                  disabled={!!disabled || !!o.disabled}
                  id={o.id}
                  key={o.id}
                  onSelect={onChange}
                  ref={(ref) => this._handleRadioRef(ref)}
                  tabIndex={o.id === focusableOptionID ? 0 : -1}
                  value={o.value}
                  lang={o.lang}
                >
                  {o.label}
                </Radio>
                {isSelectedAndHasAdditionalText && (
                  <div className={cssClass.ADDITIONAL_TEXT}>{o.additionalText}</div>
                )}
              </>
            );
          })}
        </div>
      </WithKeyboardNav>
    );
  }

  _handleRadioRef = (ref) => {
    if (ref) {
      this._optionRefsByID[ref.props.id] = ref;
    }
  };

  _handleNavChange = (selectedID) => {
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
    const { selectedID } = this.props;

    let focusableOptionID = null;
    _.forEach(options, (option) => {
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
