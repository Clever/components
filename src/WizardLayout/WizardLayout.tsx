import * as classnames from "classnames";
import * as PropTypes from "prop-types";
import * as React from "react";

import { Button } from "../Button/Button";
import { FlexBox, ItemAlign } from "../flex";

import LifeFloat from "./LifeFloat";
import "./WizardLayout.less";

const SECTION_PROP_TYPE = PropTypes.shape({
  title: PropTypes.string,
  subtitle: PropTypes.string,
  content: PropTypes.node.isRequired,
});

const propTypes = {
  className: PropTypes.string,
  sections: PropTypes.arrayOf(SECTION_PROP_TYPE).isRequired,
  headerImg: PropTypes.element,
  helpContent: PropTypes.node,
  nextStepButtonDisabled: PropTypes.bool,
  nextStepButtonText: PropTypes.string,
  onNextStep: PropTypes.func.isRequired,
  onPrevStep: PropTypes.func.isRequired,
  onSaveAndExit: PropTypes.func,
  prevStepButtonDisabled: PropTypes.bool,
  prevStepButtonText: PropTypes.string,
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
};

/**
 * Layout to provide guidelines on how to implement a Wizard.
 */
export default class WizardLayout extends React.PureComponent {
  static propTypes = propTypes;
  static cssClass = cssClass;

  render() {
    const {
      className,
      sections,
      headerImg,
      helpContent,
      nextStepButtonDisabled,
      nextStepButtonText,
      onSaveAndExit,
      prevStepButtonDisabled,
      prevStepButtonText,
      stepper,
      subtitle,
      title,
    } = this.props;

    return (
      <FlexBox column grow className={classnames(cssClass.CONTAINER, className)}>
        <FlexBox className={cssClass.HEADER}>
          {headerImg && <div className={cssClass.HEADER_IMG}>{headerImg}</div>}
          <div>
            <p className={cssClass.HEADER_TITLE}>{title}</p>
            <p className={cssClass.HEADER_SUBTITLE}>{subtitle}</p>
          </div>
        </FlexBox>
        <FlexBox className={cssClass.BODY}>
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
        <FlexBox className={cssClass.FOOTER}>
          {onSaveAndExit && (
            <Button type="link" value={"Save & exit"} onClick={() => onSaveAndExit()} />
          )}
          {/* spacer for the buttons */}
          <FlexBox grow />
          <Button
            type="link"
            value={prevStepButtonText || "Previous step"}
            className={cssClass.PREVIOUS_BUTTON}
            onClick={this._onPrevStep}
            disabled={prevStepButtonDisabled}
          />
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
