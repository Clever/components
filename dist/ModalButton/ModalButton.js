"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ModalButton = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _ = require("..");

var _utils = require("../utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ModalButton = exports.ModalButton = function (_React$Component) {
  _inherits(ModalButton, _React$Component);

  function ModalButton(props) {
    _classCallCheck(this, ModalButton);

    var _this = _possibleConstructorReturn(this, (ModalButton.__proto__ || Object.getPrototypeOf(ModalButton)).call(this, props));

    _this.state = { showingModal: false };
    _this.showModal = _this.showModal.bind(_this);
    _this.hideModal = _this.hideModal.bind(_this);
    return _this;
  }

  _createClass(ModalButton, [{
    key: "showModal",
    value: function showModal() {
      this.setState({ showingModal: true });
    }
  }, {
    key: "hideModal",
    value: function hideModal() {
      this.setState({ showingModal: false });
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var buttonProps = (0, _utils.propsFor)(_.Button, this.props);
      var modalProps = (0, _utils.propsFor)(_.Modal, (0, _utils.unprefixKeys)(this.props, "modal"));

      return _react2.default.createElement(
        "div",
        { className: "ModalButton" },
        _react2.default.createElement(_.Button, _extends({}, buttonProps, { onClick: function onClick() {
            if (_this2.props.onClick) _this2.props.onClick();
            _this2.showModal();
          }
        })),
        this.state.showingModal ? _react2.default.createElement(_.Modal, _extends({}, modalProps, {
          closeModal: function closeModal() {
            if (_this2.props.onClose) _this2.props.onClose();
            _this2.hideModal();
          }
        })) : null
      );
    }
  }]);

  return ModalButton;
}(_react2.default.Component);

// inherit properties from Button and Modal except closeModal; don't prefix children,
// but prefix the rest of Modal's keys.


var modalPropTypes = (0, _utils.prefixKeys)((0, _utils.omitKeys)(_.Modal.propTypes, "closeModal", "children"), "modal");
ModalButton.propTypes = _extends({}, _.Button.propTypes, modalPropTypes, {
  children: _.Modal.propTypes.children,
  onClose: _react2.default.PropTypes.func });

// closeModal has no default, so no need to filter out of defaultProps
ModalButton.defaultProps = _extends({}, _.Button.defaultProps, (0, _utils.prefixKeys)(_.Modal.defaultProps, "modal"));