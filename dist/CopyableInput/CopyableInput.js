"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CopyableInput = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _ = require("..");

var _reactCopyToClipboard = require("react-copy-to-clipboard");

var _reactCopyToClipboard2 = _interopRequireDefault(_reactCopyToClipboard);

require("./CopyableInput.less");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * This is a text input that takes optional props
 * enableShow and enableCopy that allow the user
 * to show/hide and copy the value of the input.
 */
var CopyableInput = exports.CopyableInput = function (_React$Component) {
  _inherits(CopyableInput, _React$Component);

  function CopyableInput(props) {
    _classCallCheck(this, CopyableInput);

    var _this = _possibleConstructorReturn(this, (CopyableInput.__proto__ || Object.getPrototypeOf(CopyableInput)).call(this, props));

    _this.state = { hidden: true };

    _this.toggleHidden = _this.toggleHidden.bind(_this);
    _this.copyPassword = _this.copyPassword.bind(_this);
    return _this;
  }

  _createClass(CopyableInput, [{
    key: "toggleHidden",
    value: function toggleHidden() {
      this.setState({ hidden: !this.state.hidden });
    }
  }, {
    key: "copyPassword",
    value: function copyPassword() {
      this.setState({ copied: true });
    }
  }, {
    key: "render",
    value: function render() {
      var type = this.props.type === "password" && this.state.hidden ? "password" : "text";
      return _react2.default.createElement(
        "div",
        { className: "CopyableInput" },
        _react2.default.createElement(_.TextInput, {
          type: type,
          value: this.props.value,
          name: this.props.name,
          placeholder: this.props.placeholder,
          readOnly: this.props.readOnly,
          label: this.props.label,
          onChange: this.props.onChange
        }),
        _react2.default.createElement(
          "div",
          { className: "CopyableInput--links" },
          this.props.enableShow && _react2.default.createElement(
            "button",
            { type: "button", className: "CopyableInput--link", onClick: this.toggleHidden },
            this.state.hidden ? "Show" : "Hide"
          ),
          this.props.enableCopy && _react2.default.createElement(
            _reactCopyToClipboard2.default,
            { text: this.props.value || "", onCopy: this.copyPassword },
            _react2.default.createElement(
              "button",
              { type: "button", className: "CopyableInput--link" },
              this.state.copied ? "Copied!" : "Copy"
            )
          )
        )
      );
    }
  }]);

  return CopyableInput;
}(_react2.default.Component);

CopyableInput.propTypes = _extends({}, _.TextInput.propTypes, {
  enableCopy: _react2.default.PropTypes.bool
});

CopyableInput.defaultPropTypes = {
  enableCopy: true
};