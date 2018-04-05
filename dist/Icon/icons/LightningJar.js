"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = LightningJar;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function LightningJar(props) {
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
      "lightning-jar"
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
        { id: "lightning-jar", strokeWidth: 2 },
        _react2.default.createElement(
          "g",
          {
            id: "sport-48px-outline_energy-supplement",
            transform: "translate(3.000000, 1.000000)"
          },
          _react2.default.createElement(
            "g",
            { id: "Group" },
            _react2.default.createElement("path", {
              d: "M32,8 L20,8 L8,8 C8,12.5 0,13 0,19.7415771 L0,40 C0,42.2091408 1.7908611,44 4,44 L20,44 L36,44 C38.2091408,44 40,42.2091408 40,40 L40,19.7415771 C40,13 32,12.5 32,8 L32,8 Z",
              id: "Shape",
              stroke: "#C9081A",
              fill: "#FD8874"
            }),
            _react2.default.createElement("polyline", {
              id: "Shape",
              stroke: "#FFFFFF",
              strokeLinejoin: "round",
              points: "22 20 16 26 24 26 18 32"
            }),
            _react2.default.createElement("rect", {
              id: "Rectangle-path",
              stroke: "#62748C",
              strokeLinecap: "round",
              strokeLinejoin: "round",
              fill: "#FFFFFF",
              x: 4,
              y: 0,
              width: 32,
              height: 8
            }),
            _react2.default.createElement("path", { d: "M20,0 L20,8", id: "Shape", stroke: "#62748C" }),
            _react2.default.createElement("path", { d: "M12,0 L12,8", id: "Shape", stroke: "#62748C" }),
            _react2.default.createElement("path", { d: "M28,0 L28,8", id: "Shape", stroke: "#62748C" })
          )
        )
      )
    )
  );
}