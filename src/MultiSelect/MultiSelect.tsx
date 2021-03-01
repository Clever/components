import * as classNames from "classnames";
import * as React from "react";
import { useState, useRef } from "react";
import { useCombobox, useMultipleSelection } from "downshift";
import * as FontAwesome from "react-fontawesome";

import Label from "../Label/Label";
import { FormElementSize, formElementSizeClassName } from "../utils/Forms";
import { Values } from "../utils/types";

import "./MultiSelect.less";

const ADD_NEW_ITEM_KEY = "MultiSelect--addNewItem";

// value represents the searchable text of the option
type Option = { value: string; content?: React.ReactNode };

export interface Props {
  className?: string;
  name: string;
  label: string;
  // label is required for a11y purposes, so provide an option to hide it visually
  hideLabel?: boolean;
  placeholder?: string;
  options: Option[];
  creatable?: boolean;
  onChange?: (options: Option[]) => void;
  size?: Values<typeof FormElementSize>;
}

export const cssClass = {
  CONTAINER: "MultiSelect--container",
  LABEL: "MultiSelect--label",
  LABEL_HIDDEN: "MultiSelect--label--hidden",
  SELECT_CONTAINER: "MultiSelect--selectContainer",
  SELECT_CONTAINER_FOCUSED: "MultiSelect--selectContainer--focused",
  SELECTED_ITEMS_CONTAINER: "MultiSelect--selectedItemsContainer",
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

function getSelectableOptions(options: Option[], selectedItems: Option[], inputValue: string) {
  const selectedValues = new Set<string>(selectedItems.map((si) => si.value));
  const inputLowerCase = inputValue.toLocaleLowerCase();
  return [
    // add a dummy "add item X" placeholder, we will optionally show it via the render code
    { value: ADD_NEW_ITEM_KEY },
    ...options.filter(
      (o) =>
        !selectedValues.has(o.value) &&
        (inputValue === "" || o.value.toLocaleLowerCase().includes(inputLowerCase)),
    ),
  ];
}

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
  creatable,
  onChange,
  size,
}) => {
  const [options, setOptions] = useState(initialOptions);
  const [inputValue, setInputValue] = useState("");
  const {
    getSelectedItemProps,
    getDropdownProps,
    addSelectedItem,
    removeSelectedItem,
    selectedItems,
  } = useMultipleSelection<Option>({
    itemToString: (o) => o.value,
    onSelectedItemsChange: (change) => {
      if (onChange) {
        onChange(change.selectedItems);
      }
    },
  });
  const selectableOptions = getSelectableOptions(options, selectedItems, inputValue);

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
              newOption = { value: inputValue };
              setOptions([...options, newOption]);
            }
            addSelectedItem(newOption);
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
  const inputLowerCase = inputValue.toLocaleLowerCase();
  const hasExactMatch = options.some((o) => o.value.toLocaleLowerCase() === inputLowerCase);
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
            <Label
              key={`${item.value}${i}`}
              className={cssClass.SELECTED_ITEM_CONTAINER}
              {...getSelectedItemProps({ selectedItem: item, index: i })}
            >
              {item.content || item.value}
              <span
                className={cssClass.SELECTED_ITEM_BUTTON}
                onClick={(e) => {
                  e.stopPropagation();
                  removeSelectedItem(item);
                  if (inputRef.current) {
                    inputRef.current.select();
                  }
                }}
              >
                {/* https://www.compart.com/en/unicode/U+2715 */}
                &#10005;
              </span>
            </Label>
          ))}
          <input
            id={id}
            name={id}
            className={cssClass.INPUT}
            placeholder={placeholder}
            {...getInputProps(
              getDropdownProps({
                ref: inputRef,
                preventKeyAction: isOpen,
                onFocus: (e) => {
                  if (!isOpen) {
                    openMenu();
                  }
                },
              }),
            )}
          />
        </div>
        <button className={cssClass.CARET_BUTTON} {...getToggleButtonProps()}>
          <FontAwesome name={isOpen ? "caret-up" : "caret-down"} />
        </button>
      </div>
      <ul
        className={classNames(cssClass.MENU_RESET, isOpen && cssClass.MENU_OPEN)}
        {...getMenuProps()}
      >
        {isOpen &&
          // only the dummy "add item X" option exists
          (selectableOptions.length === 1 && (!creatable || hasExactMatch) ? (
            <li className={classNames(cssClass.NO_OPTIONS_FOUND)}>No options</li>
          ) : (
            selectableOptions.map((o, i) => {
              const isAddNewItemOption = o.value === ADD_NEW_ITEM_KEY;
              // hide the first dummy "add item X" option if not eligible
              if (isAddNewItemOption && (!inputValue || !creatable || hasExactMatch)) {
                return null;
              }

              return (
                <li
                  className={classNames(
                    cssClass.MENU_OPTION,
                    i === highlightedIndex && cssClass.MENU_OPTION_HIGHLIGHTED,
                  )}
                  key={`${o.value}${i}`}
                  {...getItemProps({ item: o, index: i })}
                >
                  {isAddNewItemOption ? `Add "${inputValue}"` : o.content || o.value}
                </li>
              );
            })
          ))}
      </ul>
    </div>
  );
};

export default MultiSelect;
