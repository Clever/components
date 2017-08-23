import React from "react";
import classnames from "classnames";

import "./CleverLogInButton.less";
import {Icon} from "../Icon/Icon";
/*
  Add a description of your component here.

  If your component can be expressed without state,
  use the stateless function syntax instead!
*/

export class CleverLogInButton extends React.Component {
  constructor(props) {
    super(props);
    // Set state and bind methods here
  }

  /* Insert any additional lifecycle methods,
     event handlers, and helper methods here */

  render() {
    const {cssClass} = CleverLogInButton;
    const {
      className,
      disabled,
      href,
      client_id,
      redirect_uri,
      submit,
      target,
    } = this.props;

    var url = href;

    if (href == null) {
      url = "https://clever.com/oauth/authorize?response_type=code&redirect_uri=" + redirect_uri + "&client_id=" + client_id;
    }

    return (
      <a
        className={classnames(cssClass.BUTTON, className)}
        href={url}
        target={target}
      >
        <div>
          <span className={classnames(cssClass.ICON)}>
            <Icon
              size={Icon.sizes.SMALL}
              name={Icon.names.CLEVER_C}
            />
            </span>
          {" "}
          Log in with Clever
        </div>
      </a>
    );
  }
}

CleverLogInButton.propTypes = {
  className: React.PropTypes.string,
  href: React.PropTypes.string,
  redirect_uri: React.PropTypes.string,
  client_id: React.PropTypes.string,
  target: React.PropTypes.oneOf(["_self", "_blank"]),
  disabled: React.PropTypes.bool,
  submit: React.PropTypes.bool,
}

CleverLogInButton.cssClass = {
  BUTTON: "CleverLogInButton",
  ICON: "CleverLogInButton--Icon",
  LABEL: "LogInWithClever--Label",
};