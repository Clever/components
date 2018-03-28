"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = Graph;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Graph(props) {
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
      "line-chart"
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
        { id: "line-chart", strokeWidth: 2, stroke: "#4FA97B" },
        _react2.default.createElement(
          "g",
          { id: "Group-2", transform: "translate(1.000000, 3.000000)" },
          _react2.default.createElement(
            "g",
            { id: "business-48px-outline_stock" },
            _react2.default.createElement("rect", {
              id: "Rectangle-path",
              fill: "#85EBB6",
              x: 0,
              y: 0,
              width: 30,
              height: 40,
              rx: 2
            }),
            _react2.default.createElement("rect", {
              id: "Rectangle-path",
              fill: "#FFFFFF",
              x: 30,
              y: 0,
              width: 14,
              height: 40,
              rx: 2
            }),
            _react2.default.createElement(
              "g",
              { id: "Group" },
              _react2.default.createElement("polyline", {
                id: "Shape",
                strokeLinejoin: "round",
                points: "0 20 4 23 8 16 14 27 18 19 22 22 26.2 17.2"
              }),
              _react2.default.createElement("path", { d: "M30,20 L30,40", id: "Shape" }),
              _react2.default.createElement("path", { d: "M30,0 L30,12", id: "Shape" }),
              _react2.default.createElement("circle", { id: "Oval", fill: "#FFFFFF", cx: 30, cy: 16, r: 4 })
            )
          )
        )
      )
    )
  );
}