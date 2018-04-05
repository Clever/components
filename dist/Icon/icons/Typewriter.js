"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = Typewriter;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Typewriter(props) {
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
      "typewriter"
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
        { id: "typewriter", stroke: "#62748C", strokeWidth: 2 },
        _react2.default.createElement(
          "g",
          { id: "Page-1", transform: "translate(0.000000, 2.000000)" },
          _react2.default.createElement("path", {
            d: "M40,42 L40,30 C40,27.8 38.2,26 36,26 L10,26 C7.8,26 6,27.8 6,30 L6,42",
            id: "Stroke-3",
            fill: "#B6C8F9"
          }),
          _react2.default.createElement("path", { d: "M13,34 L15,34", id: "Stroke-5" }),
          _react2.default.createElement("path", { d: "M19,34 L21,34", id: "Stroke-7" }),
          _react2.default.createElement("path", { d: "M25,34 L27,34", id: "Stroke-9" }),
          _react2.default.createElement("path", { d: "M31,34 L33,34", id: "Stroke-11" }),
          _react2.default.createElement("path", { d: "M10,38 L12,38", id: "Stroke-13" }),
          _react2.default.createElement("path", { d: "M16,38 L18,38", id: "Stroke-15" }),
          _react2.default.createElement("path", { d: "M22,38 L24,38", id: "Stroke-17" }),
          _react2.default.createElement("path", { d: "M28,38 L30,38", id: "Stroke-19" }),
          _react2.default.createElement("path", { d: "M34,38 L36,38", id: "Stroke-21" }),
          _react2.default.createElement("polygon", {
            id: "Stroke-23",
            fill: "#B6C8F9",
            points: "39.5 28 44 28 44 20 2 20 2 28 6.5 28"
          }),
          _react2.default.createElement("path", { d: "M2,18 L2,30", id: "Stroke-25" }),
          _react2.default.createElement("path", { d: "M44,18 L44,30", id: "Stroke-27" }),
          _react2.default.createElement("path", { d: "M0,24 L2,24", id: "Stroke-29" }),
          _react2.default.createElement("path", { d: "M44,24 L46,24", id: "Stroke-31" }),
          _react2.default.createElement("polygon", {
            id: "Stroke-33",
            fill: "#FFFFFF",
            points: "32 0 10 0 10 20 36 20 36 4"
          })
        ),
        _react2.default.createElement("path", { d: "M4,44 L42,44", id: "Stroke-1" }),
        _react2.default.createElement("polygon", {
          id: "Stroke-35",
          fill: "#FFFFFF",
          points: "26 32 20 32 18 28 28 28"
        })
      )
    )
  );
}