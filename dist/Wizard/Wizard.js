"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Wizard = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _classnames = require("classnames");

var _classnames2 = _interopRequireDefault(_classnames);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var PropTypes = _interopRequireWildcard(_propTypes);

var _reactSticky = require("react-sticky");

var _lodash = require("lodash");

var _lodash2 = _interopRequireDefault(_lodash);

var _WizardStep = require("./WizardStep");

var _WizardStep2 = _interopRequireDefault(_WizardStep);

var _2 = require("../");

var _utils = require("../utils");

require("./Wizard.less");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// this is a function so that we get a new array each time
var getInitialState = function getInitialState() {
  return {
    currentStep: 0,
    percentComplete: 0,
    stepsVisited: [0]
  };
};

var Wizard = exports.Wizard = function (_React$Component) {
  _inherits(Wizard, _React$Component);

  function Wizard(props) {
    _classCallCheck(this, Wizard);

    var _this = _possibleConstructorReturn(this, (Wizard.__proto__ || Object.getPrototypeOf(Wizard)).call(this, props));

    _this.state = _extends({}, getInitialState(), {
      data: props.initialWizardData || {}
    });

    _this.reset = _this.reset.bind(_this);
    _this.prevStepHandler = _this.prevStepHandler.bind(_this);
    _this.nextStepHandler = _this.nextStepHandler.bind(_this);
    _this.calculatePercentComplete = _this.calculatePercentComplete.bind(_this);

    // Launch the wizard at a specific step (e.g. to resume at furthest step)
    if (_this.props.initialStep) {
      var idx = _this.props.initialStep;
      _extends(_this.state, {
        currentStep: idx,
        stepsVisited: _lodash2.default.range(idx + 1), // include the step itself
        percentComplete: _this.calculatePercentComplete()
      });
    }
    return _this;
  }

  _createClass(Wizard, [{
    key: "reset",
    value: function reset() {
      this.setState(_extends({}, getInitialState(), { data: {} }));
    }
  }, {
    key: "jumpToStep",
    value: function jumpToStep(idx) {
      this.setState({
        currentStep: idx,
        stepsVisited: _lodash2.default.union(this.state.stepsVisited, [idx]),
        percentComplete: this.calculatePercentComplete()
      });
    }
  }, {
    key: "prevStepHandler",
    value: function prevStepHandler() {
      var steps = this.props.steps;


      var prevStep = Math.max(0, this.state.currentStep - 1);
      if (steps[prevStep].shouldSkipStep && steps[prevStep].shouldSkipStep(this.state.data)) {
        prevStep = Math.max(0, prevStep - 1);
      }
      this.jumpToStep(prevStep);
    }
  }, {
    key: "nextStepHandler",
    value: function nextStepHandler() {
      var _this2 = this;

      var steps = this.props.steps;
      var _state = this.state;
      var currentStep = _state.currentStep;
      var data = _state.data;

      // If an onStepComplete handler is provided for the current step, we will only proceed to the
      // next step if the promise returned by the handler resolves to a truthy value.

      if (steps[currentStep].onStepComplete) {
        steps[currentStep].onStepComplete(data).then(function (success) {
          return success && _this2.goToNextStep();
        });
        return;
      }
      this.goToNextStep();
    }
  }, {
    key: "goToNextStep",
    value: function goToNextStep() {
      var _props = this.props;
      var onComplete = _props.onComplete;
      var steps = _props.steps;
      var _state2 = this.state;
      var currentStep = _state2.currentStep;
      var data = _state2.data;


      var nextStep = currentStep + 1;
      while (nextStep < steps.length && steps[nextStep].shouldSkipStep && steps[nextStep].shouldSkipStep(this.state.data)) {
        nextStep++;
      }
      if (nextStep === steps.length) {
        onComplete(data);
        return;
      }
      this.jumpToStep(nextStep);
    }
  }, {
    key: "calculatePercentComplete",
    value: function calculatePercentComplete() {
      var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.state.data;

      var validSteps = this.props.steps.filter(function (step) {
        return step.validate(data);
      });
      return validSteps.length / this.props.steps.length;
    }
  }, {
    key: "_renderSidebar",
    value: function _renderSidebar(style) {
      var _this3 = this;

      var _props2 = this.props;
      var title = _props2.title;
      var description = _props2.description;
      var wizardButtons = _props2.wizardButtons;
      var steps = _props2.steps;
      var seekable = _props2.seekable;
      var hideProgressBar = _props2.hideProgressBar;
      var className = _props2.className;

      var baseClasses = ["Wizard", className];
      return _react2.default.createElement(
        "div",
        { style: style, className: (0, _utils.classNameFor)(baseClasses, "sidebarContent") },
        _react2.default.createElement(
          "h2",
          null,
          title
        ),
        _lodash2.default.isString(description) ? _react2.default.createElement(
          "p",
          { className: (0, _utils.classNameFor)(baseClasses, "description") },
          description
        ) : _react2.default.createElement(
          "div",
          { className: (0, _utils.classNameFor)(baseClasses, "description") },
          description
        ),
        !hideProgressBar && _react2.default.createElement(_2.ProgressBar, { percentage: this.state.percentComplete }),
        _react2.default.createElement(
          "ul",
          { className: (0, _utils.classNameFor)(baseClasses, "stepsDisplay") },
          steps.map(function (step, idx) {
            var stepValid = step.validate(_this3.state.data);
            var stepVisited = _lodash2.default.includes(_this3.state.stepsVisited, idx);
            var stepClassName = (0, _classnames2.default)((0, _utils.classNameFor)(baseClasses, ["stepsDisplay", "step"]), idx === _this3.state.currentStep && (0, _utils.classNameFor)(baseClasses, ["stepsDisplay", "currentStep"]), stepValid && (0, _utils.classNameFor)(baseClasses, ["stepsDisplay", "valid"]), stepVisited && (0, _utils.classNameFor)(baseClasses, ["stepsDisplay", "visited"]), seekable && (0, _utils.classNameFor)(baseClasses, ["stepsDisplay", "stepLink"]));
            var listValue = _react2.default.createElement(
              "span",
              { className: stepClassName },
              _react2.default.createElement("span", {
                className: (0, _utils.classNameFor)(baseClasses, ["stepsDisplay", "icon"])
              }),
              _react2.default.createElement(
                "span",
                {
                  className: (0, _utils.classNameFor)(baseClasses, ["stepsDisplay", "stepTitle"])
                },
                step.title
              )
            );
            return _react2.default.createElement(
              "li",
              { key: idx },
              seekable ? _react2.default.createElement(_2.Button, {
                className: (0, _utils.classNameFor)(baseClasses, ["stepsDisplay", "stepButton"]),
                type: "link",
                onClick: function onClick() {
                  return _this3.jumpToStep(idx);
                },
                value: listValue
              }) : listValue
            );
          })
        ),
        wizardButtons && _react2.default.createElement(
          "div",
          { className: (0, _utils.classNameFor)(baseClasses, "controls") },
          wizardButtons.map(function (btnSpec, idx) {
            return _react2.default.createElement(_2.Button, {
              key: idx,
              onClick: function onClick() {
                return btnSpec.handler(_this3.state.data, { resetWizard: _this3.reset });
              },
              value: btnSpec.buttonValue,
              className: (0, _utils.classNameFor)(baseClasses, ["controls", "control"])
            });
          })
        )
      );
    }
  }, {
    key: "render",
    value: function render() {
      var _this4 = this;

      var _props3 = this.props;
      var className = _props3.className;
      var style = _props3.style;
      var help = _props3.help;
      var steps = _props3.steps;
      var nextButtonValue = _props3.nextButtonValue;
      var prevButtonValue = _props3.prevButtonValue;
      var stickySidebar = _props3.stickySidebar;


      var baseClasses = ["Wizard", className].filter(function (c) {
        return !!c;
      });
      var curStep = steps[this.state.currentStep];
      var validSteps = steps.filter(function (step) {
        return step.validate(_this4.state.data);
      });

      // If on the last step, cannot click next (i.e. complete) unless the whole form is valid; for
      // all other steps, only the current step needs to be valid.
      var nextDisabled = void 0;
      if (curStep.canContinue != null) {
        nextDisabled = !curStep.canContinue(this.state.data);
      } else {
        nextDisabled = this.state.currentStep === steps.length - 1 ? validSteps.length !== steps.length : !curStep.validate(this.state.data);
      }

      return _react2.default.createElement(
        _reactSticky.StickyContainer,
        { className: (0, _classnames2.default)(baseClasses), style: style },
        _react2.default.createElement(
          "div",
          { className: (0, _utils.classNameFor)(baseClasses, "sidebar") },
          !stickySidebar ? this._renderSidebar() : _react2.default.createElement(
            _reactSticky.Sticky,
            { topOffset: 24 },
            function (_ref) {
              var sidebarStyle = _ref.style;
              return _this4._renderSidebar(sidebarStyle);
            }
          )
        ),
        _react2.default.createElement(
          "div",
          { className: (0, _utils.classNameFor)(baseClasses, "step") },
          _react2.default.createElement(_WizardStep2.default, {
            className: className,
            Component: steps[this.state.currentStep].component,
            componentProps: steps[this.state.currentStep].props,
            stepNumber: this.state.currentStep,
            setWizardState: function setWizardState(changes) {
              var newState = _extends(_this4.state.data, changes);
              _this4.setState({ data: newState });
              return newState;
            },
            wizardState: this.state.data,
            updatePercentComplete: function updatePercentComplete(wizardState) {
              return _this4.setState({
                percentComplete: _this4.calculatePercentComplete(wizardState)
              });
            },
            calculatePercentComplete: this.calculatePercentComplete,
            percentComplete: this.state.percentComplete,
            totalSteps: steps.length,
            title: curStep.title,
            description: curStep.description,
            currentStep: this.state.currentStep,
            help: curStep.help ? curStep.help : help,
            validate: curStep.validate
          }),
          _react2.default.createElement(
            "div",
            {
              className: (0, _classnames2.default)((0, _utils.classNameFor)(baseClasses, "contentGroup"), (0, _utils.classNameFor)(baseClasses, "navButtons"))
            },
            this.state.currentStep !== 0 && _react2.default.createElement(_2.Button, {
              className: (0, _utils.classNameFor)(baseClasses, "prevButton"),
              type: "link",
              onClick: this.prevStepHandler,
              value: curStep.prevButtonValue || prevButtonValue || "Back"
            }),
            _react2.default.createElement(_2.Button, {
              className: (0, _utils.classNameFor)(baseClasses, "nextButton"),
              onClick: this.nextStepHandler,
              disabled: nextDisabled, type: "primary",
              value: typeof curStep.nextButtonValue === "function" ? curStep.nextButtonValue(this.state.data) : curStep.nextButtonValue || nextButtonValue || "Next"
            })
          )
        )
      );
    }
  }]);

  return Wizard;
}(_react2.default.Component);

Wizard.propTypes = {
  className: PropTypes.string,
  style: PropTypes.object,
  title: PropTypes.string.isRequired,
  description: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
  help: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  wizardButtons: PropTypes.arrayOf(PropTypes.shape({
    handler: PropTypes.func.isRequired,
    buttonValue: PropTypes.node.isRequired,
    buttonClassName: PropTypes.string
  })),
  initialWizardData: PropTypes.object,
  onComplete: PropTypes.func.isRequired,
  steps: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    component: PropTypes.oneOfType([PropTypes.func, PropTypes.instanceOf(_react2.default.Component)]).isRequired,
    nextButtonValue: PropTypes.oneOfType([PropTypes.string, PropTypes.node, PropTypes.func]),
    validate: PropTypes.func.isRequired,
    canContinue: PropTypes.func,
    help: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    props: PropTypes.object,
    onStepComplete: PropTypes.func
  })).isRequired,
  initialStep: PropTypes.number,
  nextButtonValue: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  prevButtonValue: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  seekable: PropTypes.bool,
  hideProgressBar: PropTypes.bool,
  stickySidebar: PropTypes.bool
};