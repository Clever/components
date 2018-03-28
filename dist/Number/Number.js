"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _classnames = require("classnames");

var _classnames2 = _interopRequireDefault(_classnames);

var _numeral = require("numeral");

var _numeral2 = _interopRequireDefault(_numeral);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var PropTypes = _interopRequireWildcard(_propTypes);

var _shortNumber = require("short-number");

var _shortNumber2 = _interopRequireDefault(_shortNumber);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Provides consistent number formatting for long numbers (e.g. 4123456 -> 4,123,456), with optional
 * shortening (e.g. 4123456 -> 4.1M).
 */
var Number = function (_PureComponent) {
  _inherits(Number, _PureComponent);

  function Number() {
    _classCallCheck(this, Number);

    return _possibleConstructorReturn(this, (Number.__proto__ || Object.getPrototypeOf(Number)).apply(this, arguments));
  }

  _createClass(Number, [{
    key: "render",
    value: function render() {
      var cssClass = Number.cssClass;
      var format = Number.format;
      var _props = this.props;
      var children = _props.children;
      var className = _props.className;
      var short = _props.short;


      return _react2.default.createElement(
        "span",
        { className: (0, _classnames2.default)(cssClass.CONTAINER, className) },
        format(children, short)
      );
    }
  }], [{
    key: "format",
    value: function format(number) {
      var short = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

      var rawNumber = parseInt(number || 0, 10);

      if (isNaN(rawNumber)) {
        throw new Error("A number is required.");
      }

      return short ? (0, _shortNumber2.default)(rawNumber) : (0, _numeral2.default)(rawNumber).format("0,0");
    }
  }]);

  return Number;
}(_react.PureComponent);

exports.default = Number;


Number.propTypes = {
  children: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  className: PropTypes.string,
  short: PropTypes.bool
};

Number.cssClass = {
  CONTAINER: "Number"
};