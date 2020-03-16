import * as classnames from "classnames";
import { Button, FlexBox, ItemAlign, Justify, Tooltip } from "clever-components";
import * as _ from "lodash";
import * as React from "react";
import * as FontAwesome from "react-fontawesome";

import { onIos } from "src/ui/lib/devices";
import { IconSize } from "src/shared/models/UserCustomizations";
import LoadingSpinner from "src/ui/components/LoadingSpinner";

import "./ResourceLinkView.less";

const TITLE_MAX_LENGTH = 30;

enum IconOrientation {
  LANDSCAPE = "landscape",
  PORTRAIT = "portrait",
  UNKNOWN = "unknown",
}

export const CssClasses = {
  ACTION: "ResourceLink--action",
  ACTION_BUTTON: "ResourceLink--actionButton",
  CONTAINER: "ResourceLink",
  DRAGGABLE_ICON: "ResourceLink--draggableIcon",
  LINK: "ResourceLink--link",
  ICON_CONTAINER: "ResourceLink--iconContainer",
  ICON: "ResourceLink--icon",
  OVERLAYS: "ResourceLink--overlays",
  OVERLAY: "ResourceLink--overlay",
  TITLE_CONTAINER: "ResourceLink--titleContainer",
  TITLE_AND_NOTES: "ResourceLink--titleAndNotes",
  TITLE: "ResourceLink--title",
  NOTIFICATION: "ResourceLink--notification",
  NOTES: "ResourceLink--notes",
  ADDITIONAL_INFO: "ResourceLink--additionalInfo",
};

const SizeCssClasses = {
  [IconSize.SMALL]: "ResourceLink--size--small",
  [IconSize.MEDIUM]: "ResourceLink--size--medium",
  [IconSize.LARGE]: "ResourceLink--size--large",
};

const IconOrientationCssClasses = {
  [IconOrientation.LANDSCAPE]: "ResourceLink--icon--landscape",
  [IconOrientation.PORTRAIT]: "ResourceLink--icon--portrait",
  [IconOrientation.UNKNOWN]: "",
};

interface BasicProps {
  icon: string;
  title: string;
  url: string;
}

/**
 * These props may be passed through several component layers, for example:
 * ResourceLinkOnDistrictPage --> AppLinkOnDistrictPage --> AppLink --> ResourceLink
 */
export interface PassThroughProps {
  actions?: { content: React.ReactNode; href?: string; onClick?: () => void }[];
  additionalInfo?: React.ReactNode;
  className?: string;
  draggable?: boolean;
  notes?: string;
  notify?: boolean;
  onClick?: (event?: React.MouseEvent) => void;
  overlays?: React.ReactNode[];
  size?: IconSize;
}

export function extractPassThroughProps(props: any): PassThroughProps {
  return _.pick(props, [
    "actions",
    "additionalInfo",
    "draggable",
    "className",
    "notes",
    "notify",
    "onClick",
    "overlays",
    "size",
  ]);
}

type Props = BasicProps & PassThroughProps;

interface State {
  iconOrientation: IconOrientation;
}

export class ResourceLinkView extends React.PureComponent<Props, State> {
  static defaultProps = {
    actions: [],
    size: IconSize.LARGE,
  };

  iconRef;

  constructor(props) {
    super(props);

    this.iconRef = React.createRef();
    this.state = {
      iconOrientation: IconOrientation.UNKNOWN,
    };
  }

  determineIconOrientation() {
    const element = this.iconRef.current;

    let iconOrientation = IconOrientation.UNKNOWN;
    if (element) {
      const height = element.height;
      const width = element.width;
      iconOrientation = height > width ? IconOrientation.PORTRAIT : IconOrientation.LANDSCAPE;
    }
    this.setState({ iconOrientation });
  }

  renderIcon() {
    const { icon, title } = this.props;
    const { iconOrientation } = this.state;
    const loading = icon === "";

    if (loading) {
      return <LoadingSpinner size={LoadingSpinner.Size.S} />;
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
    } = this.props;

    // starting with iOS 13, iPads now use a macOS user agent by default so instead we check for
    // touch capabilities + Safari user agent to decide if we should open in the same tab
    const shouldOpenInSameTab = onIos();

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
          target={shouldOpenInSameTab ? "_self" : "_blank"}
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
          <FlexBox column={true}>
            {/* There should only be two actions */}
            {actions.slice(0, 2).map((action, i) => (
              <FlexBox className={classnames(CssClasses.ACTION)} key={`ResourceLinkAction--${i}`}>
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
        {draggable && !actions.length && (
          <img
            className={CssClasses.DRAGGABLE_ICON}
            src={require("./icn-drag-handle.svg")}
            alt="draggable"
          />
        )}
      </FlexBox>
    );
  }
}
