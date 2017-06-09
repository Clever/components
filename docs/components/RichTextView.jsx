import React from "react";

import Example from "./Example";
import PropDocumentation from "./PropDocumentation";
import View from "./View";
import {RichText} from "src";

export default function DateInputView() {
  return (
    <View title="RichText" sourcePath="src/RichText/RichText.jsx">
      <p>
        RichText is a view that improves rendering of raw text - Specifically by linkifying urls and not discarding linebreaks.
      </p>
      <i>Note - Rendering large blobs of text with urls isn't the best from an accessibility perspective, when possible links should have readable titles, instead of just a url.</i>
      <h2>Without using RichText</h2>
      <Example>
        <p>{`
          Do not go gentle into that good night,
          Old age should burn and rave at close of day;
          Rage, rage against the dying of the light.
          
          - https://www.poets.org/poetsorg/poem/do-not-go-gentle-good-night
          - dylan.thomas@poems.com
        `}</p>
      </Example>
      <h2>Using RichText</h2>
      <Example>
        <RichText
          text={`
            Do not go gentle into that good night,
            Old age should burn and rave at close of day;
            Rage, rage against the dying of the light.
            
            - https://www.poets.org/poetsorg/poem/do-not-go-gentle-good-night
            - dylan.thomas@poems.com
          `}
        />
      </Example>

      <PropDocumentation
        availableProps={[
          {
            name: "text",
            type: "String",
            description: "The text to render",
            optional: false,
          },
        ]}
      />
    </View>
  );
}
