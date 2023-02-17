import * as FontAwesome from "react-fontawesome";
import * as React from "react";
import * as PropTypes from "prop-types";
import * as classnames from "classnames";
import TextareaAutosize from "react-autosize-textarea";

import { FormElementSize, formElementSizeClassName, Size } from "../utils/Forms";
import { FileInput } from "../FileInput/FileInput";
import { FlexBox } from "../flex";

import "./TextArea.less";
import "../less/forms.less";

export interface Props {
  disabled?: boolean;
  error?: string;
  label?: string;
  maxLength?: number;
  minLength?: number;
  name: string;
  id?: string;
  dataTestID?: string;
  onBlur?: React.FocusEventHandler<HTMLTextAreaElement>;
  onChange?: React.ChangeEventHandler<HTMLTextAreaElement>;
  onFocus?: React.FocusEventHandler<HTMLTextAreaElement>;
  onKeyDown?: React.KeyboardEventHandler<HTMLTextAreaElement>;
  onKeyPress?: React.KeyboardEventHandler<HTMLTextAreaElement>;
  onKeyUp?: React.KeyboardEventHandler<HTMLTextAreaElement>;
  optional?: boolean;
  placeholder?: string;
  readOnly?: boolean;
  required?: boolean;
  spellCheck?: boolean;
  value?: string | string[] | number;
  className?: string;
  autoResize?: boolean;
  rows?: number;
  size?: Size;
  showUploadAttachmentButton?: boolean;
  storeUpload?: (file, callbacks) => void;
  fileUploadCustomIcon?: JSX.Element;
  uploads?: React.ReactNode;
}

interface State {
  hasBeenFocused: boolean;
  inFocus: boolean;
}

const propTypes = {
  disabled: PropTypes.bool,
  error: PropTypes.string,
  label: PropTypes.string,
  maxLength: PropTypes.number,
  minLength: PropTypes.number,
  name: PropTypes.string.isRequired,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  onKeyDown: PropTypes.func,
  onKeyPress: PropTypes.func,
  onKeyUp: PropTypes.func,
  optional: PropTypes.bool,
  placeholder: PropTypes.node,
  readOnly: PropTypes.bool,
  required: PropTypes.bool,
  spellCheck: PropTypes.bool,
  value: PropTypes.node,
  className: PropTypes.string,
  autoResize: PropTypes.bool,
  rows: PropTypes.number,
  size: PropTypes.oneOf(Object.values(FormElementSize)),
  showUploadAttachmentButton: PropTypes.bool,
  storeUpload: PropTypes.func,
  fileUploadCustomIcon: PropTypes.node,
};

const defaultProps = {
  rows: 1,
  size: FormElementSize.FULL_WIDTH,
};

export class TextArea extends React.Component<Props, State> {
  static propTypes = propTypes;
  static defaultProps = defaultProps;

  static validateProps(props) {
    if (props.required && props.optional) {
      console.warn("You should not pass both `required` and `optional` on a TextArea.");
    }

    if (props.readOnly && props.disabled) {
      console.warn(
        "The readOnly, disabled props on a TextArea are mutually exclusive. If both are passed readOnly is used",
      );
    }

    return props;
  }

  constructor(props: Props) {
    super(TextArea.validateProps(props));

    this.state = { inFocus: false, hasBeenFocused: false };
  }

  // eslint-disable-next-line react/sort-comp
  private textAreaEl = React.createRef<HTMLTextAreaElement>();

  /* Insert any additional lifecycle methods,
     event handlers, and helper methods here */

  onFocus: React.FocusEventHandler<HTMLTextAreaElement> = (e) => {
    const { onFocus } = this.props;

    this.setState({ inFocus: true });
    if (onFocus) {
      onFocus(e);
    }
  };

  onBlur: React.FocusEventHandler<HTMLTextAreaElement> = (e) => {
    const { onBlur } = this.props;

    this.setState({ inFocus: false, hasBeenFocused: true });
    if (onBlur) {
      onBlur(e);
    }
  };

  onKeyDown: React.KeyboardEventHandler<HTMLTextAreaElement> = (e) => {
    const { onKeyDown } = this.props;

    if (onKeyDown) {
      onKeyDown(e);
    }
  };

  onKeyPress: React.KeyboardEventHandler<HTMLTextAreaElement> = (e) => {
    const { onKeyPress } = this.props;

    if (onKeyPress) {
      onKeyPress(e);
    }
  };

