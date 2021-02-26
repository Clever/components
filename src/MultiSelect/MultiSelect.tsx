import * as classNames from "classnames";
import * as React from "react";
import { useState, useRef } from "react";
import { useCombobox, useMultipleSelection } from "downshift";
import * as FontAwesome from "react-fontawesome";

import Label from "../Label/Label";
import { FormElementSize, formElementSizeClassName } from "../utils/Forms";
import { Values } from "../utils/types";

import "./MultiSelect.less";

type Item = { key: string; value?: React.ReactNode; stringValue: string };

export interface Props {
  className?: string;
  name: string;
  label: string;
  hideLabel?: boolean;
  placeholder?: string;
  items: Item[];
  // list of keys
  value: string[];
  creatable?: boolean;
  onChange?: (items: Item[]) => void;
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
  MENU_RESET: "MultiSelect--items--reset",
  MENU_OPEN: "MultiSelect--items--open",
  MENU_ITEM: "MultiSelect--item",
  MENU_ITEM_HIGHLIGHTED: "MultiSelect--item--highlighted",
  NO_ITEMS_FOUND: "MultiSelect--itemsNoneFound",
};

function getSelectableItems(items: Item[], selectedItems: Item[], inputValue: string) {
  const selectedKeys = new Set<string>(selectedItems.map((si) => si.key));
  const inputLowerCase = inputValue.toLocaleLowerCase();
  return items.filter(
    (item) =>
      !selectedKeys.has(item.key) &&
      (inputValue === "" || item.stringValue.toLocaleLowerCase().includes(inputLowerCase)),
  );
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
  // we will manage the items in state since items are creatable
  items: initialItems,
  creatable,
  onChange,
  size,
}) => {
  const [items, setItems] = useState(initialItems);
  const [inputValue, setInputValue] = useState("");
  const {
    getSelectedItemProps,
    getDropdownProps,
    addSelectedItem,
    removeSelectedItem,
    selectedItems,
  } = useMultipleSelection<Item>({
    itemToString: (item) => item.key,
    onSelectedItemsChange: (change) => {
      if (onChange) {
        onChange(change.selectedItems);
      }
    },
  });
  const selectableItems = getSelectableItems(items, selectedItems, inputValue);

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
    defaultHighlightedIndex: 0,
    // useMultipleSelection will separately take care of all "selected item" interactions
    // without this line, interaction with adding/removing will be buggy
    selectedItem: null,
    items: selectableItems,
    // taken from https://www.downshift-js.com/use-multiple-selection
    stateReducer: (state, actionAndChanges) => {
      const { changes, type } = actionAndChanges;
      switch (type) {
        case useCombobox.stateChangeTypes.InputKeyDownEnter:
        case useCombobox.stateChangeTypes.ItemClick:
          return {
            ...changes,
            isOpen: true, // keep the menu open after selection.
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
            addSelectedItem(selectedItem);
          }
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
            <Label
              key={`${item.key}${i}`}
              className={cssClass.SELECTED_ITEM_CONTAINER}
              {...getSelectedItemProps({ selectedItem: item, index: i })}
            >
              {item.value || item.stringValue}
              <span
                className={cssClass.SELECTED_ITEM_BUTTON}
                onClick={(e) => {
                  e.stopPropagation();
                  removeSelectedItem(item);
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
            {...getInputProps(getDropdownProps({ ref: inputRef, preventKeyAction: isOpen }))}
            placeholder={placeholder}
            onFocus={(e) => {
              if (!isOpen) {
                openMenu();
              }
            }}
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
          (selectableItems.length > 0 ? (
            selectableItems.map((item, i) => (
              <li
                className={classNames(
                  cssClass.MENU_ITEM,
                  i === highlightedIndex && cssClass.MENU_ITEM_HIGHLIGHTED,
                )}
                key={`${item.key}${i}`}
                {...getItemProps({ item, index: i })}
              >
                {item.value || item.stringValue}
              </li>
            ))
          ) : (
            <div
              className={classNames(!creatable && cssClass.NO_ITEMS_FOUND)}
              onClick={() => {
                if (creatable) {
                  const newItem = { key: inputValue, stringValue: inputValue };
                  setItems(items.concat(newItem));
                  setInputValue("");
                  addSelectedItem(newItem);
                }
              }}
            >
              {creatable ? `Create new item ${inputValue}` : "No options"}
            </div>
          ))}
      </ul>
    </div>
  );
};

export default MultiSelect;
