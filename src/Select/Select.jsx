import React from "react";
import ReactSelect from "react-select";

import "react-select/dist/react-select.css";
import "./Select.less";

/*
  Component to allow selecting options from a list. Right now this only supports a basic dropdown
  with a fixed list of options. This component will be updated to allow searching for options that
  may be fetched asynchronously.
*/

export function Select({id, name, label, onChange, options, placeholder = "", value}) {
  const {cssClass} = Select;

  let labelContainerClasses = cssClass.LABEL_CONTAINER;
  if (placeholder && !value) {
    labelContainerClasses += ` ${cssClass.LABEL_HIDDEN}`;
  }

  // The label container must be returned after the ReactSelect otherwise it does not get displayed
  // in the browser.
  return (
    <div className={cssClass.CONTAINER}>
      <div id={id}>
        <ReactSelect
          className={cssClass.REACT_SELECT}
          clearable={false}
          name={name}
          onChange={onChange}
          options={options}
          placeholder={placeholder}
          searchable={false}
          value={value}
        />
      </div>
      <div className={labelContainerClasses}>
        <label className={cssClass.LABEL} htmlFor={id}>{label}</label>
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
};

const selectValue = React.PropTypes.shape({
  label: React.PropTypes.string.isRequired,
  value: React.PropTypes.string.isRequired,
});

Select.propTypes = {
  id: React.PropTypes.string.isRequired,
  name: React.PropTypes.string.isRequired,
  label: React.PropTypes.string,
  onChange: React.PropTypes.func,
  options: React.PropTypes.arrayOf(selectValue),
  placeholder: React.PropTypes.string,
  value: selectValue,
};
