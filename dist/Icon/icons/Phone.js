"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = Phone;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Phone(props) {
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
      "phone"
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
        { id: "phone", strokeWidth: 2, stroke: "#4FA97B" },
        _react2.default.createElement(
          "g",
          {
            id: "ui-48px-outline-3_phone-call",
            transform: "translate(1.000000, 1.000000)"
          },
          _react2.default.createElement(
            "g",
            { id: "Group" },
            _react2.default.createElement("path", {
              d: "M32,28 L26,34 L10,18 L16,12 L6,2 L0,8 C0,27.882 16.118,44 36,44 L42,38 L32,28 L32,28 Z",
              id: "Shape",
              fill: "#85EBB6"
            }),
            _react2.default.createElement("path", { d: "M26,0 C35.941,0 44,8.059 44,18", id: "Shape" }),
            _react2.default.createElement("path", { d: "M26,8 C31.523,8 36,12.477 36,18", id: "Shape" })
          )
        )
      )
    )
  );
}