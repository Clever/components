import * as React from "react";
import * as PropTypes from "prop-types";
import Linkify from "react-linkify";

export interface Props {
  text: string;
}

export default function RichText(props: Props) {
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
