"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Modal = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

require("./Modal.less");

var DEFAULT_WIDTH = 400;

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
      if (e.keyCode === 27) {
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
      return _react2.default.createElement(
        "div",
        { className: "Modal" },
        _react2.default.createElement("div", { className: "Modal--background", onClick: this.props.closeModal }),
        _react2.default.createElement(
          "div",
          { className: "Modal--window", style: windowStyle },
          _react2.default.createElement(
            "header",
            { className: "Modal--header" },
            _react2.default.createElement("button", { className: "Modal--close", onClick: this.props.closeModal }),
            _react2.default.createElement(
              "h2",
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
    }
  }]);

  return Modal;
}(_react2.default.Component);

Modal.defaultProps = {
  width: DEFAULT_WIDTH
};

Modal.propTypes = {
  width: _react2.default.PropTypes.number,
  title: _react2.default.PropTypes.string.isRequired,
  closeModal: _react2.default.PropTypes.func.isRequired,
  children: _react2.default.PropTypes.node.isRequired
};