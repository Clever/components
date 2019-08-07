import * as React from "react";
import * as ReactAutosuggest from "react-autosuggest";
import * as classnames from "classnames";

import { FormElementSize, formElementSizeClassName } from "../utils/Forms";
import { Values } from "../utils/types";

import "./Autosuggest.less";

interface Suggestion {
  label: string;
}

type RenderSuggestionSignature = (
  suggestion: Suggestion,
  additionalContext: { query: string, isHighlighted: boolean },
) => React.ReactNode;

export interface Props {
  className?: string;
  highlightFirstSuggestion?: boolean;
  id?: string;
  onChange: (event) => void;
  onSuggestionSelected?: (event, { suggestion }) => void;
  onSuggestionsFetchRequested: (value: string) => Promise<Suggestion[]>;
  placeholder?: string;
  renderSuggestion?: RenderSuggestionSignature;
  size?: Values<typeof FormElementSize>;
  value: string;
}

interface State {
  suggestions: Suggestion[];
}

export const cssClass = {
  CONTAINER: "Autosuggest",
  SUGGESTION: "Autosuggest--suggestion",
  SUGGESTION_HIGHLIGHTED: "Autosuggest--suggestion--highlighted",
  SUGGESTIONS_CONTAINER: "Autosuggest--suggestionsContainer",
  TEXT_INPUT: "Autosuggest--textInput",
  TEXT_INPUT_FOCUSABLE: "Autosuggest--textInput--focusable",
};

const suggestionsContainerClassName = (size) => `Autosuggest--suggestionsContainer--${size}`;

const defaultProps = {
  highlightFirstSuggestion: true,
  size: FormElementSize.MEDIUM,
};

/**
 * Autosuggest component.
 * Renders a text input which generates suggestions as a user types.
 * Suitable for the student experience due to the underlying component being accesible.
 */
export class Autosuggest extends React.PureComponent<Props, State> {
  static cssClass = cssClass;
  static defaultProps = defaultProps;
  state = {
    suggestions: [],
  };

  onSuggestionHighlighted = ({ suggestion }) => {
    /*
    const highlightedElement = document.getElementById("react-autowhatever-1--item-6");
    if (highlightedElement) {
      highlightedElement.scrollIntoView(true);
    }
    */
  };

  // Called every time suggestions need to be updated.
  onSuggestionsFetchRequested = async ({ value }) => {
    const { onSuggestionsFetchRequested } = this.props;
    this.setState({
      suggestions: await onSuggestionsFetchRequested(value),
    });
  };

  // Called every time suggestions need to be cleared.
  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: [],
    });
  };

  // Called every time a suggestion is selected.
  onSuggestionSelected = (event, { suggestion }: { suggestion: Suggestion }) => {
    const { onSuggestionSelected } = this.props;
    if (onSuggestionSelected) {
      onSuggestionSelected(event, { suggestion });
    }
  }

  // Renders each suggestion. Wrap each suggestion in a styled div, and allow the consumer to
  // further style the contents if desired.
  renderSuggestion = (suggestion: Suggestion, { query, isHighlighted }) => {
    const { renderSuggestion } = this.props;
    return (
      <div
        className={classnames(
          cssClass.SUGGESTION,
          isHighlighted && cssClass.SUGGESTION_HIGHLIGHTED,
        )}
      >
        {renderSuggestion ? renderSuggestion(suggestion, { query, isHighlighted }) : suggestion.label}
      </div>
    );
  }

  // Renders to container around all sections.
  renderSuggestionsContainer = ({ containerProps, children, query }) => {
    const { size } = this.props;

    return (
      <div {...containerProps}
        className={classnames(
          cssClass.SUGGESTIONS_CONTAINER,
          suggestionsContainerClassName(size),
        )}
      >
        {children}
      </div>
    );
  }

  render() {
    const { className, highlightFirstSuggestion, id, onChange, placeholder, size, value } = this.props;
    const { suggestions } = this.state;

    const suggestionsNotVisible = suggestions.length === 0;

    // These props are passed on to the input that Autosuggest renders.
    const inputProps = {
      className: classnames(cssClass.TEXT_INPUT, formElementSizeClassName(size), suggestionsNotVisible && cssClass.TEXT_INPUT_FOCUSABLE),
      onChange,
      placeholder,
      value,
    };

    return (
      <div className={classnames(cssClass.CONTAINER, className)}>
        <ReactAutosuggest
          getSuggestionValue={suggestion => suggestion.label}
          highlightFirstSuggestion={highlightFirstSuggestion}
          id={id}
          inputProps={inputProps}
          onSuggestionHighlighted={this.onSuggestionHighlighted}
          onSuggestionSelected={this.onSuggestionSelected}
          onSuggestionsClearRequested={this.onSuggestionsClearRequested}
          onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
          renderSuggestion={this.renderSuggestion}
          renderSuggestionsContainer={this.renderSuggestionsContainer}
          suggestions={suggestions}
        />
      </div>
    );
  }
}
