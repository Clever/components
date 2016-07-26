import * as React from "react";
import {TextInput} from "..";

import * as CopyToClipboard from "react-copy-to-clipboard";

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

    this.toggle = this.toggle.bind(this);
    this.copyPassword = this.copyPassword.bind(this);
  }

  toggle() {
    this.setState({hidden: !this.state.hidden});
  }

  copyPassword(e) {
    e.preventDefault();
    this.setState({copied: true});
  }

  render() {
    const type = this.props.type === "password" && this.state.hidden ? "password" : "text";
    return (
      <div className="CopyableInput">
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
            <button type="button" className="CopyableInput--link" onClick={this.toggle}>
              {this.state.hidden ? "Show" : "Hide"}
            </button>
          }
          {this.props.enableCopy &&
             <CopyToClipboard text={this.props.value || ""} onCopy={this.copyPassword} >
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

CopyableInput.propTypes = Object.assign({}, TextInput.propTypes, {
  enableShow: React.PropTypes.bool,
  enableCopy: React.PropTypes.bool,
});
