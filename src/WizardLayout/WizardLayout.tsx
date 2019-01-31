import classnames from "classnames";
import * as PropTypes from "prop-types";
import * as React from "react";


import {Button} from "../Button/Button";
import {FlexBox, ItemAlign} from "../flex";

import "./WizardLayout.less";

const CONTENT_ELEM_PROP_TYPE = PropTypes.shape({
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
});

const propTypes = {
  className: PropTypes.string,
  contentElements: PropTypes.arrayOf(CONTENT_ELEM_PROP_TYPE).isRequired,
  headerImg: PropTypes.string,
  helpContent: PropTypes.node,
  nextStepButtonText: PropTypes.string,
  onNextStep: PropTypes.func.isRequired,
  onPrevStep: PropTypes.func.isRequired,
  onSaveAndExit: PropTypes.func.isRequired,
  prevStepButtonText: PropTypes.string,
  stepper: PropTypes.node.isRequired,
  subtitle: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

const cssClass = {
  BODY: "WizardLayout--body",
  CONTAINER: "WizardLayout",
  CONTENT_CONTAINER: "WizardLayout--contentContainer",
  CONTENT_ELEM: "WizardLayout--contentElem",
  CONTENT_TITLE: "WizardLayout--contentTitle",
  CONTENT_SUBTITLE: "WizardLayout--contentSubtitle",
  FOOTER: "WizardLayout--footer",
  HEADER: "WizardLayout--header",
  HEADER_IMG: "WizardLayout--headerImg",
  HEADER_TITLE: "WizardLayout--headerTitle",
  HEADER_SUBTITLE: "WizardLayout--headerSubtitle",
  HELP_CONTAINER: "WizardLayout--helpContainer",
  HELP_IMG: "WizardLayout--helpImg",
  PREVIOUS_BUTTON: "WizardLayout--previousButton",
  STEPPER_CONTAINER: "WizardLayout--stepperContainer",
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
      contentElements,
      headerImg,
      helpContent,
      nextStepButtonText,
      onNextStep,
      onPrevStep,
      onSaveAndExit,
      prevStepButtonText,
      stepper,
      subtitle,
      title,
    } = this.props;

    return (
      <FlexBox column grow className={classnames(cssClass.CONTAINER, className)}>
        <FlexBox className={cssClass.HEADER}>
          { headerImg &&
            <FlexBox className={cssClass.HEADER_IMG}>
              <img src={headerImg} />
            </FlexBox>
          }
          <FlexBox column>
            <p className={cssClass.HEADER_TITLE}>{title}</p>
            <p className={cssClass.HEADER_SUBTITLE}>{subtitle}</p>
          </FlexBox>
        </FlexBox>
        <FlexBox className={cssClass.BODY}>
          <FlexBox column className={cssClass.STEPPER_CONTAINER}>
            {stepper}
            <FlexBox grow />
            <FlexBox alignItems={ItemAlign.CENTER} className={cssClass.HELP_CONTAINER}>
              <img className={cssClass.HELP_IMG} src="./assets/img/life-float.svg" />
                { helpContent || (
                  <FlexBox column>
                    Need a hand?
                    <a href={"https://support.clever.com/hc/en-us"}>Contact Customer Support</a>
                  </FlexBox>
                )}
            </FlexBox>
          </FlexBox>
          <FlexBox column grow className={cssClass.CONTENT_CONTAINER}>
            {contentElements.map((elem, i) => (
              <FlexBox className={cssClass.CONTENT_ELEM} column grow key={i}>
                <p className={cssClass.CONTENT_TITLE}>{elem.title}</p>
                <p className={cssClass.CONTENT_SUBTITLE}>{elem.subtitle}</p>
                {elem.children}
              </FlexBox>
            ))}
          </FlexBox>
        </FlexBox>
        <FlexBox className={cssClass.FOOTER}>
          <Button
            type="link"
            value={"Save & exit"}
            onClick={() => onSaveAndExit()}
          />
          {/* spacer for the buttons */}
          <FlexBox grow />
          <Button
            type="link"
            value={prevStepButtonText || "Previous step"}
            className={cssClass.PREVIOUS_BUTTON}
            onClick={() => onPrevStep()}
          />
          <Button
            type="primary"
            value={nextStepButtonText || "Next step"}
            onClick={() => onNextStep()}
          />
        </FlexBox>
      </FlexBox>
    );
  }
}
