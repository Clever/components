import * as React from "react";


export default function Column() {
  throw new Error("Configuration component - not meant to be rendered.");
}

Column.propTypes = {
  cell:  React.PropTypes.shape({
    className:  React.PropTypes.string,
    renderer:  React.PropTypes.func.isRequired,
  }),
  id:  React.PropTypes.string.isRequired,
  header:  React.PropTypes.shape({
    className:  React.PropTypes.string,
    content:  React.PropTypes.node,
  }),
  noWrap:  React.PropTypes.bool,
  sortable:  React.PropTypes.bool,
  sortValueFn:  React.PropTypes.func,
};