  onKeyUp: React.KeyboardEventHandler<HTMLTextAreaElement> = (e) => {
    const { onKeyUp } = this.props;

    if (onKeyUp) {
      onKeyUp(e);
    }
  };

  focus() {
    this.textAreaEl.current.focus();
  }

  // Give consumers that set up a React ref access to the <textarea> height
  textAreaHeight(): number | undefined {
    return this.textAreaEl.current?.offsetHeight || undefined;
  }

  currentErrorMessage(): string {
    const { error, value, required } = this.props;
    const { hasBeenFocused } = this.state;

    let errorMessage = "";

    if (required && hasBeenFocused && !value) {
      errorMessage = "required";
    }

    if (error) {
      errorMessage = error;
    }

    return errorMessage;
  }

  renderNote(errorMessage) {
    const { required, optional } = this.props;
    let inputNote;

    if (required) {
      inputNote = <span className="TextArea--required">required</span>;
    }
    if (optional) {
      inputNote = <span className="TextArea--optional">optional</span>;
    }

    if (errorMessage) {
      inputNote = (
        <span className="TextArea--error">
          <FontAwesome name="exclamation-triangle" /> {errorMessage}
        </span>
      );
    }

    return inputNote;
  }

  render() {
    let wrapperClass = "TextArea";
    const errorMessage = this.currentErrorMessage();
    const valid = errorMessage === "";

    if (errorMessage) wrapperClass += " TextArea--hasError";

    if (this.props.readOnly) {
      wrapperClass += " TextArea--readonly";
    } else if (this.props.disabled) {
      wrapperClass += " TextArea--disabled";
    } else if (this.state.inFocus) {
      wrapperClass += " TextArea--inFocus";
    }

    // placeholder shown
    if (!this.props.value && this.props.placeholder) {
      wrapperClass += " TextArea--placeholder-shown";
    }

    // note on the upper right corner
    const inputNote = this.renderNote(errorMessage);

    // (a11y) The 'for' attribute of the label tag and the 'id' attribute
    // of the textarea tag should match so screen readers can determine which
    // label goes with which form element. If an 'id' isn't specified, we
    // use 'name' instead for this purpose.
    const id = this.props.id || this.props.name;

    const textAreaProps = {
      ["aria-invalid"]: !valid,
      ["aria-label"]: this.props.label || this.props.placeholder,
      className: "TextArea--input",
      disabled: this.props.disabled,
      id,
      ["data-testid"]: this.props.dataTestID,
      maxLength: this.props.maxLength,
      minLength: this.props.minLength,
      name: this.props.name,
      onBlur: this.onBlur,
      onChange: this.props.onChange,
      onFocus: this.onFocus,
      onKeyDown: this.onKeyDown,
      onKeyPress: this.onKeyPress,
      onKeyUp: this.onKeyUp,
      placeholder: this.props.placeholder,
      readOnly: this.props.readOnly,
      ref: this.textAreaEl,
      required: this.props.required,
      spellCheck: this.props.spellCheck,
      value: this.props.value,
      rows: this.props.rows,
    };

    // Don't increment rows in readOnly so that there is no extra spacing.
    let rows = this.props.rows;
    if ((this.props.placeholder || this.props.autoResize) && !this.props.readOnly) {
      // Need to add another row for autoGrow since it seems to collapse in a way that conflicts with the placeholder
      // margin
      rows = this.props.rows + 1;
    }

    let textarea = <textarea {...textAreaProps} rows={rows} />;
    if (this.props.autoResize) {
      textarea = <TextareaAutosize {...textAreaProps} rows={rows} />;
    }

    return (
      <div
        className={classnames(
          wrapperClass,
          formElementSizeClassName(this.props.size),
          this.props.className,
        )}
      >
        <div className="TextArea--infoRow">
          {this.props.label && (
            <label className="TextArea--label" htmlFor={id}>
              {this.props.label}
            </label>
          )}
          <span aria-live="polite">{inputNote}</span>
        </div>
        <FlexBox>
          {textarea}
          {this.props.showUploadAttachmentButton && (
            <FileInput
              store={this.props.storeUpload}
              customIcon={this.props.fileUploadCustomIcon}
              iconOnly
            />
          )}
        </FlexBox>
        {this.props.uploads}
      </div>
    );
  }
}
