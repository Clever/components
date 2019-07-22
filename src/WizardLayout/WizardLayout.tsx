import * as classnames from "classnames";
import * as PropTypes from "prop-types";
import * as React from "react";

import { Button } from "../Button/Button";
import { FlexBox, ItemAlign } from "../flex";

import LifeFloat from "./LifeFloat";
import "./WizardLayout.less";

export interface Props {
  className?: string;
  exitButtonText?: string;
  sections: any[];
  fullscreen?: boolean;
  headerImg?: any;
  helpContent?: React.ReactNode;
  hidePreviousStepButton?: boolean;
  hideSaveAndExit?: boolean;
  nextStepButtonDisabled?: boolean;
  nextStepButtonText?: string;
  onNextStep: () => void;
  onPrevStep: () => void;
  onSaveAndExit?: () => void;
  prevStepButtonDisabled?: boolean;
  prevStepButtonText?: string;
  stepper: React.ReactNode;
  subtitle: string;
  title: string;
}

const SECTION_PROP_TYPE = PropTypes.shape({
  title: PropTypes.string,
  subtitle: PropTypes.string,
  content: PropTypes.node.isRequired,
});

const propTypes = {
  className: PropTypes.string,
  exitButtonText: PropTypes.string,
  fullscreen: PropTypes.bool,
  headerImg: PropTypes.element,
  helpContent: PropTypes.node,
  hidePreviousStepButton: PropTypes.bool,
  nextStepButtonDisabled: PropTypes.bool,
  nextStepButtonText: PropTypes.string,
  prevStepButtonDisabled: PropTypes.bool,
  prevStepButtonText: PropTypes.string,
  hideSaveAndExit: PropTypes.bool,
  onNextStep: PropTypes.func.isRequired,
  onPrevStep: PropTypes.func.isRequired,
  onSaveAndExit: PropTypes.func,
  sections: PropTypes.arrayOf(SECTION_PROP_TYPE).isRequired,
  stepper: PropTypes.node.isRequired,
  subtitle: PropTypes.string.isRequired,
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
      exitButtonText,
      sections,
      headerImg,
      helpContent,
      nextStepButtonDisabled,
      nextStepButtonText,
      hidePreviousStepButton,
      hideSaveAndExit,
      onSaveAndExit,
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
            <p className={cssClass.HEADER_SUBTITLE}>{subtitle}</p>
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
                {elem.title && <p className={cssClass.SECTION_TITLE}>{elem.title}</p>}
                {elem.subtitle && <p className={cssClass.SECTION_SUBTITLE}>{elem.subtitle}</p>}
                {(elem.subtitle || elem.title) && <div className={cssClass.SECTION_DIVIDER} />}
                {elem.content}
              </div>
            ))}
          </FlexBox>
        </FlexBox>
        <FlexBox className={classnames(cssClass.FOOTER, fullscreen && cssClass.FOOTER_FULLSCREEN)}>
          {!hideSaveAndExit && onSaveAndExit && (
            <Button
              type="link"
              value={exitButtonText || "Save & exit"}
              onClick={() => onSaveAndExit()}
            />
          )}
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
