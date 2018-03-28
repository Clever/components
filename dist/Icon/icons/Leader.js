"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = Leader;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Leader(props) {
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
      "leader"
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
        { id: "leader", strokeWidth: 2, stroke: "#62748C" },
        _react2.default.createElement(
          "g",
          {
            id: "users-48px-outline_single-position",
            transform: "translate(3.000000, 1.000000)"
          },
          _react2.default.createElement(
            "g",
            { id: "Group" },
            _react2.default.createElement("path", {
              d: "M31,32.988 C36.422,34.061 40,35.905 40,38 C40,41.314 31.046,44 20,44 C8.954,44 0,41.314 0,38 C0,35.913 3.552,34.075 8.941,33",
              id: "Shape"
            }),
            _react2.default.createElement("path", {
              d: "M24,38 L16,38 L15,28 L11,27 L11,19 C11,16.791 12.791,15 15,15 L25,15 C27.209,15 29,16.791 29,19 L29,27 L25,28 L24,38 L24,38 Z",
              id: "Shape",
              fill: "#B6C8F9"
            }),
            _react2.default.createElement("path", {
              d: "M20,10 L20,10 C17.239,10 15,7.761 15,5 L15,5 C15,2.239 17.239,0 20,0 L20,0 C22.761,0 25,2.239 25,5 L25,5 C25,7.761 22.761,10 20,10 L20,10 Z",
              id: "Shape",
              fill: "#FFFFFF"
            })
          )
        )
      )
    )
  );
}