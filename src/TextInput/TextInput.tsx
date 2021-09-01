import * as FontAwesome from "react-fontawesome";
import * as React from "react";
import * as PropTypes from "prop-types";
import * as classnames from "classnames";
import * as _ from "lodash";

import { FormElementSize, formElementSizeClassName, AutoComplete } from "../utils/Forms";
import { Values } from "../utils/types";

import "./TextInput.less";
import "../less/forms.less";

export interface Props {
  autoComplete?: AutoComplete;
  disabled?: boolean;
  className?: string;
  disableAutocomplete?: boolean;
  enableShow?: boolean;
  error?: string;
  /** Temporary prop to allow overriding the text with a translation. */
  hideButtonText?: string;
  label?: string;
  name: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onKeyDown?: React.KeyboardEventHandler<HTMLInputElement>;
  onKeyPress?: React.KeyboardEventHandler<HTMLInputElement>;
  onKeyUp?: React.KeyboardEventHandler<HTMLInputElement>;
  onFocus?: React.FocusEventHandler<HTMLInputElement>;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  optional?: boolean;
  placeholder?: string;
  placeholderCaps?: boolean;
  readOnly?: boolean;
  required?: boolean;
  /** Temporary prop to allow overriding the text with a translation. */
  requiredText?: string;
  /** Temporary prop to allow overriding the text with a translation. */
  showButtonText?: string;
  size?: Values<typeof FormElementSize>;
  type?: string;
  value?: React.ReactNode;
  [additionalProp: string]: any;
}

interface State {
  hasBeenFocused: boolean;
  hidden: boolean;
  inFocus: boolean;
}

const propTypes = {
  autoComplete: PropTypes.string,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  disableAutocomplete: PropTypes.bool,
  enableShow: PropTypes.bool,
  error: PropTypes.string,
  hideButtonText: PropTypes.string,
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  onKeyDown: PropTypes.func,
  onKeyPress: PropTypes.func,
  onKeyUp: PropTypes.func,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  optional: PropTypes.bool,
  placeholder: PropTypes.string,
  placeholderCaps: PropTypes.bool,
  readOnly: PropTypes.bool,
  required: PropTypes.bool,
  requiredText: PropTypes.string,
  showButtonText: PropTypes.string,
  size: PropTypes.oneOf(Object.values(FormElementSize)),
  type: PropTypes.string,
  value: PropTypes.node,
};

const defaultProps = {
  placeholderCaps: false,
  size: FormElementSize.FULL_WIDTH,
};

export class TextInput extends React.Component<Props, State> {
  static propTypes = propTypes;
  static defaultProps = defaultProps;

  static validateProps(props) {
    if (props.required && props.optional) {
      console.warn("You should not pass both `required` and `optional` on a TextInput.");
    }

    if (props.readOnly && props.disabled) {
      console.warn(
        "The readOnly, disabled props on a TextArea are mutually exclusive. If both are passed readOnly is used",
      );
    }

    return props;
  }

  constructor(props: Props) {
    super(TextInput.validateProps(props));
    this.state = { inFocus: false, hasBeenFocused: false, hidden: true };
  }

  // eslint-disable-next-line react/sort-comp
  private input = React.createRef<HTMLInputElement>();

  onFocus: React.FocusEventHandler<HTMLInputElement> = (e) => {
    const { onFocus } = this.props;

    this.setState({ inFocus: true });
    if (onFocus) {
      onFocus(e);
    }
  };

  onBlur: React.FocusEventHandler<HTMLInputElement> = (e) => {
    const { onBlur } = this.props;

    this.setState({ inFocus: false, hasBeenFocused: true });
    if (onBlur) {
      onBlur(e);
    }
  };

  focus() {
    this.input.current.focus();
  }

  toggleHidden = () => {
    this.setState({ hidden: !this.state.hidden });
  };

