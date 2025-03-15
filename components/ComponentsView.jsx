import React from "react";

import View from "./View";
import ComponentBox from "./ComponentBox";
import { AlertBox2, FlexBox } from "src";

export default function ComponentsView() {
  const { cssClass, componentsToDisplay } = ComponentsView;

  return (
    <View className={cssClass.CONTAINER} title="Component List">
      <AlertBox2 type="caution" isCloseable={false}>
        <div>
          PSA: This is the <b>DEPRECATED</b> Dewey components page. To see the new Dewey 3.0, please
          navigate to{" "}
          <a
            href="https://master--62fbbb0daff0aa52aea739ac.chromatic.com/?path=/story/clever-ui-introduction--page"
            target="_blank"
            rel="noreferrer"
          >
            go/dew3y
          </a>
          , and check out <b>#eng-dew3y</b> in slack for more information.
        </div>
      </AlertBox2>
      <FlexBox wrap className={cssClass.CONTAINER_FLEXBOX}>
        {componentsToDisplay
          .sort((a, b) => a.componentName.localeCompare(b.componentName))
          .map((comp) => (
            <ComponentBox
              key={comp.componentLink}
              componentLink={comp.componentLink}
              componentImg={comp.componentImg}
              componentName={comp.componentName}
              componentImgAlt={comp.componentImgAlt}
            />
          ))}
      </FlexBox>
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
    componentLink: "alert-box-2",
    componentImg: "alert-box-2.png",
    componentName: "AlertBox2",
    componentImgAlt: "An AlertBox2 component",
  },
  {
    componentLink: "announcement-bubble",
    componentImg: "announcement-bubble.png",
    componentName: "AnnouncementBubble",
    componentImgAlt: "An AnnouncementBubble component",
  },
  {
    componentLink: "attachment-preview",
    componentImg: "attachment-preview.png",
    componentName: "AttachmentPreview",
    componentAlt: "A AttachmentPreview component",
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
    componentLink: "dollar-amount",
    componentImg: "dollar-amount-1.png",
    componentName: "DollarAmount",
    componentImgAlt: "A DollarAmount component",
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
    componentLink: "expandable-container",
    componentImg: "expandable-container.png",
    componentName: "ExpandableContainer",
    componentImgAlt: "An ExpandableContainer component",
  },
  {
    componentLink: "family-portal-logo",
    componentImg: "family-portal-logo.png",
    componentName: "FamilyPortalLogo",
    componentImgAlt: "A FamilyPortalLogo component",
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
    componentLink: "messaging-attachment",
    componentImg: "messaging-attachment.png",
    componentName: "MessagingAttachment",
    componentImgAlt: "A MessagingAttachment component",
  },
  {
    componentLink: "messaging-bubble",
    componentImg: "messaging-bubble.png",
    componentName: "MessagingBubble",
    componentImgAlt: "A MessagingBubble component",
  },
  {
    componentLink: "messaging-input",
    componentImg: "messaging-input.png",
    componentName: "MessagingInput",
    componentImgAlt: "A MessagingInput component",
  },
  {
    componentLink: "messaging-thread-history",
    componentImg: "messaging-thread-history.png",
    componentName: "MessagingThreadHistory",
    componentImgAlt: "A MessagingThreadHistory component",
  },
  {
    componentLink: "messaging-thread-list-item",
    componentImg: "messaging-thread-list-item.png",
    componentName: "MessagingThreadListItem",
    componentImgAlt: "A MessagingThreadListItem component",
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
    componentLink: "multi-select",
    componentImg: "multi-select.png",
    componentName: "MultiSelect",
    componentImgAlt: "A MultiSelect component",
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
    componentLink: "resource-tile",
    componentImg: "resource-tile.png",
    componentName: "ResourceTile",
    componentImgAlt: "A ResourceTile component",
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
    componentLink: "select-2",
    componentImg: "select-2.png",
    componentName: "Select2",
    componentImgAlt: "A Select2 component",
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
    componentLink: "text-input-2",
    componentImg: "text-input-2.png",
    componentName: "TextInput2",
    componentImgAlt: "A TextInput2 component",
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
  CONTAINER_FLEXBOX: "ComponentsView--FlexBox",
};
