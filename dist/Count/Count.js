"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _classnames = require("classnames");

var _classnames2 = _interopRequireDefault(_classnames);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var PropTypes = _interopRequireWildcard(_propTypes);

var _Number = require("../Number");

var _Number2 = _interopRequireDefault(_Number);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Provides a convenient wrapper for displaying counts of things.
 * Renders a span containing a formatted number, using the `Number` component, followed by the given
 * singular or plural form of the subject, depending on the number.
 *
 * Specify a `zeroOverride` to provide an override message to be displayed in the zero case.
 *
 * Usage:
 *   const things = [1, 2, 3];
 *   <Count number={things.length} singular="thing">things</Count>
 *   // results in:
 *   <span>3 things</span>
 */
var Count = function (_PureComponent) {
  _inherits(Count, _PureComponent);

  function Count() {
    _classCallCheck(this, Count);

    return _possibleConstructorReturn(this, (Count.__proto__ || Object.getPrototypeOf(Count)).apply(this, arguments));
  }

  _createClass(Count, [{
    key: "render",
    value: function render() {
      var cssClass = Count.cssClass;
      var format = Count.format;
      var _props = this.props;
      var children = _props.children;
      var className = _props.className;
      var plural = _props.plural;
      var short = _props.short;
      var singular = _props.singular;
      var zeroOverride = _props.zeroOverride;


      return _react2.default.createElement(
        "span",
        { className: (0, _classnames2.default)(cssClass.CONTAINER, className) },
        format({ number: children, plural: plural, short: short, singular: singular, zeroOverride: zeroOverride })
      );
    }
  }], [{
    key: "format",
    value: function format(_ref) {
      var number = _ref.number;
      var plural = _ref.plural;
      var short = _ref.short;
      var singular = _ref.singular;
      var zeroOverride = _ref.zeroOverride;

      var displayNumber = _Number2.default.format(number, short);
      var rawNumber = parseInt(number || 0, 10);

      if (rawNumber === 1) {
        return displayNumber + " " + singular;
      }

      if (rawNumber === 0 && zeroOverride) {
        return zeroOverride;
      }

      var defaultPlural = singular + "s";
      return displayNumber + " " + (plural || defaultPlural);
    }
  }]);

  return Count;
}(_react.PureComponent);

exports.default = Count;


Count.propTypes = {
  children: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  className: PropTypes.string,
  plural: PropTypes.string,
  singular: PropTypes.string.isRequired,
  short: PropTypes.bool,
  zeroOverride: PropTypes.string
};

Count.cssClass = {
  CONTAINER: "Count"
};