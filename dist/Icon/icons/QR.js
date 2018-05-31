"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = QR;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function QR(props) {
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
      "qr-code"
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
        { id: "qr-code", strokeWidth: 2, stroke: "#62748C" },
        _react2.default.createElement(
          "g",
          {
            id: "shopping-48px-outline_bardcode-qr",
            transform: "translate(1.000000, 1.000000)"
          },
          _react2.default.createElement(
            "g",
            { id: "Group" },
            _react2.default.createElement("polygon", { id: "Shape", points: "16 16 0 16 0 0 16 0 16 0" }),
            _react2.default.createElement("polyline", { id: "Shape", points: "44 36 44 28 34 28 34 25" }),
            _react2.default.createElement("path", { d: "M44,44 L28,44", id: "Shape" }),
            _react2.default.createElement("polygon", { id: "Shape", points: "10 10 6 10 6 6 10 6" }),
            _react2.default.createElement("polygon", { id: "Shape", points: "44 16 28 16 28 0 44 0 44 0" }),
            _react2.default.createElement("polygon", { id: "Shape", points: "38 10 34 10 34 6 38 6" }),
            _react2.default.createElement("polygon", { id: "Shape", points: "16 44 0 44 0 28 16 28 16 28" }),
            _react2.default.createElement("polygon", { id: "Shape", points: "10 38 6 38 6 34 10 34" }),
            _react2.default.createElement("polygon", { id: "Shape", points: "38 38 34 38 34 34 38 34" }),
            _react2.default.createElement("polyline", { id: "Shape", points: "23 39 23 35 27 35 27 25" }),
            _react2.default.createElement("polyline", { id: "Shape", points: "15 23 15 21 22 21 22 25" }),
            _react2.default.createElement("polyline", { id: "Shape", points: "20 9 23 9 23 4" }),
            _react2.default.createElement("path", { d: "M41,22 L41,28", id: "Shape" }),
            _react2.default.createElement("polyline", { id: "Shape", points: "0 20 0 22 6 22" })
          )
        )
      )
    )
  );
}