"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = NoEntry;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function NoEntry(props) {
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
      "ban"
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
        { id: "ban", strokeWidth: 2, stroke: "#C9081A", fill: "#FD8874" },
        _react2.default.createElement(
          "g",
          {
            id: "ui-48px-outline-2_ban-bold",
            transform: "translate(1.000000, 1.000000)"
          },
          _react2.default.createElement(
            "g",
            { id: "Group" },
            _react2.default.createElement("path", {
              d: "M22,0 C9.8,0 0,9.8 0,22 C0,34.2 9.8,44 22,44 C34.2,44 44,34.2 44,22 C44,9.8 34.2,0 22,0 L22,0 Z M22,8 C24.4,8 26.7,8.6 28.7,9.7 L9.7,28.7 C8.6,26.7 8,24.5 8,22 C8,14.3 14.3,8 22,8 L22,8 Z M22,36 C19.6,36 17.3,35.4 15.3,34.3 L34.3,15.3 C35.4,17.3 36,19.5 36,22 C36,29.7 29.7,36 22,36 L22,36 Z",
              id: "Shape"
            })
          )
        )
      )
    )
  );
}