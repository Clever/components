"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = MagnifyUser;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function MagnifyUser(props) {
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
      "user-search"
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
        { id: "user-search", strokeWidth: 2, stroke: "#62748C" },
        _react2.default.createElement(
          "g",
          {
            id: "users-48px-outline-2_search",
            transform: "translate(1.000000, 1.000000)"
          },
          _react2.default.createElement(
            "g",
            { id: "Group" },
            _react2.default.createElement("path", { d: "M34.142,34.142 L44,44", id: "Shape" }),
            _react2.default.createElement("circle", { id: "Oval", fill: "#FFFFFF", cx: 20, cy: 20, r: 20 }),
            _react2.default.createElement("path", {
              d: "M29,29 L11,29 L11,26.758 C11,24.983 12.164,23.424 13.866,22.92 C15.46,22.448 17.604,22 20,22 C22.356,22 24.514,22.456 26.125,22.932 C27.83,23.436 29,24.994 29,26.773 L29,29 L29,29 Z",
              id: "Shape",
              fill: "#BCCEFF"
            }),
            _react2.default.createElement("path", {
              d: "M15,13 C15,10.239 17.239,8 20,8 C22.761,8 25,10.239 25,13 C25,15.761 22.761,19 20,19 C17.239,19 15,15.761 15,13 L15,13 Z",
              id: "Shape"
            })
          )
        )
      )
    )
  );
}