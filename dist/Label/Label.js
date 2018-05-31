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

var _Tooltip = require("../Tooltip");

var _Tooltip2 = _interopRequireDefault(_Tooltip);

require("./Label.less");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Label = function (_PureComponent) {
  _inherits(Label, _PureComponent);

  function Label() {
    _classCallCheck(this, Label);

    return _possibleConstructorReturn(this, (Label.__proto__ || Object.getPrototypeOf(Label)).apply(this, arguments));
  }

  _createClass(Label, [{
    key: "focus",
    value: function focus() {
      if (this.refs.label) {
        this.refs.label.focus();
      }
    }
  }, {
    key: "render",
    value: function render() {
      var cssClass = Label.cssClass;
      var _props = this.props;
      var children = _props.children;
      var className = _props.className;
      var color = _props.color;
      var size = _props.size;
      var tooltip = _props.tooltip;
      var tooltipPlacement = _props.tooltipPlacement;
      var tooltipTextAlign = _props.tooltipTextAlign;


      var label = _react2.default.createElement(
        "span",
        {
          className: (0, _classnames2.default)(cssClass.CONTAINER, color && cssClass.color(color), size && cssClass.size(size), tooltip && cssClass.WITH_TOOLTIP, className),
          ref: "label",
          tabIndex: tooltip ? 0 : undefined
        },
        children
      );

      if (!tooltip) {
        return label;
      }

      return _react2.default.createElement(
        _Tooltip2.default,
        { content: tooltip, placement: tooltipPlacement, textAlign: tooltipTextAlign },
        label
      );
    }
  }]);

  return Label;
}(_react.PureComponent);

exports.default = Label;


Label.Color = {
  // Primary:
  BLUE: "blue",

  // Neutrals:
  GRAY: "gray",

  // Alerts:
  ERROR: "error",
  SUCCESS: "success",
  WARNING: "warning",

  // Accents:
  AQUA: "aqua",
  PINK: "pink",
  PURPLE: "purple"
};

Label.Size = {
  S: "s",
  M: "m",
  L: "l"
};

Label.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  color: PropTypes.oneOf(_lodash2.default.values(Label.Color)),
  tooltip: PropTypes.node,
  tooltipPlacement: _Tooltip2.default.propTypes.placement,
  tooltipTextAlign: _Tooltip2.default.propTypes.textAlign,
  size: PropTypes.oneOf(_lodash2.default.values(Label.Size))
};

Label.defaultProps = {
  color: Label.Color.GRAY,
  size: Label.Size.M
};

Label.cssClass = {
  CONTAINER: "Label",
  WITH_TOOLTIP: "Label--withTooltip",

  color: function color(c) {
    return "Label--" + c;
  },
  size: function size(s) {
    return "Label--" + s;
  }
};