"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = Headset;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Headset(props) {
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
      "headset"
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
        { id: "headset", strokeWidth: 2, stroke: "#62748C" },
        _react2.default.createElement(
          "g",
          {
            id: "tech-48px-outline-2_headset",
            transform: "translate(3.000000, 1.000000)"
          },
          _react2.default.createElement(
            "g",
            { id: "Group" },
            _react2.default.createElement("path", {
              d: "M24,44 L34,44 C37.314,44 40,41.314 40,38 L40,32",
              id: "Shape"
            }),
            _react2.default.createElement("path", {
              d: "M10,22 L0,22 L0,32 C0,34.209 1.791,36 4,36 L10,36 L10,22 L10,22 Z",
              id: "Shape",
              fill: "#BCCEFF"
            }),
            _react2.default.createElement("path", {
              d: "M40,22 L30,22 L30,36 L36,36 C38.209,36 40,34.209 40,32 L40,22 L40,22 Z",
              id: "Shape",
              fill: "#BCCEFF"
            }),
            _react2.default.createElement("path", {
              d: "M40,22 L40,20 C40,8.954 31.046,0 20,0 L20,0 C8.954,0 0,8.954 0,20 L0,22",
              id: "Shape"
            })
          )
        )
      )
    )
  );
}