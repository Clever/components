import React from "react";
import {render} from "react-dom";
import {IndexRedirect, Route, Router, hashHistory} from "react-router";

import AlertBoxView from "./components/AlertBoxView";
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
import FileInputView from "./components/FileInputView";
import FlexBoxView from "./components/FlexBoxView";
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
import TabBarView from "./components/TabBarView";
import TableView from "./components/TableView";
import TextAreaView from "./components/TextAreaView";
import TextInputView from "./components/TextInputView";
import TextTruncateView from "./components/TextTruncateView";
import TooltipView from "./components/TooltipView";
import TopBarView from "./components/TopBarView";
import TypographyView from "./components/TypographyView";
import UITextView from "./components/UITextView";
import WithKeyboardNavView from "./components/WithKeyboardNavView";
import WizardView from "./components/WizardView";


render((
  <Router history={hashHistory}>
    <Route path="/" component={Layout}>
      <IndexRedirect to="/intro" />
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
      <Route path="components">
        <Route path="alert-box(/*)" component={AlertBoxView} />
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
        <Route path="file-input(/*)" component={FileInputView} />
        <Route path="flex-box(/*)" component={FlexBoxView} />
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
        <Route path="multiple-panel-modals(/*)" component={MultiplePanelModalsView} />
        <Route path="number(/*)" component={NumberView} />
        <Route path="progress-bar(/*)" component={ProgressBarView} />
        <Route path="radio-group(/*)" component={RadioGroupView} />
        <Route path="rich-text(/*)" component={RichTextView} />
        <Route path="segmented-control(/*)" component={SegmentedControlView} />
        <Route path="select(/*)" component={SelectView} />
        <Route path="tab-bar(/*)" component={TabBarView} />
        <Route path="table(/*)" component={TableView} />
        <Route path="text-area(/*)" component={TextAreaView} />
        <Route path="text-input(/*)" component={TextInputView} />
        <Route path="text-truncate(/*)" component={TextTruncateView} />
        <Route path="tooltip" component={TooltipView} />
        <Route path="top-bar(/*)" component={TopBarView} />
        <Route path="with-keyboard-nav(/*)" component={WithKeyboardNavView} />
        <Route path="wizard(/*)" component={WizardView} />
      </Route>
      <Route path="LESS">
        <Route path="less-style-guide(/*)" component={LessStyleGuideView} />
        <Route path="spacing(/*)" component={SpacingView} />
      </Route>
    </Route>
  </Router>
), document.getElementById("__MAIN__"));
