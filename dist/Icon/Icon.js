"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Icon = Icon;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _classnames = require("classnames");

var _classnames2 = _interopRequireDefault(_classnames);

var _lodash = require("lodash");

var _lodash2 = _interopRequireDefault(_lodash);

require("./Icon.less");

var _loadIcons = require("./load-icons");

var _loadIcons2 = _interopRequireDefault(_loadIcons);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var sizeToPx = {
  small: 24,
  medium: 46,
  large: 92
};

function Icon(props) {
  var cssClass = Icon.cssClass;


  var filename = props.name + "_" + sizeToPx[props.size] + "px.png";
  return _react2.default.createElement(
    "span",
    { className: (0, _classnames2.default)(cssClass.CONTAINER, cssClass.size(props.size)) },
    _react2.default.createElement("img", { src: _loadIcons2.default[filename] })
  );
}

Icon.names = {
  BLOCKS: "blocks",
  BOOK: "book",
  BULLSEYE: "bullseye",
  CAMERA: "camera",
  CHART: "chart",
  CHAT: "chat",
  CHAT_HEART: "chat-heart",
  CHECKMARK: "checkmark",
  CIRCLE_C: "circle-c",
  CLOCK: "clock",
  DIPLOMA: "diploma",
  FUNNEL: "funnel",
  GEAR: "gear",
  GLASSES: "glasses",
  GLUE: "glue",
  GRAPH: "graph",
  HAND_CLICK: "hand-click",
  HANDSHAKE: "handshake",
  HEADSET: "headset",
  JUGGLER: "juggler",
  LEADER: "leader",
  LIGHTNING_JAR: "lightning-jar",
  LOCK: "lock",
  MAGNIFY_C: "magnify-c",
  MAGNIFY_USER: "magnify-user",
  MAN: "man",
  MICROPHONE: "microphone",
  MICROSCOPE: "microscope",
  MOBILE_APPS: "mobile-apps",
  NO_ENTRY: "no-entry",
  ORIGAMI: "origami",
  PAPER: "paper",
  PEN: "pen",
  PEN_PAPER: "pen-paper",
  PHONE: "phone",
  PHONE_SYNC: "phone-sync",
  PICKAX: "pickax",
  PLAY_BUTTON: "play-button",
  PORTAL_OPEN: "portal-open",
  PRESENT_GIFT: "present-gift",
  PRESENTATION: "presentation",
  PRINTER: "printer",
  QR: "qr",
  RIBBON_AWARD: "ribbon-award",
  SCHOOL: "school",
  SERVER: "server",
  SHIELD: "shield",
  SMILEY_FACE: "smiley-face",
  SQUARE_C: "square-c",
  SYNC_ARROWS: "sync-arrows",
  TABLET: "tablet",
  TARGET: "target",
  THREE_PEOPLE: "three-people",
  THREE_USERS: "three-users",
  TICKET: "ticket",
  TIE: "tie",
  TROPHY: "trophy",
  TYPEWRITER: "typewriter",
  USER: "user",
  WALLET: "wallet",
  WEBSITE_DASHBOARD: "website-dashboard",
  WEBSITE_HTML: "website-html",
  WOMAN: "woman"
};

Icon.sizes = {
  SMALL: "small",
  MEDIUM: "medium",
  LARGE: "large"
};

Icon.defaultProps = {
  size: "medium"
};

Icon.propTypes = {
  name: _react2.default.PropTypes.oneOf(_lodash2.default.values(Icon.names)).isRequired,
  size: _react2.default.PropTypes.oneOf(_lodash2.default.values(Icon.sizes))
};

Icon.cssClass = {
  CONTAINER: "Icon",
  size: function size(_size) {
    return "Icon--" + _size;
  }
};