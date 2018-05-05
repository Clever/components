"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = Bullseye;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Bullseye(props) {
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
      "bullseye"
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
        { id: "bullseye", strokeWidth: 2 },
        _react2.default.createElement(
          "g",
          {
            id: "business-48px-outline_goal-64",
            transform: "translate(2.000000, 2.000000)"
          },
          _react2.default.createElement(
            "g",
            { id: "Group" },
            _react2.default.createElement("circle", {
              id: "Oval",
              stroke: "#C9081A",
              fill: "#FD8874",
              cx: 18,
              cy: 24,
              r: 18
            }),
            _react2.default.createElement("circle", {
              id: "Oval",
              stroke: "#C9081A",
              fill: "#FFFFFF",
              cx: 18,
              cy: 24,
              r: 10
            }),
            _react2.default.createElement("path", { d: "M18,24 L40,2", id: "Shape", stroke: "#C9081A" }),
            _react2.default.createElement("path", {
              d: "M35.4723074,6.52769257 L40,2",
              id: "Shape-Copy",
              stroke: "#B3873B"
            }),
            _react2.default.createElement("polygon", {
              id: "Shape",
              stroke: "#B3873B",
              fill: "#FEBD54",
              points: "34 0 36 6 30 12 28 6"
            }),
            _react2.default.createElement("polygon", {
              id: "Shape",
              stroke: "#B3873B",
              fill: "#FEBD54",
              points: "42 8 36 6 30 12 36 14"
            })
          )
        )
      )
    )
  );
}