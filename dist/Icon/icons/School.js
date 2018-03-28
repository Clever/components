"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = School;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function School(props) {
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
      "school"
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
        { id: "school" },
        _react2.default.createElement(
          "g",
          {
            id: "education-48px-outline_school",
            transform: "translate(3.000000, 1.000000)",
            strokeLinecap: "round",
            strokeWidth: 2,
            strokeLinejoin: "round"
          },
          _react2.default.createElement(
            "g",
            { id: "Group" },
            _react2.default.createElement("polyline", {
              id: "Shape",
              stroke: "#C9081A",
              points: "20 12 20 0 28 0 28 6 20 6"
            }),
            _react2.default.createElement("polygon", {
              id: "Shape",
              stroke: "#62748C",
              fill: "#FFFFFF",
              points: "30 28 30 20 20 12 10 20 10 28 0 28 0 44 40 44 40 28"
            }),
            _react2.default.createElement("path", { d: "M18,24 L22,24", id: "Shape", stroke: "#62748C" }),
            _react2.default.createElement("polyline", {
              id: "Shape",
              stroke: "#62748C",
              fill: "#BCCEFF",
              points: "24 44 24 36 16 36 16 44"
            }),
            _react2.default.createElement("path", { d: "M6,36 L10,36", id: "Shape", stroke: "#62748C" }),
            _react2.default.createElement("path", { d: "M30,36 L34,36", id: "Shape", stroke: "#62748C" })
          )
        ),
        _react2.default.createElement("rect", {
          id: "Rectangle-8",
          fill: "#FD8874",
          x: 24,
          y: 2,
          width: 6,
          height: 4
        })
      )
    )
  );
}