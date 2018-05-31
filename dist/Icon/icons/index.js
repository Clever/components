"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Blocks = require("./Blocks");

var _Blocks2 = _interopRequireDefault(_Blocks);

var _Book = require("./Book");

var _Book2 = _interopRequireDefault(_Book);

var _Bullseye = require("./Bullseye");

var _Bullseye2 = _interopRequireDefault(_Bullseye);

var _Camera = require("./Camera");

var _Camera2 = _interopRequireDefault(_Camera);

var _Chart = require("./Chart");

var _Chart2 = _interopRequireDefault(_Chart);

var _ChatHeart = require("./ChatHeart");

var _ChatHeart2 = _interopRequireDefault(_ChatHeart);

var _Chat = require("./Chat");

var _Chat2 = _interopRequireDefault(_Chat);

var _Checkmark = require("./Checkmark");

var _Checkmark2 = _interopRequireDefault(_Checkmark);

var _CircleC = require("./CircleC");

var _CircleC2 = _interopRequireDefault(_CircleC);

var _Clock = require("./Clock");

var _Clock2 = _interopRequireDefault(_Clock);

var _Diploma = require("./Diploma");

var _Diploma2 = _interopRequireDefault(_Diploma);

var _Funnel = require("./Funnel");

var _Funnel2 = _interopRequireDefault(_Funnel);

var _Gear = require("./Gear");

var _Gear2 = _interopRequireDefault(_Gear);

var _Glasses = require("./Glasses");

var _Glasses2 = _interopRequireDefault(_Glasses);

var _Glue = require("./Glue");

var _Glue2 = _interopRequireDefault(_Glue);

var _Graph = require("./Graph");

var _Graph2 = _interopRequireDefault(_Graph);

var _HandClick = require("./HandClick");

var _HandClick2 = _interopRequireDefault(_HandClick);

var _Handshake = require("./Handshake");

var _Handshake2 = _interopRequireDefault(_Handshake);

var _Headset = require("./Headset");

var _Headset2 = _interopRequireDefault(_Headset);

var _Juggler = require("./Juggler");

var _Juggler2 = _interopRequireDefault(_Juggler);

var _Leader = require("./Leader");

var _Leader2 = _interopRequireDefault(_Leader);

var _LightningJar = require("./LightningJar");

var _LightningJar2 = _interopRequireDefault(_LightningJar);

var _Lock = require("./Lock");

var _Lock2 = _interopRequireDefault(_Lock);

var _MagicLamp = require("./MagicLamp");

var _MagicLamp2 = _interopRequireDefault(_MagicLamp);

var _MagnifyC = require("./MagnifyC");

var _MagnifyC2 = _interopRequireDefault(_MagnifyC);

var _MagnifyUser = require("./MagnifyUser");

var _MagnifyUser2 = _interopRequireDefault(_MagnifyUser);

var _Man = require("./Man");

var _Man2 = _interopRequireDefault(_Man);

var _Map = require("./Map");

var _Map2 = _interopRequireDefault(_Map);

var _Menu = require("./Menu");

var _Menu2 = _interopRequireDefault(_Menu);

var _Microphone = require("./Microphone");

var _Microphone2 = _interopRequireDefault(_Microphone);

var _Microscope = require("./Microscope");

var _Microscope2 = _interopRequireDefault(_Microscope);

var _MobileApps = require("./MobileApps");

var _MobileApps2 = _interopRequireDefault(_MobileApps);

var _NoEntry = require("./NoEntry");

var _NoEntry2 = _interopRequireDefault(_NoEntry);

var _Origami = require("./Origami");

var _Origami2 = _interopRequireDefault(_Origami);

var _Paper = require("./Paper");

var _Paper2 = _interopRequireDefault(_Paper);

var _PenPaper = require("./PenPaper");

var _PenPaper2 = _interopRequireDefault(_PenPaper);

var _Pen = require("./Pen");

var _Pen2 = _interopRequireDefault(_Pen);

var _PhoneSync = require("./PhoneSync");

var _PhoneSync2 = _interopRequireDefault(_PhoneSync);

var _Phone = require("./Phone");

var _Phone2 = _interopRequireDefault(_Phone);

var _Pickax = require("./Pickax");

var _Pickax2 = _interopRequireDefault(_Pickax);

var _Play = require("./Play");

var _Play2 = _interopRequireDefault(_Play);

var _PortalOpen = require("./PortalOpen");

var _PortalOpen2 = _interopRequireDefault(_PortalOpen);

var _PresentGift = require("./PresentGift");

var _PresentGift2 = _interopRequireDefault(_PresentGift);

var _Presentation = require("./Presentation");

var _Presentation2 = _interopRequireDefault(_Presentation);

var _Printer = require("./Printer");

var _Printer2 = _interopRequireDefault(_Printer);

var _QR = require("./QR");

var _QR2 = _interopRequireDefault(_QR);

var _RibbonAward = require("./RibbonAward");

