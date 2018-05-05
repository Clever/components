"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var PropTypes = _interopRequireWildcard(_propTypes);

var _lodash = require("lodash");

var _lodash2 = _interopRequireDefault(_lodash);

var _classnames = require("classnames");

var _classnames2 = _interopRequireDefault(_classnames);

var _utils = require("../utils");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// 58.25 rem = width of sidebar + width of left column
var COLLAPSE_BREAKPOINT_WIDTH_REM = 63.25;

var WizardStep = function (_React$Component) {
  _inherits(WizardStep, _React$Component);

  function WizardStep(props) {
    _classCallCheck(this, WizardStep);

    // NOTE: if a webpage explicitly changes the font size on the html element, this may be
    // incorrect, as rem is calculated against the browser-set font-size, not that of the html
    // element.
    // NOTE: this assumes the font size is expressed in px.
    var _this = _possibleConstructorReturn(this, (WizardStep.__proto__ || Object.getPrototypeOf(WizardStep)).call(this, props));

    var fontSize = window.getComputedStyle(document.getElementsByTagName("html")[0])["font-size"];
    _this.state = {
      renderedStepWidth: null,
      collapseBreakpointWidth: COLLAPSE_BREAKPOINT_WIDTH_REM * parseFloat(fontSize)
    };
    _this.updateDimensions = _this.updateDimensions.bind(_this);
    return _this;
  }

  _createClass(WizardStep, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.updateDimensions();
      window.addEventListener("resize", this.updateDimensions);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      window.removeEventListener("resize", this.updateDimensions);
    }
  }, {
    key: "updateDimensions",
    value: function updateDimensions() {
      var renderedStepWidth = this.component.offsetWidth;
      this.setState({
        helpTextCollapsed: this.state.collapseBreakpointWidth > renderedStepWidth
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _props = this.props;
      var title = _props.title;
      var description = _props.description;
      var Component = _props.Component;
      var _setWizardState = _props.setWizardState;
      var currentStep = _props.currentStep;
      var wizardState = _props.wizardState;
      var help = _props.help;
      var percentComplete = _props.percentComplete;
      var calculatePercentComplete = _props.calculatePercentComplete;
      var updatePercentComplete = _props.updatePercentComplete;
      var totalSteps = _props.totalSteps;
      var componentProps = _props.componentProps;
      var className = _props.className;

      var props = _lodash2.default.omit(componentProps || {}, ["wizardState", "setWizardState"]);
      var baseClasses = ["Wizard", className].filter(function (c) {
        return !!c;
      }).map(function (c) {
        return (0, _utils.classNameFor)(c, "WizardStep");
      });
      var contentGroupClass = (0, _utils.classNameFor)(["Wizard", className], "contentGroup");
      return _react2.default.createElement(
        "div",
        { className: (0, _classnames2.default)(baseClasses), ref: function ref(e) {
            _this2.component = e;
          } },
        _react2.default.createElement(
          "div",
          { className: (0, _utils.classNameFor)(baseClasses, "title") },
          _react2.default.createElement(
            "h1",
            null,
            "Step ",
            currentStep + 1,
            ": ",
            title
          )
        ),
        _react2.default.createElement(
          "div",
          { className: (0, _utils.classNameFor)(baseClasses, "topInfo") },
          description && _react2.default.createElement(
            "div",
            {
              className: (0, _classnames2.default)(contentGroupClass, (0, _utils.classNameFor)(baseClasses, "description"))
            },
            _lodash2.default.isString(description) ? _react2.default.createElement(
              "p",
              null,
              description
            ) : description
          ),
          help && _react2.default.createElement(
            "div",
            {
              className: (0, _classnames2.default)(contentGroupClass, (0, _utils.classNameFor)(baseClasses, "help"), this.state.helpTextCollapsed && (0, _utils.classNameFor)(baseClasses, "helpCollapsed"))
            },
            _lodash2.default.isString(help) ? _react2.default.createElement(
              "p",
              null,
              help
            ) : help
          )
        ),
        _react2.default.createElement(
          "div",
          {
            className: (0, _classnames2.default)(contentGroupClass, (0, _utils.classNameFor)(baseClasses, "component"))
          },
          _react2.default.createElement(Component, _extends({}, props, {
            setWizardState: function setWizardState(modifications) {
              var newState = _setWizardState(modifications);

              // this conditional updates the progress bar in 2 scenarios:
              // a) oridnarily, steps update the progress bar once they are navigated away from so
              // that progress only increases when the user actually moves to the next step (see
              // Wizard.jumpToPage()). However, the final page must react to validity immediately to
              // signal completion, so this causes the final page to update the percent complete
              // upon input rather than solely upon navigation.
              // b) pages immediately update the progress bar if they become invalid, so that the
              // incompleteness of the form is reflected in the UI immediately.
              if (currentStep === totalSteps - 1 || calculatePercentComplete(newState) < percentComplete) {
                updatePercentComplete(newState);
              }
            },
            wizardState: wizardState
          }))
        )
      );
    }
  }]);

  return WizardStep;
}(_react2.default.Component);

exports.default = WizardStep;


WizardStep.propTypes = {
  // external facing
  title: PropTypes.string.isRequired,
  description: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  help: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  Component: PropTypes.oneOfType([PropTypes.func, PropTypes.instanceOf(_react2.default.Component)]).isRequired,
  componentProps: PropTypes.object,

  // internal facing
  className: PropTypes.string,
  currentStep: PropTypes.number.isRequired,
  totalSteps: PropTypes.number.isRequired,
  updatePercentComplete: PropTypes.func.isRequired,
  calculatePercentComplete: PropTypes.func.isRequired,
  percentComplete: PropTypes.number.isRequired,
  setWizardState: PropTypes.func.isRequired,
  wizardState: PropTypes.object.isRequired
};