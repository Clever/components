import React from "react";
import ReactSelect from "react-select";
import classnames from "classnames";

import "react-select/dist/react-select.css";
import "./Select.less";

function isLabelHidden(placeholder, value) {
  if (!placeholder) {
    return false;
  }
  if (!value) {
    return true;
  }
  if (Array.isArray(value) && (value.length === 0)) {
    return true;
  }
  return false;
}

/*
 * Component to allow selecting options from a list. It can fetch those options
 * synchronously or asynchronously by specifying the `lazy` parameter.
 */
export function Select({
  id,
  name,
  clearable,
  disabled,
  label,
  multi,
  onChange,
  optionRenderer,
  options,
  lazy,
  loadOptions,
  placeholder = "",
  readOnly,
  required,
  searchable,
  noResultsText,
  creatable,
  creatablePromptFn,
  value,
  valueRenderer,
  className,
}) {
  const {cssClass} = Select;

  if (!lazy) {
    if (!options) {
      console.warn("Select: prop \"options\" must be set if not \"lazy\"");
    }
    if (loadOptions) {
      console.warn("Select: prop \"loadOptions\" may not be set if not \"lazy\"");
    }
  } else {
    if (options) {
      console.warn("Select: prop \"options\" may not be set if not \"lazy\"");
    }
    if (!loadOptions) {
      console.warn("Select: prop \"loadOptions\" must be set if not \"lazy\"");
    }
  }

  let labelClasses = cssClass.LABEL;
  if (isLabelHidden(placeholder, value)) {
    labelClasses += ` ${cssClass.LABEL_HIDDEN}`;
  }

  let inputNote;
  if (required) {
    inputNote = <span className="Select--required">required</span>;
  }

  let reactSelectClasses = cssClass.REACT_SELECT;
  if (readOnly) {
    reactSelectClasses += ` ${cssClass.READ_ONLY}`;
  }

  let SelectComponent = ReactSelect;
  if (creatable && lazy) {
    SelectComponent = ReactSelect.AsyncCreatable;
  } else if (creatable) {
    SelectComponent = ReactSelect.Creatable;
  } else if (lazy) {
    SelectComponent = ReactSelect.Async;
  }

  // The label container must be returned after the ReactSelect otherwise it does not get displayed
  // in the browser.
  return (
    <div className={classnames(cssClass.CONTAINER, className)}>
      <div id={id}>
        <SelectComponent
          className={reactSelectClasses}
          clearable={clearable}
          promptTextCreator={creatablePromptFn}
          disabled={disabled || readOnly}
          multi={multi}
          name={name}
          onChange={onChange}
          optionRenderer={optionRenderer}
          options={options}
          loadOptions={loadOptions}
          placeholder={placeholder}
          searchable={searchable}
          noResultsText={noResultsText}
          value={value}
          valueRenderer={valueRenderer}
        />
      </div>
      <div className={cssClass.LABEL_CONTAINER}>
        <label className={labelClasses} htmlFor={id}>{label}</label>
        {inputNote}
      </div>
    </div>
  );
}

Select.cssClass = {
  CONTAINER: "Select--container",
  LABEL: "Select--label",
  LABEL_CONTAINER: "Select--labelContainer",
  LABEL_HIDDEN: "Select--labelHidden",
  REACT_SELECT: "Select--ReactSelect",
  READ_ONLY: "Select--readOnly",
};

const selectValuePropType = React.PropTypes.shape({
  label: React.PropTypes.string.isRequired,
  value: React.PropTypes.string.isRequired,
});

Select.propTypes = {
  id: React.PropTypes.string.isRequired,
  name: React.PropTypes.string.isRequired,
  clearable: React.PropTypes.bool,
  disabled: React.PropTypes.bool,
  label: React.PropTypes.string,
  multi: React.PropTypes.bool,
  onChange: React.PropTypes.func,
  optionRenderer: React.PropTypes.func,
  options: React.PropTypes.arrayOf(selectValuePropType),
  lazy: React.PropTypes.bool,
  loadOptions: React.PropTypes.func,
  placeholder: React.PropTypes.string,
  readOnly: React.PropTypes.bool,
  searchable: React.PropTypes.bool,
  creatable: React.PropTypes.bool,
  creatablePromptFn: React.PropTypes.func,
  noResultsText: React.PropTypes.node,
  required: React.PropTypes.bool,
  value: React.PropTypes.oneOfType([
    React.PropTypes.string,
    selectValuePropType,
    React.PropTypes.arrayOf(React.PropTypes.string),
    React.PropTypes.arrayOf(selectValuePropType),
  ]),
  valueRenderer: React.PropTypes.func,
  className: React.PropTypes.string,
};

Select.defaultProps = {
  clearable: false,
  placeholder: "",
  searchable: false,
  creatable: false,
};
