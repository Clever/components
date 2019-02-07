import React, {useState} from "react";
import * as PropTypes from "prop-types";
import classnames from "classnames";
import CopyToClipboard from "react-copy-to-clipboard";

import {FormElementSize, formElementSizeClassName} from "../utils/Forms";
import {TextInput} from "../TextInput/TextInput";

import "./CopyableInput.less";
import "../less/forms.less";

/**
 * This is a text input that takes optional props
 * enableShow and enableCopy that allow the user
 * to show/hide and copy the value of the input.
 */
export const CopyableInput = (props) => {
  const [hidden, toggleHidden] = useToggle(true);
  const [copied, setCopied] = useState(false);
  const onCopy = () => setCopied(true);

  const type = props.type === "password" && hidden ? "password" : "text";
  const wrapperClass = "CopyableInput";

  return (
    <div
      className={classnames(
        wrapperClass,
        formElementSizeClassName(props.size),
        props.className,
      )}
    >
      <TextInput
        type={type}
        value={props.value}
        name={props.name}
        placeholder={props.placeholder}
        readOnly={props.readOnly}
        label={props.label}
        onChange={props.onChange}
        size={FormElementSize.FULL_WIDTH /* Rely on the fact that we're bounding the parent
          container */}
      />
      <div className="CopyableInput--links">
        {props.enableShow &&
          <button type="button" className="CopyableInput--link" onClick={toggleHidden}>
            {hidden ? "Show" : "Hide"}
          </button>
        }
        {props.enableCopy &&
            <CopyToClipboard text={props.value || ""} onCopy={onCopy}>
              <button type="button" className="CopyableInput--link">
                {copied ? "Copied!" : "Copy"}
              </button>
            </CopyToClipboard>
        }
      </div>
      </div>
  );
};

function useToggle(initialValue) {
  const [value, setValue] = useState(initialValue);
  const toggle = () => setValue(!value);
  return [value, toggle];
}

CopyableInput.propTypes = Object.assign({},
  TextInput.propTypes,
  {
    className: PropTypes.string,
    enableCopy: PropTypes.bool,
  }
);

CopyableInput.defaultProps = {
  enableCopy: true,
  size: FormElementSize.FULL_WIDTH,
};
