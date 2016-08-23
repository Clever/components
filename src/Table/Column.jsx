import {PropTypes} from "react";


export default function Column() {
  throw new Error("Configuration component - not meant to be rendered.");
}

Column.propTypes = {
  cell: PropTypes.shape({
    className: PropTypes.string,
    renderer: PropTypes.func.isRequired,
  }),
  id: PropTypes.string,
  header: PropTypes.shape({
    className: PropTypes.string,
    content: PropTypes.node,
  }),
  noWrap: PropTypes.bool,
  sortable: PropTypes.bool,
  sortValueFn: PropTypes.func,
};
