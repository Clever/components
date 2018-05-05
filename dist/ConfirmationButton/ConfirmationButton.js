"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ConfirmationButton = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var PropTypes = _interopRequireWildcard(_propTypes);

var _classnames = require("classnames");

var _classnames2 = _interopRequireDefault(_classnames);

var _Button = require("../Button/Button");

var _ModalButton = require("../ModalButton/ModalButton");

var _utils = require("../utils");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

require("./ConfirmationButton.less");

var propPrefix = "confirmButton";

var ConfirmationButton = exports.ConfirmationButton = function (_React$Component) {
  _inherits(ConfirmationButton, _React$Component);

  function ConfirmationButton(props) {
    _classCallCheck(this, ConfirmationButton);

    var _this = _possibleConstructorReturn(this, (ConfirmationButton.__proto__ || Object.getPrototypeOf(ConfirmationButton)).call(this, props));

    _this.handleConfirm = _this.handleConfirm.bind(_this);
    _this.handleCancel = _this.handleCancel.bind(_this);
    return _this;
  }

  _createClass(ConfirmationButton, [{
    key: "handleConfirm",
    value: function handleConfirm() {
      this.refs.modalButton.hideModal();
      if (this.props.onConfirm) this.props.onConfirm();
    }
  }, {
    key: "handleCancel",
    value: function handleCancel() {
      this.refs.modalButton.hideModal();
      if (this.props.onClose) this.props.onClose();
    }
  }, {
    key: "render",
    value: function render() {
      var modalButtonProps = (0, _utils.propsFor)(_ModalButton.ModalButton, this.props);
      var confirmButtonProps = (0, _utils.propsFor)(_Button.Button, (0, _utils.unprefixKeys)(this.props, propPrefix));
      var wrapperClass = "ConfirmationButton--dialog-buttons";

      return _react2.default.createElement(
        _ModalButton.ModalButton,
        _extends({}, modalButtonProps, { ref: "modalButton" }),
        this.props.children,
        _react2.default.createElement(
          "div",
          { className: (0, _classnames2.default)(wrapperClass, this.props.className) },
          _react2.default.createElement(_Button.Button, { type: "link", value: "Cancel", onClick: this.handleCancel }),
          _react2.default.createElement(_Button.Button, _extends({}, confirmButtonProps, { onClick: this.handleConfirm }))
        )
      );
    }
  }]);

  return ConfirmationButton;
}(_react2.default.Component);

ConfirmationButton.propTypes = _extends({}, (0, _utils.prefixKeys)(_Button.Button.propTypes, propPrefix), _ModalButton.ModalButton.propTypes, {
  className: PropTypes.string,
  onConfirm: PropTypes.func
});

ConfirmationButton.defaultProps = _extends({}, (0, _utils.prefixKeys)(_Button.Button.defaultProps, propPrefix), _ModalButton.ModalButton.defaultProps, {
  confirmButtonType: "primary",
  confirmButtonValue: "Confirm"
});