"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = Lock;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Lock(props) {
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
      "lock"
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
        { id: "lock", strokeWidth: 2 },
        _react2.default.createElement(
          "g",
          {
            id: "ui-48px-outline-1_lock",
            transform: "translate(7.000000, 1.000000)"
          },
          _react2.default.createElement(
            "g",
            { id: "Group" },
            _react2.default.createElement("path", {
              d: "M16,0 L16,0 C10.5,0 6,4.5 6,10 L6,16 L26,16 L26,10 C26,4.5 21.5,0 16,0 L16,0 Z",
              id: "Shape",
              stroke: "#A6A6A6"
            }),
            _react2.default.createElement("rect", {
              id: "Rectangle-path",
              stroke: "#A6A05A",
              fill: "#FFF49A",
              x: 0,
              y: 16,
              width: 32,
              height: 28,
              rx: 2
            }),
            _react2.default.createElement("circle", {
              id: "Oval",
              stroke: "#A6A05A",
              fill: "#FFFFFF",
              cx: 16,
              cy: 28,
              r: 4
            }),
            _react2.default.createElement("path", {
              d: "M16,32 L16,36",
              id: "Shape",
              stroke: "#A6A05A",
              strokeLinecap: "round",
              strokeLinejoin: "round"
            })
          )
        )
      )
    )
  );
}