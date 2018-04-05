"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = Woman;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Woman(props) {
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
      "business-woman"
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
        { id: "business-woman", strokeWidth: 2 },
        _react2.default.createElement(
          "g",
          {
            id: "business-48px-outline_business-contact-87",
            transform: "translate(1.000000, 17.000000)"
          },
          _react2.default.createElement(
            "g",
            { id: "Group" },
            _react2.default.createElement("path", {
              d: "M10,0 C10,4.4 4.4,8 0,8 C0,14 2.9,14.3 4.4,15.8 L20.0204994,15.8 L20.0204994,6.99997612",
              id: "Shape",
              stroke: "#B3873B",
              fill: "#FEBD54"
            }),
            _react2.default.createElement("path", {
              d: "M34,0 C34,4.4 39.6,8 44,8 C44,14 41.1,14.3 39.6,15.8 L27.9724465,15.8 L27.9724465,5.99996127",
              id: "Shape",
              stroke: "#B3873B",
              fill: "#FEBD54"
            }),
            _react2.default.createElement("path", {
              d: "M15.4,12 L14,12 C6.3,12 0,18.3 0,26 L0,28 L44,28 L44,26 C44,18.3 37.7,12 30,12 L28.6,12",
              id: "Shape",
              stroke: "#62748C",
              fill: "#FFFFFF"
            }),
            _react2.default.createElement("path", { d: "M22,14 L22,28", id: "Shape", stroke: "#62748C" }),
            _react2.default.createElement("polyline", {
              id: "Shape",
              stroke: "#62748C",
              points: "22 14 14 18 14 12"
            }),
            _react2.default.createElement("polyline", {
              id: "Shape",
              stroke: "#62748C",
              points: "22 14 30 18 30 12"
            })
          )
        ),
        _react2.default.createElement("path", {
          d: "M28,10.6 C26.3,14.4 22.4,17 18,17 C15.3,17 12.9,16.1 11,14.5 L11,19 C11,25.6 16.4,31 23,31 C29.6,31 35,25.6 35,19 L35,16.6 C31.9,15.7 29.3,13.5 28,10.6 L28,10.6 Z",
          id: "Stroke-3",
          stroke: "#B8865D",
          fill: "#F8DFB2"
        }),
        _react2.default.createElement("path", {
          d: "M23,1 C16.4,1 11,6.4 11,13 L11,14.5 C12.9,16.1 15.3,17 18,17 C22.4,17 26.3,14.4 28,10.6 C29.3,13.5 31.9,15.7 35,16.6 L35,13 C35,6.4 29.6,1 23,1 L23,1 Z",
          id: "Stroke-1",
          stroke: "#B3873B",
          fill: "#FEBD54"
        })
      )
    )
  );
}