import React from "react";
import {render} from "react-dom";
import {IndexRedirect, Route, Router, hashHistory} from "react-router";

import ButtonView from "./components/ButtonView";
import ColorsView from "./components/ColorsView";
import ConfirmationButtonView from "./components/ConfirmationButtonView";
import CopyableInputView from "./components/CopyableInputView";
import FlexBoxView from "./components/FlexBoxView";
import FileInputView from "./components/FileInputView";
import GettingStartedView from "./components/GettingStartedView";
import GridView from "./components/GridView";
import IconView from "./components/IconView";
import IntroView from "./components/IntroView";
import LabelView from "./components/LabelView";
import Layout from "./components/Layout";
import LayoutCompoundForm from "./components/LayoutCompoundForm";
import LeftNavView from "./components/LeftNavView";
import LessStyleGuideView from "./components/LessStyleGuideView";
import ModalButtonView from "./components/ModalButtonView";
import ModalView from "./components/ModalView";
import PageLayoutView from "./components/PageLayoutView";
import ProgressBarView from "./components/ProgressBarView";
import SegmentedControlView from "./components/SegmentedControlView";
import SelectView from "./components/SelectView";
import SizingView from "./components/SizingView";
import SpacingView from "./components/SpacingView";
import TabBarView from "./components/TabBarView";
import TableView from "./components/TableView";
import TextAreaView from "./components/TextAreaView";
import TextInputView from "./components/TextInputView";
import TooltipView from "./components/TooltipView";
import TypographyView from "./components/TypographyView";
import UITextView from "./components/UITextView";
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
        <Route path="button(/*)" component={ButtonView} />
        <Route path="confirmation-button(/*)" component={ConfirmationButtonView} />
        <Route path="copyable-input(/*)" component={CopyableInputView} />
        <Route path="flex-box(/*)" component={FlexBoxView} />
        <Route path="file-input(/*)" component={FileInputView} />
        <Route path="grid(/*)" component={GridView} />
        <Route path="icon(/*)" component={IconView} />
        <Route path="label(/*)" component={LabelView} />
        <Route path="left-nav(/*)" component={LeftNavView} />
        <Route path="modal(/*)" component={ModalView} />
        <Route path="modal-button(/*)" component={ModalButtonView} />
        <Route path="progress-bar(/*)" component={ProgressBarView} />
        <Route path="segmented-control(/*)" component={SegmentedControlView} />
        <Route path="select(/*)" component={SelectView} />
        <Route path="tab-bar(/*)" component={TabBarView} />
        <Route path="text-area(/*)" component={TextAreaView} />
        <Route path="tooltip" component={TooltipView} />
        <Route path="table(/*)" component={TableView} />
        <Route path="text-input(/*)" component={TextInputView} />
        <Route path="wizard(/*)" component={WizardView} />
      </Route>
      <Route path="LESS">
        <Route path="less-style-guide(/*)" component={LessStyleGuideView} />
        <Route path="spacing(/*)" component={SpacingView} />
      </Route>
    </Route>
  </Router>
), document.getElementById("__MAIN__"));
