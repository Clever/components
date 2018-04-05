"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Icon = Icon;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var PropTypes = _interopRequireWildcard(_propTypes);

var _classnames = require("classnames");

var _classnames2 = _interopRequireDefault(_classnames);

var _lodash = require("lodash");

var _lodash2 = _interopRequireDefault(_lodash);

require("./Icon.less");

var _icons = require("./icons");

var _icons2 = _interopRequireDefault(_icons);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Icon(props) {
  var cssClass = Icon.cssClass;


  var IconImage = _icons2.default[props.name];
  return _react2.default.createElement(
    "span",
    {
      className: (0, _classnames2.default)(cssClass.CONTAINER, cssClass.size(props.size), props.className)
    },
    _react2.default.createElement(IconImage, null)
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
  MAP: "map",
  MAGIC_LAMP: "magic-lamp",
  MAGNIFY_C: "magnify-c",
  MAGNIFY_USER: "magnify-user",
  MAN: "man",
  MENU: "menu",
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
  PLAY_BUTTON: "play",
  PORTAL_OPEN: "portal-open",
  PRESENT_GIFT: "present-gift",
  PRESENTATION: "presentation",
  PRINTER: "printer",
  QR: "qr",
  RIBBON_AWARD: "ribbon-award",
  SCHOOL: "school",
  SERVER: "server",
  SHIELD: "shield",
  SHOPPING_CART: "shopping-cart",
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
  name: PropTypes.oneOf(_lodash2.default.values(Icon.names)).isRequired,
  size: PropTypes.oneOf(_lodash2.default.values(Icon.sizes)),
  className: PropTypes.string
};

Icon.cssClass = {
  CONTAINER: "Icon",
  size: function size(_size) {
    return "Icon--" + _size;
  }
};