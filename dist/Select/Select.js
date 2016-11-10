"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Select = Select;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactSelect = require("react-select");

var _reactSelect2 = _interopRequireDefault(_reactSelect);

require("react-select/dist/react-select.css");

require("./Select.less");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
  Component to allow selecting options from a list. Right now this only supports a basic dropdown
  with a fixed list of options. This component will be updated to allow searching for options that
  may be fetched asynchronously.
*/

function Select(_ref) {
  var id = _ref.id;
  var name = _ref.name;
  var clearable = _ref.clearable;
  var disabled = _ref.disabled;
  var label = _ref.label;
  var multi = _ref.multi;
  var onChange = _ref.onChange;
  var options = _ref.options;
  var _ref$placeholder = _ref.placeholder;
  var placeholder = _ref$placeholder === undefined ? "" : _ref$placeholder;
  var searchable = _ref.searchable;
  var value = _ref.value;
  var cssClass = Select.cssClass;


  var labelContainerClasses = cssClass.LABEL_CONTAINER;
  if (isLabelHidden(placeholder, value)) {
    labelContainerClasses += " " + cssClass.LABEL_HIDDEN;
  }

  // The label container must be returned after the ReactSelect otherwise it does not get displayed
  // in the browser.
  return _react2.default.createElement(
    "div",
    { className: cssClass.CONTAINER },
    _react2.default.createElement(
      "div",
      { id: id },
      _react2.default.createElement(_reactSelect2.default, {
        className: cssClass.REACT_SELECT,
        clearable: clearable,
        disabled: disabled,
        multi: multi,
        name: name,
        onChange: onChange,
        options: options,
        placeholder: placeholder,
        searchable: searchable,
        value: value
      })
    ),
    _react2.default.createElement(
      "div",
      { className: labelContainerClasses },
      _react2.default.createElement(
        "label",
        { className: cssClass.LABEL, htmlFor: id },
        label
      )
    )
  );
}

Select.cssClass = {
  CONTAINER: "Select--container",
  LABEL: "Select--label",
  LABEL_CONTAINER: "Select--labelContainer",
  LABEL_HIDDEN: "Select--labelHidden",
  REACT_SELECT: "Select--ReactSelect"
};

var selectValuePropType = _react2.default.PropTypes.shape({
  label: _react2.default.PropTypes.string.isRequired,
  value: _react2.default.PropTypes.string.isRequired
});

Select.propTypes = {
  id: _react2.default.PropTypes.string.isRequired,
  name: _react2.default.PropTypes.string.isRequired,
  clearable: _react2.default.PropTypes.bool,
  disabled: _react2.default.PropTypes.bool,
  label: _react2.default.PropTypes.string,
  multi: _react2.default.PropTypes.bool,
  onChange: _react2.default.PropTypes.func,
  options: _react2.default.PropTypes.arrayOf(selectValuePropType),
  placeholder: _react2.default.PropTypes.string,
  searchable: _react2.default.PropTypes.bool,
  value: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.string, selectValuePropType, _react2.default.PropTypes.arrayOf(_react2.default.PropTypes.string), _react2.default.PropTypes.arrayOf(selectValuePropType)])
};

Select.defaultProps = {
  clearable: false,
  placeholder: "",
  searchable: false
};