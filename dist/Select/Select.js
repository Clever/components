"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.Select = Select;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var PropTypes = _interopRequireWildcard(_propTypes);

var _reactSelect = require("react-select");

var _reactSelect2 = _interopRequireDefault(_reactSelect);

var _classnames = require("classnames");

var _classnames2 = _interopRequireDefault(_classnames);

require("react-select/dist/react-select.css");

require("./Select.less");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

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
 * Component to allow selecting options from a list. It can fetch those options
 * synchronously or asynchronously by specifying the `lazy` parameter.
 */
function Select(_ref) {
  var id = _ref.id;
  var name = _ref.name;
  var clearable = _ref.clearable;
  var disabled = _ref.disabled;
  var label = _ref.label;
  var multi = _ref.multi;
  var onChange = _ref.onChange;
  var optionRenderer = _ref.optionRenderer;
  var options = _ref.options;
  var lazy = _ref.lazy;
  var loadOptions = _ref.loadOptions;
  var _ref$placeholder = _ref.placeholder;
  var placeholder = _ref$placeholder === undefined ? "" : _ref$placeholder;
  var readOnly = _ref.readOnly;
  var required = _ref.required;
  var searchable = _ref.searchable;
  var noResultsText = _ref.noResultsText;
  var creatable = _ref.creatable;
  var creatablePromptFn = _ref.creatablePromptFn;
  var value = _ref.value;
  var className = _ref.className;
  var cssClass = Select.cssClass;


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

  var labelClasses = cssClass.LABEL;
  if (isLabelHidden(placeholder, value)) {
    labelClasses += " " + cssClass.LABEL_HIDDEN;
  }

  var inputNote = void 0;
  if (required) {
    inputNote = _react2.default.createElement(
      "span",
      { className: "Select--required" },
      "required"
    );
  }

  var reactSelectClasses = cssClass.REACT_SELECT;
  if (readOnly) {
    reactSelectClasses += " " + cssClass.READ_ONLY;
  }

  var SelectComponent = _reactSelect2.default;
  if (creatable && lazy) {
    SelectComponent = _reactSelect2.default.AsyncCreatable;
  } else if (creatable) {
    SelectComponent = _reactSelect2.default.Creatable;
  } else if (lazy) {
    SelectComponent = _reactSelect2.default.Async;
  }

  var overrideProps = lazy ? { filterOptions: function filterOptions(results) {
      return results;
    } } : {};

  // The label container must be returned after the ReactSelect otherwise it does not get displayed
  // in the browser.
  return _react2.default.createElement(
    "div",
    { className: (0, _classnames2.default)(cssClass.CONTAINER, className) },
    _react2.default.createElement(
      "div",
      { id: id },
      _react2.default.createElement(SelectComponent, _extends({
        className: reactSelectClasses,
        clearable: clearable,
        promptTextCreator: creatablePromptFn,
        disabled: disabled || readOnly,
        multi: multi,
        name: name,
        onChange: onChange,
        optionRenderer: optionRenderer,
        options: options,
        loadOptions: loadOptions,
        placeholder: placeholder,
        searchable: searchable,
        noResultsText: noResultsText,
        value: value
      }, overrideProps))
    ),
    _react2.default.createElement(
      "div",
      { className: cssClass.LABEL_CONTAINER },
      _react2.default.createElement(
        "label",
        { className: labelClasses, htmlFor: id },
        label
      ),
      inputNote
    )
  );
}

Select.cssClass = {
  CONTAINER: "Select--container",
  LABEL: "Select--label",
  LABEL_CONTAINER: "Select--labelContainer",
  LABEL_HIDDEN: "Select--labelHidden",
  REACT_SELECT: "Select--ReactSelect",
  READ_ONLY: "Select--readOnly"
};

var selectValuePropType = PropTypes.shape({
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired
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
  placeholder: PropTypes.string,
  readOnly: PropTypes.bool,
  searchable: PropTypes.bool,
  creatable: PropTypes.bool,
  creatablePromptFn: PropTypes.func,
  noResultsText: PropTypes.node,
  required: PropTypes.bool,
  value: PropTypes.oneOfType([PropTypes.string, selectValuePropType, PropTypes.arrayOf(PropTypes.string), PropTypes.arrayOf(selectValuePropType)]),
  className: PropTypes.string
};

Select.defaultProps = {
  clearable: false,
  placeholder: "",
  searchable: false,
  creatable: false
};