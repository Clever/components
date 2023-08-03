import * as classnames from "classnames";
import * as PropTypes from "prop-types";
import * as React from "react";

import { Button } from "../Button/Button";
import { FlexBox, ItemAlign } from "../flex";

import LifeFloat from "./LifeFloat";
import "./WizardLayout.less";

export interface Props {
  className?: string;
  sections: any[];
  fullscreen?: boolean;
  headerImg?: any;
  helpContent?: React.ReactNode;
  hidePreviousStepButton?: boolean;
  nextStepButtonDisabled?: boolean;
  nextStepButtonText?: React.ReactNode;
  onNextStep: () => void;
  onPrevStep: () => void;
  prevStepButtonDisabled?: boolean;
  prevStepButtonText?: React.ReactNode;
  stepper: React.ReactNode;
  subtitle?: React.ReactNode;
  title: string;
}

const SECTION_PROP_TYPE = PropTypes.shape({
  title: PropTypes.node,
  subtitle: PropTypes.string,
  content: PropTypes.node.isRequired,
});

const propTypes = {
  className: PropTypes.string,
  fullscreen: PropTypes.bool,
  headerImg: PropTypes.element,
  helpContent: PropTypes.node,
  hidePreviousStepButton: PropTypes.bool,
  nextStepButtonDisabled: PropTypes.bool,
  nextStepButtonText: PropTypes.node,
  prevStepButtonDisabled: PropTypes.bool,
  prevStepButtonText: PropTypes.node,
  onNextStep: PropTypes.func.isRequired,
  onPrevStep: PropTypes.func.isRequired,
  sections: PropTypes.arrayOf(SECTION_PROP_TYPE).isRequired,
  stepper: PropTypes.node.isRequired,
  subtitle: PropTypes.node,
  title: PropTypes.string.isRequired,
};

const cssClass = {
  BODY: "WizardLayout--body",
  CONTAINER: "WizardLayout",
  SECTION_CONTAINER: "WizardLayout--sectionContainer",
  SECTION: "WizardLayout--section",
  SECTION_TITLE: "WizardLayout--sectionTitle",
  SECTION_SUBTITLE: "WizardLayout--sectionSubtitle",
  FOOTER: "WizardLayout--footer",
  HEADER: "WizardLayout--header",
  HEADER_IMG: "WizardLayout--headerImg",
  HEADER_TITLE: "WizardLayout--headerTitle",
  HEADER_SUBTITLE: "WizardLayout--headerSubtitle",
  HELP_CONTAINER: "WizardLayout--helpContainer",
  HELP_IMG: "WizardLayout--helpImg",
  LOGO: "WizardLayout--logo",
  PREVIOUS_BUTTON: "WizardLayout--previousButton",
  STEPPER_CONTAINER: "WizardLayout--stepperContainer",
  SECTION_DIVIDER: "WizardLayout--sectionDivider",
  NEXT_BUTTON: "WizardLayout--nextButton",

  CONTAINER_FULLSCREEN: "WizardLayout--fullscreen",
  BODY_FULLSCREEN: "WizardLayout--body--fullscreen",
  FOOTER_FULLSCREEN: "WizardLayout--footer--fullscreen",
};

/**
 * Layout to provide guidelines on how to implement a Wizard.
 */
export default class WizardLayout extends React.PureComponent<Props> {
  static propTypes = propTypes;

  render() {
    const {
      className,
      sections,
      headerImg,
      helpContent,
      nextStepButtonDisabled,
      nextStepButtonText,
      hidePreviousStepButton,
      prevStepButtonDisabled,
      prevStepButtonText,
      stepper,
      subtitle,
      title,
      fullscreen,
    } = this.props;

    return (
      <FlexBox
        column
        grow
        className={classnames(
          cssClass.CONTAINER,
          className,
          fullscreen && cssClass.CONTAINER_FULLSCREEN,
        )}
      >
        <FlexBox className={cssClass.HEADER}>
          {headerImg && <div className={cssClass.HEADER_IMG}>{headerImg}</div>}
          <div>
            <p className={cssClass.HEADER_TITLE}>{title}</p>
            {subtitle &&
              (typeof subtitle === "string" ? (
                <p className={cssClass.HEADER_SUBTITLE}>{subtitle}</p>
              ) : (
                <div className={cssClass.HEADER_SUBTITLE}>{subtitle}</div>
              ))}
          </div>
        </FlexBox>
        <FlexBox className={classnames(cssClass.BODY, fullscreen && cssClass.BODY_FULLSCREEN)}>
          <FlexBox column className={cssClass.STEPPER_CONTAINER}>
            {stepper}
            <FlexBox grow />
            {helpContent && (
              <FlexBox alignItems={ItemAlign.CENTER} className={cssClass.HELP_CONTAINER}>
                <LifeFloat className={cssClass.HELP_IMG} />
                {helpContent}
              </FlexBox>
            )}
          </FlexBox>
          <FlexBox column grow className={cssClass.SECTION_CONTAINER}>
            {sections.map((elem, i) => (
              <div className={cssClass.SECTION} key={i}>
                {elem.title && typeof elem.title === "string" && <p className={cssClass.SECTION_TITLE}>{elem.title}</p>}
                {elem.title && typeof elem.title !== "string" && <div className={cssClass.SECTION_TITLE}>{elem.title}</div>}
                {elem.subtitle && <p className={cssClass.SECTION_SUBTITLE}>{elem.subtitle}</p>}
                {(elem.subtitle || elem.title) && <div className={cssClass.SECTION_DIVIDER} />}
                {elem.content}
              </div>
            ))}
          </FlexBox>
        </FlexBox>
        <FlexBox className={classnames(cssClass.FOOTER, fullscreen && cssClass.FOOTER_FULLSCREEN)}>
          <img src={require("./logo.svg")} alt="" className={cssClass.LOGO} />
          {/* spacer for the buttons */}
          <FlexBox grow />
          {!hidePreviousStepButton && (
            <Button
              type="link"
              value={prevStepButtonText || "Previous step"}
              className={cssClass.PREVIOUS_BUTTON}
              onClick={this._onPrevStep}
              disabled={prevStepButtonDisabled}
            />
          )}
          <Button
            type="primary"
            value={nextStepButtonText || "Next step"}
            className={cssClass.NEXT_BUTTON}
            onClick={this._onNextStep}
            disabled={nextStepButtonDisabled}
          />
        </FlexBox>
      </FlexBox>
    );
  }

  _onPrevStep = () => {
    this.props.onPrevStep();
  };

  _onNextStep = () => {
    this.props.onNextStep();
  };
}
