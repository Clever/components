"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = MagnifyC;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function MagnifyC(props) {
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
      "clever-search"
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
        { id: "clever-search" },
        _react2.default.createElement(
          "g",
          {
            id: "users-48px-outline-2_search",
            transform: "translate(1.000000, 1.000000)"
          },
          _react2.default.createElement(
            "g",
            { id: "Group" },
            _react2.default.createElement("path", {
              d: "M34.142,34.142 L44,44",
              id: "Shape",
              stroke: "#62748C",
              strokeWidth: 2,
              strokeLinecap: "round",
              strokeLinejoin: "round"
            }),
            _react2.default.createElement("circle", {
              id: "Oval",
              stroke: "#62748C",
              strokeWidth: 2,
              strokeLinecap: "round",
              strokeLinejoin: "round",
              fill: "#FFFFFF",
              cx: 20,
              cy: 20,
              r: 20
            }),
            _react2.default.createElement("path", {
              d: "M20.8362626,30.062093 C15.1922135,30.062093 11,25.656243 11,20.0864399 L11,20.0310465 C11,14.5166367 15.1097112,10 21.0009249,10 C24.6173339,10 26.7819073,11.2193465 28.5630674,12.9926267 L25.8778051,16.124083 C24.3982406,14.7662531 22.8912894,13.9350064 20.9731959,13.9350064 C17.7402003,13.9350064 15.4113069,16.65032 15.4113069,19.9756531 L15.4113069,20.0310465 C15.4113069,23.3560334 17.6854269,26.1270866 20.9731959,26.1270866 C23.165156,26.1270866 24.5077872,25.2404465 26.0147384,23.8549199 L28.7000008,26.5982765 C26.727134,28.7319598 24.5351739,30.062093 20.8362626,30.062093 L20.8362626,30.062093 Z",
              id: "Path",
              fill: "#4274F6"
            })
          )
        )
      )
    )
  );
}