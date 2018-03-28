"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = Paper;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Paper(props) {
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
      "copy"
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
        { id: "copy", strokeWidth: 2 },
        _react2.default.createElement(
          "g",
          {
            id: "files-48px-outline_single-copy-04",
            transform: "translate(4.000000, 1.000000)"
          },
          _react2.default.createElement(
            "g",
            { id: "Group" },
            _react2.default.createElement("rect", {
              id: "Rectangle-path",
              stroke: "#62748C",
              fill: "#FFFFFF",
              x: 0,
              y: 6,
              width: 32,
              height: 38,
              rx: 2
            }),
            _react2.default.createElement("path", {
              d: "M4,0 L36.0000796,0 C37.1046051,0 38,0.891539827 38,1.99729162 L38,40",
              id: "Shape",
              stroke: "#62748C"
            }),
            _react2.default.createElement("path", { d: "M8,16 L24,16", id: "Shape", stroke: "#4274F6" }),
            _react2.default.createElement("path", { d: "M8,24 L24,24", id: "Shape", stroke: "#4274F6" }),
            _react2.default.createElement("path", { d: "M8,32 L16,32", id: "Shape", stroke: "#4274F6" })
          )
        )
      )
    )
  );
}