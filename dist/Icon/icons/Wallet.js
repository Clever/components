"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = Wallet;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Wallet(props) {
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
      "wallet"
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
        { id: "wallet", strokeWidth: 2 },
        _react2.default.createElement(
          "g",
          {
            id: "business-48px-outline_wallet-44",
            transform: "translate(1.000000, 1.000000)"
          },
          _react2.default.createElement(
            "g",
            { id: "Group" },
            _react2.default.createElement("path", {
              d: "M30,8 L30,0 L4,0 C1.8,0 0,1.8 0,4 L0,4 C0,6.2 1.8,8 4,8",
              id: "Shape",
              stroke: "#A0754C",
              fill: "#DEBA91"
            }),
            _react2.default.createElement("path", {
              d: "M40,22 L40,8 L4,8 C1.8,8 0,6.2 0,4 L0,38 C0,41.3 2.7,44 6,44 L40,44 L40,30",
              id: "Shape",
              stroke: "#A0754C",
              fill: "#DEBA91"
            }),
            _react2.default.createElement("path", {
              d: "M44,30 L34,30 C31.8,30 30,28.2 30,26 L30,26 C30,23.8 31.8,22 34,22 L44,22 L44,30 L44,30 Z",
              id: "Shape",
              stroke: "#A6A05A",
              fill: "#FFF49A"
            }),
            _react2.default.createElement("path", { d: "M0,15 L5,15", id: "Shape", stroke: "#A0754C" }),
            _react2.default.createElement("path", { d: "M13,15 L16,15", id: "Shape", stroke: "#A0754C" }),
            _react2.default.createElement("path", { d: "M24,15 L27,15", id: "Shape", stroke: "#A0754C" }),
            _react2.default.createElement("path", { d: "M35,15 L40,15", id: "Shape", stroke: "#A0754C" }),
            _react2.default.createElement("path", { d: "M0,37 L5,37", id: "Shape", stroke: "#A0754C" }),
            _react2.default.createElement("path", { d: "M13,37 L16,37", id: "Shape", stroke: "#A0754C" }),
            _react2.default.createElement("path", { d: "M24,37 L27,37", id: "Shape", stroke: "#A0754C" }),
            _react2.default.createElement("path", { d: "M35,37 L40,37", id: "Shape", stroke: "#A0754C" })
          )
        )
      )
    )
  );
}