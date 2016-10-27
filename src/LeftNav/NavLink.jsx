import React from "react";

import {Button} from "../Button/Button";

export function NavLink(props) {
  const label = <span className={props.icon}>{props.label}</span>;
  return (
    <li>
      <Button type="link" href={props.href} value={label} />
    </li>
  );
}
