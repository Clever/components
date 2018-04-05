"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = Book;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Book(props) {
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
      "book"
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
        { id: "book", strokeWidth: 2, stroke: "#64768E" },
        _react2.default.createElement(
          "g",
          {
            id: "design-48px-outline_book-bookmark",
            transform: "translate(4.000000, 1.000000)"
          },
          _react2.default.createElement(
            "g",
            { id: "Group" },
            _react2.default.createElement("path", {
              d: "M0.944487245,32 L1,40 C1,42.209 2.791,44 5,44 L33,44 C35.209,44 37,42.209 37,40 L37,36 L37,32",
              id: "Shape",
              fill: "#FFFFFF"
            }),
            _react2.default.createElement("path", {
              d: "M5,0 C2.791,0 1,1.791 1,4 L1,40 C1,37.791 2.791,36 5,36 L33,36 C35.209,36 37,34.209 37,32 L37,4 C37,1.791 35.209,0 33,0 L5,0 L5,0 Z",
              id: "Shape",
              fill: "#BCCEFF"
            }),
            _react2.default.createElement("polyline", {
              id: "Shape",
              fill: "#FFFFFF",
              points: "29 1 29 16 23 12 17 16 17 1"
            })
          )
        )
      )
    )
  );
}