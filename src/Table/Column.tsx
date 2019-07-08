import * as PropTypes from "prop-types";

export default function Column() {
  throw new Error("Configuration component - not meant to be rendered.");
}

Column.propTypes = {
  cell: PropTypes.shape({
    className: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
    renderer: PropTypes.func.isRequired,
  }),
  id: PropTypes.string.isRequired,
  header: PropTypes.shape({
    className: PropTypes.string,
    content: PropTypes.node,
  }),
  noWrap: PropTypes.bool,
  sortable: PropTypes.bool,
  sortValueFn: PropTypes.func,
};
