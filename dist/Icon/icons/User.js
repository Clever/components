"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = User;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function User(props) {
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
      "user"
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
        strokeLinejoin: "bevel"
      },
      _react2.default.createElement(
        "g",
        { id: "user", strokeWidth: 2, stroke: "#62748C" },
        _react2.default.createElement(
          "g",
          {
            id: "users-48px-outline_single-01",
            transform: "translate(3.000000, 1.000000)"
          },
          _react2.default.createElement(
            "g",
            { id: "Group" },
            _react2.default.createElement("path", {
              d: "M20,22 L20,22 C14.477,22 10,17.523 10,12 L10,10 C10,4.477 14.477,0 20,0 L20,0 C25.523,0 30,4.477 30,10 L30,12 C30,17.523 25.523,22 20,22 L20,22 Z",
              id: "Shape",
              fill: "#FFFFFF"
            }),
            _react2.default.createElement("path", {
              d: "M40,36.856 C40,33.755 37.966,31.028 34.993,30.144 C31.477,29.098 26.288,28 20,28 C13.712,28 8.523,29.098 5.007,30.144 C2.034,31.028 0,33.755 0,36.856 L0,44 L40,44 L40,36.856 L40,36.856 Z",
              id: "Shape",
              fill: "#B6C8F9"
            })
          )
        )
      )
    )
  );
}