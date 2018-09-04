import React from "react";

import Example, {ExampleCode} from "./Example";
import PropDocumentation from "./PropDocumentation";
import View from "./View";
import {FileInput} from "src";

import "./FileInputView.less";

function isError() {
  return false;
}

function storeFn(_file, { progress, success }) {
  let currentProgress = 0;
  progress(currentProgress);

  const interval = setInterval(() => {
    currentProgress += 2;

    if (currentProgress < 100) {
      progress(currentProgress);
    } else {
      clearInterval(interval);
      success();
    }
  }, 32);
}

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
              store={(file, {progress, error, success}) => {
                // Example store function using filestack
                let progressPercent = 0;
                progress(progressPercent);
                const intervalID = setInterval(() => {
                  if (progressPercent !== 100) {
                    progressPercent += 5;
                    progress(progressPercent);
                  } else if (isError()) {
                    error("An error occurred");
                    clearInterval(intervalID);
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
            <li><code>error</code> - Called if the upload failed for unexpected reasons with an optional error message</li>
            <li><code>progress</code> - Called during upload with a number between 0-100 representing the % completed</li>
          </ul>
        </div>
      </Example>

      <Example>
        <p>
          To display a <code>FileInput</code> component without any text labels
          pass in the <code>displayLabels=&#123;false&#125;</code> option.
        </p>

        <ExampleCode className="ExampleCode">
          <FileInput
            className="FileInputView--icon-only"
            displayLabels={false}
            store={storeFn}
          />
        </ExampleCode>
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
            optional: true
          },
          {
            name: "store",
            type: "Function",
            description: "Function to be called when the user has seleceted a file to be uploaded",
            defaultValue: "False",
          },
          {
            name: "displayLabels",
            type: "Boolean",
            description: "Display text labels inside of the component",
            defaultValue: "true",
            optional: true
          }
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
