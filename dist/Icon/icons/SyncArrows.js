"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = SyncArrows;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function SyncArrows(props) {
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
      "refresh"
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
        { id: "refresh", strokeWidth: 2, stroke: "#62748C" },
        _react2.default.createElement(
          "g",
          {
            id: "arrows-48px-outline-1_refresh-69",
            transform: "translate(3.000000, 2.000000)"
          },
          _react2.default.createElement(
            "g",
            { id: "Group" },
            _react2.default.createElement("path", {
              d: "M0,21 C0,10 9,1 20,1 C27.8,1 34.6,5.5 37.9,12",
              id: "Shape"
            }),
            _react2.default.createElement("path", {
              d: "M40,21 C40,32 31,41 20,41 C12.2,41 5.4,36.5 2.1,30",
              id: "Shape"
            }),
            _react2.default.createElement("polyline", { id: "Shape", points: "39.6 0.3 38 12.2 26.1 10.6" }),
            _react2.default.createElement("polyline", { id: "Shape", points: "0.4 41.7 2 29.8 13.9 31.4" })
          )
        )
      )
    )
  );
}