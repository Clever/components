"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FileInput = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var PropTypes = _interopRequireWildcard(_propTypes);

var _reactDropzone = require("react-dropzone");

var _reactDropzone2 = _interopRequireDefault(_reactDropzone);

var _flex = require("../flex");

var _classnames = require("classnames");

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

require("./FileInput.less");

function DefaultIcon() {
  return _react2.default.createElement(
    "svg",
    { className: "FileInput--Icon", width: "42px", height: "24px", viewBox: "0 0 42 24" },
    _react2.default.createElement(
      "g",
      null,
      _react2.default.createElement(
        "g",
        { transform: "translate(-242.000000, -13.000000)", fill: "#474c5e" },
        _react2.default.createElement("path", { d: "M248.461538,23.1333333 C248.461538,23.1333333 249,16.7333333 255.461538,16.7333333 C258.692308,16.7333333 260.307692,18.3333333 260.307692,18.3333333 C260.307692,18.3333333 263,13 267.846154,13 C272.28333,13 275.884815,15.8553426 275.922774,20.7203129 C280.230769,19.9912817 284,24.1407304 284,28.5959361 C284,33.0511418 280.689148,37 277.269231,37 C273,37 255,37 248.461538,37 C244.153846,36.4622091 242,33.2356824 242,29.6715179 C242,26.8666667 243.615385,23.1333333 248.461538,23.1333333 Z M268.593411,29.0413873 L271.257909,29.0413873 C271.632318,29.0413873 271.728491,28.8236393 271.470635,28.5550334 L267.161561,24.0663241 C266.65173,23.5352402 265.816118,23.5316579 265.302848,24.0663241 L260.993774,28.5550334 C260.729939,28.8298671 260.831158,29.0413873 261.2065,29.0413873 L263.894912,29.0413873 L263.894912,37 L268.593411,37 L268.593411,29.0413873 Z" })
      )
    )
  );
}

function ErrorIcon() {
  return _react2.default.createElement(
    "svg",
    { className: "FileInput--Icon", width: "42px", height: "24px", viewBox: "0 0 42 24" },
    _react2.default.createElement(
      "g",
      { fill: "#de004b" },
      _react2.default.createElement("path", { d: "M33.9,7.7c0-4.9-3.6-7.7-8.1-7.7c-4.8,0-7.5,5.3-7.5,5.3s-1.6-1.6-4.8-1.6c-6.5,0-7,6.4-7,6.4c-4.8,0-6.5,3.7-6.5,6.5c0,3.6,2.2,6.8,6.5,7.3c6.5,0,24.5,0,28.8,0c3.4,0,6.7-3.9,6.7-8.4S38.2,7,33.9,7.7z M26.9,19.7h-9.3c-0.6,0-1-0.5-1-1c0-0.1,0-0.3,0.1-0.4h0l4.6-9.3h0c0.2-0.3,0.5-0.6,0.9-0.6c0.4,0,0.8,0.2,0.9,0.6h0l4.7,9.3c0.1,0.1,0.1,0.3,0.1,0.4C27.9,19.2,27.5,19.7,26.9,19.7z" }),
      _react2.default.createElement("circle", { cx: "22.2", cy: "17.6", r: "1" }),
      _react2.default.createElement("rect", { x: "21.4", y: "11.2", width: "1.7", height: "4.4" })
    )
  );
}

function SuccessIcon() {
  return _react2.default.createElement(
    "svg",
    { className: "FileInput--Icon", width: "42px", height: "24px", viewBox: "0 0 42 24" },
    _react2.default.createElement(
      "g",
      { fill: "#009e78", transform: "translate(-242.000000, -13.000000)" },
      _react2.default.createElement("path", { d: "M248.461538,23.1333333 C248.461538,23.1333333 249,16.7333333 255.461538,16.7333333 C258.692308,16.7333333 260.307692,18.3333333 260.307692,18.3333333 C260.307692,18.3333333 263,13 267.846154,13 C272.28333,13 275.884815,15.8553426 275.922774,20.7203129 C280.230769,19.9912817 284,24.1407304 284,28.5959361 C284,33.0511418 280.689148,37 277.269231,37 C273,37 255,37 248.461538,37 C244.153846,36.4622091 242,33.2356824 242,29.6715179 C242,26.8666667 243.615385,23.1333333 248.461538,23.1333333 Z M271.907449,23.5740441 C272.037079,23.4444141 272.037079,23.2221913 271.907449,23.0925614 L269.57411,20.7592219 C269.44448,20.6295919 269.222257,20.6295919 269.092627,20.7592219 L262.000016,27.8703517 L258.907415,24.7592324 C258.777785,24.6296024 258.555562,24.6296024 258.425932,24.7592324 L256.092593,27.0925719 C255.962963,27.2222018 255.962963,27.4444246 256.092593,27.5740546 L261.759274,33.2407361 C261.833349,33.2962918 261.907423,33.333329 262.000016,33.333329 C262.092609,33.333329 262.166683,33.2962918 262.240757,33.2407361 L271.907449,23.5740441 Z" })
    )
  );
}

