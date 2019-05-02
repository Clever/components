import * as _ from "lodash";
import * as classnames from "classnames";
import * as PropTypes from "prop-types";
import * as React from "react";

import "./TopBarButton.less";

const propTypes = {
  active: PropTypes.bool,
  children: PropTypes.node,
  className: PropTypes.string,
  component: PropTypes.any,
  href: PropTypes.string,
  onClick: PropTypes.func,
  target: PropTypes.string,
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
    const { active, children, className, href, onClick, target } = this.props;
    const additionalProps = _.omit(this.props, Object.keys(propTypes));

    const Wrapper = this._getWrapperComponent();

    return (
      <Wrapper
        {...additionalProps}
        className={classnames("TopBarButton", className)}
        href={href}
        onClick={onClick}
        ref={this._handleContainerRef}
        target={target}
      >
        {children}
        {active && <div className="TopBarButton--activeIndicator" />}
      </Wrapper>
    );
  }

  _handleContainerRef = ref => {
    this._containerRef = ref;
  };

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
