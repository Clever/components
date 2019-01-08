import * as classnames from "classnames";
import * as PropTypes from "prop-types";
import * as React from "react";
import {CSSTransitionGroup} from "react-transition-group";
import {ToastNotification} from "./ToastNotification";

import {actionPropType} from "./ToastNotification";
import {ToastType} from "./ToastType";

import "./ToastStack.less";

const propTypes = {
  className: PropTypes.string,
  defaultNotificationDurationMS: PropTypes.number,
  notificationClassName: PropTypes.string,
  notifications: PropTypes.arrayOf(PropTypes.shape({
    action: actionPropType,
    content: PropTypes.node.isRequired,
    durationMS: PropTypes.number,
    id: PropTypes.number.isRequired,
    showCloseButton: PropTypes.bool,
    type: PropTypes.oneOf(Object.values(ToastType)).isRequired,
  })),
  setNotifications: PropTypes.func.isRequired,
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
    const {defaultNotificationDurationMS} = this.props;

    if (notification.durationMS) {
      return notification.durationMS !== Infinity;
    }
    return defaultNotificationDurationMS !== Infinity;
  }

  _clearNotification(id) {
    const {notifications, setNotifications} = this.props;

    setNotifications(notifications.filter(n => n.id !== id));
  }

  componentDidUpdate(prevProps) {
    const {defaultNotificationDurationMS} = this.props;
    const prevNotifications = prevProps.notifications || [];
    const newNotifications = this.props.notifications || [];

    // If a notification was just added to the stack and it has a finite duration, set up a timer
    // to clear it
    if (prevNotifications.length < newNotifications.length) {
      const newNotification = newNotifications[newNotifications.length - 1];
      if (this._finiteDuration(newNotification)) {
        window.setTimeout(
          () => this._clearNotification(newNotification.id),
          newNotification.durationMS || defaultNotificationDurationMS,
        );
      }
    }
  }

  render() {
    const {
      className,
      notificationClassName,
      notifications,
    } = this.props;

    const toasts = notifications.map(n => (
      <div className={cssClass.NOTIFICATION_WRAPPER} key={n.id}>
        <ToastNotification
          action={n.action}
          className={notificationClassName}
          onClose={() => this._clearNotification(n.id)}
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
