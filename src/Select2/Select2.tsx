import * as classNames from "classnames";
import * as React from "react";
import { useState, useEffect, useRef } from "react";
import { useCombobox } from "downshift";
import * as FontAwesome from "react-fontawesome";

import { FormElementSize, formElementSizeClassName, FormElementRequirement } from "../utils/Forms";
import { Values } from "../utils/types";

import "./Select2.less";

// for accessibility purposes, downshift only allows us to render a string value in the <input> tag
// so for custom rendered components we still need a string value
// see https://www.downshift-js.com/use-combobox#materialui
type Option = { value: string; label: string; customLabel?: React.ReactNode };

export interface Props {
  className?: string;
  name: string;
  label: string;
  // label is required for a11y purposes, so provide an option to hide it visually
  hideLabel?: boolean;
  options: Option[];
  clearable?: boolean;
  requirement?: Values<typeof FormElementRequirement>;
  initialIsInError?: boolean;
  value: string;
  onChange: (value: string) => void;
  size?: Values<typeof FormElementSize>;
}

export const cssClass = {
  CONTAINER: "Select2--container",
  INFO_ROW: "Select2--infoRow",
  INFO_ROW_LABEL_HIDDEN: "Select2--infoRow--labelHidden",
  INFO_REQUIREMENT: "Select2--infoRequirement",
  LABEL: "Select2--label",
  LABEL_HIDDEN: "Select2--label--hidden",
  SELECT_CONTAINER: "Select2--selectContainer",
  SELECT_CONTAINER_FOCUSED: "Select2--selectContainer--focused",
  SELECT_CONTAINER_ERROR: "Select2--selectContainer--error",
  SELECT_CONTAINER_DISABLED: "Select2--selectContainer--disabled",
  INPUT: "Select2--input",
  TRAILING_ELEMENT: "Select2--trailingElement",
  ERROR_ICON: "Select2--errorIcon",
  BUTTON_RESET: "Select2--button--reset",
  CLEAR_BUTTON: "Select2--clearButton",
  CARET_BUTTON: "Select2--caretButton",
  MENU_RESET: "Select2--options--reset",
  MENU_OPEN: "Select2--options--open",
  MENU_OPTION: "Select2--option",
  MENU_OPTION_HIGHLIGHTED: "Select2--option--highlighted",
  NO_OPTIONS_FOUND: "Select2--notFound",
};

