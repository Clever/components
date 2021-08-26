import * as React from "react";
import * as PropTypes from "prop-types";
import * as Dropzone from "react-dropzone";
import * as classnames from "classnames";

import { FlexBox, FlexItem } from "../flex";
import { FormElementSize, formElementSizeClassName, Size } from "../utils/Forms";

import "./FileInput.less";
import "../less/forms.less";

export interface Props {
  className?: string;
  customIcon?: JSX.Element;
  dropzoneClass?: string;
  iconOnly?: boolean;
  label?: string;
  store: Function;
  accept?: string;
  size?: Size;
}

interface State {
  fileKey: number;
  filename: string;
  error: string;
  progress: number;
  success: boolean;
}

function DefaultIcon() {
  return (
    <svg className="FileInput--Icon" width="42px" height="24px" viewBox="0 0 42 24">
      <g>
        <g transform="translate(-242.000000, -13.000000)" fill="#474c5e">
          <path d="M248.461538,23.1333333 C248.461538,23.1333333 249,16.7333333 255.461538,16.7333333 C258.692308,16.7333333 260.307692,18.3333333 260.307692,18.3333333 C260.307692,18.3333333 263,13 267.846154,13 C272.28333,13 275.884815,15.8553426 275.922774,20.7203129 C280.230769,19.9912817 284,24.1407304 284,28.5959361 C284,33.0511418 280.689148,37 277.269231,37 C273,37 255,37 248.461538,37 C244.153846,36.4622091 242,33.2356824 242,29.6715179 C242,26.8666667 243.615385,23.1333333 248.461538,23.1333333 Z M268.593411,29.0413873 L271.257909,29.0413873 C271.632318,29.0413873 271.728491,28.8236393 271.470635,28.5550334 L267.161561,24.0663241 C266.65173,23.5352402 265.816118,23.5316579 265.302848,24.0663241 L260.993774,28.5550334 C260.729939,28.8298671 260.831158,29.0413873 261.2065,29.0413873 L263.894912,29.0413873 L263.894912,37 L268.593411,37 L268.593411,29.0413873 Z" />
        </g>
      </g>
    </svg>
  );
}

function ErrorIcon() {
  return (
    <svg className="FileInput--Icon" width="42px" height="24px" viewBox="0 0 42 24">
      <g fill="#de004b">
        <path d="M33.9,7.7c0-4.9-3.6-7.7-8.1-7.7c-4.8,0-7.5,5.3-7.5,5.3s-1.6-1.6-4.8-1.6c-6.5,0-7,6.4-7,6.4c-4.8,0-6.5,3.7-6.5,6.5c0,3.6,2.2,6.8,6.5,7.3c6.5,0,24.5,0,28.8,0c3.4,0,6.7-3.9,6.7-8.4S38.2,7,33.9,7.7z M26.9,19.7h-9.3c-0.6,0-1-0.5-1-1c0-0.1,0-0.3,0.1-0.4h0l4.6-9.3h0c0.2-0.3,0.5-0.6,0.9-0.6c0.4,0,0.8,0.2,0.9,0.6h0l4.7,9.3c0.1,0.1,0.1,0.3,0.1,0.4C27.9,19.2,27.5,19.7,26.9,19.7z" />
        <circle cx="22.2" cy="17.6" r="1" />
        <rect x="21.4" y="11.2" width="1.7" height="4.4" />
      </g>
    </svg>
  );
}

function SuccessIcon() {
  return (
    <svg className="FileInput--Icon" width="42px" height="24px" viewBox="0 0 42 24">
      <g fill="#009e78" transform="translate(-242.000000, -13.000000)">
        <path d="M248.461538,23.1333333 C248.461538,23.1333333 249,16.7333333 255.461538,16.7333333 C258.692308,16.7333333 260.307692,18.3333333 260.307692,18.3333333 C260.307692,18.3333333 263,13 267.846154,13 C272.28333,13 275.884815,15.8553426 275.922774,20.7203129 C280.230769,19.9912817 284,24.1407304 284,28.5959361 C284,33.0511418 280.689148,37 277.269231,37 C273,37 255,37 248.461538,37 C244.153846,36.4622091 242,33.2356824 242,29.6715179 C242,26.8666667 243.615385,23.1333333 248.461538,23.1333333 Z M271.907449,23.5740441 C272.037079,23.4444141 272.037079,23.2221913 271.907449,23.0925614 L269.57411,20.7592219 C269.44448,20.6295919 269.222257,20.6295919 269.092627,20.7592219 L262.000016,27.8703517 L258.907415,24.7592324 C258.777785,24.6296024 258.555562,24.6296024 258.425932,24.7592324 L256.092593,27.0925719 C255.962963,27.2222018 255.962963,27.4444246 256.092593,27.5740546 L261.759274,33.2407361 C261.833349,33.2962918 261.907423,33.333329 262.000016,33.333329 C262.092609,33.333329 262.166683,33.2962918 262.240757,33.2407361 L271.907449,23.5740441 Z" />
      </g>
    </svg>
  );
}

