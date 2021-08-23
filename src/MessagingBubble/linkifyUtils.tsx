import * as React from "react";

import * as LinkifyIt from "linkify-it";
import "./NormalMessagingBubble.less";
import "./linkifyUtils.less";

// Customized to not link URLs/emails without protocol (i.e. google.com or dewey@clever.com)
// Based on https://github.com/tasti/react-linkify/blob/master/src/decorators/defaultMatchDecorator.js
const linkify = new LinkifyIt({ fuzzyLink: false, fuzzyEmail: false });
export const matchDecorator = (text: string) => {
  return linkify.match(text);
};

// Customized to open links in new tabs
// Based on https://github.com/tasti/react-linkify/blob/master/src/decorators/defaultComponentDecorator.jsx
export const componentDecorator = (decoratedHref: string, decoratedText: string, key: number) => {
  return (
    <a
      className="LinkifyUtils--Link"
      href={decoratedHref}
      key={key}
      rel="noopener noreferrer"
      target="_blank"
    >
      {decoratedText}
    </a>
  );
};
