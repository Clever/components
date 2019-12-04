import React from "react";

import View from "./View";
import { Grid } from "src";
import ComponentBox from "./ComponentBox";

import "./ComponentsView.less";

export default function ComponentsView() {
  const { cssClass, componentsToDisplay } = ComponentsView;
  const { Col, Row } = Grid;

  return (
    <View className={cssClass.CONTAINER} title="Components Portal">
      <Grid>
        <Row grow className={cssClass.CONTAINER_ROW}>
          {componentsToDisplay.map(comp => (
            <ComponentBox
              componentLink={comp.componentLink}
              componentImg={comp.componentImg}
              componentName={comp.componentName}
              componentImgAlt={comp.componentImgAlt}
            />
          ))}
          {/* <Col span={4} className={cssClass.COMPONENT_CONTAINER}>
            <div>
              <p className={cssClass.COMPONENT_TITLE} ><a href="/#/components/alert-box">AlertBox</a></p>
              <img className={cssClass.COMPONTENT_IMG} src="./assets/img/alert-box-warning.png" alt="" />
            </div>
          </Col>
          <Col span={4} className={cssClass.COMPONENT_CONTAINER}>
            <div>
              <p className={cssClass.COMPONENT_TITLE} ><a href="/#/components/badge">Badge</a></p>
              <img className={cssClass.COMPONTENT_IMG} src="./assets/img/badge-2.png" alt="" />
            </div>
          </Col>
          <Col span={4} className={cssClass.COMPONENT_CONTAINER}>
            <div>
              <p className={cssClass.COMPONENT_TITLE} ><a href="/#/components/button">Button</a></p>
              <img className={cssClass.COMPONTENT_IMG} src="./assets/img/button-1.png" alt="" />
            </div>
          </Col> */}
        </Row>
      </Grid>
    </View>
  );
}

