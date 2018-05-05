"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _lodash = require("lodash");

var _lodash2 = _interopRequireDefault(_lodash);

var _classnames = require("classnames");

var _classnames2 = _interopRequireDefault(_classnames);

var _MorePropTypes = require("../utils/MorePropTypes");

var _MorePropTypes2 = _interopRequireDefault(_MorePropTypes);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var PropTypes = _interopRequireWildcard(_propTypes);

var _Button = require("../Button/Button");

var _FlexBox = require("../flex/FlexBox");

var _FlexBox2 = _interopRequireDefault(_FlexBox);

var _Option = require("./Option");

var _Option2 = _interopRequireDefault(_Option);

var _Type = require("./Type");

var _Type2 = _interopRequireDefault(_Type);

require("./Menu.less");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Menu = function (_PureComponent) {
  _inherits(Menu, _PureComponent);

  function Menu() {
    _classCallCheck(this, Menu);

    return _possibleConstructorReturn(this, (Menu.__proto__ || Object.getPrototypeOf(Menu)).apply(this, arguments));
  }

  _createClass(Menu, [{
    key: "_renderOption",
    value: function _renderOption(option) {
      var cssClass = Menu.cssClass;
      var _props = this.props;
      var onHide = _props.onHide;
      var size = _props.size;
      var type = _props.type;
      var _option$props = option.props;
      var children = _option$props.children;
      var className = _option$props.className;
      var disabled = _option$props.disabled;
      var href = _option$props.href;
      var _onClick = _option$props.onClick;
      var target = _option$props.target;


      return _react2.default.createElement(_Button.Button, {
        className: (0, _classnames2.default)(cssClass.OPTION, className),
        disabled: disabled,
        href: href,
        onClick: function onClick(e) {
          onHide();

          if (_onClick) {
            _onClick(e);
          }
        },
        size: size,
        target: target,
        type: type,
        value: children
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var cssClass = Menu.cssClass;
      var _props2 = this.props;
      var children = _props2.children;
      var className = _props2.className;


      return _react2.default.createElement(
        _FlexBox2.default,
        { className: (0, _classnames2.default)(cssClass.CONTAINER, className), column: true },
        _react2.default.Children.map(children, function (option) {
          return _this2._renderOption(option);
        })
      );
    }
  }]);

  return Menu;
}(_react.PureComponent);

exports.default = Menu;


Menu.propTypes = {
  children: _MorePropTypes2.default.oneOrManyOf(_MorePropTypes2.default.instanceOfComponent(_Option2.default)),
  className: PropTypes.string,
  onHide: PropTypes.func.isRequired,
  size: PropTypes.oneOf(_lodash2.default.values(_Button.Button.Size)),
  type: PropTypes.oneOf(_lodash2.default.values(_Type2.default))
};

Menu.cssClass = {
  CONTAINER: "DropdownButton--Menu",
  OPTION: "DropdownButton--Option"
};