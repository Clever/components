import React from "react";

import Example, { ExampleCode } from "./Example";
import PropDocumentation from "./PropDocumentation";
import View from "./View";
import { FileInput, FormElementSize, SegmentedControl } from "src";

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

const cssClass = {
  CONTAINER: "FileInputView",
  CONFIG: "FileInputView--config",
  CONFIG_OPTIONS: "FileInputView--configOptions",
};

export default class FileInputView extends React.PureComponent {
  state = {
    size: FormElementSize.MEDIUM,
  };

  render() {
    return (
      <View
        className={cssClass.CONTAINER}
        title="FileInput"
        sourcePath="src/FileInput/FileInput.tsx"
      >
        <p>An input component that allows users to drag and drop (or click and select) files.</p>
        <Example>
          <div>
            <ExampleCode>
              <FileInput
                label="Icon"
                accept="image/png"
                store={(file, { progress, error, success }) => {
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
                size={this.state.size}
              />
            </ExampleCode>
            <p>
              Takes a <code>store</code> function which is called when the user has selected a file
              that should be uploaded. The caller is responsible for calling 3 provided callbacks:
            </p>
            <ul>
              <li>
                <code>success</code> - Called when the upload is complete
              </li>
              <li>
                <code>error</code> - Called if the upload failed for unexpected reasons with an
                optional error message
              </li>
              <li>
                <code>progress</code> - Called during upload with a number between 0-100
                representing the % completed
              </li>
            </ul>
            <div className={cssClass.CONFIG}>
              Size:
              <SegmentedControl
                className={cssClass.CONFIG_OPTIONS}
                options={[
                  { content: "small", value: FormElementSize.SMALL },
                  { content: "medium", value: FormElementSize.MEDIUM },
                  { content: "large", value: FormElementSize.LARGE },
                  { content: "full-width", value: FormElementSize.FULL_WIDTH },
                ]}
                value={this.state.size}
                onSelect={(value) => this.setState({ size: value })}
              />
            </div>
          </div>
        </Example>

        <Example>
          <p>
            To display a <code>FileInput</code> component without any text labels pass in the{" "}
            <code>iconOnly</code> option.
          </p>

          <ExampleCode className="ExampleCode">
            <FileInput className="FileInputView--icon-only" store={storeFn} iconOnly />
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
              description:
                "Sets the label of the file input. This prop is also used as part of the aria-label for accessibility",
              optional: true,
            },
            {
              name: "store",
              type: "Function",
              description: "Function to be called when the user has selected a file to be uploaded",
              defaultValue: "False",
            },
            {
              name: "iconOnly",
              type: "Boolean",
              description: "Render a FileInput component with only an icon",
              defaultValue: "false",
              optional: true,
            },
            {
              name: "size",
              type: "string",
              description: (
                <p>
                  The size of the input. One of:
                  <br />
                  {Object.keys(FormElementSize).map((size) => (
                    <span key={size}>
                      <code>FormElementSize.{size}</code>
                      <br />
                    </span>
                  ))}
                </p>
              ),
              optional: true,
              defaultValue: <code>FormElementSize.FULL_WIDTH</code>,
            },
          ]}
          className={cssClass.PROPS}
          title="FileInput"
        />
      </View>
    );
  }
}