function UploadingIcon(props) {
  return _react2.default.createElement(
    "svg",
    { className: "FileInput--Icon", width: "42px", height: "24px", viewBox: "0 0 42 24" },
    _react2.default.createElement(
      "linearGradient",
      { id: "bg", x1: "0.5", y1: "1", x2: "0.5", y2: "0" },
      _react2.default.createElement("stop", { offset: "0%", stopOpacity: "1", stopColor: "#2e00d9" }),
      _react2.default.createElement("stop", { offset: props.percent + "%", stopOpacity: "1", stopColor: "#2e00d9" }),
      _react2.default.createElement("stop", { offset: props.percent + "%", stopOpacity: "1", stopColor: "#d6d7de" }),
      _react2.default.createElement("stop", { offset: "100%", stopOpacity: "1", stopColor: "#d6d7de" })
    ),
    _react2.default.createElement(
      "g",
      null,
      _react2.default.createElement(
        "g",
        { transform: "translate(-242.000000, -13.000000)", fill: "url(#bg)" },
        _react2.default.createElement("path", { d: "M248.461538,23.1333333 C243.615385,23.1333333 242,26.8666667 242,29.6715179 C242,33.2356824 244.153846,36.4622091 248.461538,37 C255,37 273,37 277.269231,37 C280.689148,37 284,33.0511418 284,28.5959361 C284,24.1407304 280.230769,19.9912817 275.922774,20.7203129 C275.884815,15.8553426 272.28333,13 267.846154,13 C263,13 260.307692,18.3333333 260.307692,18.3333333 C260.307692,18.3333333 258.692308,16.7333333 255.461538,16.7333333 C249,16.7333333 248.461538,23.1333333 248.461538,23.1333333 Z" })
      )
    )
  );
}

UploadingIcon.propTypes = {
  percent: PropTypes.number.isRequired
};

var FileInput = exports.FileInput = function (_React$Component) {
  _inherits(FileInput, _React$Component);

  function FileInput(props) {
    _classCallCheck(this, FileInput);

    var _this = _possibleConstructorReturn(this, (FileInput.__proto__ || Object.getPrototypeOf(FileInput)).call(this, props));

    _this.state = {
      filename: null,
      error: null,
      progress: null,
      success: null
    };
    _this.onDropRejected = _this.onDropRejected.bind(_this);
    _this.onDropAccepted = _this.onDropAccepted.bind(_this);
    return _this;
  }

  _createClass(FileInput, [{
    key: "onDropAccepted",
    value: function onDropAccepted(files) {
      var _this2 = this;

      var fileKey = Math.random();
      this.setState({ fileKey: fileKey });
      this.setState({ filename: files[0].name, error: null, progress: 0, success: null });
      this.props.store(files[0], {
        success: function success() {
          if (_this2.state.fileKey !== fileKey) {
            return; // If the user drops multiple files we want to only treat the last one as "success"
          }
          _this2.setState({ success: true });
        },
        error: function error() {
          var errMsg = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "Unknown error";

          _this2.setState({ error: errMsg });
        },
        progress: function progress(_progress) {
          if (_this2.state.fileKey !== fileKey) {
            return; // If the user drops multiple files we want to only take progress from the active upload
          }
          _this2.setState({ progress: _progress });
        }
      });
    }
  }, {
    key: "onDropRejected",
    value: function onDropRejected() {
      this.setState({ filename: null, error: "Invalid " + this.props.label, success: null });
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      return _react2.default.createElement(
        _reactDropzone2.default,
        {
          accept: this.props.accept,
          style: {},
          multiple: false,
          onDropAccepted: this.onDropAccepted,
          onDropRejected: this.onDropRejected
        },
        function (_ref) {
          var isDragActive = _ref.isDragActive;
          var isDragReject = _ref.isDragReject;

          var message = "Upload " + _this3.props.label;
          var icon = _react2.default.createElement(DefaultIcon, null);
          var selected = false;
          if (isDragActive) {
            selected = true;
            message = "";
          } else if (isDragReject || _this3.state.error) {
            selected = true;
            message = _this3.state.error || "Invalid " + _this3.props.label;
            icon = _react2.default.createElement(ErrorIcon, null);
          } else if (_this3.state.success) {
            selected = true;
            message = _this3.state.filename;
            icon = _react2.default.createElement(SuccessIcon, null);
          } else if (_this3.state.filename) {
            icon = _react2.default.createElement(UploadingIcon, { percent: _this3.state.progress });
            message = _this3.state.filename;
            selected = true;
          }
          return _react2.default.createElement(
            _flex.FlexBox,
            { className: (0, _classnames2.default)("FileInput", _this3.props.className), grow: true },
            selected && _react2.default.createElement(
              "label",
              { className: "FileInput--Label" },
              _this3.props.label
            ),
            _react2.default.createElement(
              _flex.FlexItem,
              { className: "FileInput--Text " + (selected ? "FileInput--Text--selected" : ""), grow: true },
              message
            ),
            icon
          );
        }
      );
    }
  }]);

  return FileInput;
}(_react2.default.Component);

FileInput.propTypes = {
  className: PropTypes.string,
  label: PropTypes.string.isRequired,
  store: PropTypes.func.isRequired,
  accept: PropTypes.string
};