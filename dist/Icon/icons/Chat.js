"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = Chat;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Chat(props) {
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
      "chat"
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
        { id: "chat", strokeWidth: 2, stroke: "#62748C" },
        _react2.default.createElement(
          "g",
          {
            id: "ui-48px-outline-3_chat-33",
            transform: "translate(1.000000, 2.000000)"
          },
          _react2.default.createElement(
            "g",
            { id: "Group" },
            _react2.default.createElement("path", {
              d: "M13.665,31.167 L13.597,31.201 C16.183,35.22 21.652,38 28,38 C29.179,38 30.326,37.898 31.432,37.716 L40,42 L40,33.919 C42.482,31.805 44,29.038 44,26 C44,22.896 42.43,20.09 39.852,17.959",
              id: "Shape",
              fill: "#FFFFFF"
            }),
            _react2.default.createElement("path", {
              d: "M20,0 C8.954,0 0,7.163 0,16 C0,19.594 1.499,22.9 4,25.571 L4,36 L13.665,31.167 C15.658,31.7 17.783,32 20,32 C31.046,32 40,24.837 40,16 C40,7.163 31.046,0 20,0 L20,0 Z",
              id: "Shape",
              fill: "#B6C8F9"
            })
          )
        )
      )
    )
  );
}