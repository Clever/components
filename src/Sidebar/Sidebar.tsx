import * as React from "react";
import * as classnames from "classnames";
import * as PropTypes from "prop-types";
import {Sticky, StickyContainer} from "react-sticky";

import "./Sidebar.less";

const cssClass = {
  CONTAINER: "Sidebar",
  SIDEBAR: "Sidebar--sidebar",
};


export default function sidebar(sticky, content) {
  return class extends React.PureComponent {
    propTypes = {
      style: PropTypes.object,
    }
    render() {
      return (
        <StickyContainer className={classnames(cssClass.CONTAINER)}>
          <div className={cssClass.SIDEBAR}>
            {!sticky ? content :
              <Sticky>
                {({style}) => <div style={style}>{content}</div>}
              </Sticky>}
          </div>
        </StickyContainer>
      );
    }
  };
}
