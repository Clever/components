import React from "react";

import Example from "./Example";
import View from "./View";
import {FileInput} from "src";

function store(file, {progress, success}) {
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
}

export default function FileInputView() {
  const {cssClass} = FileInputView;

  return (
    <View className={cssClass.CONTAINER} title="FileInput">
      <p>An input component that allows users to drag and drop (or click and select) files.</p>
      <Example
        code={`
          // Example store function using filestack
          async function store(file, {success, error, progress}) => {
            try {
              await filestack.upload(file, {
                onProgress: (p) => { progress(p); }
              });
              success();
            } catch (e) {
              error(e);
            }
          }
          
          <FileInput
            label="Icon"
            store={store}
            accept="image/png"
          />
        `}
      >
        <div>
          <FileInput
            label="Icon"
            store={store}
            accept="image/png"
          />
          <p>Takes a <code>store</code> function which is called when the user has selected a file that should be uploaded.
          The caller is responsible for calling 3 provided callbacks:</p>
          <ul>
            <li><code>success</code> - Called when the upload is complete</li>
            <li><code>error</code> - Called if the upload failed for unexpected reasons</li>
            <li><code>progress</code> - Called during upload with a number between 0-100 representing the % completed</li>
          </ul>
        </div>
      </Example>
    </View>
  );
}

FileInputView.cssClass = {
  CONTAINER: "FileInputView",
};
