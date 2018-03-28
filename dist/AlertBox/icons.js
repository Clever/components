"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CloseIcon = CloseIcon;
exports.WarningIcon = WarningIcon;
exports.SuccessIcon = SuccessIcon;
exports.ErrorIcon = ErrorIcon;
exports.InfoIcon = InfoIcon;

var _classnames = require("classnames");

var _classnames2 = _interopRequireDefault(_classnames);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CLASSNAME = "AlertBox--Icon";

function CloseIcon() {
  return _react2.default.createElement(
    "svg",
    { viewBox: "0 0 1792 1792", xmlns: "http://www.w3.org/2000/svg" },
    _react2.default.createElement("path", { d: "M1490 1322q0 40-28 68l-136 136q-28 28-68 28t-68-28l-294-294-294 294q-28 28-68 28t-68-28l-136-136q-28-28-28-68t28-68l294-294-294-294q-28-28-28-68t28-68l136-136q28-28 68-28t68 28l294 294 294-294q28-28 68-28t68 28l136 136q28 28 28 68t-28 68l-294 294 294 294q28 28 28 68z" })
  );
}

function WarningIcon() {
  return _react2.default.createElement(
    "svg",
    { className: (0, _classnames2.default)(CLASSNAME, CLASSNAME + "--warning"), width: "1792", height: "1792", viewBox: "0 0 1792 1792", xmlns: "http://www.w3.org/2000/svg" },
    _react2.default.createElement("path", { d: "M1024 1375v-190q0-14-9.5-23.5t-22.5-9.5h-192q-13 0-22.5 9.5t-9.5 23.5v190q0 14 9.5 23.5t22.5 9.5h192q13 0 22.5-9.5t9.5-23.5zm-2-374l18-459q0-12-10-19-13-11-24-11h-220q-11 0-24 11-10 7-10 21l17 457q0 10 10 16.5t24 6.5h185q14 0 23.5-6.5t10.5-16.5zm-14-934l768 1408q35 63-2 126-17 29-46.5 46t-63.5 17h-1536q-34 0-63.5-17t-46.5-46q-37-63-2-126l768-1408q17-31 47-49t65-18 65 18 47 49z" }),
    " "
  );
}

function SuccessIcon() {
  return _react2.default.createElement(
    "svg",
    { className: (0, _classnames2.default)(CLASSNAME, CLASSNAME + "--success"), width: "1792", height: "1792", viewBox: "0 0 1792 1792", xmlns: "http://www.w3.org/2000/svg" },
    _react2.default.createElement("path", { d: "M320 1344q0-26-19-45t-45-19q-27 0-45.5 19t-18.5 45q0 27 18.5 45.5t45.5 18.5q26 0 45-18.5t19-45.5zm160-512v640q0 26-19 45t-45 19h-288q-26 0-45-19t-19-45v-640q0-26 19-45t45-19h288q26 0 45 19t19 45zm1184 0q0 86-55 149 15 44 15 76 3 76-43 137 17 56 0 117-15 57-54 94 9 112-49 181-64 76-197 78h-129q-66 0-144-15.5t-121.5-29-120.5-39.5q-123-43-158-44-26-1-45-19.5t-19-44.5v-641q0-25 18-43.5t43-20.5q24-2 76-59t101-121q68-87 101-120 18-18 31-48t17.5-48.5 13.5-60.5q7-39 12.5-61t19.5-52 34-50q19-19 45-19 46 0 82.5 10.5t60 26 40 40.5 24 45 12 50 5 45 .5 39q0 38-9.5 76t-19 60-27.5 56q-3 6-10 18t-11 22-8 24h277q78 0 135 57t57 135z" }),
    " "
  );
}

function ErrorIcon() {
  return _react2.default.createElement(
    "svg",
    { className: (0, _classnames2.default)(CLASSNAME, CLASSNAME + "--error"), width: "1792", height: "1792", viewBox: "0 0 1792 1792", xmlns: "http://www.w3.org/2000/svg" },
    _react2.default.createElement("path", { d: "M1440 893q0-161-87-295l-754 753q137 89 297 89 111 0 211.5-43.5t173.5-116.5 116-174.5 43-212.5zm-999 299l755-754q-135-91-300-91-148 0-273 73t-198 199-73 274q0 162 89 299zm1223-299q0 157-61 300t-163.5 246-245 164-298.5 61-298.5-61-245-164-163.5-246-61-300 61-299.5 163.5-245.5 245-164 298.5-61 298.5 61 245 164 163.5 245.5 61 299.5z" }),
    " "
  );
}

function InfoIcon() {
  return _react2.default.createElement(
    "svg",
    { className: (0, _classnames2.default)(CLASSNAME, CLASSNAME + "--info"), width: "1792", height: "1792", viewBox: "0 0 1792 1792", xmlns: "http://www.w3.org/2000/svg" },
    _react2.default.createElement("path", { d: "M1152 1376v-160q0-14-9-23t-23-9h-96v-512q0-14-9-23t-23-9h-320q-14 0-23 9t-9 23v160q0 14 9 23t23 9h96v320h-96q-14 0-23 9t-9 23v160q0 14 9 23t23 9h448q14 0 23-9t9-23zm-128-896v-160q0-14-9-23t-23-9h-192q-14 0-23 9t-9 23v160q0 14 9 23t23 9h192q14 0 23-9t9-23zm640 416q0 209-103 385.5t-279.5 279.5-385.5 103-385.5-103-279.5-279.5-103-385.5 103-385.5 279.5-279.5 385.5-103 385.5 103 279.5 279.5 103 385.5z" }),
    " "
  );
}