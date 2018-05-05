"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Modal = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var PropTypes = _interopRequireWildcard(_propTypes);

var _classnames = require("classnames");

var _classnames2 = _interopRequireDefault(_classnames);

var _focusTrapReact = require("focus-trap-react");

var _focusTrapReact2 = _interopRequireDefault(_focusTrapReact);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

require("./Modal.less");

var DEFAULT_WIDTH = 400;
var ESC = 27;
var closeIcon = _react2.default.createElement(
  "svg",
  { viewBox: "0 0 1792 1792", xmlns: "http://www.w3.org/2000/svg" },
  _react2.default.createElement("path", { d: "M1490 1322q0 40-28 68l-136 136q-28 28-68 28t-68-28l-294-294-294 294q-28 28-68 28t-68-28l-136-136q-28-28-28-68t28-68l294-294-294-294q-28-28-28-68t28-68l136-136q28-28 68-28t68 28l294 294 294-294q28-28 68-28t68 28l136 136q28 28 28 68t-28 68l-294 294 294 294q28 28 28 68z" })
);

var Modal = exports.Modal = function (_React$Component) {
  _inherits(Modal, _React$Component);

  function Modal(props) {
    _classCallCheck(this, Modal);

    var _this = _possibleConstructorReturn(this, (Modal.__proto__ || Object.getPrototypeOf(Modal)).call(this, props));

    _this.state = { windowHeight: window.innerHeight };
    _this.handleKeyUp = _this.handleKeyUp.bind(_this);
    _this.handleResize = _this.handleResize.bind(_this);
    return _this;
  }

  _createClass(Modal, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      window.addEventListener("keyup", this.handleKeyUp);
      window.addEventListener("resize", this.handleResize);
      this.handleResize();
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      window.removeEventListener("keyup", this.handleKeyUp);
      window.removeEventListener("resize", this.handleResize);
    }
  }, {
    key: "handleKeyUp",
    value: function handleKeyUp(e) {
      if (e.keyCode === ESC) {
        this.props.closeModal();
      }
    }
  }, {
    key: "handleResize",
    value: function handleResize() {
      this.setState({ windowHeight: window.innerHeight });
    }
  }, {
    key: "render",
    value: function render() {
      var windowStyle = {
        width: this.props.width + "px",
        marginLeft: "-" + this.props.width / 2 + "px"
      };
      // The content is max 90% of the window height less 60px (height of the header)
      var contentStyle = { maxHeight: this.state.windowHeight * 0.9 - 60 };
      var modalContent = _react2.default.createElement(
        "div",
        { className: (0, _classnames2.default)("Modal", this.props.className) },
        _react2.default.createElement("div", { className: "Modal--background", onClick: this.props.closeModal, "aria-hidden": "true" }),
        _react2.default.createElement(
          "div",
          { className: "Modal--window", style: windowStyle },
          _react2.default.createElement(
            "header",
            { className: "Modal--header" },
            _react2.default.createElement(
              "button",
              { className: "Modal--close", onClick: this.props.closeModal, type: "button", "aria-label": "close modal window" },
              closeIcon
            ),
            _react2.default.createElement(
              "h1",
              null,
              this.props.title
            )
          ),
          _react2.default.createElement(
            "div",
            { style: contentStyle, className: "Modal--window--content" },
            this.props.children
          )
        )
      );
      var modal = void 0;
      if (this.props.focusLocked) {
        modal = _react2.default.createElement(
          _focusTrapReact2.default,
          null,
          modalContent
        );
      } else {
        modal = modalContent;
      }
      return modal;
    }
  }]);

  return Modal;
}(_react2.default.Component);

Modal.propTypes = {
  className: PropTypes.string,
  width: PropTypes.number,
  title: PropTypes.string.isRequired,
  closeModal: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  focusLocked: PropTypes.bool
};

Modal.defaultProps = {
  width: DEFAULT_WIDTH,
  focusLocked: true
};