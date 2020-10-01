import * as React from "react";

import Example, { CodeSample, ExampleCode } from "./Example";
import PropDocumentation from "./PropDocumentation";
import View from "./View";
import { FamilyPortalLogo, FlexBox, ItemAlign, SegmentedControl } from "src";

import "./FamilyPortalLogoView.less";

const cssClass = {
  INTRO: "FamilyPortalLogoView--intro",
  PROPS: "FamilyPortalLogoView--props",
};

export default class FamilyPortalLogoView extends React.PureComponent {
  static cssClass = cssClass;

  render() {
    return (
      <View title="FamilyPortalLogo" sourcePath="src/FamilyPortalLogo/FamilyPortalLogo.tsx">
        <header className={cssClass.INTRO}>
          <p>Brand logo for the Family Portal</p>
          <CodeSample>
            {`
              import {FamilyPortalLogo} from "clever-components";
              // OR
              import FamilyPortalLogo from "clever-components/dist/FamilyPortalLogo"; // Avoids importing all of clever-components.
            `}
          </CodeSample>
        </header>

        <Example title="Basic Usage:">
          <ExampleCode>
            <FamilyPortalLogo />
          </ExampleCode>
        </Example>

        {this._renderProps()}
      </View>
    );
  }

  _renderProps() {
    return (
      <PropDocumentation
        title="<FamilyPortalLogo /> Props"
        availableProps={[
          {
            name: "className",
            type: "string",
            description: "Optional additional CSS class name to apply to the container.",
            optional: true,
          },
          {
            name: "svgClassName",
            type: "string",
            description: "Optional additional CSS class name to apply directly to the svg tag.",
          },
        ]}
        className={cssClass.PROPS}
      />
    );
  }
}
