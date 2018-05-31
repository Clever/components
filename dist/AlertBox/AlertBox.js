"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _lodash = require("lodash");

var _lodash2 = _interopRequireDefault(_lodash);

var _classnames = require("classnames");

var _classnames2 = _interopRequireDefault(_classnames);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var PropTypes = _interopRequireWildcard(_propTypes);

var _icons = require("./icons");

var _flex = require("../flex");

require("./AlertBox.less");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ICONS = {
  warning: _icons.WarningIcon,
  success: _icons.SuccessIcon,
  error: _icons.ErrorIcon,
  info: _icons.InfoIcon
};

var CLASSNAMES = {
  CONTAINER: "AlertBox--container",
  HEADER: "AlertBox--header",
  TITLE: "AlertBox--title",
  CLOSE: "AlertBox--close"
};

/*
 * AlertBox is a closable, highlighted box
*/

var AlertBox = function (_PureComponent) {
  _inherits(AlertBox, _PureComponent);

  function AlertBox(props) {
    _classCallCheck(this, AlertBox);

    var _this = _possibleConstructorReturn(this, (AlertBox.__proto__ || Object.getPrototypeOf(AlertBox)).call(this, props));

    _this.state = { isOpen: true };
    return _this;
  }

  _createClass(AlertBox, [{
    key: "closeBox",
    value: function closeBox() {
      this.setState({ isOpen: false });
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _props = this.props;
      var children = _props.children;
      var className = _props.className;
      var type = _props.type;
      var title = _props.title;
      var isClosable = _props.isClosable;
      var isOpen = this.state.isOpen;

      var Icon = ICONS[type];
      if (!isOpen) {
        return null;
      }
      return _react2.default.createElement(
        "div",
        { className: (0, _classnames2.default)("AlertBox--" + type, CLASSNAMES.CONTAINER, className) },
        _react2.default.createElement(
          _flex.FlexBox,
          { className: CLASSNAMES.HEADER, alignItems: _flex.ItemAlign.CENTER },
          _react2.default.createElement(Icon, null),
          _react2.default.createElement(
            _flex.FlexItem,
            { className: CLASSNAMES.TITLE, grow: true },
            title
          ),
          isClosable && _react2.default.createElement(
            "button",
            { className: CLASSNAMES.CLOSE, onClick: function onClick() {
                return _this2.closeBox();
              } },
            _react2.default.createElement(_icons.CloseIcon, null)
          )
        ),
        children
      );
    }
  }]);

  return AlertBox;
}(_react.PureComponent);

exports.default = AlertBox;


var TYPES = {
  WARNING: "warning",
  SUCCESS: "success",
  ERROR: "error",
  INFO: "info"
};

AlertBox.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  title: PropTypes.string.isRequired,
  type: PropTypes.oneOf(_lodash2.default.values(TYPES)),
  isClosable: PropTypes.bool
};