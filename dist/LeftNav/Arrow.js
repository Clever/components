"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _classnames = require("classnames");

var _classnames2 = _interopRequireDefault(_classnames);

var _propTypes = require("prop-types");

var PropTypes = _interopRequireWildcard(_propTypes);

var _react = require("react");

var React = _interopRequireWildcard(_react);

require("./Arrow.less");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /** eslint-disable max-len */

var Arrow = function (_React$PureComponent) {
  _inherits(Arrow, _React$PureComponent);

  function Arrow() {
    _classCallCheck(this, Arrow);

    return _possibleConstructorReturn(this, (Arrow.__proto__ || Object.getPrototypeOf(Arrow)).apply(this, arguments));
  }

  _createClass(Arrow, [{
    key: "render",
    value: function render() {
      var cssClass = Arrow.cssClass;
      var className = this.props.className;


      return React.createElement(
        "svg",
        { className: (0, _classnames2.default)(cssClass.CONTAINER, className), viewBox: "0 0 1792 1792" },
        React.createElement("path", { d: "M1171 960q0 13-10 23l-466 466q-10 10-23 10t-23-10l-50-50q-10-10-10-23t10-23l393-393-393-393q-10-10-10-23t10-23l50-50q10-10 23-10t23 10l466 466q10 10 10 23z" })
      );
    }
  }]);

  return Arrow;
}(React.PureComponent);

exports.default = Arrow;


Arrow.propTypes = {
  className: PropTypes.string
};

Arrow.cssClass = {
  CONTAINER: "LeftNav--NavLink--Arrow"
};