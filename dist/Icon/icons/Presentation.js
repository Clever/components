"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = Presentation;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Presentation(props) {
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
      "presentation"
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
        { id: "presentation", strokeWidth: 2, stroke: "#62748C" },
        _react2.default.createElement(
          "g",
          {
            id: "education-48px-outline_board-51",
            transform: "translate(1.000000, 1.000000)"
          },
          _react2.default.createElement(
            "g",
            { id: "Group" },
            _react2.default.createElement("path", { d: "M22,34 L22,42", id: "Shape" }),
            _react2.default.createElement("path", { d: "M18,34 L10,44", id: "Shape" }),
            _react2.default.createElement("path", { d: "M26,34 L34,44", id: "Shape" }),
            _react2.default.createElement("polyline", {
              id: "Shape",
              fill: "#B6C8F9",
              points: "40 34 40 6 4 6 4 34"
            }),
            _react2.default.createElement("polyline", {
              id: "Shape",
              fill: "#FFFFFF",
              points: "20 6 20 2 24 2 24 6"
            }),
            _react2.default.createElement("path", { d: "M0,34 L44,34", id: "Shape" }),
            _react2.default.createElement("path", { d: "M44,0 L28,16", id: "Shape" }),
            _react2.default.createElement("path", { d: "M12,16 L20,16", id: "Shape" }),
            _react2.default.createElement("path", { d: "M12,24 L32,24", id: "Shape" })
          )
        )
      )
    )
  );
}