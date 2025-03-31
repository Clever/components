import React from "react";
import { render } from "react-dom";
import { hashHistory, IndexRedirect, Route, Router } from "react-router";

import AlertBox2View from "./components/AlertBox2View";
import ComponentsView from "./components/ComponentsView";
import FamilyPortalLogoView from "./components/FamilyPortalLogoView";
import MultiSelectView from "./components/MultiSelectView";
import ResourceTileView from "./components/ResourceTileView";
import Select2View from "./components/Select2View";
import Table2BetaView from "./components/Table2BetaView";
import TextInput2View from "./components/TextInput2View";

import AlertBoxView from "./components/AlertBoxView";
import BadgeView from "./components/BadgeView";
import ButtonView from "./components/ButtonView";
import CheckboxGroupView from "./components/CheckboxGroupView";
import CheckboxView from "./components/CheckboxView";
import ColorsView from "./components/ColorsView";
import ConfirmationButtonView from "./components/ConfirmationButtonView";
import CopyContainerView from "./components/CopyContainerView";
import CopyableInputView from "./components/CopyableInputView";
import CountView from "./components/CountView";
import DateInputView from "./components/DateInputView";
import DatePickerView from "./components/DatePickerView";
import DollarAmountView from "./components/DollarAmountView";
import DropdownButtonView from "./components/DropdownButtonView";
import EditableInfoPanelView from "./components/EditableInfoPanelView";
import ExpandableContainer from "./components/ExpandableContainerView";
import FileInputView from "./components/FileInputView";
import FlexBoxView from "./components/FlexBoxView";
import FloatingButtonView from "./components/FloatingButtonView";
import FormErrorView from "./components/FormErrorView";
import GettingStartedView from "./components/GettingStartedView";
import GoalsLogoView from "./components/GoalsLogoView";
import GridView from "./components/GridView";
import IconView from "./components/IconView";
import InfoPanelView from "./components/InfoPanelView";
import IntroView from "./components/IntroView";
import LabelView from "./components/LabelView";
import Layout from "./components/Layout";
import LayoutCompoundForm from "./components/LayoutCompoundForm";
import LeftNavView from "./components/LeftNavView";
import LessStyleGuideView from "./components/LessStyleGuideView";
import ListView from "./components/ListView";
import LogoView from "./components/LogoView";
import MenuView from "./components/MenuView";
import ModalButtonView from "./components/ModalButtonView";
import ModalView from "./components/ModalView";
import MultiplePanelModalsView from "./components/MultiplePanelModalsView";
import NumberView from "./components/NumberView";
import PageLayoutView from "./components/PageLayoutView";
import ProgressBarView from "./components/ProgressBarView";
import RadioGroupView from "./components/RadioGroupView";
import RichTextView from "./components/RichTextView";
import SegmentedControlView from "./components/SegmentedControlView";
import SelectView from "./components/SelectView";
import SizingView from "./components/SizingView";
import SpacingView from "./components/SpacingView";
import StepperView from "./components/StepperView";
import SwitchView from "./components/SwitchView";
import TabBarView from "./components/TabBarView";
import TableView from "./components/TableView";
import TextAreaView from "./components/TextAreaView";
import TextInputView from "./components/TextInputView";
import TextTruncateView from "./components/TextTruncateView";
import ToastStackView from "./components/ToastStackView";
import TooltipView from "./components/TooltipView";
import TopBarView from "./components/TopBarView";
import TypographyView from "./components/TypographyView";
import UITextView from "./components/UITextView";
import WithKeyboardNavView from "./components/WithKeyboardNavView";
import WizardLayoutView from "./components/WizardLayoutView";
import WizardView from "./components/WizardView";

