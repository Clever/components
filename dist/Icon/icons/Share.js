"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = Share;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Share(props) {
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
      "share"
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
        { id: "share", strokeWidth: 2, stroke: "#62748C" },
        _react2.default.createElement(
          "g",
          {
            id: "arrows-48px-outline-1_share-91",
            transform: "translate(3.000000, 2.000000)"
          },
          _react2.default.createElement(
            "g",
            { id: "Group" },
            _react2.default.createElement("polyline", { id: "Shape", points: "38 27 38 41 0 41 0 9 6 9" }),
            _react2.default.createElement("path", {
              d: "M28.2584741,1.97616485 C27.0111533,0.884759139 26,1.33902013 26,3.00166547 L26,8 C15.583,8 8,11.833 8,28 C11.75,23.083 15.333,19.917 26,20 L26,24.9983345 C26,26.6561086 27.0130099,27.1136164 28.2584741,26.0238352 L40.4947588,15.317086 C41.3260806,14.5896795 41.3328702,13.4162615 40.4947588,12.682914 L28.2584741,1.97616485 Z",
              id: "Shape",
              fill: "#BCCEFF"
            })
          )
        )
      )
    )
  );
}