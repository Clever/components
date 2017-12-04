import * as PropTypes from "prop-types";
import {Table} from "clever-components";
import MorePropTypes from "clever-components/dist/utils/MorePropTypes";


export default function Tab() {
  throw new Error("Configuration component - not meant to be rendered.");
}

Tab.propTypes = {
  children: MorePropTypes.instanceOfComponent(Table),
  name: PropTypes.string.isRequired,
};
