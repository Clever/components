"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _lodash = require("lodash");

var _lodash2 = _interopRequireDefault(_lodash);

var _classnames = require("classnames");

var _classnames2 = _interopRequireDefault(_classnames);

var _Tooltip = require("react-bootstrap/lib/Tooltip");

var _Tooltip2 = _interopRequireDefault(_Tooltip);

var _OverlayTrigger = require("react-bootstrap/lib/OverlayTrigger");

var _OverlayTrigger2 = _interopRequireDefault(_OverlayTrigger);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var PropTypes = _interopRequireWildcard(_propTypes);

require("./Tooltip.less");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Standardized tooltip component with fade-in/out transition and customizable positioning.
 */
var Tooltip = function (_Component) {
  _inherits(Tooltip, _Component);

  function Tooltip(props) {
    _classCallCheck(this, Tooltip);

    // react-bootstrap Tooltips require an id. We simply autogenerate them with sequential numbers.
    var _this = _possibleConstructorReturn(this, (Tooltip.__proto__ || Object.getPrototypeOf(Tooltip)).call(this, props));

    _this.id = "Tooltip-" + Tooltip.nextID++;
    return _this;
  }

  _createClass(Tooltip, [{
    key: "render",
    value: function render() {
      var cssClass = Tooltip.cssClass;
      var _props = this.props;
      var children = _props.children;
      var className = _props.className;
      var content = _props.content;
      var delayMs = _props.delayMs;
      var hide = _props.hide;
      var placement = _props.placement;
      var textAlign = _props.textAlign;
      var delayHideMs = _props.delayHideMs;


      var tooltip = _react2.default.createElement(
        _Tooltip2.default,
        { id: this.id },
        _react2.default.createElement(
          "div",
          { className: (0, _classnames2.default)(cssClass.CONTENT, cssClass.align(textAlign), className) },
          content
        )
      );

      return _react2.default.createElement(
        _OverlayTrigger2.default,
        {
          delayShow: delayMs,
          delayHide: delayHideMs,
          overlay: tooltip,
          placement: placement,
          rootClose: true,
          trigger: hide ? [] : ["focus", "hover"]
        },
        children
      );
    }
  }]);

  return Tooltip;
}(_react.Component);

exports.default = Tooltip;


Tooltip.nextID = 0;

Tooltip.Align = {
  CENTER: "center",
  JUSTIFY: "justify",
  LEFT: "left",
  RIGHT: "right"
};

Tooltip.Placement = {
  BOTTOM: "bottom",
  LEFT: "left",
  RIGHT: "right",
  TOP: "top"
};

Tooltip.propTypes = {
  children: PropTypes.node.isRequired,
  content: PropTypes.node.isRequired,
  delayMs: PropTypes.number,
  delayHideMs: PropTypes.number,
  hide: PropTypes.bool,
  placement: PropTypes.oneOf(_lodash2.default.values(Tooltip.Placement)),
  textAlign: PropTypes.oneOf(_lodash2.default.values(Tooltip.Align)),
  className: PropTypes.string
};

Tooltip.defaultProps = {
  placement: "top",
  textAlign: "left"
};

Tooltip.cssClass = {
  CONTENT: "Tooltip--content",

  align: function align(textAlign) {
    return "Tooltip--content--" + textAlign;
  }
};