import React from "react";

export function NavGroup(props) {
  return (
    <li>
      <span className={props.icon}>{props.label}</span>
      <ul>
        {props.children}
      </ul>
    </li>
  );
}
