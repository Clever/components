import React from "react";

import Example, {ExampleCode} from "./Example";
import PropDocumentation from "./PropDocumentation";
import View from "./View";
import {FileInput} from "src";

export default function FileInputView() {
  const {cssClass} = FileInputView;

  return (
    <View className={cssClass.CONTAINER} title="FileInput">
      <p>An input component that allows users to drag and drop (or click and select) files.</p>
      <Example>
        <div>
          <ExampleCode>
            <FileInput
              label="Icon"
              accept="image/png"
              store={(file, {progress, success}) => {
                // Example store function using filestack
                let progressPercent = 0;
                progress(progressPercent);
                const intervalID = setInterval(() => {
                  if (progressPercent !== 100) {
                    progressPercent += 5;
                    progress(progressPercent);
                  } else {
                    success();
                    clearInterval(intervalID);
                  }
                }, 100);
              }}
            />
          </ExampleCode>
          <p>Takes a <code>store</code> function which is called when the user has selected a file that should be uploaded.
          The caller is responsible for calling 3 provided callbacks:</p>
          <ul>
            <li><code>success</code> - Called when the upload is complete</li>
            <li><code>error</code> - Called if the upload failed for unexpected reasons</li>
            <li><code>progress</code> - Called during upload with a number between 0-100 representing the % completed</li>
          </ul>
        </div>
      </Example>

      <PropDocumentation
        availableProps={[
          {
            name: "accept",
            type: "String",
            description: "Sets accepted list of files",
            defaultValue: "Any",
            optional: true,
          },
          {
            name: "className",
            type: "String",
            description: "Additional classname to apply to the flex box",
            optional: true,
          },
          {
            name: "label",
            type: "String",
            description: "Sets the label of the file input",
          },
          {
            name: "store",
            type: "Function",
            description: "Function to be called when the user has seleceted a file to be uploaded",
            defaultValue: "False",
          },
        ]}
        className={cssClass.PROPS}
        title="FileInput"
      />
    </View>
  );
}

FileInputView.cssClass = {
  CONTAINER: "FileInputView",
};
