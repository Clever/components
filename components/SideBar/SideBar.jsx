import classnames from "classnames";
import React from "react";
import * as PropTypes from "prop-types";
import { Link as ReactRouterLink, routerShape } from "react-router";

import { Icon, LeftNav } from "../../../src";

import "./SideBar.less";

export default class SideBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      collapsed: false,
    };
  }

  toggle() {
    this.setState({ collapsed: !this.state.collapsed });
  }

  _renderLink(path, label, icon = null) {
    const { NavLink } = LeftNav;
    const { router } = this.context;

    return (
      <NavLink
        component={ReactRouterLink}
        icon={icon}
        label={label}
        selected={router.isActive(path)}
        to={path}
      />
    );
  }

  _handle_components_click = () => {
    if (!window.location.hash.includes("#/components/")) {
      window.location.hash = "#/components/view-all";
    }
  };

  render() {
    const { NavGroup } = LeftNav;
    const { cssClass } = SideBar;
    const { className } = this.props;
    const { collapsed } = this.state;

    const icon = name => <Icon name={name} size={Icon.sizes.SMALL} />;
    const faIcon = name => <span className={classnames(cssClass.FA_ICON, `fa fa-${name}`)} />;

    return (
      <LeftNav
        className={classnames(cssClass.CONTAINER, className)}
        closeSubNavOnBlur
        collapseOnSubNavOpen
        collapsed={collapsed}
        narrow
        withActiveNavGroups
        withTooltips
      >
        {this._renderLink("/component-list", "Component List", icon(Icon.names.PORTAL_OPEN))}
        {this._renderLink("/intro", "Introduction", icon(Icon.names.PRESENTATION))}
        {this._renderLink("/getting-started", "Getting Started", icon(Icon.names.BLOCKS))}
        <NavGroup id="design" label="Design" icon={icon(Icon.names.ORIGAMI)}>
          {this._renderLink("/design/colors", "Colors")}
          {this._renderLink("/design/typography", "Typography")}
          {this._renderLink("/design/sizing", "Sizing")}
          {this._renderLink("/design/page-layout", "Page Layout")}
          {this._renderLink("/design/compound-form", "Compound Form")}
          {this._renderLink("/design/ui-text", "UI Text")}
        </NavGroup>
        <NavGroup
          id="components"
          label="Components"
          icon={icon(Icon.names.WEBSITE_HTML)}
          _onClick={this._handle_components_click}
        >
          {this._renderLink("/components/alert-box", "AlertBox")}
          {this._renderLink("/components/badge", "Badge")}
          {this._renderLink("/components/button", "Button")}
          {this._renderLink("/components/checkbox", "Checkbox")}
          {this._renderLink("/components/checkbox-group", "CheckboxGroup")}
          {this._renderLink("/components/confirmation-button", "ConfirmationButton")}
          {this._renderLink("/components/copy-container", "CopyContainer")}
          {this._renderLink("/components/copyable-input", "CopyableInput")}
          {this._renderLink("/components/count", "Count")}
          {this._renderLink("/components/date-input", "DateInput")}
          {this._renderLink("/components/date-picker", "DatePicker")}
          {this._renderLink("/components/dollar-amount", "DollarValue")}
          {this._renderLink("/components/dropdown-button", "DropdownButton")}
          {this._renderLink("/components/editable-info-panel", "EditableInfoPanel")}
          {this._renderLink("/components/file-input", "FileInput")}
          {this._renderLink("/components/flex-box", "FlexBox")}
          {this._renderLink("/components/floating-button", "FloatingButton")}
          {this._renderLink("/components/form-error", "FormError")}
          {this._renderLink("/components/goals-logo", "GoalsLogo")}
          {this._renderLink("/components/grid", "Grid")}
          {this._renderLink("/components/icon", "Icon")}
          {this._renderLink("/components/info-panel", "InfoPanel")}
          {this._renderLink("/components/label", "Label")}
          {this._renderLink("/components/left-nav", "LeftNav")}
          {this._renderLink("/components/list", "List")}
          {this._renderLink("/components/logo", "Logo")}
          {this._renderLink("/components/menu", "Menu")}
          {this._renderLink("/components/modal", "Modal")}
          {this._renderLink("/components/modal-button", "ModalButton")}
          {this._renderLink("/components/multiple-panel-modals", "MultiplePanelModals")}
          {this._renderLink("/components/number", "Number")}
          {this._renderLink("/components/progress-bar", "ProgressBar")}
          {this._renderLink("/components/radio-group", "RadioGroup")}
          {this._renderLink("/components/rich-text", "RichText")}
          {this._renderLink("/components/segmented-control", "SegmentedControl")}
          {this._renderLink("/components/select", "Select")}
          {this._renderLink("/components/stepper", "Stepper")}
          {this._renderLink("/components/switch", "Switch")}
          {this._renderLink("/components/tab-bar", "TabBar")}
          {this._renderLink("/components/table", "Table")}
          {this._renderLink("/components/text-area", "TextArea")}
          {this._renderLink("/components/text-input", "TextInput")}
          {this._renderLink("/components/text-truncate", "TextTruncate")}
          {this._renderLink("/components/toast-stack", "ToastStack")}
          {this._renderLink("/components/tooltip", "Tooltip")}
          {this._renderLink("/components/top-bar", "TopBar")}
          {this._renderLink("/components/with-keyboard-nav", "WithKeyboardNav")}
          {this._renderLink("/components/wizard", "Wizard")}
          {this._renderLink("/components/wizard-layout", "WizardLayout")}
        </NavGroup>
        <NavGroup id="less" label="LESS" icon={faIcon("css3")}>
          {this._renderLink("/less/less-style-guide", "Style Guide")}
          {this._renderLink("/less/spacing", "Spacing")}
        </NavGroup>
      </LeftNav>
    );
  }
}

SideBar.contextTypes = {
  router: routerShape,
};

SideBar.propTypes = {
  className: PropTypes.string,
};

SideBar.cssClass = {
  CONTAINER: "SideBar",
  FA_ICON: "SideBar--faIcon",
};
