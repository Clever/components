"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = Trophy;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Trophy(props) {
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
      "trophy"
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
        { id: "trophy", stroke: "#A6A05A", strokeWidth: 2, fill: "#FFF49A" },
        _react2.default.createElement(
          "g",
          {
            id: "sport-48px-outline_trophy",
            transform: "translate(1.000000, 1.000000)"
          },
          _react2.default.createElement(
            "g",
            { id: "Group" },
            _react2.default.createElement("path", {
              d: "M8.5799513,20 L8.5799427,20 C3.8413711,20 0,16.1586285 0,11.4200573 L0,4 L8,4",
              id: "Shape"
            }),
            _react2.default.createElement("path", {
              d: "M35.4200478,20 L35.4200592,20 C40.1586304,20 44,16.1586285 44,11.4200573 L44,4 L36,4",
              id: "Shape"
            }),
            _react2.default.createElement("path", { d: "M22,38 L22,30", id: "Shape" }),
            _react2.default.createElement("path", {
              d: "M22.0000134,30 L21.9999867,30 C14.2680073,30 8,23.7319927 8,16.0000134 L8,0 L36,0 L36,16.0000134 C36,23.7319927 29.7319927,30 22.0000134,30 L22.0000134,30 Z",
              id: "Shape"
            }),
            _react2.default.createElement("path", {
              d: "M32,44 L12,44 L12,43.9999924 C12,40.6862869 14.6862888,38 17.9999943,38 L26.0000057,38 C29.3137112,38 32,40.6862869 32,43.9999924 L32,44 L32,44 Z",
              id: "Shape"
            })
          )
        )
      )
    )
  );
}