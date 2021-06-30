import * as React from "react";

import Example, { CodeSample, ExampleCode } from "./Example";
import PropDocumentation from "./PropDocumentation";
import View from "./View";
import { AttachmentPreview, Button } from "src";

import "./AttachmentPreviewView.less";

const cssClass = {
  CONTAINER: "AttachmentPreviewView",
  INTRO: "AttachmentPreviewView--intro",
  PROPS: "AttachmentPreviewView--props",
};

export default class AttachmentPreviewView extends React.PureComponent {
  static cssClass = cssClass;

  state = {
    showingPreview: false,
  };

  render() {
    const { showingPreview } = this.state;

    const file = {
      id: "12345",
      title: "Raccooooooon.jpg",
      fileType: "jpg",
      url:
        "https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fppcorn.com%2Fus%2Fwp-content%2Fuploads%2Fsites%2F14%2F2016%2F01%2Fcute-raccoon-ppcorn.jpg&f=1&nofb=1",
    };

    return (
      <View
        className={cssClass.CONTAINER}
        title="AttachmentPreview"
        sourcePath="src/AttachmentPreview/AttachmentPreview.tsx"
      >
        <header className={cssClass.INTRO}>
          <p>A full page preview for messaging attachments.</p>
          <p>
            Currently only used for images, but eventually will be used for PDFs and other
            attachment types.
          </p>
          <CodeSample>
            {`
              import {AttachmentPreview} from "clever-components";
              // OR
              import AttachmentPreview from "clever-components/dist/AttachmentPreview"; // Avoids importing all of clever-components.
            `}
          </CodeSample>
        </header>

        <Example title="Basic Usage:">
          <ExampleCode>
            <Button onClick={() => this.setState({ showingPreview: true })}>Show preview</Button>
            {showingPreview && (
              <AttachmentPreview
                attachmentID={file.id}
                attachmentName={file.title}
                attachmentURL={file.url}
                fileType={file.fileType}
                onClickDownload={() => console.log("Downloaded attachment!")}
                onClose={() => this.setState({ showingPreview: false })}
              />
            )}
          </ExampleCode>
        </Example>

        {this._renderProps()}
      </View>
    );
  }

  _renderProps() {
    return (
      <PropDocumentation
        title="<AttachmentPreview /> Props"
        availableProps={[
          {
            name: "attachmentID",
            type: "string",
            description: "Unique ID for a given attachment",
          },
          {
            name: "attachmentName",
            type: "string",
            description: "The name of the attachment file",
          },
          {
            name: "attachmentURL",
            type: "string",
            description: "URL for the attachment",
          },
          {
            name: "className",
            type: "string",
            description: "Optional class name",
            optional: true,
          },
          {
            name: "closeButtonAriaLabel",
            type: "string",
            description: "Optional ARIA label for the close button",
            defaultValue: "close attachment preview",
            optional: true,
          },
          {
            name: "downloadButtonText",
            type: "string",
            description: "Optional text for the download button",
            defaultValue: "Download",
            optional: true,
          },
          {
            name: "fileType",
            type: "AttachmentFileType",
            description: "FileType for the attachment",
          },
          {
            name: "onClickDownload",
            type: "(attachmentID: string) => void",
            description: "Function to run on clicking the download button",
          },
          {
            name: "onClose",
            type: "() => void",
            description: "function to run on clicking the close button",
          },
        ]}
        className={cssClass.PROPS}
      />
    );
  }
}
