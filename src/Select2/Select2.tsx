import * as classNames from "classnames";
import * as React from "react";
import { useState, useRef } from "react";
import { useCombobox } from "downshift";
import * as FontAwesome from "react-fontawesome";

import { FormElementSize, formElementSizeClassName, FormElementRequirement } from "../utils/Forms";
import { Values } from "../utils/types";

import "./Select2.less";

// value represents the searchable text of the option
type Option = { value: string; content?: React.ReactNode };

export interface Props {
  className?: string;
  name: string;
  label: string;
  // label is required for a11y purposes, so provide an option to hide it visually
  hideLabel?: boolean;
  options: Option[];
  clearable?: boolean;
  // TODO: support all requirement types
  requirement?: typeof FormElementRequirement.REQUIRED;
  onChange?: (value: string) => void;
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
  INPUT: "Select2--input",
  BUTTON_CONTAINER: "Select2--buttonContainer",
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
  onChange,
  size,
}) => {
  const [selectableOptions, setSelectableOptions] = useState(options);
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
    selectItem,
  } = useCombobox<Option>({
    items: selectableOptions,
    itemToString: (o) => (o ? o.value : ""),
    onStateChange: (changes) => {
      const { type } = changes;
      switch (type) {
        case useCombobox.stateChangeTypes.InputBlur:
          // reset any text that has been entered
          if (selectedItem) {
            selectItem(selectedItem);
            break;
          }

          selectItem(null);
          break;
        default:
          break;
      }
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
    onInputValueChange: ({ inputValue }) => {
      const inputLowerCase = inputValue.toLowerCase();
      setSelectableOptions(options.filter((o) => o.value.toLowerCase().includes(inputLowerCase)));
    },
    onSelectedItemChange: (item) => {
      if (onChange) {
        onChange(item.selectedItem ? item.selectedItem.value : "");
      }
    },
  });

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
        )}
        {...getComboboxProps({
          onClick: (e) => {
            if (!isOpen) {
              openMenu();
              if (inputRef.current) {
                inputRef.current.select();
              }
            }
          },
        })}
      >
        <input id={id} name={id} className={cssClass.INPUT} {...getInputProps({ ref: inputRef })} />
        <div className={cssClass.BUTTON_CONTAINER}>
          {clearable && selectedItem && (
            <button
              className={classNames(cssClass.BUTTON_RESET, cssClass.CLEAR_BUTTON)}
              onClick={(e) => {
                e.stopPropagation();
                selectItem(null);
              }}
            >
              {/* https://www.compart.com/en/unicode/U+2715 */}
              &#10005;
            </button>
          )}
          <button
            className={classNames(cssClass.BUTTON_RESET, cssClass.CARET_BUTTON)}
            {...getToggleButtonProps()}
          >
            <FontAwesome name={isOpen ? "caret-up" : "caret-down"} />
          </button>
        </div>
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
                {o.content || o.value}
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
