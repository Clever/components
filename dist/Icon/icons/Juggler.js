"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = Juggler;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Juggler(props) {
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
      "meeting"
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
        { id: "meeting", strokeWidth: 2, stroke: "#62748C" },
        _react2.default.createElement(
          "g",
          {
            id: "users-48px-outline_network",
            transform: "translate(1.000000, 1.000000)"
          },
          _react2.default.createElement(
            "g",
            { id: "Group" },
            _react2.default.createElement("circle", { id: "Oval", fill: "#B6C8F9", cx: 22, cy: 4, r: 4 }),
            _react2.default.createElement("circle", { id: "Oval", fill: "#B6C8F9", cx: 40, cy: 14, r: 4 }),
            _react2.default.createElement("circle", { id: "Oval", fill: "#B6C8F9", cx: 4, cy: 14, r: 4 }),
            _react2.default.createElement("path", {
              d: "M16.91,34.172 L10.424,36.961 C8.954,37.591 8,39.037 8,40.638 L8,44 L36,44 L36,40.638 C36,39.038 35.046,37.592 33.576,36.961 L27.075,34.185",
              id: "Shape",
              fill: "#B6C8F9"
            }),
            _react2.default.createElement("path", {
              d: "M22,36 L22,36 C17.582,36 14,32.418 14,28 L14,26 C14,21.582 17.582,18 22,18 L22,18 C26.418,18 30,21.582 30,26 L30,28 C30,32.418 26.418,36 22,36 L22,36 Z",
              id: "Shape",
              fill: "#FFFFFF"
            })
          )
        )
      )
    )
  );
}