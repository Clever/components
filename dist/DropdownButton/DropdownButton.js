"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _lodash = require("lodash");

var _lodash2 = _interopRequireDefault(_lodash);

var _classnames = require("classnames");

var _classnames2 = _interopRequireDefault(_classnames);

var _MorePropTypes = require("../utils/MorePropTypes");

var _MorePropTypes2 = _interopRequireDefault(_MorePropTypes);

var _Overlay = require("react-bootstrap/lib/Overlay");

var _Overlay2 = _interopRequireDefault(_Overlay);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var PropTypes = _interopRequireWildcard(_propTypes);

var _FlexBox = require("../flex/FlexBox");

var _FlexBox2 = _interopRequireDefault(_FlexBox);

var _FlexItem = require("../flex/FlexItem");

var _FlexItem2 = _interopRequireDefault(_FlexItem);

var _Menu = require("./Menu");

var _Menu2 = _interopRequireDefault(_Menu);

var _Option = require("./Option");

var _Option2 = _interopRequireDefault(_Option);

var _Type = require("./Type");

var _Type2 = _interopRequireDefault(_Type);

var _Button = require("../Button/Button");

require("./Caret.less");

require("./DropdownButton.less");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DropdownButton = function (_PureComponent) {
  _inherits(DropdownButton, _PureComponent);

  function DropdownButton(props) {
    _classCallCheck(this, DropdownButton);

    var _this = _possibleConstructorReturn(this, (DropdownButton.__proto__ || Object.getPrototypeOf(DropdownButton)).call(this, props));

    _this.state = {
      expanded: false
    };
    return _this;
  }

  _createClass(DropdownButton, [{
    key: "_renderMainButton",
    value: function _renderMainButton() {
      var cssClass = DropdownButton.cssClass;
      var _props = this.props;
      var disabled = _props.disabled;
      var href = _props.href;
      var label = _props.label;
      var onClick = _props.onClick;
      var size = _props.size;
      var target = _props.target;
      var type = _props.type;


      return _react2.default.createElement(_FlexItem2.default, {
        className: (0, _classnames2.default)(cssClass.SECTION, cssClass.MAIN),
        component: _Button.Button,
        disabled: disabled,
        grow: true,
        href: href,
        onClick: onClick,
        size: size,
        target: target,
        type: type,
        value: label
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var cssClass = DropdownButton.cssClass;
      var propTypes = DropdownButton.propTypes;
      var _props2 = this.props;
      var children = _props2.children;
      var className = _props2.className;
      var disabled = _props2.disabled;
      var size = _props2.size;
      var type = _props2.type;

      var passthroughProps = _lodash2.default.omit(this.props, Object.keys(propTypes));
      var expanded = this.state.expanded;


      if (_react2.default.Children.count(children) === 0) {
        return _react2.default.createElement(
          "div",
          _extends({}, passthroughProps, { className: (0, _classnames2.default)(cssClass.CONTAINER, className) }),
          this._renderMainButton()
        );
      }

      return _react2.default.createElement(
        "div",
        _extends({}, passthroughProps, { className: (0, _classnames2.default)(cssClass.CONTAINER, className) }),
        _react2.default.createElement(
          _FlexBox2.default,
          { className: cssClass.BUTTONS },
          this._renderMainButton(),
          _react2.default.createElement(_Button.Button, {
            className: (0, _classnames2.default)(cssClass.SECTION, cssClass.TOGGLE),
            disabled: disabled,
            onClick: function onClick() {
              return _this2.setState({ expanded: !expanded });
            },
            size: size,
            type: type,
            value: _react2.default.createElement(
              "span",
              { className: cssClass.CARET_CONTAINER },
              _react2.default.createElement("span", { className: cssClass.CARET })
            )
          })
        ),
        _react2.default.createElement(
          _Overlay2.default,
          {
            className: cssClass.POPUP,
            container: this,
            onHide: function onHide() {
              return _this2.setState({ expanded: false });
            },
            placement: "bottom",
            rootClose: true,
            show: !disabled && expanded
          },
          _react2.default.createElement(
            _Menu2.default,
            { onHide: function onHide() {
                return _this2.setState({ expanded: false });
              }, size: size, type: type },
            children
          )
        )
      );
    }
  }]);

  return DropdownButton;
}(_react.PureComponent);

exports.default = DropdownButton;


DropdownButton.Option = _Option2.default;

DropdownButton.Size = _Button.Button.Size;

DropdownButton.Type = _Type2.default;

DropdownButton.propTypes = {
  children: _MorePropTypes2.default.oneOrManyOf(_MorePropTypes2.default.instanceOfComponent(_Option2.default)),
  className: PropTypes.string,
  disabled: PropTypes.bool,
  href: PropTypes.string,
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  size: PropTypes.oneOf(_lodash2.default.values(DropdownButton.Size)),
  target: PropTypes.oneOf(["_self", "_blank"]),
  type: PropTypes.oneOf(_lodash2.default.values(DropdownButton.Type))
};

DropdownButton.defaultProps = {
  size: DropdownButton.Size.M,
  type: DropdownButton.Type.SECONDARY
};

DropdownButton.cssClass = {
  BUTTONS: "DropdownButton--buttons",
  CARET_CONTAINER: "DropdownButton--Caret--container",
  CARET: "DropdownButton--Caret",
  CONTAINER: "DropdownButton",
  MAIN: "DropdownButton--main",
  POPUP: "DropdownButton--popup",
  SECTION: "DropdownButton--section",
  TOGGLE: "DropdownButton--toggle"
};