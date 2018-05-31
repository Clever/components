"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = Menu;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Menu(props) {
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
      "menu"
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
        { id: "menu", stroke: "#62748C", strokeWidth: 4 },
        _react2.default.createElement(
          "g",
          { id: "Page-1-Copy", transform: "translate(7.000000, 8.000000)" },
          _react2.default.createElement("path", { d: "M32,1.97368421 L0,1.97368421", id: "Stroke-7" }),
          _react2.default.createElement("path", { d: "M32,14.6052632 L0,14.6052632", id: "Stroke-7" }),
          _react2.default.createElement("path", { d: "M32,27.2368421 L0,27.2368421", id: "Stroke-7" })
        )
      )
    )
  );
}