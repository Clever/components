"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = HandClick;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function HandClick(props) {
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
      "hand-click"
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
        { id: "hand-click", strokeWidth: 2, stroke: "#62748C" },
        _react2.default.createElement(
          "g",
          {
            id: "design-48px-outline-2_cursor-pointer",
            transform: "translate(5.000000, 1.000000)"
          },
          _react2.default.createElement(
            "g",
            { id: "Group" },
            _react2.default.createElement("path", { d: "M7,20 L7,26", id: "Shape" }),
            _react2.default.createElement("path", {
              d: "M31.255,16.955 L14,14 L14,3.5 C14,1.567 12.433,0 10.5,0 L10.5,0 C8.567,0 7,1.567 7,3.5 L7,20 L4,20 C1.791,20 0,21.791 0,24 L0,29.791 C0,32.516 0.927,35.16 2.63,37.288 L7,44 L33,44 L36.112,23.771 C36.606,20.559 34.453,17.537 31.255,16.955 L31.255,16.955 Z",
              id: "Shape",
              fill: "#FFFFFF"
            }),
            _react2.default.createElement("path", { d: "M17,26 L17,36", id: "Shape" }),
            _react2.default.createElement("path", { d: "M25,26 L25,36", id: "Shape" })
          )
        )
      )
    )
  );
}