var _RibbonAward2 = _interopRequireDefault(_RibbonAward);

var _School = require("./School");

var _School2 = _interopRequireDefault(_School);

var _Server = require("./Server");

var _Server2 = _interopRequireDefault(_Server);

var _Shield = require("./Shield");

var _Shield2 = _interopRequireDefault(_Shield);

var _ShoppingCart = require("./ShoppingCart");

var _ShoppingCart2 = _interopRequireDefault(_ShoppingCart);

var _SmileyFace = require("./SmileyFace");

var _SmileyFace2 = _interopRequireDefault(_SmileyFace);

var _SquareC = require("./SquareC");

var _SquareC2 = _interopRequireDefault(_SquareC);

var _SyncArrows = require("./SyncArrows");

var _SyncArrows2 = _interopRequireDefault(_SyncArrows);

var _Tablet = require("./Tablet");

var _Tablet2 = _interopRequireDefault(_Tablet);

var _Target = require("./Target");

var _Target2 = _interopRequireDefault(_Target);

var _ThreePeople = require("./ThreePeople");

var _ThreePeople2 = _interopRequireDefault(_ThreePeople);

var _ThreeUsers = require("./ThreeUsers");

var _ThreeUsers2 = _interopRequireDefault(_ThreeUsers);

var _Ticket = require("./Ticket");

var _Ticket2 = _interopRequireDefault(_Ticket);

var _Tie = require("./Tie");

var _Tie2 = _interopRequireDefault(_Tie);

var _Trophy = require("./Trophy");

var _Trophy2 = _interopRequireDefault(_Trophy);

var _Typewriter = require("./Typewriter");

var _Typewriter2 = _interopRequireDefault(_Typewriter);

var _User = require("./User");

var _User2 = _interopRequireDefault(_User);

var _Wallet = require("./Wallet");

var _Wallet2 = _interopRequireDefault(_Wallet);

var _WebsiteDashboard = require("./WebsiteDashboard");

var _WebsiteDashboard2 = _interopRequireDefault(_WebsiteDashboard);

var _WebsiteHTML = require("./WebsiteHTML");

var _WebsiteHTML2 = _interopRequireDefault(_WebsiteHTML);

var _Woman = require("./Woman");

var _Woman2 = _interopRequireDefault(_Woman);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  blocks: _Blocks2.default,
  book: _Book2.default,
  bullseye: _Bullseye2.default,
  camera: _Camera2.default,
  chart: _Chart2.default,
  "chat-heart": _ChatHeart2.default,
  chat: _Chat2.default,
  checkmark: _Checkmark2.default,
  "circle-c": _CircleC2.default,
  clock: _Clock2.default,
  diploma: _Diploma2.default,
  funnel: _Funnel2.default,
  gear: _Gear2.default,
  glasses: _Glasses2.default,
  glue: _Glue2.default,
  graph: _Graph2.default,
  "hand-click": _HandClick2.default,
  handshake: _Handshake2.default,
  headset: _Headset2.default,
  juggler: _Juggler2.default,
  leader: _Leader2.default,
  "lightning-jar": _LightningJar2.default,
  lock: _Lock2.default,
  "magic-lamp": _MagicLamp2.default,
  "magnify-c": _MagnifyC2.default,
  "magnify-user": _MagnifyUser2.default,
  man: _Man2.default,
  map: _Map2.default,
  menu: _Menu2.default,
  microphone: _Microphone2.default,
  microscope: _Microscope2.default,
  "mobile-apps": _MobileApps2.default,
  "no-entry": _NoEntry2.default,
  origami: _Origami2.default,
  paper: _Paper2.default,
  "pen-paper": _PenPaper2.default,
  pen: _Pen2.default,
  "phone-sync": _PhoneSync2.default,
  phone: _Phone2.default,
  pickax: _Pickax2.default,
  play: _Play2.default,
  "portal-open": _PortalOpen2.default,
  "present-gift": _PresentGift2.default,
  presentation: _Presentation2.default,
  printer: _Printer2.default,
  qr: _QR2.default,
  "ribbon-award": _RibbonAward2.default,
  school: _School2.default,
  server: _Server2.default,
  shield: _Shield2.default,
  "shopping-cart": _ShoppingCart2.default,
  "smiley-face": _SmileyFace2.default,
  "square-c": _SquareC2.default,
  "sync-arrows": _SyncArrows2.default,
  tablet: _Tablet2.default,
  target: _Target2.default,
  "three-people": _ThreePeople2.default,
  "three-users": _ThreeUsers2.default,
  ticket: _Ticket2.default,
  tie: _Tie2.default,
  trophy: _Trophy2.default,
  typewriter: _Typewriter2.default,
  user: _User2.default,
  wallet: _Wallet2.default,
  "website-dashboard": _WebsiteDashboard2.default,
  "website-html": _WebsiteHTML2.default,
  woman: _Woman2.default
};