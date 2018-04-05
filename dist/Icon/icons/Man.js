"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = Man;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Man(props) {
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
      "business-man"
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
        { id: "business-man", strokeWidth: 2 },
        _react2.default.createElement(
          "g",
          {
            id: "business-48px-outline_business-contact-86",
            transform: "translate(1.000000, 29.000000)",
            strokeLinecap: "round",
            stroke: "#62748C",
            strokeLinejoin: "round"
          },
          _react2.default.createElement(
            "g",
            { id: "Group" },
            _react2.default.createElement("path", {
              d: "M15.4,0 L14,0 C6.3,0 0,6.3 0,14 L0,16 L44,16 L44,14 C44,6.3 37.7,0 30,0 L28.6,0",
              id: "Shape",
              fill: "#B6C8F9"
            }),
            _react2.default.createElement("polyline", {
              id: "Shape",
              fill: "#FFFFFF",
              points: "27.7 0.5 24 8 20 8 16.3 0.5"
            })
          )
        ),
        _react2.default.createElement("polygon", {
          id: "Path-9",
          stroke: "#62748C",
          fill: "#FFFFFF",
          points: "25 37 29 45 17 45 21 37"
        }),
        _react2.default.createElement(
          "g",
          {
            id: "Page-1",
            transform: "translate(11.000000, 1.000000)",
            strokeLinecap: "round",
            strokeLinejoin: "round"
          },
          _react2.default.createElement("path", {
            d: "M17,9.6 C15.3,13.4 11.4,16 7,16 C4.3,16 1.9,15.1 0,13.5 L0,18 C0,24.6 5.4,30 12,30 C18.6,30 24,24.6 24,18 L24,15.6 C20.9,14.7 18.3,12.5 17,9.6 L17,9.6 Z",
            id: "Stroke-3",
            stroke: "#B8865D",
            fill: "#F8DFB2"
          }),
          _react2.default.createElement("path", {
            d: "M12,0 C5.4,0 0,5.4 0,12 L0,13.5 C1.9,15.1 4.3,16 7,16 C11.4,16 15.3,13.4 17,9.6 C18.3,12.5 20.9,14.7 24,15.6 L24,12 C24,5.4 18.6,0 12,0 L12,0 Z",
            id: "Stroke-1",
            stroke: "#444444",
            fill: "#8C8C8C"
          })
        )
      )
    )
  );
}