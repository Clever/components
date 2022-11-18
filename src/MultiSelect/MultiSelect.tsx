import * as classNames from "classnames";
import * as React from "react";
import { useState, useRef } from "react";
import { useCombobox, useMultipleSelection } from "downshift";
import * as FontAwesome from "react-fontawesome";

import Label from "../Label/Label";
import { FormElementSize, formElementSizeClassName } from "../utils/Forms";
import { Values } from "../utils/types";

import "./MultiSelect.less";

// export for testing
export const ADD_NEW_ITEM_KEY = "MultiSelect--addNewItem";

// searchable text of this option is determined in the getSelectableOptions function
type Option = { value: string; label: string; customLabel?: React.ReactNode };

export interface Props {
  className?: string;
  name: string;
  label: string;
  // label is required for a11y purposes, so provide an option to hide it visually
  hideLabel?: boolean;
  placeholder?: string;
  options: Option[];
  creatable?: boolean;
  // allow the multi-select pick items an unlimited number of times
  // NOTE: might be a little wonky since the downshift library might not fully support it
  // it's also a fringe use case of this MultiSelect that we may want to remove in the future
  allowDuplicates?: boolean;
  values: string[];
  onChange: (options: string[]) => void;
  size?: Values<typeof FormElementSize>;
  caseSensitive?: boolean;
}

export const cssClass = {
  CONTAINER: "MultiSelect--container",
  LABEL: "MultiSelect--label",
  LABEL_HIDDEN: "MultiSelect--label--hidden",
  SELECT_CONTAINER: "MultiSelect--selectContainer",
  SELECT_CONTAINER_FOCUSED: "MultiSelect--selectContainer--focused",
  SELECTED_ITEMS_CONTAINER: "MultiSelect--selectedItemsContainer",
  SELECTED_ITEM_WRAPPER: "MultiSelect--selectedItemWrapper",
  SELECTED_ITEM_CONTAINER: "MultiSelect--selectedItemContainer",
  SELECTED_ITEM_BUTTON: "MultiSelect--selectedItemButton",
  INPUT: "MultiSelect--input",
  CARET_BUTTON: "MultiSelect--caretButton",
  MENU_RESET: "MultiSelect--options--reset",
  MENU_OPEN: "MultiSelect--options--open",
  MENU_OPTION: "MultiSelect--option",
  MENU_OPTION_HIGHLIGHTED: "MultiSelect--option--highlighted",
  NO_OPTIONS_FOUND: "MultiSelect--notFound",
};

// export for testing
export function getSelectableOptions(
  options: Option[],
  selectedValues: string[],
  inputValue: string,
  creatable: boolean,
  caseSensitive: boolean
): Option[] {
  
  const selectedValuesSet = new Set<string>(selectedValues);
  let inputCase = inputValue.toLocaleLowerCase();

  //if case sensitive, don't lowercase input for match evaluation
  if (caseSensitive){ 
    inputCase=inputValue
  } 

  let hasExactMatch = false;
  const selectableOptions = options.filter((o) => {
    const optionLowerCase = o.label.toLocaleLowerCase();
    // small performance optimization to process exact match within the same iterator
    if (optionLowerCase === inputCase) {
      hasExactMatch = true;
    }

    return (
      !selectedValuesSet.has(o.value) &&
      (inputValue === "" || optionLowerCase.includes(inputCase))
    );
  });

  const creatableOption = [];
  if (creatable && !!inputValue && !hasExactMatch) {
    // add a dummy "add item X" placeholder
    // it will be special-case rendered and handled
    creatableOption.push({ value: ADD_NEW_ITEM_KEY });
  }

  return [...creatableOption, ...selectableOptions];
}

// pulling out English string literals to eventually be i18n friendly
// when i18n is prioritized for these components
const i18nStrings = {
  TOGGLE_BUTTON_LABEL: "toggle dropdown options",
};

