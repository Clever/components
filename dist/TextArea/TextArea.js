"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TextArea = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var PropTypes = _interopRequireWildcard(_propTypes);

var _classnames = require("classnames");

var _classnames2 = _interopRequireDefault(_classnames);

var _reactAutosizeTextarea = require("react-autosize-textarea");

var _reactAutosizeTextarea2 = _interopRequireDefault(_reactAutosizeTextarea);

require("./TextArea.less");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TextArea = exports.TextArea = function (_React$Component) {
  _inherits(TextArea, _React$Component);

  _createClass(TextArea, null, [{
    key: "validateProps",
    value: function validateProps(props) {
      if (props.required && props.optional) {
        throw new Error("You cannot pass both `required` and `optional` on a TextArea.");
      }

      if (["readOnly", "disabled", "inFocus"].filter(function (x) {
        return props[x];
      }).length > 1) {
        throw new Error("The readOnly, disabled, and inFocus props on a TextArea are mutually exclusive.");
      }

      return props;
    }
  }]);

  function TextArea(props) {
    _classCallCheck(this, TextArea);

    var _this = _possibleConstructorReturn(this, (TextArea.__proto__ || Object.getPrototypeOf(TextArea)).call(this, TextArea.validateProps(props)));

    _this.state = { inFocus: false };
    _this.onFocus = _this.onFocus.bind(_this);
    _this.onBlur = _this.onBlur.bind(_this);
    return _this;
  }

  /* Insert any additional lifecycle methods,
     event handlers, and helper methods here */

  _createClass(TextArea, [{
    key: "onFocus",
    value: function onFocus() {
      var onFocus = this.props.onFocus;


      this.setState({ inFocus: true });
      if (onFocus) {
        onFocus();
      }
    }
  }, {
    key: "onBlur",
    value: function onBlur() {
      var onBlur = this.props.onBlur;


      this.setState({ inFocus: false });
      if (onBlur) {
        onBlur();
      }
    }
  }, {
    key: "focus",
    value: function focus() {
      this.refs.input.focus();
    }
  }, {
    key: "render",
    value: function render() {
      var wrapperClass = "TextArea";

      if (this.props.error) wrapperClass += " TextArea--hasError";

      if (this.props.readOnly) {
        wrapperClass += " TextArea--readonly";
      } else if (this.props.disabled) {
        wrapperClass += " TextArea--disabled";
      } else if (this.state.inFocus) {
        wrapperClass += " TextArea--inFocus";
      }

      // placeholder shown
      if (!this.props.value && this.props.placeholder) {
        wrapperClass += " TextArea--placeholder-shown";
      }

      // note on the upper right corner
      var inputNote = void 0;
      if (this.props.required) {
        inputNote = _react2.default.createElement(
          "span",
          { className: "TextArea--required" },
          "required"
        );
      }
      if (this.props.optional) {
        inputNote = _react2.default.createElement(
          "span",
          { className: "TextArea--optional" },
          "optional"
        );
      }

      if (this.props.error) {
        inputNote = _react2.default.createElement(
          "span",
          { className: "TextArea--error" },
          this.props.error
        );
      }

      var props = {
        className: "TextArea--input",
        disabled: this.props.disabled,
        maxLength: this.props.maxLength,
        minLength: this.props.minLength,
        name: this.props.name,
        onBlur: this.onBlur,
        onChange: this.props.onChange,
        onFocus: this.onFocus,
        placeholder: this.props.placeholder,
        readOnly: this.props.readOnly,
        ref: "input",
        required: this.props.required,
        spellCheck: this.props.spellCheck,
        value: this.props.value,
        rows: this.props.rows || 1
      };

      var rows = this.props.rows;
      if (this.props.placeholder) {
        // Need to add another row for autoGrow since it seems to collapse in a way that conflicts with the placeholder
        // margin
        rows = this.props.rows + 1;
      }

      var textarea = _react2.default.createElement("textarea", _extends({}, props, { rows: rows }));
      if (this.props.autoResize) {
        rows++;
        textarea = _react2.default.createElement(_reactAutosizeTextarea2.default, _extends({}, props, { rows: rows }));
      }

      return _react2.default.createElement(
        "div",
        { className: (0, _classnames2.default)(wrapperClass, this.props.className) },
        _react2.default.createElement(
          "div",
          { className: "TextArea--infoRow" },
          _react2.default.createElement(
            "label",
            { className: "TextArea--label", htmlFor: this.props.name },
            this.props.label
          ),
          inputNote
        ),
        textarea
      );
    }
  }]);

  return TextArea;
}(_react2.default.Component);

TextArea.propTypes = {
  disabled: PropTypes.bool,
  error: PropTypes.string,
  label: PropTypes.string,
  maxLength: PropTypes.number,
  minLength: PropTypes.number,
  name: PropTypes.string.isRequired,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  optional: PropTypes.bool,
  placeholder: PropTypes.node,
  readOnly: PropTypes.bool,
  required: PropTypes.bool,
  spellCheck: PropTypes.bool,
  value: PropTypes.node,
  className: PropTypes.string,
  autoResize: PropTypes.bool,
  rows: PropTypes.number
};