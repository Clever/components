"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = Tablet;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Tablet(props) {
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
      "tablet"
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
        { id: "tablet", strokeWidth: 2 },
        _react2.default.createElement(
          "g",
          {
            id: "design-48px-outline_tablet",
            transform: "translate(1.000000, 3.000000)"
          },
          _react2.default.createElement(
            "g",
            { id: "Group" },
            _react2.default.createElement("path", {
              d: "M41.9950767,8 C43.1023652,8 44,8.88926172 44,10.0017433 L44,37.9982567 C44,39.103789 43.1011449,40 41.9950767,40 L2.00492334,40 C0.897634756,40 0,39.1107383 0,37.9982567 L0,10.0017433 C0,8.89621101 0.898855112,8 2.00492334,8 L41.9950767,8 Z",
              id: "Shape",
              stroke: "#62748C",
              fill: "#FFFFFF"
            }),
            _react2.default.createElement("circle", {
              id: "Oval",
              stroke: "#62748C",
              fill: "#FFFFFF",
              cx: 8,
              cy: 24,
              r: 2
            }),
            _react2.default.createElement("polyline", {
              id: "Shape",
              stroke: "#62748C",
              strokeLinejoin: "round",
              fill: "#BCCEFF",
              points: "35 14 38 14 38 34 16 34 16 14 27 14"
            }),
            _react2.default.createElement("path", {
              d: "M8,14 L8,16",
              id: "Shape",
              stroke: "#62748C",
              strokeLinecap: "round",
              strokeLinejoin: "round"
            }),
            _react2.default.createElement("path", {
              d: "M8,32 L8,34",
              id: "Shape",
              stroke: "#62748C",
              strokeLinecap: "round",
              strokeLinejoin: "round"
            }),
            _react2.default.createElement("path", {
              d: "M24.172,20.828 L25.172,15.828 L39.172,1.828 C40.277,0.723 42.067,0.723 43.172,1.828 C44.276,2.932 44.277,4.723 43.172,5.828 L29.172,19.828 L24.172,20.828 L24.172,20.828 Z",
              id: "Shape",
              stroke: "#9B7332",
              fill: "#F2AF4D"
            })
          )
        )
      )
    )
  );
}