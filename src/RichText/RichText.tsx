import * as React from "react";
import * as PropTypes from "prop-types";
import Linkify from "react-linkify";

export default function RichText(props) {
  const lines = props.text.split("\n");

  return (
    <Linkify properties={{ target: "_blank" }}>
      {lines.map((item, index) => (
        <span key={index}>
          {item}
          {index < lines.length - 1 && <br />}
        </span>
      ))}
    </Linkify>
  );
}

RichText.propTypes = {
  text: PropTypes.string.isRequired,
};
