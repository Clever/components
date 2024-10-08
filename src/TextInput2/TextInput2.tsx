import * as classnames from "classnames";
import * as React from "react";
import { useState, useEffect } from "react";

import * as FontAwesome from "react-fontawesome";
import { Button } from "../Button/Button";
import { FormElementSize, formElementSizeClassName, FormElementRequirement } from "../utils/Forms";
import { Values } from "../utils/types";

import "./TextInput2.less";

export interface Props {
  className?: string;
  name: string;
  label: React.ReactNode;
  // label is required for a11y purposes, so provide an option to hide it visually
  hideLabel?: boolean;
  placeholder?: string;
  helpText?: React.ReactNode;
  icon?: React.ReactNode;
  requirement?: Values<typeof FormElementRequirement>;
  obscurable?: boolean;
  errorOnEmpty?: boolean;
  // option to return an error message while input is in focus
  errorOnFocus?: boolean;
  // returns an error message, null for no error
  errorValidation?: (value: string) => string | null;
  value: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onFocus?: React.FocusEventHandler<HTMLInputElement>;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  size?: Values<typeof FormElementSize>;
  autoFocus?: boolean;
}

export const cssClass = {
  CONTAINER: "TextInput2--container",
  INFO_ROW: "TextInput2--infoRow",
  INFO_ROW_LABEL_HIDDEN: "TextInput2--infoRow--labelHidden",
  INFO_REQUIREMENT: "TextInput2--infoRequirement",
  LABEL: "TextInput2--label",
  LABEL_HIDDEN: "TextInput2--label--hidden",
  LEADING_ICON: "TextInput2--leadingIcon",
  INPUT_CONTAINER: "TextInput2--inputContainer",
  INPUT_CONTAINER_FOCUSED: "TextInput2--inputContainer--focused",
  INPUT_CONTAINER_ERROR: "TextInput2--inputContainer--error",
  INPUT_CONTAINER_DISABLED: "TextInput2--inputContainer--disabled",
  INPUT: "TextInput2--input",
  FOOTER_TEXT: "TextInput2--footerText",
  ERROR_MESSAGE: "TextInput2--footerText--error",
  ERROR_ICON: "TextInput2--errorIcon",
  HIDE_SHOW: "TextInput2--hideShowButton",
};

/*
 * text input
 */
const TextInput2: React.FC<Props> = ({
  className,
  name,
  label,
  hideLabel,
  placeholder,
  helpText,
  icon,
  requirement,
  errorOnEmpty,
  errorOnFocus,
  errorValidation,
  obscurable,
  value,
  onChange,
  onFocus,
  onBlur,
  size,
  autoFocus,
}) => {
  const id = name;
  const [isFocused, setIsFocused] = useState(false);
  const [isObscured, setIsObscured] = useState(true);
  const inputType = obscurable && isObscured ? "password" : "text";
  // NOTE: setting errorMessage to an empty string displays an error state with no message (e.g. required)
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    // if value is empty, either:
    // 1) display empty error if errorOnEmpty is true and input isn't in focus
    // 2) remove error
    if (!value) {
      setErrorMessage(errorOnEmpty && !isFocused ? "" : null);
      return;
    }

    const newErrorMessage = errorValidation(value);
    // show error if input is out of focus
    if (newErrorMessage && !isFocused) {
      setErrorMessage(newErrorMessage);
    }
    // show error if input is in focus
    else if (newErrorMessage && isFocused && errorOnFocus) {
      setErrorMessage(newErrorMessage);
      return;
    }
    // remove error if it has been corrected
    if (!newErrorMessage) setErrorMessage(null);
  }, [value, isFocused, errorOnEmpty]);

  return (
    <div className={classnames(cssClass.CONTAINER, formElementSizeClassName(size), className)}>
      <div className={classnames(cssClass.INFO_ROW, hideLabel && cssClass.INFO_ROW_LABEL_HIDDEN)}>
        <label
          className={classnames(cssClass.LABEL, hideLabel && cssClass.LABEL_HIDDEN)}
          htmlFor={id}
        >
          {label}
        </label>
        {requirement && (
          <label className={cssClass.INFO_REQUIREMENT} aria-live="polite" htmlFor={id}>
            {requirement}
          </label>
        )}
      </div>
      <div
        className={classnames(
          cssClass.INPUT_CONTAINER,
          isFocused && cssClass.INPUT_CONTAINER_FOCUSED,
          errorMessage != null && cssClass.INPUT_CONTAINER_ERROR,
          requirement === FormElementRequirement.DISABLED && cssClass.INPUT_CONTAINER_DISABLED,
        )}
      >
        {icon && <i className={cssClass.LEADING_ICON}>{icon}</i>}
        <input
          id={id}
          name={id}
          className={cssClass.INPUT}
          role="textbox"
          type={inputType}
          value={value}
          placeholder={placeholder}
          disabled={requirement === FormElementRequirement.DISABLED}
          onChange={onChange}
          onFocus={(e) => {
            setIsFocused(true);
            if (onFocus) onFocus(e);
          }}
          onBlur={(e) => {
            setIsFocused(false);
            if (onBlur) onBlur(e);
          }}
          autoFocus={autoFocus}
        />
        {errorMessage != null && (
          <FontAwesome className={cssClass.ERROR_ICON} name="exclamation-circle" />
        )}
        {obscurable && (
          <Button
            className={cssClass.HIDE_SHOW}
            type="linkPlain"
            onClick={(e) => setIsObscured(!isObscured)}
            value={isObscured ? "Show" : "Hide"}
          />
        )}
      </div>
      {(errorMessage || helpText) && (
        <div className={classnames(cssClass.FOOTER_TEXT, errorMessage && cssClass.ERROR_MESSAGE)}>
          {errorMessage || helpText}
        </div>
      )}
    </div>
  );
};

TextInput2.defaultProps = {
  errorOnEmpty: false,
  errorValidation: () => null,
  size: FormElementSize.FULL_WIDTH,
};

export default TextInput2;