/*
  Multi-item select drop down component
*/
const MultiSelect: React.FC<Props> = ({
  className,
  name,
  label,
  hideLabel,
  placeholder,
  // we will manage the options in state since options are creatable
  options: initialOptions,
  values,
  creatable,
  allowDuplicates,
  caseSensitive,
  onChange,
  size,
}) => {
  const [options, setOptions] = useState(initialOptions);
  const [inputValue, setInputValue] = useState("");
  const { getSelectedItemProps, getDropdownProps, selectedItems } = useMultipleSelection<Option>({
    itemToString: (o) => (o ? o.value : ""),
    selectedItems: (values || []).map((v) => options.find((o) => o.value === v)).filter((v) => !!v),
    onSelectedItemsChange: (change) => {
      if (onChange) {
        onChange(change.selectedItems.map((o) => o.value));
      }
    },
  });

  const selectableOptions = getSelectableOptions(
    options,
    allowDuplicates ? [] : values,
    inputValue,
    creatable,
    caseSensitive
  );

  const {
    isOpen,
    getToggleButtonProps,
    getLabelProps,
    getMenuProps,
    getInputProps,
    getComboboxProps,
    getItemProps,
    highlightedIndex,
    openMenu,
  } = useCombobox({
    inputValue,
    // useMultipleSelection will separately take care of all "selected item" interactions
    // without this line, interaction with adding/removing will be buggy
    selectedItem: null,
    items: selectableOptions,
    // taken from https://www.downshift-js.com/use-multiple-selection
    stateReducer: (state, actionAndChanges) => {
      const { changes, type } = actionAndChanges;
      switch (type) {
        case useCombobox.stateChangeTypes.InputKeyDownEnter:
        case useCombobox.stateChangeTypes.ItemClick:
          return {
            ...changes,
            isOpen: true, // keep the menu open after selection.
            highlightedIndex: state.highlightedIndex,
          };
        default:
          break;
      }
      return changes;
    },
    // default built-in changes generated here
    // https://github.com/downshift-js/downshift/blob/a13308910282c44ea2ebdcbc8a6dfee901df48a2/src/hooks/useCombobox/reducer.js
    // taken from https://www.downshift-js.com/use-multiple-selection
    onStateChange: (changes) => {
      const { inputValue: value, type, selectedItem } = changes;
      switch (type) {
        case useCombobox.stateChangeTypes.InputChange:
          setInputValue(value);
          break;
        case useCombobox.stateChangeTypes.InputKeyDownEnter:
        case useCombobox.stateChangeTypes.ItemClick:
          if (selectedItem) {
            setInputValue("");
            let newOption = selectedItem;
            if (selectedItem.value === ADD_NEW_ITEM_KEY) {
              newOption = { value: inputValue, label: inputValue };
              setOptions([...options, newOption]);
            }
            onChange([...selectedItems, newOption].map((o) => o.value));
          }
          break;
        case useCombobox.stateChangeTypes.InputBlur:
          setInputValue("");
          break;
        default:
          break;
      }
    },
  });

  const id = name;
  const inputRef = useRef<HTMLInputElement>();
  return (
    <div className={classNames(cssClass.CONTAINER, formElementSizeClassName(size), className)}>
      <label
        className={classNames(cssClass.LABEL, hideLabel && cssClass.LABEL_HIDDEN)}
        {...getLabelProps()}
      >
        {label}
      </label>
      <div
        className={classNames(
          cssClass.SELECT_CONTAINER,
          isOpen && cssClass.SELECT_CONTAINER_FOCUSED,
        )}
        {...getComboboxProps({
          onClick: (e) => {
            if (!isOpen) {
              openMenu();
            }
            if (inputRef.current) {
              inputRef.current.focus();
            }
          },
        })}
      >
        <div className={cssClass.SELECTED_ITEMS_CONTAINER}>
          {selectedItems.map((item, i) => (
            // need this wrapper element to support downshift accessibility
            <span
              key={`${item.value}${i}`}
              className={cssClass.SELECTED_ITEM_WRAPPER}
              {...getSelectedItemProps({ selectedItem: item, index: i })}
            >
              <Label className={cssClass.SELECTED_ITEM_CONTAINER}>
                {item.customLabel || item.label}
                <span
                  className={cssClass.SELECTED_ITEM_BUTTON}
                  onClick={(e) => {
                    e.stopPropagation();
                    onChange(
                      [...selectedItems.slice(0, i), ...selectedItems.slice(i + 1)].map(
                        (o) => o.value,
                      ),
                    );
                    if (inputRef.current) {
                      inputRef.current.select();
                    }
                  }}
                >
                  {/* https://www.compart.com/en/unicode/U+2715 */}
                  &#10005;
                </span>
              </Label>
            </span>
          ))}
          <input
            id={id}
            name={id}
            className={cssClass.INPUT}
            placeholder={placeholder}
            {...getInputProps(
              getDropdownProps({
                ref: inputRef,
                // prevents the user from navigating to the selected items when text is present
                preventKeyAction: inputValue !== "",
                onFocus: (e) => {
                  if (!isOpen) {
                    openMenu();
                  }
                },
              }),
            )}
          />
        </div>
        <button
          aria-label={i18nStrings.TOGGLE_BUTTON_LABEL}
          className={cssClass.CARET_BUTTON}
          {...getToggleButtonProps()}
        >
          <FontAwesome name={isOpen ? "caret-up" : "caret-down"} />
        </button>
      </div>
      <ul
        className={classNames(cssClass.MENU_RESET, isOpen && cssClass.MENU_OPEN)}
        {...getMenuProps()}
      >
        {isOpen &&
          (selectableOptions.length === 0 ? (
            <li className={classNames(cssClass.NO_OPTIONS_FOUND)}>No options</li>
          ) : (
            selectableOptions.map((o, i) => {
              const isAddNewItemOption = o.value === ADD_NEW_ITEM_KEY;
              return (
                <li
                  className={classNames(
                    cssClass.MENU_OPTION,
                    i === highlightedIndex && cssClass.MENU_OPTION_HIGHLIGHTED,
                  )}
                  key={`${o.value}${i}`}
                  {...getItemProps({ item: o, index: i })}
                >
                  {isAddNewItemOption ? `Add "${inputValue}"` : o.customLabel || o.label}
                </li>
              );
            })
          ))}
      </ul>
    </div>
  );
};

export default MultiSelect;
