"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = MobileApps;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function MobileApps(props) {
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
      "mobile-apps"
    ),
    _react2.default.createElement(
      "desc",
      null,
      "Created with Sketch."
    ),
    _react2.default.createElement(
      "defs",
      null,
      _react2.default.createElement("rect", { id: "path-1", x: 6, y: 0, width: 33, height: 46, rx: 5 }),
      _react2.default.createElement(
        "mask",
        {
          id: "mask-2",
          maskContentUnits: "userSpaceOnUse",
          maskUnits: "objectBoundingBox",
          x: 0,
          y: 0,
          width: 33,
          height: 46,
          fill: "white"
        },
        _react2.default.createElement("use", { xlinkHref: "#path-1" })
      ),
      _react2.default.createElement("rect", { id: "path-3", x: 6, y: 7, width: 33, height: 31 }),
      _react2.default.createElement(
        "mask",
        {
          id: "mask-4",
          maskContentUnits: "userSpaceOnUse",
          maskUnits: "objectBoundingBox",
          x: 0,
          y: 0,
          width: 33,
          height: 31,
          fill: "white"
        },
        _react2.default.createElement("use", { xlinkHref: "#path-3" })
      )
    ),
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
        { id: "mobile-apps" },
        _react2.default.createElement("use", {
          id: "Rectangle-2",
          stroke: "#62748C",
          mask: "url(#mask-2)",
          strokeWidth: 4,
          fill: "#FFFFFF",
          xlinkHref: "#path-1"
        }),
        _react2.default.createElement("use", {
          id: "Rectangle-2",
          stroke: "#62748C",
          mask: "url(#mask-4)",
          strokeWidth: 4,
          xlinkHref: "#path-3"
        }),
        _react2.default.createElement("circle", { id: "Oval-3", fill: "#62748C", cx: "22.5", cy: 41, r: "1.5" }),
        _react2.default.createElement("rect", {
          id: "Rectangle-4",
          fill: "#FD8874",
          x: 11,
          y: 12,
          width: 5,
          height: 5
        }),
        _react2.default.createElement("rect", {
          id: "Rectangle-4",
          fill: "#7BDDAA",
          x: 20,
          y: 12,
          width: 5,
          height: 5
        }),
        _react2.default.createElement("rect", {
          id: "Rectangle-4",
          fill: "#FEBD54",
          x: 29,
          y: 12,
          width: 5,
          height: 5
        }),
        _react2.default.createElement("rect", {
          id: "Rectangle-4",
          fill: "#9AB5FC",
          x: 11,
          y: 20,
          width: 5,
          height: 5
        }),
        _react2.default.createElement("rect", {
          id: "Rectangle-4",
          fill: "#FC9AE2",
          x: 20,
          y: 20,
          width: 5,
          height: 5
        }),
        _react2.default.createElement("rect", {
          id: "Rectangle-4",
          fill: "#9AB5FC",
          x: 29,
          y: 20,
          width: 5,
          height: 5
        }),
        _react2.default.createElement("rect", {
          id: "Rectangle-4",
          fill: "#7BDDAA",
          x: 11,
          y: 28,
          width: 5,
          height: 5
        }),
        _react2.default.createElement("rect", {
          id: "Rectangle-4",
          fill: "#FEBD54",
          x: 20,
          y: 28,
          width: 5,
          height: 5
        }),
        _react2.default.createElement("rect", {
          id: "Rectangle-4",
          fill: "#FD8874",
          x: 29,
          y: 28,
          width: 5,
          height: 5
        })
      )
    )
  );
}