"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = Printer;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Printer(props) {
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
      "printer"
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
        strokeLinecap: "round"
      },
      _react2.default.createElement(
        "g",
        { id: "printer", strokeWidth: 2 },
        _react2.default.createElement(
          "g",
          {
            id: "tech-48px-outline_print",
            transform: "translate(1.000000, 1.000000)"
          },
          _react2.default.createElement(
            "g",
            { id: "Group" },
            _react2.default.createElement("path", {
              d: "M8,34 L1.99810135,34 C0.894580447,34 0,33.1017876 0,32.0092049 L0,14 C0,11.791 1.791,10 4,10 L40,10 C42.209,10 44,11.791 44,14 L44,32.0092049 C44,33.1086907 43.1132936,34 42.0018986,34 L36,34",
              id: "Shape",
              stroke: "#62748C",
              strokeLinejoin: "round",
              fill: "#D8D8D8"
            }),
            _react2.default.createElement("polyline", {
              id: "Shape",
              stroke: "#62748C",
              strokeLinejoin: "round",
              points: "8 5 8 0 36 0 36 5"
            }),
            _react2.default.createElement("rect", {
              id: "Rectangle-path",
              stroke: "#62748C",
              fill: "#FFFFFF",
              x: 8,
              y: 21,
              width: 28,
              height: 23,
              rx: 2
            }),
            _react2.default.createElement("path", { d: "M16,29 L28,29", id: "Shape", stroke: "#416EF5" }),
            _react2.default.createElement("path", { d: "M16,36 L28,36", id: "Shape", stroke: "#416EF5" })
          )
        )
      )
    )
  );
}