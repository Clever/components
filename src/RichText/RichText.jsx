import React from "react";
import * as PropTypes from "prop-types";
import Linkify from "react-linkify";

export default function RichText(props) {
  return (<Linkify properties={{target: "_blank"}}>
    {props.text.split("\n").map((item, key) => <span key={key}>{item}<br /></span>)}
  </Linkify>);
}

RichText.propTypes = {
  text: PropTypes.string.isRequired,
};
