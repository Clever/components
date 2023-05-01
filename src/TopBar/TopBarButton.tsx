import * as _ from "lodash";
import * as classnames from "classnames";
import * as PropTypes from "prop-types";
import * as React from "react";
import { FlexBox } from "..";

import "./TopBarButton.less";

export interface Props {
  active?: boolean;
  children: React.ReactNode;
  className?: string;
  component?: any;
  href?: string;
  onClick?: Function;
  round?: boolean;
  [additionalProp: string]: any;
}

const propTypes = {
  active: PropTypes.bool,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  component: PropTypes.any,
  href: PropTypes.string,
  onClick: PropTypes.func,
  round: PropTypes.bool,
};

export class TopBarButton extends React.PureComponent<Props> {
  static propTypes = propTypes;

  _containerRef;

  focus() {
    if (this._containerRef && this._containerRef.focus) {
      this._containerRef.focus();
    }
  }

  blur() {
    if (this._containerRef && this._containerRef.blur) {
      this._containerRef.blur();
    }
  }

  render() {
    const { active, children, className, href, onClick } = this.props;
    const additionalProps = _.omit(this.props, Object.keys(propTypes));

    const Wrapper = this._getWrapperComponent();

    return (
      <FlexBox className="TopBarButton--container">
        <Wrapper
          {...additionalProps}
          className={classnames(
            "TopBarButton",
            className,
            this.props.round ? "TopBarButton--rounded" : null,
          )}
          href={href}
          onClick={() => {
            // Button should not stay in active/focused state after it has been invoked.
            // Otherwise, button looks like it's still active, even after clicking it.
            // See PRTL-3215 for example of this bug
            this.blur();
            if (onClick) onClick();
          }}
          ref={(ref) => {
            this._containerRef = ref;
          }}
          aria-current={active && "page"}
        >
          {children}
        </Wrapper>
        {active && <div className="TopBarButton--activeIndicator" />}
      </FlexBox>
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
