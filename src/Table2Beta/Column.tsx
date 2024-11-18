import * as PropTypes from "prop-types";

export interface Props {
  cell: {
    className?: Function | string;
    renderer: Function;
  };
  id: string;
  header?: {
    className?: string;
    content?: React.ReactNode;
  };
  noWrap?: boolean;
  sortable?: boolean;
  tooltip?: React.ReactNode;
  sortValueFn?: Function;
  width?: string; // Not included in propTypes but appears to work and is commonly used.
}

export const Column: React.FunctionComponent<Props> = function Column() {
  throw new Error("Configuration component - not meant to be rendered.");
};

Column.propTypes = {
  cell: PropTypes.shape({
    className: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
    renderer: PropTypes.func.isRequired,
  }).isRequired as any,
  id: PropTypes.string.isRequired,
  header: PropTypes.shape({
    className: PropTypes.string,
    content: PropTypes.node,
  }),
  noWrap: PropTypes.bool,
  sortable: PropTypes.bool,
  tooltip: PropTypes.node,
  sortValueFn: PropTypes.func,
};

export default Column;
