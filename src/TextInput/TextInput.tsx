import * as FontAwesome from "react-fontawesome";
import * as React from "react";
import * as PropTypes from "prop-types";
import * as classnames from "classnames";
import * as _ from "lodash";

import { FormElementSize, formElementSizeClassName } from "../utils/Forms";
import { Values } from "../utils/types";

import "./TextInput.less";
import "../less/forms.less";

export interface Props {
  disabled?: boolean;
  disableAutocomplete?: boolean;
  enableShow?: boolean;
  error?: string;
  label?: string;
  name: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onKeyPress?: React.KeyboardEventHandler<HTMLInputElement>;
  onFocus?: () => void;
  onBlur?: () => void;
  optional?: boolean;
  placeholder?: string;
  placeholderCaps?: boolean;
  readOnly?: boolean;
  required?: boolean;
  size?: Values<typeof FormElementSize>;
  type?: string;
  value?: React.ReactNode;
  className?: string;
  [additionalProp: string]: any;
}

interface State {
  hasBeenFocused: boolean;
  hidden: boolean;
  inFocus: boolean;
}

const propTypes = {
  className: PropTypes.string,
  disabled: PropTypes.bool,
  disableAutocomplete: PropTypes.bool,
  enableShow: PropTypes.bool,
  error: PropTypes.string,
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  onKeyPress: PropTypes.func,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  optional: PropTypes.bool,
  placeholder: PropTypes.string,
  placeholderCaps: PropTypes.bool,
  readOnly: PropTypes.bool,
  required: PropTypes.bool,
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
    super(TextInput.validateProps(props));
    this.state = { inFocus: false, hasBeenFocused: false, hidden: true };
    this.onFocus = this.onFocus.bind(this);
    this.onBlur = this.onBlur.bind(this);
    this.toggleHidden = this.toggleHidden.bind(this);
  }

  // eslint-disable-next-line react/sort-comp
  private input = React.createRef<HTMLInputElement>();

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
    this.input.current.focus();
  }

  toggleHidden() {
    this.setState({ hidden: !this.state.hidden });
  }

  currentErrorMessage() {
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
      inputNote = <span className="TextInput--required">required</span>;
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

    const additionalProps = _.omit(this.props, Object.keys(
      propTypes,
    ) as (keyof typeof propTypes)[]);

    return (
      <div
        className={classnames(
          wrapperClass,
          formElementSizeClassName(this.props.size),
          this.props.className,
        )}
      >
        <div className="TextInput--infoRow">
          <label className="TextInput--label" htmlFor={this.props.name}>
            {this.props.label}
          </label>
          {inputNote}
        </div>
        <input
          {...additionalProps}
          autoComplete={this.props.disableAutocomplete && "off"}
          className="TextInput--input"
          disabled={this.props.disabled}
          name={this.props.name}
          onBlur={this.onBlur}
          onChange={this.props.onChange}
          onKeyPress={this.props.onKeyPress}
          onFocus={this.onFocus}
          placeholder={this.props.placeholder}
          readOnly={this.props.readOnly}
          ref={this.input}
          required={this.props.required}
          type={type}
          value={this.props.value as any}
        />
        {this.props.enableShow && (
          <button type="button" className="TextInput--link" onClick={this.toggleHidden}>
            {this.state.hidden ? "Show" : "Hide"}
          </button>
        )}
      </div>
    );
  }
}
