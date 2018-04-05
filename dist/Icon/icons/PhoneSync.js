"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = PhoneSync;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function PhoneSync(props) {
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
      "sync"
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
        { id: "sync" },
        _react2.default.createElement(
          "g",
          {
            id: "tech-48px-outline_sync",
            transform: "translate(1.000000, 1.000000)",
            strokeLinecap: "round",
            strokeWidth: 2,
            stroke: "#62748C",
            strokeLinejoin: "round"
          },
          _react2.default.createElement(
            "g",
            { id: "Group" },
            _react2.default.createElement("path", {
              d: "M15,26 L3,26 C1.343,26 0,24.657 0,23 L0,3 C0,1.343 1.343,0 3,0 L15,0 C16.657,0 18,1.343 18,3 L18,23 C18,24.657 16.657,26 15,26 L15,26 Z",
              id: "Shape",
              fill: "#FFFFFF"
            }),
            _react2.default.createElement("path", { d: "M0,18 L18,18", id: "Shape" }),
            _react2.default.createElement("path", { d: "M0,6 L18,6", id: "Shape" }),
            _react2.default.createElement("path", {
              d: "M41,44 L29,44 C27.343,44 26,42.657 26,41 L26,21 C26,19.343 27.343,18 29,18 L41,18 C42.657,18 44,19.343 44,21 L44,41 C44,42.657 42.657,44 41,44 L41,44 Z",
              id: "Shape",
              fill: "#FFFFFF"
            }),
            _react2.default.createElement("path", { d: "M26,36 L44,36", id: "Shape" }),
            _react2.default.createElement("path", { d: "M26,24 L44,24", id: "Shape" }),
            _react2.default.createElement("path", {
              d: "M26,0 L26,0 C31.523,0 36,4.477 36,10 L36,10",
              id: "Shape"
            }),
            _react2.default.createElement("path", {
              d: "M8,34 L8,34 C8,39.523 12.477,44 18,44 L18,44",
              id: "Shape"
            })
          )
        ),
        _react2.default.createElement("rect", {
          id: "Rectangle-6",
          fill: "#B6C8F9",
          x: 28,
          y: 26,
          width: 16,
          height: 10
        }),
        _react2.default.createElement("rect", {
          id: "Rectangle",
          fill: "#B6C8F9",
          x: 2,
          y: 8,
          width: 16,
          height: 10
        })
      )
    )
  );
}