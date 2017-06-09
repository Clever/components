import React from "react";
import Linkify from "react-linkify";

export default function RichText(props) {
  return (<Linkify properties={{target: "_blank"}}>
    {props.text.split("\n").map((item, key) => <span key={key}>{item}<br /></span>)}
  </Linkify>);
}

RichText.propTypes = {
  text: React.PropTypes.string.isRequired,
};
