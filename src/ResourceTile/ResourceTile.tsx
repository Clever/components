import * as classnames from "classnames";
import { Button, FlexBox, ItemAlign, Justify, Tooltip } from "../index";
import { DragHandleIcon } from "./DragHandleIcon";
import * as _ from "lodash";
import * as React from "react";
import * as FontAwesome from "react-fontawesome";

import "./ResourceTile.less";

const TITLE_MAX_LENGTH = 30;

export type IconSize = "small" | "medium" | "large";
export type IconOrientation = "landscape" | "portrait" | "unknown";

export const CssClasses = {
  ACTION: "ResourceTile--action",
  ACTION_BUTTON: "ResourceTile--actionButton",
  CONTAINER: "ResourceTile",
  DRAGGABLE_ICON: "ResourceTile--draggableIcon",
  LINK: "ResourceTile--link",
  ICON_CONTAINER: "ResourceTile--iconContainer",
  ICON: "ResourceTile--icon",
  OVERLAYS: "ResourceTile--overlays",
  OVERLAY: "ResourceTile--overlay",
  TITLE_CONTAINER: "ResourceTile--titleContainer",
  TITLE_AND_NOTES: "ResourceTile--titleAndNotes",
  TITLE: "ResourceTile--title",
  NOTIFICATION: "ResourceTile--notification",
  NOTES: "ResourceTile--notes",
  ADDITIONAL_INFO: "ResourceTile--additionalInfo",
};

const SizeCssClasses: Record<IconSize, string> = {
  small: "ResourceTile--size--small",
  medium: "ResourceTile--size--medium",
  large: "ResourceTile--size--large",
};

const IconOrientationCssClasses: Record<IconOrientation, string> = {
  landscape: "ResourceTile--icon--landscape",
  portrait: "ResourceTile--icon--portrait",
  unknown: "",
};

export interface Action {
  content: React.ReactNode;
  href?: string;
  onClick?: () => void;
}

export interface Props {
  actions: [] | [Action] | [Action, Action];
  additionalInfo?: React.ReactNode;
  className?: string;
  draggable?: boolean;
  icon: string;
  loadingSpinner: React.ReactNode;
  notes?: string;
  notify?: boolean;
  onClick?: (event?: React.MouseEvent) => void;
  openInSameTab: boolean;
  overlays?: React.ReactNode[];
  size: IconSize;
  title: string;
  url: string;
}

interface State {
  iconOrientation: IconOrientation;
}

export class ResourceTile extends React.PureComponent<Props, State> {
  static defaultProps: Pick<Props, "actions" | "size" | "openInSameTab"> = {
    actions: [],
    size: "large",
    openInSameTab: false,
  };

  iconRef: React.RefObject<HTMLImageElement>;

  constructor(props: Props) {
    super(props);

    this.iconRef = React.createRef();
    this.state = {
      iconOrientation: "unknown",
    };
  }

  determineIconOrientation() {
    const element = this.iconRef.current;

    let iconOrientation: IconOrientation = "unknown";
    if (element) {
      const height = element.height;
      const width = element.width;
      iconOrientation = height > width ? "portrait" : "landscape";
    }
    this.setState({ iconOrientation });
  }

  renderIcon() {
    const { icon, title, loadingSpinner } = this.props;
    const { iconOrientation } = this.state;
    const loading = icon === "";

    if (loading) {
      return loadingSpinner;
    }

    return (
      <img
        className={classnames(CssClasses.ICON, IconOrientationCssClasses[iconOrientation])}
        src={icon}
        alt={`${title} icon`}
        title={title}
        ref={this.iconRef}
        onLoad={() => this.determineIconOrientation()}
      />
    );
  }

  renderOverlays() {
    const { overlays } = this.props;

    if (!overlays || overlays.length === 0) {
      return null;
    }
    return (
      <>
        {overlays.map(
          (overlay, i) =>
            overlay && (
              <FlexBox
                alignItems={ItemAlign.CENTER}
                className={CssClasses.OVERLAY}
                justify={Justify.CENTER}
                key={i}
              >
                {overlay}
              </FlexBox>
            ),
        )}
      </>
    );
  }

  render() {
    const {
      actions,
      additionalInfo,
      className,
      draggable,
      onClick,
      notes,
      notify,
      size,
      title,
      url,
      openInSameTab,
    } = this.props;

    return (
      <FlexBox
        className={classnames(CssClasses.CONTAINER, SizeCssClasses[size], className)}
        column
        alignItems={ItemAlign.CENTER}
        alignSelf={ItemAlign.START}
      >
        <FlexBox
          className={CssClasses.LINK}
          column
          component="a"
          href={url}
          onClick={onClick}
          target={openInSameTab ? "_self" : "_blank"}
        >
          <FlexBox
            className={CssClasses.ICON_CONTAINER}
            justify={Justify.CENTER}
            alignItems={ItemAlign.CENTER}
          >
            {this.renderIcon()}
          </FlexBox>

          <FlexBox className={CssClasses.TITLE_CONTAINER} column alignItems={ItemAlign.CENTER}>
            <FlexBox className={CssClasses.TITLE_AND_NOTES} alignItems={ItemAlign.CENTER}>
              {title.length > TITLE_MAX_LENGTH ? (
                <Tooltip
                  content={title}
                  placement={Tooltip.Placement.TOP}
                  textAlign={Tooltip.Align.CENTER}
                >
                  <span className={CssClasses.TITLE}>
                    {`${title.substring(0, TITLE_MAX_LENGTH)}…`}
                  </span>
                </Tooltip>
              ) : (
                <span className={CssClasses.TITLE}>{title}</span>
              )}
              {notes && (
                <Tooltip
                  content={notes}
                  placement={Tooltip.Placement.TOP}
                  textAlign={Tooltip.Align.LEFT}
                >
                  <FontAwesome className={CssClasses.NOTES} name="question-circle" />
                </Tooltip>
              )}
            </FlexBox>
            {additionalInfo && (
              <FlexBox
                className={CssClasses.ADDITIONAL_INFO}
                alignSelf={ItemAlign.STRETCH}
                justify={Justify.CENTER}
              >
                {additionalInfo}
              </FlexBox>
            )}
          </FlexBox>
          {notify && <span className={CssClasses.NOTIFICATION} />}
        </FlexBox>
        {this.renderOverlays()}
        {!!actions.length && (
          <FlexBox column>
            {actions.map((action, i) => (
              <FlexBox className={classnames(CssClasses.ACTION)} key={`ResourceTileAction--${i}`}>
                <Button
                  className={CssClasses.ACTION_BUTTON}
                  value={action.content}
                  type={i === actions.length - 1 ? "link" : "primary"}
                  href={action.href}
                  onClick={action.onClick}
                  target="_self"
                />
              </FlexBox>
            ))}
          </FlexBox>
        )}
        {draggable && !actions.length && <DragHandleIcon className={CssClasses.DRAGGABLE_ICON} />}
      </FlexBox>
    );
  }
}
