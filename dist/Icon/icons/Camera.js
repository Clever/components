"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = Camera;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Camera(props) {
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
      "camera"
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
        { id: "camera" },
        _react2.default.createElement(
          "g",
          { id: "Step2", transform: "translate(1.000000, 3.000000)" },
          _react2.default.createElement(
            "g",
            { id: "Group" },
            _react2.default.createElement("path", {
              d: "M0,38.0000796 C0,39.1046051 0.898855112,40 2.00492334,40 L41.9950767,40 C43.1023652,40 44,39.1080589 44,38.0000796 L44,7.9999204 C44,6.89539486 43.1132936,6 42.0018986,6 L37.9981014,6 C36.8945804,6 35.5014849,5.2522274 34.885777,4.32866549 L33.114223,1.67133451 C32.4988546,0.748281946 31.0980496,0 29.9914698,0 L22.0085302,0 C20.8992496,0 19.5014849,0.747772604 18.885777,1.67133451 L17.114223,4.32866549 C16.4988546,5.25171805 15.1054862,6 14.0059397,6 L1.99406028,6 C0.892771196,6 0,6.89194115 0,7.9999204 L0,38.0000796 Z",
              id: "Shape",
              stroke: "#62748C",
              strokeWidth: 2,
              strokeLinecap: "round",
              strokeLinejoin: "round",
              fill: "#FFFFFF"
            }),
            _react2.default.createElement("path", {
              d: "M43,15 L1,15",
              id: "Shape",
              stroke: "#62748C",
              strokeWidth: 2,
              strokeLinecap: "round",
              strokeLinejoin: "round"
            }),
            _react2.default.createElement("path", {
              d: "M43,31 L1,31",
              id: "Shape-Copy",
              stroke: "#62748C",
              strokeWidth: 2,
              strokeLinecap: "round",
              strokeLinejoin: "round"
            }),
            _react2.default.createElement("rect", {
              id: "Rectangle-10",
              fill: "#FD8874",
              x: 1,
              y: 16,
              width: 42,
              height: 14
            }),
            _react2.default.createElement("circle", {
              id: "Oval",
              stroke: "#62748C",
              strokeWidth: 2,
              fill: "#FFFFFF",
              cx: 26,
              cy: 23,
              r: 11
            }),
            _react2.default.createElement("circle", {
              id: "Oval",
              stroke: "#62748C",
              strokeWidth: 2,
              fill: "#FFFFFF",
              cx: 26,
              cy: 23,
              r: 6
            }),
            _react2.default.createElement("path", {
              d: "M4.5,10 L12.5,10",
              id: "Line",
              stroke: "#62748C",
              strokeWidth: 2,
              strokeLinecap: "round"
            }),
            _react2.default.createElement("path", {
              d: "M39.5,6 L10.4827637,6",
              id: "Line",
              stroke: "#62748C",
              strokeWidth: 2,
              strokeLinecap: "square"
            })
          )
        )
      )
    )
  );
}