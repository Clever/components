"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = Pickax;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Pickax(props) {
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
      "pickaxe"
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
        strokeLinejoin: "round"
      },
      _react2.default.createElement(
        "g",
        { id: "pickaxe", stroke: "#62748C", strokeWidth: 2 },
        _react2.default.createElement(
          "g",
          { id: "Page-1", transform: "translate(1.000000, 1.000000)" },
          _react2.default.createElement("polygon", {
            id: "Stroke-3",
            fill: "#FFFFFF",
            points: "5 44 0 39 28.5 10.5 33.5 15.5"
          }),
          _react2.default.createElement("path", {
            d: "M30,0 C27.263,2.734 22.731,2.734 20,0 L18,2 L37,21 L44,14 L30,0 L30,0 Z",
            id: "Stroke-1",
            fill: "#D8D8D8"
          })
        )
      )
    )
  );
}