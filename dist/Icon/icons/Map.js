"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = Map;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Map(props) {
  return _react2.default.createElement(
    "svg",
    _extends({ width: "46px", height: "46px", viewBox: "0 0 46 46", version: "1.1", xmlns: "http://www.w3.org/2000/svg", xmlnsXlink: "http://www.w3.org/1999/xlink" }, props),
    _react2.default.createElement(
      "title",
      null,
      "icon-map-46px"
    ),
    _react2.default.createElement(
      "desc",
      null,
      "Created with Sketch."
    ),
    _react2.default.createElement("defs", null),
    _react2.default.createElement(
      "g",
      { id: "Finalized-Icons", stroke: "none", strokeWidth: 1, fill: "none", fillRule: "evenodd", strokeLinecap: "round", strokeLinejoin: "round" },
      _react2.default.createElement(
        "g",
        { id: "icon-map-46px", stroke: "#566279", strokeWidth: 2 },
        _react2.default.createElement(
          "g",
          { id: "Group", transform: "translate(1.000000, 2.000000)" },
          _react2.default.createElement("polyline", { id: "Shape", fill: "#D2DEFF", points: "29 11.7 44 8 44 38 28 42 16 38 0 42 0 12 13.9 8.5" }),
          _react2.default.createElement("path", { d: "M16,38 L16,13.3", id: "Shape", opacity: "0.5" }),
          _react2.default.createElement("path", { d: "M28,42 L28,13.3", id: "Shape", opacity: "0.5" }),
          _react2.default.createElement("circle", { id: "Oval", fill: "#F38B91", cx: 22, cy: 8, r: 8 }),
          _react2.default.createElement("path", { d: "M22,16 L22,26", id: "Shape" })
        )
      )
    )
  );
}