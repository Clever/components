"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = Microscope;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Microscope(props) {
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
      "microscope"
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
        { id: "microscope" },
        _react2.default.createElement(
          "g",
          {
            id: "education-48px-outline_microscope",
            transform: "translate(7.000000, 1.000000)"
          },
          _react2.default.createElement(
            "g",
            { id: "Group" },
            _react2.default.createElement("path", {
              d: "M8.6,9.8 C3.5,12.5 0,17.8 0,24 L0,26",
              id: "Shape",
              stroke: "#62748C",
              strokeWidth: 2,
              strokeLinecap: "round",
              strokeLinejoin: "round"
            }),
            _react2.default.createElement("rect", {
              id: "Rectangle-path",
              stroke: "#62748C",
              strokeWidth: 2,
              strokeLinecap: "round",
              strokeLinejoin: "round",
              fill: "#B6C8F9",
              x: 0,
              y: 38,
              width: 34,
              height: 6
            }),
            _react2.default.createElement("polygon", {
              id: "Shape",
              stroke: "#62748C",
              strokeWidth: 2,
              strokeLinecap: "round",
              strokeLinejoin: "round",
              fill: "#FFFFFF",
              points: "22 21.3 14.6 24.3 6.3 4 13.7 0.9 13.7 0.9"
            }),
            _react2.default.createElement("polygon", { id: "Path-7", fill: "#B6C8F9", points: "6 5 9 10 16 6 13 1" }),
            _react2.default.createElement("polygon", {
              id: "Shape",
              stroke: "#62748C",
              strokeWidth: 2,
              strokeLinecap: "round",
              strokeLinejoin: "round",
              points: "22 21.3 14.6 24.3 6.3 4 13.7 0.9 13.7 0.9"
            }),
            _react2.default.createElement("path", {
              d: "M16,32 L30,32",
              id: "Shape",
              stroke: "#62748C",
              strokeWidth: 2,
              strokeLinecap: "round",
              strokeLinejoin: "round"
            }),
            _react2.default.createElement("path", {
              d: "M8.6,9.8 L16.1,6.8",
              id: "Shape",
              stroke: "#62748C",
              strokeWidth: 2,
              strokeLinecap: "round",
              strokeLinejoin: "round"
            }),
            _react2.default.createElement("path", {
              d: "M8,38 L0,38 L0,26 L0,26 C4.4,26 8,29.6 8,34 L8,38 L8,38 Z",
              id: "Shape",
              stroke: "#62748C",
              strokeWidth: 2,
              strokeLinecap: "round",
              strokeLinejoin: "round",
              fill: "#FFFFFF"
            })
          )
        )
      )
    )
  );
}