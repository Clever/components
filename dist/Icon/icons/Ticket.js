"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = Ticket;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Ticket(props) {
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
      "ticket"
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
        { id: "ticket", strokeWidth: 2, stroke: "#C9081A" },
        _react2.default.createElement(
          "g",
          {
            id: "media-48px-outline-1_ticket-75",
            transform: "translate(1.000000, 7.000000)"
          },
          _react2.default.createElement(
            "g",
            { id: "Group" },
            _react2.default.createElement("path", {
              d: "M38,16 C38,12.7 40.7,10 44,10 L44,0 L0,0 L0,10 C3.3,10 6,12.7 6,16 C6,19.3 3.3,22 0,22 L0,32 L44,32 L44,22 C40.7,22 38,19.3 38,16 L38,16 Z",
              id: "Shape",
              fill: "#FD8874"
            }),
            _react2.default.createElement("rect", {
              id: "Rectangle-path",
              fill: "#FFFFFF",
              x: 14,
              y: 10,
              width: 16,
              height: 12
            })
          )
        )
      )
    )
  );
}