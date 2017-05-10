import * as React from "react";
import * as ReactSelect from "react-select";
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

const CLASSNAMES = {
  CONTAINER: "Select--container",
  LABEL: "Select--label",
  LABEL_CONTAINER: "Select--labelContainer",
  LABEL_HIDDEN: "Select--labelHidden",
  REACT_SELECT: "Select--ReactSelect",
  READ_ONLY: "Select--readOnly",
};

/*
  Component to allow selecting options from a list. Right now this only supports a basic dropdown
  with a fixed list of options. This component will be updated to allow searching for options that
  may be fetched asynchronously.
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
  placeholder = "",
  readOnly,
  searchable,
  value,
  className,
}) {
  let labelContainerClasses = CLASSNAMES.LABEL_CONTAINER;
  if (isLabelHidden(placeholder, value)) {
    labelContainerClasses += ` ${CLASSNAMES.LABEL_HIDDEN}`;
  }

  let reactSelectClasses = CLASSNAMES.REACT_SELECT;
  if (readOnly) {
    reactSelectClasses += ` ${CLASSNAMES.READ_ONLY}`;
  }

  // The label container must be returned after the ReactSelect otherwise it does not get displayed
  // in the browser.
  return (
    <div className={classnames(CLASSNAMES.CONTAINER, className)}>
      <div id={id}>
        <ReactSelect
          className={reactSelectClasses}
          clearable={clearable}
          disabled={disabled || readOnly}
          multi={multi}
          name={name}
          onChange={onChange}
          optionRenderer={optionRenderer}
          options={options}
          placeholder={placeholder}
          searchable={searchable}
          value={value}
        />
      </div>
      <div className={labelContainerClasses}>
        <label className={CLASSNAMES.LABEL} htmlFor={id}>{label}</label>
      </div>
    </div>
  );
}

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
  placeholder: React.PropTypes.string,
  readOnly: React.PropTypes.bool,
  searchable: React.PropTypes.bool,
  value: React.PropTypes.oneOfType([
    React.PropTypes.string,
    selectValuePropType,
    React.PropTypes.arrayOf(React.PropTypes.string),
    React.PropTypes.arrayOf(selectValuePropType),
  ]),
  className: React.PropTypes.string,
};

Select.defaultProps = {
  clearable: false,
  placeholder: "",
  searchable: false,
};
