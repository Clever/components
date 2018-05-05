"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = Checkmark;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Checkmark(props) {
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
      "checkmark"
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
        { id: "checkmark", stroke: "#4FA97B", strokeWidth: 2, fill: "#85EBB6" },
        _react2.default.createElement(
          "g",
          {
            id: "ui-48px-outline-1_check-simple",
            transform: "translate(3.000000, 7.000000)"
          },
          _react2.default.createElement(
            "g",
            { id: "Group" },
            _react2.default.createElement("path", {
              d: "M15.416337,30.583663 C14.6341157,31.3658843 13.3620698,31.3620698 12.580561,30.580561 L1.41943899,19.419439 C0.635504482,18.6355045 0.630764812,17.3692352 1.4143185,16.5856815 L4.5856815,13.4143185 C5.36678804,12.633212 6.62774658,12.6277466 7.41182411,13.4118241 L14,20 L32.5856704,1.41432961 C33.3667831,0.633216935 34.6307648,0.630764812 35.4143185,1.4143185 L38.5856815,4.5856815 C39.366788,5.36678804 39.3701826,6.62981742 38.583663,7.41633702 L15.416337,30.583663 Z",
              id: "Shape"
            })
          )
        )
      )
    )
  );
}