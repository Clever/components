"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = Chart;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Chart(props) {
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
      "bar-chart"
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
        { id: "bar-chart", strokeWidth: 2 },
        _react2.default.createElement(
          "g",
          {
            id: "ui-48px-outline-3_chart-bars",
            transform: "translate(2.000000, 5.000000)"
          },
          _react2.default.createElement(
            "g",
            { id: "Group" },
            _react2.default.createElement("path", { d: "M0,36 L42,36", id: "Shape", stroke: "#64768E" }),
            _react2.default.createElement("rect", {
              id: "Rectangle-path",
              stroke: "#C9081A",
              fill: "#FD8874",
              x: 2,
              y: 12,
              width: 8,
              height: 18
            }),
            _react2.default.createElement("rect", {
              id: "Rectangle-path",
              stroke: "#4FA97B",
              fill: "#85EBB6",
              x: 17,
              y: 0,
              width: 8,
              height: 30
            }),
            _react2.default.createElement("rect", {
              id: "Rectangle-path",
              stroke: "#A6A05A",
              fill: "#FFF49A",
              x: 32,
              y: 20,
              width: 8,
              height: 10
            })
          )
        )
      )
    )
  );
}