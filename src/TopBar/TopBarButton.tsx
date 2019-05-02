import * as _ from "lodash";
import * as classnames from "classnames";
import * as PropTypes from "prop-types";
import * as React from "react";

import "./TopBarButton.less";

const propTypes = {
  active: PropTypes.bool,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  component: PropTypes.any,
  href: PropTypes.string,
  onClick: PropTypes.func,
  round: PropTypes.bool,
};

export class TopBarButton extends React.PureComponent {
  static propTypes = propTypes;

  _containerRef;

  focus() {
    if (this._containerRef && this._containerRef.focus) {
      this._containerRef.focus();
    }
  }

  render() {
    const { active, children, className, href, onClick } = this.props;
    const additionalProps = _.omit(this.props, Object.keys(propTypes));

    const Wrapper = this._getWrapperComponent();

    return (
      <Wrapper
        {...additionalProps}
        className={classnames(
          "TopBarButton",
          className,
          this.props.round ? "TopBarButton--rounded" : null,
        )}
        href={href}
        onClick={onClick}
        ref={ref => {
          this._containerRef = ref;
        }}
      >
        {children}
        {active && <div className="TopBarButton--activeIndicator" />}
      </Wrapper>
    );
  }

  _getWrapperComponent() {
    const { component, href } = this.props;

    if (component) {
      return component;
    }

    if (href) {
      return "a";
    }

    return "button";
  }
}
