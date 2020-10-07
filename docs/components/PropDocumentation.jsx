import classnames from "classnames";
import React, { PureComponent } from "react";
import * as PropTypes from "prop-types";

import { Table } from "src";

import "./PropDocumentation.less";

export default class PropDocumentation extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const { Column } = Table;
    const { cssClass } = PropDocumentation;
    const { availableProps, className, title } = this.props;

    return (
      <div className={classnames(cssClass.CONTAINER, className)}>
        <h3 className={cssClass.TITLE}>{title}</h3>
        <Table
          className={cssClass.TABLE}
          data={availableProps}
          rowIDFn={(p) => p.name}
          initialSortState={{ columnID: "name", direction: Table.sortDirection.ASCENDING }}
        >
          <Column
            id="name"
            header={{ content: "Prop Name" }}
            cell={{ renderer: (p) => <code>{p.name}</code> }}
            noWrap
            sortable
            sortValueFn={(p) => p.name.trim().toLowerCase()}
            className={cssClass.CODE}
          />
          <Column
            id="type"
            header={{ content: "Prop Type" }}
            cell={{ renderer: (p) => p.type }}
            noWrap
          />
          <Column
            id="description"
            header={{ content: "Description" }}
            cell={{ renderer: (p) => p.description }}
          />
          <Column
            id="defaultValue"
            header={{ content: "Default Value" }}
            cell={{ renderer: (p) => (p.defaultValue ? <code>{p.defaultValue}</code> : "None") }}
            noWrap
          />
          <Column
            id="optional"
            header={{ content: "Required" }}
            cell={{ renderer: (p) => (p.optional ? "False" : "True") }}
            noWrap
            sortable
            sortValueFn={(p) => p.optional}
          />
        </Table>
      </div>
    );
  }
}

PropDocumentation.propTypes = {
  availableProps: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      type: PropTypes.node.isRequired,
      description: PropTypes.node.isRequired,
      defaultValue: PropTypes.node,
      optional: PropTypes.bool,
    }),
  ),
  className: PropTypes.string,
  title: PropTypes.string,
};

PropDocumentation.defaultProps = {
  title: "Props:",
};

PropDocumentation.cssClass = {
  CONTAINER: "PropDocumentation",
  TABLE: "PropDocumentation--table",
  TITLE: "PropDocumentation--title",
};
