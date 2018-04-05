"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = ChatHeart;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ChatHeart(props) {
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
      "chat-heart"
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
        { id: "chat-heart", strokeWidth: 2 },
        _react2.default.createElement(
          "g",
          {
            id: "ui-48px-outline-2_chat-round",
            transform: "translate(1.000000, 3.000000)",
            stroke: "#62748C",
            fill: "#FFFFFF"
          },
          _react2.default.createElement(
            "g",
            { id: "Group" },
            _react2.default.createElement("path", {
              d: "M38.8,29.6 C42.1,26.4 44,22.4 44,18 C44,8.1 34.2,0 22,0 C9.8,0 0,8.1 0,18 C0,27.9 9.8,36 22,36 C24.1,36 26.2,35.7 28.2,35.3 L40,40 L38.8,29.6 L38.8,29.6 Z",
              id: "Shape"
            })
          )
        ),
        _react2.default.createElement(
          "g",
          {
            id: "ui-24px-outline-3_heart",
            transform: "translate(12.000000, 12.000000)",
            stroke: "#C9081A",
            fill: "#FD8874"
          },
          _react2.default.createElement(
            "g",
            { id: "Group" },
            _react2.default.createElement("path", {
              d: "M20.243,1.757 C17.9,-0.586 14.101,-0.586 11.758,1.757 C11.469,2.046 11.218,2.357 11.001,2.684 C10.784,2.357 10.532,2.045 10.244,1.757 C7.901,-0.586 4.102,-0.586 1.759,1.757 C-0.584,4.1 -0.584,7.899 1.759,10.242 L11,19.485 L20.243,10.242 C22.586,7.899 22.586,4.1 20.243,1.757 L20.243,1.757 Z",
              id: "Shape"
            })
          )
        )
      )
    )
  );
}