import * as classnames from "classnames";
import * as PropTypes from "prop-types";
import * as React from "react";
import * as _ from "lodash";
import { CSSTransitionGroup } from "react-transition-group";
import { ToastNotification } from "./ToastNotification";

import { actionPropType } from "./ToastNotification";
import { ToastType } from "./ToastType";

import "./ToastStack.less";

const propTypes = {
  className: PropTypes.string,
  clearNotification: PropTypes.func.isRequired,
  defaultNotificationDurationMS: PropTypes.number,
  notificationClassName: PropTypes.string,
  notifications: PropTypes.arrayOf(
    PropTypes.shape({
      action: actionPropType,
      content: PropTypes.node.isRequired,
      durationMS: PropTypes.number,
      id: PropTypes.number.isRequired,
      showCloseButton: PropTypes.bool,
      type: PropTypes.oneOf(Object.values(ToastType)).isRequired,
    }),
  ),
};

const defaultProps = {
  defaultNotificationDurationMS: 5000,
};

const cssClass = {
  CONTAINER: "ToastStack",
  NOTIFICATION_WRAPPER: "ToastStack--notificationWrapper",
  ANIMATION: "ToastStack--animation",
};

/**
 * Toast notifications can be used to provide feedback in response to user interaction. The
 * <ToastStack> renders toast notifications and handles their enter/leave animations.
 */
export class ToastStack extends React.PureComponent {
  static propTypes = propTypes;
  static defaultProps = defaultProps;
  static cssClass = cssClass;

  _finiteDuration(notification) {
    const { defaultNotificationDurationMS } = this.props;

    if (notification.durationMS) {
      return notification.durationMS !== Infinity;
    }
    return defaultNotificationDurationMS !== Infinity;
  }

  componentDidUpdate(prevProps) {
    const { clearNotification, defaultNotificationDurationMS } = this.props;
    const prevNotifications = prevProps.notifications || [];
    const currNotifications = this.props.notifications || [];

    const newNotificationIDs = _.difference(
      currNotifications.map(n => n.id),
      prevNotifications.map(n => n.id),
    );

    // If a notification was just added to the stack and has a finite duration, set up a timer to
    // clear it
    currNotifications.forEach(n => {
      if (newNotificationIDs.includes(n.id) && this._finiteDuration(n)) {
        window.setTimeout(
          () => clearNotification(n.id),
          n.durationMS || defaultNotificationDurationMS,
        );
      }
    });
  }

  render() {
    const { className, clearNotification, notificationClassName, notifications } = this.props;

    const toasts = notifications.map(n => (
      <div className={cssClass.NOTIFICATION_WRAPPER} key={n.id}>
        <ToastNotification
          action={n.action}
          className={notificationClassName}
          onClose={() => clearNotification(n.id)}
          showCloseButton={n.showCloseButton}
          type={n.type}
        >
          {n.content}
        </ToastNotification>
      </div>
    ));

    return (
      <CSSTransitionGroup
        className={classnames(cssClass.CONTAINER, className)}
        transitionName={cssClass.ANIMATION}
        transitionEnterTimeout={200}
        transitionLeaveTimeout={400}
      >
        {toasts}
      </CSSTransitionGroup>
    );
  }
}