/*
  Basic single-item-select drop down component
*/
const Select2: React.FC<Props> = ({
  className,
  name,
  label,
  hideLabel,
  options,
  clearable,
  requirement,
  initialIsInError,
  value,
  onChange,
  size,
}) => {
  const [selectableOptions, setSelectableOptions] = useState(options);

  // handle initial error state via focus state since
  // hooks can't combine the downshift state well with component hook state
  const [hasBeenFocused, setHasBeenFocused] = useState(false);
  useEffect(() => {
    setHasBeenFocused(false);
  }, [initialIsInError]);

  const {
    isOpen,
    getToggleButtonProps,
    getLabelProps,
    getMenuProps,
    getInputProps,
    getComboboxProps,
    highlightedIndex,
    getItemProps,
    openMenu,
    selectedItem,
  } = useCombobox<Option>({
    items: selectableOptions,
    itemToString: (o) => (o ? o.label : ""),
    selectedItem: options.find((o) => o.value === value) || null,
    stateReducer: (state, actionAndChanges) => {
      const { changes, type } = actionAndChanges;
      switch (type) {
        case useCombobox.stateChangeTypes.InputKeyDownEscape:
          return {
            ...changes,
            selectedItem: null,
            inputValue: "",
            isOpen: true,
          };
        case useCombobox.stateChangeTypes.InputBlur: {
          // reset any text that has been entered
          return {
            ...changes,
            selectedItem,
            inputValue: selectedItem ? selectedItem.label : "",
          };
        }
        default:
          break;
      }
      return changes;
    },
    onIsOpenChange: (changes) => {
      const { type } = changes;
      switch (type) {
        // if we're opening the drop down for the first time
        // show everything even if something had already been selected previously
        case useCombobox.stateChangeTypes.FunctionOpenMenu:
          setSelectableOptions(options);
          break;
        default:
          break;
      }
      return;
    },
    onInputValueChange: ({ inputValue: v }) => {
      const inputLowerCase = v.toLowerCase();
      setSelectableOptions(options.filter((o) => o.label.toLowerCase().includes(inputLowerCase)));
    },
    onSelectedItemChange: (item) => {
      if (onChange) {
        onChange(item.selectedItem ? item.selectedItem.value : "");
      }
    },
  });

  const isInError =
    requirement === FormElementRequirement.REQUIRED &&
    (hasBeenFocused ? !selectedItem : initialIsInError);
  const id = name;
  const inputRef = useRef<HTMLInputElement>();
  return (
    <div className={classNames(cssClass.CONTAINER, formElementSizeClassName(size), className)}>
      <div className={classNames(cssClass.INFO_ROW, hideLabel && cssClass.INFO_ROW_LABEL_HIDDEN)}>
        <label
          className={classNames(cssClass.LABEL, hideLabel && cssClass.LABEL_HIDDEN)}
          {...getLabelProps()}
        >
          {label}
        </label>
        {requirement && (
          <label className={cssClass.INFO_REQUIREMENT} aria-live="polite" {...getLabelProps()}>
            {requirement}
          </label>
        )}
      </div>
      <div
        className={classNames(
          cssClass.SELECT_CONTAINER,
          isOpen && cssClass.SELECT_CONTAINER_FOCUSED,
          isInError && cssClass.SELECT_CONTAINER_ERROR,
          requirement === FormElementRequirement.DISABLED && cssClass.SELECT_CONTAINER_DISABLED,
        )}
        {...getComboboxProps({
          onClick: (e) => {
            if (requirement === FormElementRequirement.DISABLED) {
              e.stopPropagation();
              return;
            }
            if (!isOpen) {
              openMenu();
              if (inputRef.current) {
                inputRef.current.select();
              }
            }
          },
        })}
      >
        <input
          id={id}
          name={id}
          className={cssClass.INPUT}
          {...getInputProps({
            ref: inputRef,
            onFocus: () => setHasBeenFocused(true),
            disabled: requirement === FormElementRequirement.DISABLED,
          })}
        />
        {isInError && (
          <div className={classNames(cssClass.TRAILING_ELEMENT, cssClass.ERROR_ICON)}>
            <FontAwesome name="exclamation-circle" />
          </div>
        )}
        {clearable && selectedItem && (
          <button
            className={classNames(
              cssClass.BUTTON_RESET,
              cssClass.TRAILING_ELEMENT,
              cssClass.CLEAR_BUTTON,
            )}
            onClick={(e) => {
              e.stopPropagation();
              if (requirement === FormElementRequirement.DISABLED) {
                return;
              }

              onChange(null);
              openMenu();
              if (inputRef.current) {
                inputRef.current.select();
              }
            }}
          >
            {/* https://www.compart.com/en/unicode/U+2715 */}
            &#10005;
          </button>
        )}
        <button
          className={classNames(
            cssClass.BUTTON_RESET,
            cssClass.TRAILING_ELEMENT,
            cssClass.CARET_BUTTON,
          )}
          {...getToggleButtonProps({ disabled: requirement === FormElementRequirement.DISABLED })}
        >
          <FontAwesome name={isOpen ? "caret-up" : "caret-down"} />
        </button>
      </div>
      <ul
        className={classNames(cssClass.MENU_RESET, isOpen && cssClass.MENU_OPEN)}
        {...getMenuProps()}
      >
        {isOpen &&
          (selectableOptions.length > 0 ? (
            selectableOptions.map((o, i) => (
              <li
                className={classNames(
                  cssClass.MENU_OPTION,
                  i === highlightedIndex && cssClass.MENU_OPTION_HIGHLIGHTED,
                )}
                key={`${o.value}${i}`}
                {...getItemProps({ item: o, index: i })}
              >
                {o.customLabel || o.label}
              </li>
            ))
          ) : (
            <li className={classNames(cssClass.NO_OPTIONS_FOUND)}>No options</li>
          ))}
      </ul>
    </div>
  );
};

export default Select2;
