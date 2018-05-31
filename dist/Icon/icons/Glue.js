"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = Glue;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Glue(props) {
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
      "glue"
    ),
    _react2.default.createElement(
      "desc",
      null,
      "Created with Sketch."
    ),
    _react2.default.createElement(
      "defs",
      null,
      _react2.default.createElement("rect", { id: "path-1", x: 0, y: 20, width: 28, height: 25, rx: 4 }),
      _react2.default.createElement(
        "mask",
        {
          id: "mask-2",
          maskContentUnits: "userSpaceOnUse",
          maskUnits: "objectBoundingBox",
          x: 0,
          y: 0,
          width: 28,
          height: 25,
          fill: "white"
        },
        _react2.default.createElement("use", { xlinkHref: "#path-1" })
      ),
      _react2.default.createElement("rect", { id: "path-3", x: 5, y: 14, width: 18, height: 8 }),
      _react2.default.createElement(
        "mask",
        {
          id: "mask-4",
          maskContentUnits: "userSpaceOnUse",
          maskUnits: "objectBoundingBox",
          x: 0,
          y: 0,
          width: 18,
          height: 8,
          fill: "white"
        },
        _react2.default.createElement("use", { xlinkHref: "#path-3" })
      )
    ),
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
        { id: "glue" },
        _react2.default.createElement(
          "g",
          { id: "Page-1-Copy-3", transform: "translate(9.000000, 1.000000)" },
          _react2.default.createElement(
            "g",
            { id: "Group-7", stroke: "#62748C", fill: "#FFFFFF" },
            _react2.default.createElement("use", {
              id: "Rectangle-24",
              mask: "url(#mask-2)",
              strokeWidth: 4,
              xlinkHref: "#path-1"
            }),
            _react2.default.createElement("polygon", {
              id: "Stroke-3",
              strokeWidth: 2,
              strokeLinejoin: "round",
              points: "19 15 9 15 14 0"
            })
          ),
          _react2.default.createElement("polygon", {
            id: "Fill-8",
            fill: "#B6C8F9",
            points: "23 38 6 38 6 27 23 27"
          }),
          _react2.default.createElement("polygon", {
            id: "Stroke-9",
            stroke: "#62748C",
            strokeWidth: 2,
            strokeLinejoin: "round",
            points: "22 38 6 38 6 27 22 27"
          }),
          _react2.default.createElement("use", {
            id: "Rectangle",
            stroke: "#62748C",
            mask: "url(#mask-4)",
            strokeWidth: 4,
            fill: "#FFFFFF",
            xlinkHref: "#path-3"
          }),
          _react2.default.createElement("path", {
            d: "M14,15.5 L14,20.5",
            id: "Line",
            stroke: "#62748C",
            strokeWidth: 2,
            strokeLinecap: "square"
          }),
          _react2.default.createElement("path", {
            d: "M10,15.5 L10,20.5",
            id: "Line-Copy",
            stroke: "#62748C",
            strokeWidth: 2,
            strokeLinecap: "square"
          }),
          _react2.default.createElement("path", {
            d: "M18,15.5 L18,20.5",
            id: "Line-Copy-2",
            stroke: "#62748C",
            strokeWidth: 2,
            strokeLinecap: "square"
          })
        )
      )
    )
  );
}