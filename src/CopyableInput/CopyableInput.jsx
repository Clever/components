import React from "react";
import * as PropTypes from "prop-types";
import classnames from "classnames";
import CopyToClipboard from "react-copy-to-clipboard";

import {TextInput} from "../TextInput/TextInput";

import "./CopyableInput.less";

/**
 * This is a text input that takes optional props
 * enableShow and enableCopy that allow the user
 * to show/hide and copy the value of the input.
 */
export class CopyableInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {hidden: true};

    this.toggleHidden = this.toggleHidden.bind(this);
    this.copyPassword = this.copyPassword.bind(this);
  }

  toggleHidden() {
    this.setState({hidden: !this.state.hidden});
  }

  copyPassword() {
    this.setState({copied: true});
  }

  render() {
    const type = this.props.type === "password" && this.state.hidden ? "password" : "text";
    const wrapperClass = "CopyableInput";
    return (
      <div className={classnames(wrapperClass, this.props.className)}>
        <TextInput
          type={type}
          value={this.props.value}
          name={this.props.name}
          placeholder={this.props.placeholder}
          readOnly={this.props.readOnly}
          label={this.props.label}
          onChange={this.props.onChange}
        />
        <div className="CopyableInput--links">
          {this.props.enableShow &&
            <button type="button" className="CopyableInput--link" onClick={this.toggleHidden}>
              {this.state.hidden ? "Show" : "Hide"}
            </button>
          }
          {this.props.enableCopy &&
             <CopyToClipboard text={this.props.value || ""} onCopy={this.copyPassword}>
               <button type="button" className="CopyableInput--link">
                 {this.state.copied ? "Copied!" : "Copy"}
               </button>
             </CopyToClipboard>
          }
        </div>
      </div>
    );
  }
}

CopyableInput.propTypes = Object.assign({},
  TextInput.propTypes,
  {
    className: PropTypes.string,
    enableCopy: PropTypes.bool,
  }
);

CopyableInput.defaultPropTypes = {
  enableCopy: true,
};
