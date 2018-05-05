"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = CircleC;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function CircleC(props) {
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
      "clever-circle"
    ),
    _react2.default.createElement(
      "desc",
      null,
      "Created with Sketch."
    ),
    _react2.default.createElement(
      "defs",
      null,
      _react2.default.createElement("rect", { id: "path-1", x: 0, y: 0, width: 46, height: 46, rx: 23 }),
      _react2.default.createElement(
        "mask",
        {
          id: "mask-2",
          maskContentUnits: "userSpaceOnUse",
          maskUnits: "objectBoundingBox",
          x: 0,
          y: 0,
          width: 46,
          height: 46,
          fill: "white"
        },
        _react2.default.createElement("use", { xlinkHref: "#path-1" })
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
        { id: "clever-circle" },
        _react2.default.createElement(
          "g",
          { id: "clever-brand" },
          _react2.default.createElement("use", {
            id: "Rectangle-3",
            stroke: "#62748C",
            mask: "url(#mask-2)",
            strokeWidth: 4,
            fill: "#FFFFFF",
            xlinkHref: "#path-1"
          }),
          _react2.default.createElement("path", {
            d: "M23.6701416,34.8024822 C16.9738125,34.8024822 12,29.5752028 12,22.966962 L12,22.9012411 C12,16.3587213 16.8759284,11 23.8655036,11 C28.1561581,11 30.724296,12.4466822 32.8375367,14.5505739 L29.6516324,18.2658609 C27.8962169,16.6548763 26.1083088,15.6686514 23.8326048,15.6686514 C19.9968474,15.6686514 17.2337537,18.8902099 17.2337537,22.8355202 L17.2337537,22.9012411 C17.2337537,26.8461406 19.9318621,30.1338308 23.8326048,30.1338308 C26.4332353,30.1338308 28.0261875,29.0818849 29.8140956,27.4380399 L33,30.6928695 C30.6593107,33.2243581 28.0586802,34.8024822 23.6701416,34.8024822 L23.6701416,34.8024822 Z",
            id: "Path",
            fill: "#4274F6"
          })
        )
      )
    )
  );
}