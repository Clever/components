"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = SmileyFace;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function SmileyFace(props) {
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
      "smile-face"
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
        { id: "smile-face", strokeWidth: 2, stroke: "#A6A05A" },
        _react2.default.createElement(
          "g",
          {
            id: "emoticons-48px-outline_quite-happy",
            transform: "translate(1.000000, 1.000000)"
          },
          _react2.default.createElement(
            "g",
            { id: "Group" },
            _react2.default.createElement("circle", { id: "Oval", fill: "#FFF49A", cx: 22, cy: 22, r: 22 }),
            _react2.default.createElement("path", {
              d: "M14,26 C14,30.4 17.6,34 22,34 C26.4,34 30,30.4 30,26 L14,26 L14,26 Z",
              id: "Shape",
              fill: "#FFFFFF"
            }),
            _react2.default.createElement("circle", { id: "Oval", fill: "#A6A05A", cx: 14, cy: 16, r: 2 }),
            _react2.default.createElement("circle", { id: "Oval", fill: "#A6A05A", cx: 30, cy: 16, r: 2 })
          )
        )
      )
    )
  );
}