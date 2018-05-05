"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = RibbonAward;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function RibbonAward(props) {
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
      "award"
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
        { id: "award", strokeWidth: 2 },
        _react2.default.createElement(
          "g",
          {
            id: "shopping-48px-outline_award",
            transform: "translate(8.000000, 2.000000)"
          },
          _react2.default.createElement(
            "g",
            { id: "Group" },
            _react2.default.createElement("polyline", {
              id: "Shape",
              stroke: "#C9081A",
              fill: "#FD8874",
              points: "23 27.69 23 42 15 38 7 42 7 27.69"
            }),
            _react2.default.createElement("circle", {
              id: "Oval",
              stroke: "#A6A05A",
              fill: "#FFF49A",
              cx: 15,
              cy: 15,
              r: 15
            }),
            _react2.default.createElement("circle", {
              id: "Oval",
              stroke: "#A6A05A",
              fill: "#FFFFFF",
              cx: 15,
              cy: 15,
              r: 5
            })
          )
        )
      )
    )
  );
}