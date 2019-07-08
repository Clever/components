import * as React from "react";
import * as PropTypes from "prop-types";
import * as classnames from "classnames";
import TextareaAutosize from "react-autosize-textarea";

import { FormElementSize, formElementSizeClassName, Size } from "../utils/Forms";

import "./TextArea.less";
import "../less/forms.less";

export interface Props {
  disabled?: boolean;
  error?: string;
  label?: string;
  maxLength?: number;
  minLength?: number;
  name: string;
  onBlur?: () => void;
  onChange?: React.ChangeEventHandler<HTMLTextAreaElement>;
  onFocus?: () => void;
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
      throw new Error("You cannot pass both `required` and `optional` on a TextArea.");
    }

    if (["readOnly", "disabled", "inFocus"].filter(x => props[x]).length > 1) {
      throw new Error(
        "The readOnly, disabled, and inFocus props on a TextArea are mutually exclusive.",
      );
    }

    return props;
  }

  constructor(props: Props) {
    super(TextArea.validateProps(props));

    this.state = { inFocus: false, hasBeenFocused: false };
    this.onFocus = this.onFocus.bind(this);
    this.onBlur = this.onBlur.bind(this);
  }

  // eslint-disable-next-line react/sort-comp
  private textAreaEl = React.createRef<HTMLTextAreaElement>();

  /* Insert any additional lifecycle methods,
     event handlers, and helper methods here */

  onFocus() {
    const { onFocus } = this.props;

    this.setState({ inFocus: true });
    if (onFocus) {
      onFocus();
    }
  }

  onBlur() {
    const { onBlur } = this.props;

    this.setState({ inFocus: false, hasBeenFocused: true });
    if (onBlur) {
      onBlur();
    }
  }

  focus() {
    this.textAreaEl.current.focus();
  }

  render() {
    let wrapperClass = "TextArea";

    if (this.props.error) wrapperClass += " TextArea--hasError";

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
    let inputNote;
    if (this.props.required) {
      inputNote = (
        <span
          className={`TextArea--${
            this.state.hasBeenFocused && !this.props.value ? "error" : "required"
          }`}
        >
          required
        </span>
      );
    }
    if (this.props.optional) {
      inputNote = <span className="TextArea--optional">optional</span>;
    }

    if (this.props.error) {
      inputNote = <span className="TextArea--error">{this.props.error}</span>;
    }

    const textAreaProps = {
      className: "TextArea--input",
      disabled: this.props.disabled,
      maxLength: this.props.maxLength,
      minLength: this.props.minLength,
      name: this.props.name,
      onBlur: this.onBlur,
      onChange: this.props.onChange,
      onFocus: this.onFocus,
      placeholder: this.props.placeholder,
      readOnly: this.props.readOnly,
      ref: this.textAreaEl,
      required: this.props.required,
      spellCheck: this.props.spellCheck,
      value: this.props.value,
      rows: this.props.rows,
    };

    let rows = this.props.rows;
    if (this.props.placeholder) {
      // Need to add another row for autoGrow since it seems to collapse in a way that conflicts with the placeholder
      // margin
      rows = this.props.rows + 1;
    }

    let textarea = <textarea {...textAreaProps} rows={rows} />;
    if (this.props.autoResize) {
      rows = this.props.rows + 1;
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
          <label className="TextArea--label" htmlFor={this.props.name}>
            {this.props.label}
          </label>
          {inputNote}
        </div>
        {textarea}
      </div>
    );
  }
}