ComponentsView.componentsToDisplay = [
  {
    componentLink: "alert-box",
    componentImg: "alert-box-warning.png",
    componentName: "AlertBox",
    componentImgAlt: "An AlertBox component",
  },
  {
    componentLink: "badge",
    componentImg: "badge-2.png",
    componentName: "Badge",
    componentImgAlt: "A Badge component",
  },
  {
    componentLink: "button",
    componentImg: "button-1.png",
    componentName: "Button",
    componentImgAlt: "A Button component",
  },
  {
    componentLink: "checkbox",
    componentImg: "checkbox.png",
    componentName: "Checkbox",
    componentImgAlt: "A Checkbox component",
  },
  {
    componentLink: "checkbox-group",
    componentImg: "checkbox-group-1.png",
    componentName: "CheckboxGroup",
    componentImgAlt: "A CheckboxGroup component",
  },
  {
    componentLink: "confirmation-button",
    componentImg: "confirmation-button-2.png",
    componentName: "ConfirmationButton",
    componentImgAlt: "A ConfirmationButton component",
  },
  {
    componentLink: "copy-container",
    componentImg: "copy-container.png",
    componentName: "CopyContainer",
    componentImgAlt: "A CopyContainer component",
  },
  {
    componentLink: "copyable-input",
    componentImg: "copyable-input.png",
    componentName: "CopyableInput",
    componentImgAlt: "A CopyableInput component",
  },
  {
    componentLink: "count",
    componentImg: "count.png",
    componentName: "Count",
    componentImgAlt: "A Count component",
  },
  {
    componentLink: "date-input",
    componentImg: "date-input.png",
    componentName: "DateInput",
    componentImgAlt: "A DateInput component",
  },
  {
    componentLink: "date-picker",
    componentImg: "date-picker.png",
    componentName: "DatePicker",
    componentImgAlt: "A DatePicker component",
  },
  {
    componentLink: "dollar-value",
    componentImg: "dollar-value-1.png",
    componentName: "DollarValue",
    componentImgAlt: "A DollarValue component",
  },
  {
    componentLink: "dropdown-button",
    componentImg: "dropdown-button-1.png",
    componentName: "DropdownButton",
    componentImgAlt: "A DropdownButton component",
  },
  {
    componentLink: "editable-info-panel",
    componentImg: "editable-info-panel.png",
    componentName: "EditableInfoPanel",
    componentImgAlt: "An EditableInfoPanel component",
  },
  {
    componentLink: "file-input",
    componentImg: "file-input.png",
    componentName: "FileInput",
    componentImgAlt: "A FileInput component",
  },
  {
    componentLink: "flex-box",
    componentImg: "flex-box-3.png",
    componentName: "FlexBox",
    componentImgAlt: "A FlexBox component",
  },
  {
    componentLink: "floating-button",
    componentImg: "floating-button-1.png",
    componentName: "FloatingButton",
    componentImgAlt: "A FloatingButton component",
  },
  {
    componentLink: "form-error",
    componentImg: "form-error.png",
    componentName: "FormError",
    componentImgAlt: "A FormError component",
  },
  {
    componentLink: "goals-logo",
    componentImg: "goals-logo.png",
    componentName: "GoalsLogo",
    componentImgAlt: "A GoalsLogo component",
  },
  {
    componentLink: "grid",
    componentImg: "grid.png",
    componentName: "Grid",
    componentImgAlt: "A Grid component",
  },
  {
    componentLink: "icon",
    componentImg: "icon-2.png",
    componentName: "Icon",
    componentImgAlt: "An Icon component",
  },
  {
    componentLink: "info-panel",
    componentImg: "info-panel.png",
    componentName: "InfoPanel",
    componentImgAlt: "An InfoPanel component",
  },
  {
    componentLink: "label",
    componentImg: "label.png",
    componentName: "Label",
    componentImgAlt: "A Label component",
  },
  {
    componentLink: "left-nav",
    componentImg: "left-nav.png",
    componentName: "LeftNav",
    componentImgAlt: "A LeftNav component",
  },
  {
    componentLink: "list",
    componentImg: "list.png",
    componentName: "List",
    componentImgAlt: "A List component",
  },
  {
    componentLink: "logo",
    componentImg: "logo-1.png",
    componentName: "Logo",
    componentImgAlt: "A Logo component",
  },
  {
    componentLink: "menu",
    componentImg: "menu.png",
    componentName: "Menu",
    componentImgAlt: "A Menu component",
  },
  {
    componentLink: "modal",
    componentImg: "modal.png",
    componentName: "Modal",
    componentImgAlt: "A Modal component",
  },
  {
    componentLink: "modal-button",
    componentImg: "modal-button-1.png",
    componentName: "ModalButton",
    componentImgAlt: "A ModalButton component",
  },
  {
    componentLink: "multiple-panel-modals",
    componentImg: "multiple-panel-modals-1.png",
    componentName: "MultiplePanelModals",
    componentImgAlt: "A MultiplePanelModals component",
  },
  {
    componentLink: "number",
    componentImg: "number.png",
    componentName: "Number",
    componentImgAlt: "A Number component",
  },
  {
    componentLink: "progress-bar",
    componentImg: "progress-bar.png",
    componentName: "ProgressBar",
    componentImgAlt: "A ProgressBar component",
  },
  {
    componentLink: "radio-group",
    componentImg: "radio-group.png",
    componentName: "RadioGroup",
    componentImgAlt: "A RadioGroup component",
  },
  {
    componentLink: "rich-text",
    componentImg: "rich-text.png",
    componentName: "RichText",
    componentImgAlt: "A RichText component",
  },
  {
    componentLink: "segmented-control",
    componentImg: "segmented-control.png",
    componentName: "SegmentedControl",
    componentImgAlt: "A SegmentedControl component",
  },
  {
    componentLink: "select",
    componentImg: "select.png",
    componentName: "Select",
    componentImgAlt: "A Select component",
  },
  {
    componentLink: "stepper",
    componentImg: "stepper.png",
    componentName: "Stepper",
    componentImgAlt: "A Stepper component",
  },
  {
    componentLink: "switch",
    componentImg: "switch.png",
    componentName: "Switch",
    componentImgAlt: "A Switch component",
  },
  {
    componentLink: "tab-bar",
    componentImg: "tab-bar-2.png",
    componentName: "TabBar",
    componentImgAlt: "A TabBar component",
  },
  {
    componentLink: "table",
    componentImg: "table.png",
    componentName: "Table",
    componentImgAlt: "A Table component",
  },
  {
    componentLink: "text-area",
    componentImg: "text-area.png",
    componentName: "TextArea",
    componentImgAlt: "A TextArea component",
  },
  {
    componentLink: "text-input",
    componentImg: "text-input.png",
    componentName: "TextInput",
    componentImgAlt: "A TextInput component",
  },
  {
    componentLink: "text-truncate",
    componentImg: "text-truncate.png",
    componentName: "TextTruncate",
    componentImgAlt: "A TextTruncate component",
  },
  {
    componentLink: "toast-stack",
    componentImg: "toast-stack-1.png",
    componentName: "ToastStack",
    componentImgAlt: "A ToastStack component",
  },
  {
    componentLink: "tooltip",
    componentImg: "tooltip.png",
    componentName: "Tooltip",
    componentImgAlt: "A Tooltip component",
  },
  {
    componentLink: "top-bar",
    componentImg: "top-bar.png",
    componentName: "TopBar",
    componentImgAlt: "A TopBar component",
  },
  {
    componentLink: "with-keyboard-nav",
    componentImg: "with-keyboard-nav.png",
    componentName: "WithKeyboardNav",
    componentImgAlt: "A WithKeyboardNav component",
  },
  {
    componentLink: "wizard",
    componentImg: "wizard.png",
    componentName: "Wizard",
    componentImgAlt: "A Wizard component",
  },
  {
    componentLink: "wizard-layout",
    componentImg: "wizard-layout.png",
    componentName: "WizardLayout",
    componentImgAlt: "A WizardLayout component",
  },
];

ComponentsView.cssClass = {
  CONTAINER: "ComponentsView",
  CONTAINER_ROW: "ComponentsView--Row",
};
