"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = ThreeUsers;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ThreeUsers(props) {
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
      "users"
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
        { id: "users", strokeWidth: 2, stroke: "#62748C" },
        _react2.default.createElement(
          "g",
          {
            id: "users-48px-outline-2_meeting",
            transform: "translate(1.000000, 1.000000)"
          },
          _react2.default.createElement(
            "g",
            { id: "Group" },
            _react2.default.createElement("path", {
              d: "M18,44 L0,44 L0,42.758 C0,40.983 1.164,39.424 2.866,38.92 C4.46,38.448 6.604,38 9,38 C11.356,38 13.514,38.456 15.125,38.932 C16.83,39.436 18,40.994 18,42.773 L18,44 L18,44 Z",
              id: "Shape",
              fill: "#B6C8F9"
            }),
            _react2.default.createElement("circle", { id: "Oval", fill: "#FFFFFF", cx: 9, cy: 29, r: 5 }),
            _react2.default.createElement("path", {
              d: "M44,44 L26,44 L26,42.758 C26,40.983 27.164,39.424 28.866,38.92 C30.46,38.448 32.604,38 35,38 C37.356,38 39.514,38.456 41.125,38.932 C42.83,39.436 44,40.994 44,42.773 L44,44 L44,44 Z",
              id: "Shape",
              fill: "#B6C8F9"
            }),
            _react2.default.createElement("circle", { id: "Oval", fill: "#FFFFFF", cx: 35, cy: 29, r: 5 }),
            _react2.default.createElement("path", {
              d: "M31,20 L13,20 L13,18.758 C13,16.983 14.164,15.424 15.866,14.92 C17.46,14.448 19.604,14 22,14 C24.356,14 26.514,14.456 28.125,14.932 C29.83,15.436 31,16.994 31,18.773 L31,20 L31,20 Z",
              id: "Shape",
              fill: "#B6C8F9"
            }),
            _react2.default.createElement("circle", { id: "Oval", fill: "#FFFFFF", cx: 22, cy: 5, r: 5 })
          )
        )
      )
    )
  );
}