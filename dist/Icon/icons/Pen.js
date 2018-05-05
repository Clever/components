"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = Pen;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Pen(props) {
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
      "signature"
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
        { id: "signature", stroke: "#62748C" },
        _react2.default.createElement(
          "g",
          {
            id: "business-48px-outline_signature",
            transform: "translate(6.000000, 2.000000)"
          },
          _react2.default.createElement(
            "g",
            { id: "Group" },
            _react2.default.createElement("polyline", {
              id: "Shape",
              strokeWidth: 2,
              fill: "#FFFFFF",
              points: "16 7 4 13 0 35 22 31 28 19"
            }),
            _react2.default.createElement("path", { d: "M0,35 L11.1,23.8", id: "Shape", strokeWidth: 2 }),
            _react2.default.createElement("rect", {
              id: "Rectangle-path",
              strokeWidth: "1.99998082",
              fill: "#BCCEFF",
              transform: "translate(24.035455, 10.964945) rotate(225.000000) translate(-24.035455, -10.964945) ",
              x: "12.7355634",
              y: "8.11497233",
              width: "22.5997833",
              height: "5.69994534"
            }),
            _react2.default.createElement("circle", { id: "Oval", strokeWidth: 2, cx: 14, cy: 21, r: 3 }),
            _react2.default.createElement("path", { d: "M0,41 L32,41", id: "Shape", strokeWidth: 2 })
          )
        )
      )
    )
  );
}