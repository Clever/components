import classnames from "classnames";
import React, {PropTypes} from "react";
import {Link, routerShape} from "react-router";

import "./NavLink.less";


export default function NavLink({children, className, href, isExternal}, {router}) {
  const {cssClass} = NavLink;

  let Wrapper;
  let wrapperProps;
  if (isExternal) {
    Wrapper = "a";
    wrapperProps = {href, target: "_blank"};
  } else {
    Wrapper = Link;
    wrapperProps = {to: {pathname: href}};
  }

  return (
    <Wrapper
      className={classnames(
        cssClass.CONTAINER,
        router && router.isActive(href) && cssClass.ACTIVE,
        className
      )}
      {...wrapperProps}
    >
      {children}
    </Wrapper>
  );
}

NavLink.contextTypes = {
  router: routerShape,
};

NavLink.propTypes = {
  children: PropTypes.string,
  className: PropTypes.string,
  href: PropTypes.string,
  isExternal: PropTypes.bool,
};

NavLink.cssClass = {
  ACTIVE: "SideBar--NavLink--active",
  CONTAINER: "SideBar--NavLink",
};
