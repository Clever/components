import classnames from "classnames";
import React, {Component} from "react";
import * as PropTypes from "prop-types";
import FontAwesome from "react-fontawesome";
import {Accordion, AccordionItem, AccordionItemTitle, AccordionItemBody} from "react-accessible-accordion";
import "./InfoPanel.less";

/**
 * Base presentational component for the displaying information in paneled format.
 */
export default class InfoPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isCollapsed: !props.defaultOpen,
      collapseArrow: (props.defaultOpen ? "caret-down" : "caret-right"),
    };
  }

  toggleArrow(keys) {
    this.setState({isCollapsed: !(typeof keys !== "undefined")});
  }

  render() {
    const {children, className, hideTitle, title, footer, collapsible, defaultOpen} = this.props;
    const {isCollapsed} = this.state;
    let {collapseArrow} = this.state;
    const {cssClass} = InfoPanel;
    if (!collapsible) {
      return (
        <div className={classnames(cssClass.CONTAINER, className)}>
          {!hideTitle && <div className={cssClass.HEADER}>
            <h4 className={cssClass.TITLE}>
              {title}
            </h4>
          </div>}
          <div className={cssClass.CONTENT}>
            {children}
          </div>
          {footer && (
            <div className={cssClass.FOOTER}>
              {footer}
            </div>
          )}
        </div>
      );
    }

    if (isCollapsed) {
      collapseArrow = "caret-right";
    } else {
      collapseArrow = "caret-down";
    }

    return (
      <div className={classnames(cssClass.CONTAINER, className)}>
        <Accordion onChange={keys => this.toggleArrow(keys)}>
          <AccordionItem expanded={defaultOpen}>
            <AccordionItemTitle className={cssClass.COLLAPSIBLE_HEADER}>
              <div>
                <div className={cssClass.COLLAPSE_ARROW}><FontAwesome name={collapseArrow} /></div>
                <div className={cssClass.COLLAPSIBLE_TITLE}>{title}</div>
              </div>
            </AccordionItemTitle>
            <AccordionItemBody>
              <div className={cssClass.CONTENT}>
                {children}
              </div>
              {footer && (
                <div className={cssClass.FOOTER}>
                  {footer}
                </div>
              )}
            </AccordionItemBody>
          </AccordionItem>
        </Accordion>
      </div>
    );
  }
}

InfoPanel.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  title: PropTypes.node,
  hideTitle: PropTypes.bool,
  footer: PropTypes.node,
  collapsible: PropTypes.bool,
  defaultOpen: PropTypes.bool,
};

InfoPanel.cssClass = {
  CONTAINER: "InfoPanel",
  FOOTER: "InfoPanel--footer",
  TITLE: "InfoPanel--title",
  HEADER: "InfoPanel--header",
  CONTENT: "InfoPanel--content",
  COLLAPSE_ARROW: "InfoPanel--collapseArrow",
  COLLAPSIBLE_TITLE: "InfoPanel--collapsibleTitle",
  COLLAPSIBLE_HEADER: "InfoPanel--collapsibleHeader",
};
