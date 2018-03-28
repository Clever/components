"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = Glasses;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Glasses(props) {
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
      "glasses"
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
        strokeLinejoin: "round"
      },
      _react2.default.createElement(
        "g",
        { id: "glasses", strokeWidth: 2, stroke: "#62748C" },
        _react2.default.createElement(
          "g",
          { id: "Page-1", transform: "translate(1.000000, 3.000000)" },
          _react2.default.createElement(
            "g",
            { id: "Group" },
            _react2.default.createElement("path", {
              d: "M19,30.5000937 C19,35.7476045 14.7476045,40 9.50009374,40 C4.25139554,40 0.000187488282,35.7476045 0.000187488282,30.5000937 C0.000187488282,25.252583 4.25139554,20.999 9.50009374,20.999 C14.7476045,20.999 19,25.252583 19,30.5000937 L19,30.5000937 Z",
              id: "Stroke-1",
              fill: "#B6C8F9"
            }),
            _react2.default.createElement("path", {
              d: "M25,30.5000937 C25,35.7476045 29.251208,40 34.4999063,40 C39.747417,40 43.9998125,35.7476045 43.9998125,30.5000937 C43.9998125,25.252583 39.747417,20.999 34.4999063,20.999 C29.251208,20.999 25,25.252583 25,30.5000937 L25,30.5000937 Z",
              id: "Stroke-3",
              fill: "#B6C8F9"
            }),
            _react2.default.createElement("path", {
              d: "M19,29 C19,27.344 20.342,26 22,26 C23.654,26 25,27.344 25,29",
              id: "Stroke-5"
            }),
            _react2.default.createElement("path", {
              d: "M0,30 L0,3 C0,1.345 1.342,0 3,0",
              id: "Stroke-7",
              strokeLinecap: "round"
            }),
            _react2.default.createElement("path", {
              d: "M44,30 L44,3 C44,1.345 42.654,0 41,0",
              id: "Stroke-9",
              strokeLinecap: "round"
            })
          )
        )
      )
    )
  );
}