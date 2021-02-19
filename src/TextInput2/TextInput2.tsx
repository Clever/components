import * as classnames from "classnames";
import * as React from "react";
import { useState } from "react";

import { FormElementSize, formElementSizeClassName } from "../utils/Forms";
import { Values } from "../utils/types";

import "./TextInput2.less";

export const TextInput2Requirement = {
  OPTIONAL: "optional",
  REQUIRED: "required",
} as const;

export interface Props {
  className?: string;
  name: string;
  label?: React.ReactNode;
  placeholder?: string;
  helpText?: React.ReactNode;
  icon?: React.ReactNode;
  requirement?: Values<typeof TextInput2Requirement>;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  size?: Values<typeof FormElementSize>;
}

export const cssClass = {
  CONTAINER: "TextInput2--container",
  INFO_ROW: "TextInput2--infoRow",
  INFO_REQUIREMENT: "TextInput2--infoRequirement",
  LABEL: "TextInput2--label",
  LEADING_ICON: "TextInput2--leadingIcon",
  INPUT_CONTAINER: "TextInput2--inputContainer",
  INPUT: "TextInput2--input",
  INPUT_FOCUSED: "TextInput2--input--focused",
  HELP_TEXT: "TextInput2--helpText",
};

/*
 * text input
 */
const TextInput2: React.FC<Props> = ({
  className,
  name,
  label,
  placeholder,
  helpText,
  icon,
  requirement,
  value,
  onChange,
  size,
}) => {
  const id = name;
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className={classnames(cssClass.CONTAINER, formElementSizeClassName(size), className)}>
      {(!!requirement || !!label) && (
        <div className={cssClass.INFO_ROW}>
          {!!label ? (
            <label className={cssClass.LABEL} htmlFor={id}>
              {label}
            </label>
          ) : (
            // placeholder for flexbox
            <div></div>
          )}
          {!!requirement && (
            <span className={cssClass.INFO_REQUIREMENT} aria-live="polite">
              {requirement}
            </span>
          )}
        </div>
      )}
      <div className={classnames(cssClass.INPUT_CONTAINER, isFocused && cssClass.INPUT_FOCUSED)}>
        {icon && <i className={cssClass.LEADING_ICON}>{icon}</i>}
        <input
          id={id}
          name={id}
          className={cssClass.INPUT}
          role="textbox"
          type={"text"}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
      </div>
      {!!helpText && <div className={cssClass.HELP_TEXT}>{helpText}</div>}
    </div>
  );
};

TextInput2.defaultProps = {
  size: FormElementSize.FULL_WIDTH,
};

export default TextInput2;
