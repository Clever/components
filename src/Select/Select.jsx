import React from "react";
import * as PropTypes from "prop-types";
import ReactSelect from "react-select";
import classnames from "classnames";

import { FormElementSize, formElementSizeClassName } from "../utils/Forms";

import "react-select/dist/react-select.css";
import "./Select.less";
import "../less/forms.less";

function isLabelHidden(placeholder, value) {
  if (!placeholder) {
    return false;
  }
  if (!value) {
    return true;
  }
  if (Array.isArray(value) && value.length === 0) {
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
  filterOptions,
  placeholder = "",
  readOnly,
  required,
  searchable,
  noResultsText,
  creatable,
  creatablePromptFn,
  value,
  className,
  error,
  size,
}) {
  const { cssClass } = Select;

  if (!lazy) {
    if (!options) {
      console.warn('Select: prop "options" must be set if not "lazy"');
    }
    if (loadOptions) {
      console.warn('Select: prop "loadOptions" may not be set if not "lazy"');
    }
  } else {
    if (options) {
      console.warn('Select: prop "options" may not be set if not "lazy"');
    }
    if (!loadOptions) {
      console.warn('Select: prop "loadOptions" must be set if not "lazy"');
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

  let wrapperClass = className;
  if (error) {
    // error should overwrite required
    inputNote = <span className="Select--error">{error}</span>;
    wrapperClass += " Select--hasError";
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

  const overrideProps = lazy && !filterOptions ? { filterOptions: results => results } : {};

  // The label container must be returned after the ReactSelect otherwise it does not get displayed
  // in the browser.
  return (
    <div className={classnames(cssClass.CONTAINER, formElementSizeClassName(size), wrapperClass)}>
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
          filterOptions={filterOptions}
          placeholder={placeholder}
          searchable={searchable}
          noResultsText={noResultsText}
          value={value}
          {...overrideProps}
        />
      </div>
      <div className={cssClass.LABEL_CONTAINER}>
        <label className={labelClasses} htmlFor={id}>
          {label}
        </label>
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

const selectValuePropType = PropTypes.shape({
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
});

Select.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  clearable: PropTypes.bool,
  disabled: PropTypes.bool,
  label: PropTypes.string,
  multi: PropTypes.bool,
  onChange: PropTypes.func,
  optionRenderer: PropTypes.func,
  options: PropTypes.arrayOf(selectValuePropType),
  lazy: PropTypes.bool,
  loadOptions: PropTypes.func,
  filterOptions: PropTypes.func,
  placeholder: PropTypes.string,
  readOnly: PropTypes.bool,
  searchable: PropTypes.bool,
  creatable: PropTypes.bool,
  creatablePromptFn: PropTypes.func,
  noResultsText: PropTypes.node,
  required: PropTypes.bool,
  value: PropTypes.oneOfType([
    PropTypes.string,
    selectValuePropType,
    PropTypes.arrayOf(PropTypes.string),
    PropTypes.arrayOf(selectValuePropType),
  ]),
  className: PropTypes.string,
  error: PropTypes.string,
  // Object.values isn't properly polyfilled in jsx files
  size: PropTypes.oneOf(Object.keys(FormElementSize).map(key => FormElementSize[key])),
};

Select.defaultProps = {
  clearable: false,
  placeholder: "",
  searchable: false,
  creatable: false,
  size: FormElementSize.FULL_WIDTH,
};
