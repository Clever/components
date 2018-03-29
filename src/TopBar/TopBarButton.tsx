import * as _ from "lodash";
import * as classnames from "classnames";
import * as PropTypes from "prop-types";
import * as React from "react";

import Colors from "../utils/Colors";

import "./TopBarButton.less";

const MarkerShape = {
  CIRCLE: "circle",
  TRIANGLE: "triangle",
};

const propTypes = {
  active: PropTypes.bool,
  children: PropTypes.node,
  className: PropTypes.string,
  component: PropTypes.any,
  href: PropTypes.string,
  markerShape: PropTypes.oneOf(Object.values(MarkerShape)),
  onClick: PropTypes.func,
  target: PropTypes.string,
};

const defaultProps = {
  markerShape: MarkerShape.CIRCLE,
};

const cssClass = {
  ACTIVE_INDICATOR: "TopBarButton--activeIndicator",
  ACTIVE_INDICATOR_SHAPE: "TopBarButton--activeIndicator--shape",
  MARKER: "TopBarButton--marker",
  MARKER_SHAPE: "TopBarButton--marker--shape",
  MARKER_CIRCLE: "TopBarButton--marker--circle",
  MARKER_TRIANGLE: "TopBarButton--marker--triangle",
  CONTAINER: "TopBarButton",
};

const Markers = {
  [MarkerShape.CIRCLE]: (
    <svg className={classnames(cssClass.MARKER, cssClass.MARKER_CIRCLE)} viewBox="0 0 100 100">
      <circle cx={50} cy={50} r={50} fill={Colors.NEUTRAL_WHITE} />
      <circle className={cssClass.MARKER_SHAPE} cx={50} cy={50} r={35} />
    </svg>
  ),
  [MarkerShape.TRIANGLE]: (
    <svg className={classnames(cssClass.MARKER, cssClass.MARKER_TRIANGLE)} viewBox="0 0 100 50">
      <polygon className={cssClass.MARKER_SHAPE} points="50,0 100,50 0,50" />
    </svg>
  ),
};

export default class TopBarButton extends React.PureComponent {
  static propTypes = propTypes;
  static defaultProps = defaultProps;
  static cssClass = cssClass;

  static MarkerShape = MarkerShape;

  _containerRef;

  focus() {
    if (this._containerRef && this._containerRef.focus) {
      this._containerRef.focus();
    }
  }

  render() {
    const {active, children, className, href, markerShape, onClick, target} = this.props;
    const additionalProps = _.omit(this.props, Object.keys(propTypes));


    const Wrapper = this._getWrapperComponent();

    return (
      <Wrapper
        {...additionalProps}
        className={classnames(cssClass.CONTAINER, className)}
        href={href}
        onClick={onClick}
        ref={this._handleContainerRef}
        target={target}
      >
        {children}
        {active && Markers[markerShape]}
      </Wrapper>
    );
  }

  _handleContainerRef = ref => {
    this._containerRef = ref;
  }

  _getWrapperComponent() {
    const {component, href} = this.props;

    if (component) {
      return component;
    }

    if (href) {
      return "a";
    }

    return "button";
  }
}
