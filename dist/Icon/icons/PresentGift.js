"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = PresentGift;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function PresentGift(props) {
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
      "gift"
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
        { id: "gift", strokeWidth: 2, stroke: "#62748C" },
        _react2.default.createElement(
          "g",
          {
            id: "shopping-48px-outline_gift",
            transform: "translate(1.000000, 1.000000)"
          },
          _react2.default.createElement(
            "g",
            { id: "Group" },
            _react2.default.createElement("path", {
              d: "M40,16 L40,42.0087557 C40,43.1084896 39.1101074,44 38.0002927,44 L5.99970728,44 C4.89529944,44 4,43.1001025 4,42.0087557 L4,16",
              id: "Shape",
              fill: "#B6C8F9"
            }),
            _react2.default.createElement("rect", {
              id: "Rectangle-path",
              fill: "#B6C8F9",
              x: 0,
              y: 8,
              width: 44,
              height: 8,
              rx: 2
            }),
            _react2.default.createElement("polyline", {
              id: "Shape",
              fill: "#FFFFFF",
              points: "26 8 26 44 18 44 18 8"
            }),
            _react2.default.createElement("path", {
              d: "M10,4 C10,1.791 11.791,0 14,0 C19.917,0 22,8 22,8 L14,8 C11.791,8 10,6.209 10,4 L10,4 Z",
              id: "Shape"
            }),
            _react2.default.createElement("path", {
              d: "M34,4 C34,1.791 32.209,0 30,0 C24.083,0 22,8 22,8 L30,8 C32.209,8 34,6.209 34,4 L34,4 Z",
              id: "Shape"
            })
          )
        )
      )
    )
  );
}