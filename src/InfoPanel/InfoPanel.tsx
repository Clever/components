import classnames from "classnames";
import * as React from "react";
import * as FontAwesome from "react-fontawesome";
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from "react-accessible-accordion";
import "./InfoPanel.less";

export interface Props {
  children?: React.ReactNode;
  className?: string;
  title?: React.ReactNode;
  hideTitle?: boolean;
  footer?: React.ReactNode;
  collapsible?: boolean;
  defaultOpen?: boolean;
}

export const cssClass = {
  CONTAINER: "InfoPanel",
  FOOTER: "InfoPanel--footer",
  TITLE: "InfoPanel--title",
  HEADER: "InfoPanel--header",
  CONTENT: "InfoPanel--content",
  COLLAPSE_ARROW: "InfoPanel--collapseArrow",
  COLLAPSIBLE_TITLE: "InfoPanel--collapsibleTitle",
  COLLAPSIBLE_HEADER: "InfoPanel--collapsibleHeader",
};

const ACCORDION_ITEM_KEY = "info-panel-accordion-item";

/**
 * Base presentational component for the displaying information in paneled format.
 */
const InfoPanel = ({
  children,
  className,
  hideTitle,
  title,
  footer,
  collapsible,
  defaultOpen,
}: Props) => {
  const [isCollapsed, setIsCollapsed] = React.useState(!defaultOpen);

  const preExpanded = collapsible && defaultOpen ? [ACCORDION_ITEM_KEY] : [];

  if (!collapsible) {
    return (
      <div className={classnames(cssClass.CONTAINER, className)}>
        {!hideTitle && (
          <div className={cssClass.HEADER}>
            <h4 className={cssClass.TITLE}>{title}</h4>
          </div>
        )}
        <div className={cssClass.CONTENT}>{children}</div>
        {footer && <div className={cssClass.FOOTER}>{footer}</div>}
      </div>
    );
  }

  return (
    <div className={classnames(cssClass.CONTAINER, className)}>
      <Accordion
        allowZeroExpanded
        preExpanded={preExpanded}
        onChange={(_) => setIsCollapsed(!isCollapsed)}
      >
        <AccordionItem uuid={ACCORDION_ITEM_KEY}>
          <AccordionItemHeading className={cssClass.COLLAPSIBLE_HEADER}>
            <AccordionItemButton>
              <div className={cssClass.COLLAPSE_ARROW}>
                <FontAwesome name={isCollapsed ? "caret-right" : "caret-down"} />
              </div>
              <div className={cssClass.COLLAPSIBLE_TITLE}>{title}</div>
            </AccordionItemButton>
          </AccordionItemHeading>
          <AccordionItemPanel>
            <div className={cssClass.CONTENT}>{children}</div>
            {footer && <div className={cssClass.FOOTER}>{footer}</div>}
          </AccordionItemPanel>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default InfoPanel;
