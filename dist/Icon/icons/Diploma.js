"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = Diploma;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Diploma(props) {
  return _react2.default.createElement(
    "svg",
    _extends({
      width: "46px",
      height: "46px",
      viewBox: "0 0 46 46",
      version: "1.1",
      xmlns: "http://www.w3.org/2000/svg",
      xmlnsXlink: "http://www.w3.org/1999/xlink"
    }, props),
    _react2.default.createElement(
      "title",
      null,
      "diploma"
    ),
    _react2.default.createElement(
      "desc",
      null,
      "Created with Sketch."
    ),
    _react2.default.createElement("defs", null),
    _react2.default.createElement(
      "g",
      {
        id: "Artboards",
        stroke: "none",
        strokeWidth: 1,
        fill: "none",
        fillRule: "evenodd",
        strokeLinecap: "round",
        strokeLinejoin: "round"
      },
      _react2.default.createElement(
        "g",
        { id: "diploma", strokeWidth: 2 },
        _react2.default.createElement("path", {
          d: "M16.9849052,22.2953 L1.2563,33.8118042 C1.2563,37.3084862 8.6087305,45 11.9522053,45 L22.961,28.5450258",
          id: "Stroke-5",
          stroke: "#62748C",
          fill: "#FFFFFF"
        }),
        _react2.default.createElement("path", {
          d: "M22.2953,16.9134115 L33.3040947,1 C36.6466242,1 43.9981094,8.44022289 44,11.8212729 L28.2676137,22.962",
          id: "Stroke-3",
          stroke: "#62748C",
          fill: "#FFFFFF"
        }),
        _react2.default.createElement("polyline", {
          id: "Stroke-7",
          stroke: "#C9081A",
          fill: "#FD8874",
          points: "28.6175 22.9598 41.0125 35.3558 35.3555 35.3558 35.3555 41.0128 22.9615 28.6168"
        }),
        _react2.default.createElement("path", {
          d: "M18.3851,26.8704 L15.5571,29.6984",
          id: "Stroke-9",
          stroke: "#62748C"
        }),
        _react2.default.createElement("path", {
          d: "M26.8714,18.3851 L29.6994,15.5571",
          id: "Stroke-11",
          stroke: "#62748C"
        }),
        _react2.default.createElement("path", {
          d: "M26.8714,18.3851 C29.2134,20.7281 29.2134,24.5271 26.8694,26.8701 C24.5254,29.2141 20.7284,29.2141 18.3854,26.8701 C16.0414,24.5271 16.0414,20.7281 18.3854,18.3851 C20.7284,16.0411 24.5254,16.0421 26.8714,18.3851 L26.8714,18.3851 Z",
          id: "Stroke-1",
          stroke: "#C9081A",
          fill: "#FD8874"
        })
      )
    )
  );
}