render(
  <Router history={hashHistory}>
    <Route path="/fullscreen-wizard-layout" component={() => <WizardLayoutView fullscreen />} />
    <Route path="/" component={Layout}>
      <IndexRedirect to="component-list(/*)" />
      <Route path="component-list(/*)" component={ComponentsView} />
      <Route path="intro(/*)" component={IntroView} />
      <Route path="getting-started(/*)" component={GettingStartedView} />
      <Route path="design">
        <Route path="colors(/*)" component={ColorsView} />
        <Route path="typography(/*)" component={TypographyView} />
        <Route path="sizing(/*)" component={SizingView} />
        <Route path="page-layout(/*)" component={PageLayoutView} />
        <Route path="compound-form(/*)" component={LayoutCompoundForm} />
        <Route path="ui-text(/*)" component={UITextView} />
      </Route>
      <Route
        path="components"
        onChange={(prevState, nextState) => {
          // If the component being rendered has changed, scroll to the top of the view container
          if (prevState.location.pathname !== nextState.location.pathname) {
            // HACK: Ideally we find a better way to target the main content view container,
            // but this is the best approach I could find
            const viewContainerList = document.getElementsByClassName(
              prevState.components[0].cssClass.VIEW_CONTAINER,
            );
            if (viewContainerList && viewContainerList[0]) {
              viewContainerList[0].scrollTo(0, 0);
            }
          }
        }}
      >
        <Route path="alert-box(/*)" component={AlertBoxView} />
        <Route path="alert-box-2(/*)" component={AlertBox2View} />
        <Route path="badge(/*)" component={BadgeView} />
        <Route path="button(/*)" component={ButtonView} />
        <Route path="checkbox(/*)" component={CheckboxView} />
        <Route path="checkbox-group(/*)" component={CheckboxGroupView} />
        <Route path="confirmation-button(/*)" component={ConfirmationButtonView} />
        <Route path="copy-container(/*)" component={CopyContainerView} />
        <Route path="copyable-input(/*)" component={CopyableInputView} />
        <Route path="count(/*)" component={CountView} />
        <Route path="date-input(/*)" component={DateInputView} />
        <Route path="date-picker(/*)" component={DatePickerView} />
        <Route path="dollar-amount(/*)" component={DollarAmountView} />
        <Route path="dropdown-button(/*)" component={DropdownButtonView} />
        <Route path="editable-info-panel(/*)" component={EditableInfoPanelView} />
        <Route path="expandable-container(/*)" component={ExpandableContainer} />
        <Route path="family-portal-logo(/*)" component={FamilyPortalLogoView} />
        <Route path="file-input(/*)" component={FileInputView} />
        <Route path="flex-box(/*)" component={FlexBoxView} />
        <Route path="floating-button(/*)" component={FloatingButtonView} />
        <Route path="form-error(/*)" component={FormErrorView} />
        <Route path="goals-logo(/*)" component={GoalsLogoView} />
        <Route path="grid(/*)" component={GridView} />
        <Route path="icon(/*)" component={IconView} />
        <Route path="info-panel" component={InfoPanelView} />
        <Route path="label(/*)" component={LabelView} />
        <Route path="left-nav(/*)" component={LeftNavView} />
        <Route path="list(/*)" component={ListView} />
        <Route path="logo(/*)" component={LogoView} />
        <Route path="menu(/*)" component={MenuView} />
        <Route path="modal(/*)" component={ModalView} />
        <Route path="modal-button(/*)" component={ModalButtonView} />
        <Route path="multi-select(/*)" component={MultiSelectView} />
        <Route path="multiple-panel-modals(/*)" component={MultiplePanelModalsView} />
        <Route path="number(/*)" component={NumberView} />
        <Route path="progress-bar(/*)" component={ProgressBarView} />
        <Route path="radio-group(/*)" component={RadioGroupView} />
        <Route path="resource-tile(/*)" component={ResourceTileView} />
        <Route path="rich-text(/*)" component={RichTextView} />
        <Route path="segmented-control(/*)" component={SegmentedControlView} />
        <Route path="select(/*)" component={SelectView} />
        <Route path="select-2(/*)" component={Select2View} />
        <Route path="stepper(/*)" component={StepperView} />
        <Route path="switch(/*)" component={SwitchView} />
        <Route path="tab-bar(/*)" component={TabBarView} />
        <Route path="table(/*)" component={TableView} />
        <Route path="table-2-beta(/*)" component={Table2BetaView} />
        <Route path="text-area(/*)" component={TextAreaView} />
        <Route path="text-input(/*)" component={TextInputView} />
        <Route path="text-input-2(/*)" component={TextInput2View} />
        <Route path="text-truncate(/*)" component={TextTruncateView} />
        <Route path="toast-stack(/*)" component={ToastStackView} />
        <Route path="tooltip" component={TooltipView} />
        <Route path="top-bar(/*)" component={TopBarView} />
        <Route path="with-keyboard-nav(/*)" component={WithKeyboardNavView} />
        <Route path="wizard(/*)" component={WizardView} />
        <Route path="wizard-layout(/*)" component={WizardLayoutView} />
      </Route>
      <Route path="LESS">
        <Route path="less-style-guide(/*)" component={LessStyleGuideView} />
        <Route path="spacing(/*)" component={SpacingView} />
      </Route>
    </Route>
  </Router>,
  document.getElementById("__MAIN__"),
);
