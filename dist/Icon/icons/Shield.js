"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = Shield;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Shield(props) {
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
      "shield"
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
        { id: "shield" },
        _react2.default.createElement(
          "g",
          {
            id: "ui-48px-outline-3_security",
            transform: "translate(3.000000, 3.000000)"
          },
          _react2.default.createElement(
            "g",
            { id: "Group" },
            _react2.default.createElement("path", {
              d: "M20,0 C14,4 6,6 0,6 C0,20 6,34 20,40 C34,34 40,20 40,6 C34,6 26,4 20,0 L20,0 Z",
              id: "Shape",
              stroke: "#62748C",
              strokeWidth: 2,
              strokeLinecap: "round",
              strokeLinejoin: "round",
              fill: "#FFFFFF"
            }),
            _react2.default.createElement("path", {
              d: "M20,20 L20,0 C20,0 28,6 40,6 C40,14 38,20 38,20 L20,20 Z",
              id: "Path-3",
              fill: "#BCCEFF"
            }),
            _react2.default.createElement("path", {
              d: "M20,20 L20,39 C20,39 5,33 2,20 C11,20 20,20 20,20 Z",
              id: "Path-4",
              fill: "#BCCEFF"
            }),
            _react2.default.createElement("path", {
              d: "M20,0 L20,40",
              id: "Shape",
              stroke: "#62748C",
              strokeWidth: 2,
              strokeLinejoin: "round"
            }),
            _react2.default.createElement("path", {
              d: "M37.807,20 L2.193,20",
              id: "Shape",
              stroke: "#62748C",
              strokeWidth: 2,
              strokeLinejoin: "round"
            }),
            _react2.default.createElement("path", {
              d: "M20,0 C14,4 6,6 0,6 C0,20 6,34 20,40 C34,34 40,20 40,6 C34,6 26,4 20,0 L20,0 Z",
              id: "Shape",
              stroke: "#62748C",
              strokeWidth: 2,
              strokeLinecap: "round",
              strokeLinejoin: "round"
            })
          )
        )
      )
    )
  );
}