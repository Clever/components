import * as classNames from "classnames";
import * as React from "react";
import { useSelect } from "downshift";
import * as FontAwesome from "react-fontawesome";

import { FormElementSize, formElementSizeClassName } from "../utils/Forms";
import { Values } from "../utils/types";

import "./Select2.less";

export interface Props {
  className?: string;
  label: string;
  hideLabel?: boolean;
  placeholder?: string;
  // key -> label
  items: { [key: string]: string }[];
  onChange?: (key: string) => void;
  size?: Values<typeof FormElementSize>;
}

export const cssClass = {
  CONTAINER: "Select2--container",
  LABEL: "Select2--label",
  LABEL_HIDDEN: "Select2--label--hidden",
  SELECT_CONTAINER: "Select2--selectContainer",
  SELECT_BUTTON: "Select2--button",
  SELECT_BUTTON_OPEN: "Select2--button--open",
  PLACEHOLDER: "Select2--buttonPlaceholder",
  CARET: "Select2--button--caret",
  MENU_RESET: "Select2--items--reset",
  MENU_OPEN: "Select2--items--open",
  MENU_ITEM: "Select2--item",
  MENU_ITEM_HIGHLIGHTED: "Select2--item--highlighted",
};

/*
  Basic single-item-select drop down component
*/
const Select2: React.FC<Props> = ({
  className,
  label,
  hideLabel,
  placeholder,
  items,
  onChange,
  size,
}) => {
  const {
    isOpen,
    selectedItem,
    getToggleButtonProps,
    getLabelProps,
    getMenuProps,
    getItemProps,
  } = useSelect({
    items,
    itemToString: (item) => item.label,
    onSelectedItemChange: (item) => {
      if (onChange) {
        onChange(item.selectedItem.key);
      }
    },
  });
  return (
    <div className={classNames(cssClass.CONTAINER, formElementSizeClassName(size), className)}>
      <label
        className={classNames(cssClass.LABEL, hideLabel && cssClass.LABEL_HIDDEN)}
        {...getLabelProps()}
      >
        {label}
      </label>
      <div className={cssClass.SELECT_CONTAINER}>
        <button
          className={classNames(
            cssClass.SELECT_BUTTON,
            isOpen && cssClass.SELECT_BUTTON_OPEN,
            className,
          )}
          type="button"
          {...getToggleButtonProps()}
        >
          {(selectedItem && items.find((i) => i.key === selectedItem.key).label) || (
            <span className={cssClass.PLACEHOLDER}>{placeholder}</span>
          )}{" "}
          <FontAwesome className={cssClass.CARET} name={isOpen ? "caret-up" : "caret-down"} />
        </button>
        <ul
          className={classNames(cssClass.MENU_RESET, isOpen && cssClass.MENU_OPEN)}
          {...getMenuProps()}
        >
          {isOpen &&
            items.map((item, i) => (
              <li
                className={classNames(cssClass.MENU_ITEM)}
                key={`${item.key}${i}`}
                {...getItemProps({ item, index: i })}
              >
                {item.label}
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default Select2;