function UploadingIcon(props) {
  return (
    <svg className="FileInput--Icon" width="42px" height="24px" viewBox="0 0 42 24">
      <linearGradient id="bg" x1="0.5" y1="1" x2="0.5" y2="0">
        <stop offset="0%" stopOpacity="1" stopColor="#2e00d9" />
        <stop offset={`${props.percent}%`} stopOpacity="1" stopColor="#2e00d9" />
        <stop offset={`${props.percent}%`} stopOpacity="1" stopColor="#d6d7de" />
        <stop offset="100%" stopOpacity="1" stopColor="#d6d7de" />
      </linearGradient>
      <g>
        <g transform="translate(-242.000000, -13.000000)" fill="url(#bg)">
          <path d="M248.461538,23.1333333 C243.615385,23.1333333 242,26.8666667 242,29.6715179 C242,33.2356824 244.153846,36.4622091 248.461538,37 C255,37 273,37 277.269231,37 C280.689148,37 284,33.0511418 284,28.5959361 C284,24.1407304 280.230769,19.9912817 275.922774,20.7203129 C275.884815,15.8553426 272.28333,13 267.846154,13 C263,13 260.307692,18.3333333 260.307692,18.3333333 C260.307692,18.3333333 258.692308,16.7333333 255.461538,16.7333333 C249,16.7333333 248.461538,23.1333333 248.461538,23.1333333 Z" />
        </g>
      </g>
    </svg>
  );
}

UploadingIcon.propTypes = {
  percent: PropTypes.number.isRequired,
};

function renderLabel(text) {
  return <label className="FileInput--Label">{text}</label>;
}

function renderMessage(text, selected) {
  const classes = {
    ["FileInput--Text"]: true,
    ["FileInput--Text--selected"]: selected,
  };

  return (
    <FlexItem className={classnames(classes)} grow>
      {text}
    </FlexItem>
  );
}

const propTypes = {
  className: PropTypes.string,
  customIcon: PropTypes.node,
  dropzoneClass: PropTypes.string,
  iconOnly: PropTypes.bool,
  label: PropTypes.string,
  store: PropTypes.func.isRequired,
  accept: PropTypes.string,
  size: PropTypes.string,
};

const defaultProps = {
  iconOnly: false,
  className: "",
  size: FormElementSize.FULL_WIDTH,
};

export class FileInput extends React.Component<Props, State> {
  static propTypes = propTypes;
  static defaultProps = defaultProps;

  constructor(props: Props) {
    super(props);
    this.state = {
      fileKey: null,
      filename: null,
      error: null,
      progress: null,
      success: null,
    };
    this.onDropRejected = this.onDropRejected.bind(this);
    this.onDropAccepted = this.onDropAccepted.bind(this);
  }

  onDropAccepted(files) {
    const fileKey = Math.random();
    this.setState({ fileKey });
    this.setState({ filename: files[0].name, error: null, progress: 0, success: null });
    this.props.store(files[0], {
      success: () => {
        if (this.state.fileKey !== fileKey) {
          return; // If the user drops multiple files we want to only treat the last one as "success"
        }
        this.setState({ success: true });
      },
      error: (errMsg = "Unknown error") => {
        this.setState({ error: errMsg });
      },
      progress: (progress) => {
        if (this.state.fileKey !== fileKey) {
          return; // If the user drops multiple files we want to only take progress from the active upload
        }
        this.setState({ progress });
      },
    });
  }

  onDropRejected() {
    this.setState({ filename: null, error: `Invalid ${this.props.label}`, success: null });
  }

  render() {
    const { iconOnly, label } = this.props;
    const dropzoneStyle = iconOnly ? { display: "inline-block" } : {};

    return (
      <Dropzone
        accept={this.props.accept}
        className={classnames("DropzoneContainer", this.props.dropzoneClass)}
        style={dropzoneStyle}
        multiple={false}
        onDropAccepted={this.onDropAccepted}
        onDropRejected={this.onDropRejected}
      >
        {({ isDragActive, isDragReject }) => {
          let message = `Upload ${this.props.label}`;
          let icon = <DefaultIcon />;
          let selected = false;
          if (isDragActive) {
            selected = true;
            message = "";
          } else if (isDragReject || this.state.error) {
            selected = true;
            message = this.state.error || `Invalid ${this.props.label}`;
            icon = <ErrorIcon />;
          } else if (this.state.success) {
            selected = true;
            message = this.state.filename;
            icon = <SuccessIcon />;
          } else if (this.state.filename) {
            icon = <UploadingIcon percent={this.state.progress} />;
            message = this.state.filename;
            selected = true;
          }
          if (this.props.customIcon) {
            icon = this.props.customIcon;
          }
          return (
            <FlexBox
              className={classnames(
                "FileInput",
                formElementSizeClassName(this.props.size),
                this.props.className,
                !!this.state.filename &&
                  !this.state.success &&
                  !this.state.error &&
                  "FileInput--AttachmentIsUploading",
                iconOnly && "FileInput--IconOnly",
              )}
            >
              {!iconOnly && selected && renderLabel(label)}
              {!iconOnly && renderMessage(message, selected)}
              {icon}
            </FlexBox>
          );
        }}
      </Dropzone>
    );
  }
}
