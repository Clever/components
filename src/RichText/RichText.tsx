import * as React from "react";
import * as PropTypes from "prop-types";
import Linkify from "react-linkify";

export interface Props {
  text: string;
}

// Customized to open links in new tabs
// Based on https://github.com/tasti/react-linkify/blob/master/src/decorators/defaultComponentDecorator.jsx
const componentDecorator = (decoratedHref: string, decoratedText: string, key: number) => {
  return (
    <a href={decoratedHref} key={key} target="_blank" rel="noopener noreferrer">
      {decoratedText}
    </a>
  );
};

export default function RichText(props: Props) {
  const lines = props.text.split("\n");

  return (
    <Linkify componentDecorator={componentDecorator}>
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
