"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = PortalOpen;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function PortalOpen(props) {
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
      "shutter"
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
        { id: "shutter", stroke: "#62748C", strokeWidth: 2 },
        _react2.default.createElement(
          "g",
          { id: "Page-1", transform: "translate(1.000000, 1.000000)" },
          _react2.default.createElement("path", {
            d: "M44,22 C44,34.1497391 34.1497391,44 22,44 C9.84930435,44 0,34.1497391 0,22 C0,9.85026087 9.84930435,0 22,0 C34.1497391,0 44,9.85026087 44,22 L44,22 Z",
            id: "Stroke-1",
            fill: "#FFFFFF"
          }),
          _react2.default.createElement("path", {
            d: "M39,22 C39,31.389 31.389,39 22,39 C12.611,39 5,31.389 5,22 C5,12.611 12.611,5 22,5 C31.389,5 39,12.611 39,22 L39,22 Z",
            id: "Stroke-3",
            fill: "#D8D8D8"
          }),
          _react2.default.createElement("path", { d: "M6.5,29 L26,29", id: "Stroke-5" }),
          _react2.default.createElement("path", { d: "M20.3159,38.917 L30.0619,22.036", id: "Stroke-7" }),
          _react2.default.createElement("path", { d: "M35.8076,31.917 L26.0616,15.036", id: "Stroke-9" }),
          _react2.default.createElement("path", { d: "M37,15 L18,15", id: "Stroke-11" }),
          _react2.default.createElement("path", { d: "M23.6851,5.083 L13.9381,21.965", id: "Stroke-13" }),
          _react2.default.createElement("path", { d: "M8.1909,12.082 L17.9389,28.964", id: "Stroke-15" })
        ),
        _react2.default.createElement("polygon", {
          id: "Page-1",
          fill: "#FFFFFF",
          points: "15 22.9284 19 16.0004 27 16.0004 31 22.9284 27 29.8564 19 29.8564"
        })
      )
    )
  );
}