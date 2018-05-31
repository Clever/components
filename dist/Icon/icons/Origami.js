"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = Origami;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Origami(props) {
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
      "origami"
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
        fillRule: "evenodd"
      },
      _react2.default.createElement(
        "g",
        { id: "origami" },
        _react2.default.createElement(
          "g",
          { id: "Page-1-Copy", transform: "translate(1.000000, 1.000000)" },
          _react2.default.createElement("polygon", {
            id: "Fill-1",
            fill: "#BCCEFF",
            points: "7.98583534 13 0 21 12 21"
          }),
          _react2.default.createElement("polygon", {
            id: "Stroke-2",
            stroke: "#62748C",
            strokeWidth: "2.028",
            strokeLinejoin: "round",
            points: "7.98583534 13 0 21 12 21"
          }),
          _react2.default.createElement("polyline", {
            id: "Fill-4",
            fill: "#BCCEFF",
            points: "12 20.5379692 20 35 41 43 20 13 20 35"
          }),
          _react2.default.createElement("polyline", {
            id: "Stroke-5",
            stroke: "#62748C",
            strokeWidth: "2.028",
            strokeLinejoin: "round",
            points: "12 20.5379692 20 35 41 43 20 13 20 35"
          }),
          _react2.default.createElement("path", {
            d: "M20,13.006 L8,13",
            id: "Stroke-7",
            stroke: "#62748C",
            strokeWidth: "2.028",
            strokeLinejoin: "round"
          }),
          _react2.default.createElement("polyline", {
            id: "Fill-8",
            fill: "#FFFFFF",
            points: "32 10.3828304 44 4 32.4348589 33"
          }),
          _react2.default.createElement("polyline", {
            id: "Stroke-9",
            stroke: "#62748C",
            strokeWidth: "2.028",
            strokeLinejoin: "round",
            points: "32 10.3828304 44 4 33 31"
          }),
          _react2.default.createElement("polygon", {
            id: "Fill-11",
            fill: "#BCCEFF",
            points: "34 32 34 0 20 12.9918022"
          }),
          _react2.default.createElement("polygon", {
            id: "Stroke-12",
            stroke: "#62748C",
            strokeWidth: "2.028",
            strokeLinejoin: "round",
            points: "34 32 34 0 20 12.9918022"
          })
        )
      )
    )
  );
}