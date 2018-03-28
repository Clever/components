"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Button = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _lodash = require("lodash");

var _lodash2 = _interopRequireDefault(_lodash);

var _classnames = require("classnames");

var _classnames2 = _interopRequireDefault(_classnames);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var PropTypes = _interopRequireWildcard(_propTypes);

require("./Button.less");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Button = exports.Button = function (_React$PureComponent) {
  _inherits(Button, _React$PureComponent);

  function Button() {
    _classCallCheck(this, Button);

    return _possibleConstructorReturn(this, (Button.__proto__ || Object.getPrototypeOf(Button)).apply(this, arguments));
  }

  _createClass(Button, [{
    key: "focus",
    value: function focus() {
      if (this._buttonRef) {
        this._buttonRef.focus();
      }
    }
  }, {
    key: "blur",
    value: function blur() {
      if (this._buttonRef) {
        this._buttonRef.blur();
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var Size = Button.Size;
      var Type = Button.Type;
      var _props = this.props;
      var className = _props.className;
      var disabled = _props.disabled;
      var href = _props.href;
      var onClick = _props.onClick;
      var size = _props.size;
      var style = _props.style;
      var submit = _props.submit;
      var target = _props.target;
      var type = _props.type;
      var value = _props.value;


      if (type === Type.DESTRUCTIVE && size === Size.S) {
        throw new Error("Small destructive buttons are not supported");
      }

      if (href && submit) {
        throw new Error("Buttons with href do not support the submit option");
      }

      var classes = (0, _classnames2.default)("Button Button--" + type, "Button--" + size, className);

      if (href == null || disabled) {
        // use <button>s for all disabled links and things with no href prop (buttons)
        return _react2.default.createElement(
          "button",
          {
            className: classes,
            disabled: disabled,
            onClick: onClick,
            ref: function ref(_ref) {
              _this2._buttonRef = _ref;
            },
            style: style,
            type: submit ? "submit" : "button",
            "aria-label": typeof value === "string" ? value : null
          },
          value
        );
      }
      return _react2.default.createElement(
        "a",
        {
          className: classes,
          href: href,
          onClick: onClick,
          ref: function ref(_ref2) {
            _this2._buttonRef = _ref2;
          },
          style: style,
          target: target,
          "aria-label": typeof value === "string" ? value : null
        },
        value
      );
    }
  }]);

  return Button;
}(_react2.default.PureComponent);

Button.Size = {
  S: "small",
  M: "regular",
  L: "large"
};

Button.Type = {
  PRIMARY: "primary",
  SECONDARY: "secondary",
  DESTRUCTIVE: "destructive",
  LINK: "link",
  LINK_PLAIN: "linkPlain",
  PLAIN: "plain"
};

Button.defaultProps = {
  type: Button.Type.SECONDARY,
  size: Button.Size.M,
  target: "_blank"
};

Button.propTypes = {
  className: PropTypes.string,
  type: PropTypes.oneOf(_lodash2.default.values(Button.Type)),
  size: PropTypes.oneOf(_lodash2.default.values(Button.Size)),
  value: PropTypes.node.isRequired,
  href: PropTypes.string,
  target: PropTypes.oneOf(["_self", "_blank"]),
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  submit: PropTypes.bool,
  style: PropTypes.object
};