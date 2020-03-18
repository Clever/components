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
  ACTION: "dewey--ResourceTile--action",
  ACTION_BUTTON: "dewey--ResourceTile--actionButton",
  CONTAINER: "dewey--ResourceTile",
  DRAGGABLE_ICON: "dewey--ResourceTile--draggableIcon",
  LINK: "dewey--ResourceTile--link",
  ICON_CONTAINER: "dewey--ResourceTile--iconContainer",
  ICON: "dewey--ResourceTile--icon",
  OVERLAYS: "dewey--ResourceTile--overlays",
  OVERLAY: "dewey--ResourceTile--overlay",
  TITLE_CONTAINER: "dewey--ResourceTile--titleContainer",
  TITLE_AND_NOTES: "dewey--ResourceTile--titleAndNotes",
  TITLE: "dewey--ResourceTile--title",
  NOTIFICATION: "dewey--ResourceTile--notification",
  NOTES: "dewey--ResourceTile--notes",
  ADDITIONAL_INFO: "dewey--ResourceTile--additionalInfo",
};

const SizeCssClasses: Record<IconSize, string> = {
  small: "dewey--ResourceTile--size--small",
  medium: "dewey--ResourceTile--size--medium",
  large: "dewey--ResourceTile--size--large",
};

const IconOrientationCssClasses: Record<IconOrientation, string> = {
  landscape: "dewey--ResourceTile--icon--landscape",
  portrait: "dewey--ResourceTile--icon--portrait",
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
  icon: { src: string } | { node: React.ReactNode };
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
    const { icon, title } = this.props;
    const { iconOrientation } = this.state;

    if ("node" in icon) {
      return icon.node;
    }

    return (
      <img
        className={classnames(CssClasses.ICON, IconOrientationCssClasses[iconOrientation])}
        src={icon.src}
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
              <FlexBox
                className={classnames(CssClasses.ACTION)}
                key={`dewey--ResourceTileAction--${i}`}
              >
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
