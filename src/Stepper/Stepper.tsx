import * as classnames from "classnames";
import * as React from "react";
import * as PropTypes from "prop-types";
import {Sticky, StickyContainer} from "react-sticky";

import Step from "./Step";

import "./Stepper.less";

const propTypes = {
  className: PropTypes.string,
  style: PropTypes.object,
  steps: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    success: PropTypes.bool,
    warning: PropTypes.bool,
    optional: PropTypes.bool,
  })).isRequired,
  currentStep: PropTypes.number,
  seekable: PropTypes.bool,
  stickySidebar: PropTypes.bool,
  onStepClick: PropTypes.func,
};

const defaultProps = {
  currentStep: 0,
};

const cssClass = {
  CONTAINER: "Stepper",
  SIDEBAR: "Stepper--sidebar",
  STEPS_DISPLAY: "Stepper--stepsDisplay",
};

export default class Stepper extends React.PureComponent {
  static propTypes = propTypes;
  static defaultProps = defaultProps;
  static cssClass = cssClass;

  _renderSidebar(style) {
    const {currentStep, steps, seekable, onStepClick, className} = this.props;

    return (
      <div style={style}>
        <ul className={cssClass.STEPS_DISPLAY}>
          {steps.map((step, idx) =>
            <li key={idx}>
              <Step
                className={className}
                title={step.title}
                description={step.description}
                index={idx}
                success={step.success}
                current={idx === currentStep}
                warning={step.warning}
                optional={step.optional}
                seekable={seekable}
                onClick={onStepClick}
              />
            </li>
          )}
        </ul>
      </div>
    );
  }

  render() {
    const {className, style, stickySidebar} = this.props;

    return (
      <StickyContainer className={classnames(cssClass.CONTAINER, className)} style={style}>
        <div className={cssClass.SIDEBAR}>
          {!stickySidebar ? this._renderSidebar(style) :
            <Sticky topOffset={24}>
              {({style: sidebarStyle}) => this._renderSidebar(sidebarStyle)}
            </Sticky>}
        </div>
      </StickyContainer>
    );
  }
}