  currentErrorMessage(): string {
    const { error, value, required, requiredText } = this.props;
    const { hasBeenFocused } = this.state;

    let errorMessage = "";

    if (required && hasBeenFocused && !value) {
      errorMessage = requiredText || "required";
    }

    if (error) {
      errorMessage = error;
    }

    return errorMessage;
  }

  renderNote(errorMessage) {
    const { required, requiredText, optional } = this.props;
    let inputNote;

    if (required) {
      inputNote = <span className="TextInput--required">{requiredText || "required"}</span>;
    }
    if (optional) {
      inputNote = <span className="TextInput--optional">optional</span>;
    }

    if (errorMessage) {
      inputNote = (
        <span className="TextInput--error">
          <FontAwesome name="exclamation-triangle" /> {errorMessage}
        </span>
      );
    }

    return inputNote;
  }

  render() {
    let wrapperClass = "TextInput";
    const errorMessage = this.currentErrorMessage();
    const valid = errorMessage === "";

    // add additional wrapper classes
    if (errorMessage) wrapperClass += " TextInput--hasError";

    if (this.props.readOnly) {
      wrapperClass += " TextInput--readonly";
    } else if (this.props.disabled) {
      wrapperClass += " TextInput--disabled";
    } else if (this.state.inFocus) {
      wrapperClass += " TextInput--inFocus";
    }

    // placeholder shown with caps
    if (!this.props.value && this.props.placeholder && this.props.placeholderCaps) {
      wrapperClass += " TextInput--placeholder-shown";
    } else if (!this.props.value && this.props.placeholder) {
      wrapperClass += " TextInput--placeholder-shown-no-caps";
    }

    // note on the upper right corner
    const inputNote = this.renderNote(errorMessage);

    let type;
    if (this.props.type === "password") {
      type = this.state.hidden ? "password" : "text";
    } else {
      type = this.props.type || "text";
    }

    let autoComplete;
    if (this.props.disableAutocomplete) {
      autoComplete = "off";
    } else if (this.props.autoComplete) {
      autoComplete = this.props.autoComplete;
    }

    const additionalProps = _.omit(
      this.props,
      Object.keys(propTypes) as (keyof typeof propTypes)[],
    );

    // (a11y) The 'for' attribute of the label tag and the 'id' attribute
    // of the input tag should match so screen readers can determine which
    // label goes with which form element. If an 'id' isn't specified, we
    // use 'name' instead for this purpose.
    const id = additionalProps.id || this.props.name;

    const hideButtonText = this.props.hideButtonText || "Hide";
    const showButtonText = this.props.showButtonText || "Show";

    return (
      <div
        className={classnames(
          wrapperClass,
          formElementSizeClassName(this.props.size),
          this.props.className,
        )}
      >
        <div className="TextInput--infoRow">
          <label className="TextInput--label" htmlFor={id}>
            {this.props.label}
          </label>
          <span aria-live="polite">{inputNote}</span>
        </div>
        <input
          {...additionalProps}
          id={id}
          autoComplete={autoComplete}
          className="TextInput--input"
          disabled={this.props.disabled}
          name={this.props.name}
          onBlur={this.onBlur}
          onChange={this.props.onChange}
          onKeyDown={this.props.onKeyDown}
          onKeyPress={this.props.onKeyPress}
          onKeyUp={this.props.onKeyUp}
          onFocus={this.onFocus}
          placeholder={this.props.placeholder}
          readOnly={this.props.readOnly}
          ref={this.input}
          required={this.props.required}
          type={type}
          value={this.props.value as any}
          aria-invalid={!valid}
          aria-label={this.props.label}
        />
        {this.props.enableShow && (
          <button
            type="button"
            className="TextInput--link"
            onClick={this.toggleHidden}
            onMouseDown={(event) => {
              // This prevents focus from jumping to the address bar or
              // the first element on voiceover-enabled iOS devices
              event.preventDefault();
              event.stopPropagation();
            }}
          >
            {this.state.hidden ? showButtonText : hideButtonText}
          </button>
        )}
      </div>
    );
  }
}
