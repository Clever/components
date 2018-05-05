"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = WebsiteHTML;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function WebsiteHTML(props) {
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
      "window-dev"
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
        { id: "window-dev" },
        _react2.default.createElement(
          "g",
          {
            id: "design-48px-outline_window-dev",
            transform: "translate(1.000000, 3.000000)"
          },
          _react2.default.createElement(
            "g",
            { id: "Group" },
            _react2.default.createElement("rect", {
              id: "Rectangle",
              fill: "#D8D8D8",
              x: 1,
              y: 1,
              width: 42,
              height: 10
            }),
            _react2.default.createElement("rect", {
              id: "Rectangle-Copy",
              fill: "#FFFFFF",
              x: 1,
              y: 13,
              width: 42,
              height: 28
            }),
            _react2.default.createElement("polyline", {
              id: "Shape",
              stroke: "#62748C",
              strokeWidth: 2,
              strokeLinecap: "round",
              strokeLinejoin: "round",
              points: "14 22 10 26 14 30"
            }),
            _react2.default.createElement("polyline", {
              id: "Shape",
              stroke: "#62748C",
              strokeWidth: 2,
              strokeLinecap: "round",
              strokeLinejoin: "round",
              points: "30 22 34 26 30 30"
            }),
            _react2.default.createElement("path", {
              d: "M20,34 L24,18",
              id: "Shape",
              stroke: "#62748C",
              strokeWidth: 2,
              strokeLinecap: "round",
              strokeLinejoin: "round"
            }),
            _react2.default.createElement("path", {
              d: "M6,6 L8,6",
              id: "Shape",
              stroke: "#62748C",
              strokeWidth: 2,
              strokeLinecap: "round",
              strokeLinejoin: "round"
            }),
            _react2.default.createElement("path", {
              d: "M14,6 L16,6",
              id: "Shape",
              stroke: "#62748C",
              strokeWidth: 2,
              strokeLinecap: "round",
              strokeLinejoin: "round"
            }),
            _react2.default.createElement("path", {
              d: "M30,6 L38,6",
              id: "Shape",
              stroke: "#62748C",
              strokeWidth: 2,
              strokeLinecap: "round",
              strokeLinejoin: "round"
            }),
            _react2.default.createElement("path", {
              d: "M0,12 L44,12",
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
              x: 0,
              y: 0,
              width: 44,
              height: 40,
              rx: 2
            })
          )
        )
      )
    )
  );
}