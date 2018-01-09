import classnames from "classnames";
import React, {Component, PropTypes} from "react";
import FontAwesome from "react-fontawesome";
import ReactCollapsible from "react-collapsible";

import "./InfoPanel.less";


/**
 * Base presentational component for the displaying information in paneled format.
 */
export default class InfoPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isCollapsed: props.defaultOpen,
    };
  }

  render() {
    const {children, className, title, footer, collapsible, defaultOpen} = this.props;
    const {isCollapsed} = this.state;
    const {cssClass} = InfoPanel;
    let collapseArrow = "";

    if (collapsible && isCollapsed) {
      collapseArrow = <FontAwesome name="caret-down" />;
    } else if (collapsible && !isCollapsed) {
      collapseArrow = <FontAwesome name="caret-right" />;
    }

    return (
      <div className={classnames(cssClass.CONTAINER, className)}>
        <ReactCollapsible trigger={collapsible ?
          (<div>
            <div className={cssClass.COLLAPSE_ARROW}>{collapseArrow}</div>
            <div className={cssClass.TITLE}>{title}</div>
          </div>) : <div>{title}</div>}
          triggerClassName={cssClass.HEADER_CLOSED}
          triggerOpenedClassName={cssClass.HEADER_OPEN}
          triggerDisabled={!collapsible}
          open={ collapsible ? defaultOpen : true }
          onOpening={() => this.setState({isCollapsed: true})}
          onClosing={() => this.setState({isCollapsed: false})}
        >
          <div className={cssClass.CONTENT}>
            {children}
          </div>
          {footer && (
            <div className={cssClass.FOOTER}>
              {footer}
            </div>
          )}
        </ReactCollapsible>
      </div>
    );
  }
}

InfoPanel.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  title: PropTypes.node.isRequired,
  footer: PropTypes.node,
  collapsible: PropTypes.bool,
  defaultOpen: PropTypes.bool,
};

InfoPanel.cssClass = {
  CONTAINER: "InfoPanel",
  CONTENT: "InfoPanel--content",
  FOOTER: "InfoPanel--footer",
  HEADER_OPEN: "InfoPanel--headerOpen",
  HEADER_CLOSED: "InfoPanel--headerClosed",
  COLLAPSE_ARROW: "InfoPanel--collapseArrow",
  TITLE: "InfoPanel--title",
};
