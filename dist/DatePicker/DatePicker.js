"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = DatePicker;

var _moment = require("moment");

var _moment2 = _interopRequireDefault(_moment);

var _classnames = require("classnames");

var _classnames2 = _interopRequireDefault(_classnames);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var PropTypes = _interopRequireWildcard(_propTypes);

var _reactDatepicker = require("react-datepicker");

var _reactDatepicker2 = _interopRequireDefault(_reactDatepicker);

require("./DatePicker.less");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function DatePicker(props) {
  return _react2.default.createElement(_reactDatepicker2.default, _extends({}, props, {
    inline: true,
    calendarClassName: (0, _classnames2.default)("DatePicker", props.className)
  }));
}

var dateType = PropTypes.oneOfType([PropTypes.instanceOf(Date), PropTypes.instanceOf(_moment2.default)]);

DatePicker.propTypes = { // A subset of the react-datepicker properties we support. Will maybe need to add more later
  className: PropTypes.string,
  minDate: dateType,
  maxDate: dateType,
  selected: dateType
};