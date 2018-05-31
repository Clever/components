"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = Play;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Play(props) {
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
      "play"
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
        { id: "play", strokeWidth: 2 },
        _react2.default.createElement(
          "g",
          {
            id: "media-48px-outline-1_play-68",
            transform: "translate(1.000000, 1.000000)"
          },
          _react2.default.createElement(
            "g",
            { id: "Group" },
            _react2.default.createElement("rect", {
              id: "Rectangle-path",
              stroke: "#62748C",
              fill: "#FFFFFF",
              x: 0,
              y: 0,
              width: 44,
              height: 44,
              rx: 4
            }),
            _react2.default.createElement("path", {
              d: "M16,13.9907951 C16,12.8913093 16.7438523,12.4959016 17.6625744,13.1083829 L29.3374256,20.8916171 C30.2556401,21.5037601 30.2561477,22.4959016 29.3374256,23.1083829 L17.6625744,30.8916171 C16.7443599,31.5037601 16,31.1017876 16,30.0092049 L16,13.9907951 Z",
              id: "Shape",
              stroke: "#4FA97B",
              fill: "#85EBB6"
            })
          )
        )
      )
    )
  );
}