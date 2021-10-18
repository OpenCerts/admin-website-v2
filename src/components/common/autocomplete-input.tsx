import React, { FunctionComponent } from "react";
import Autosuggest from "react-autosuggest";
import styled from "@emotion/styled";

const AutoCompleteStyle = styled.div`
  .react-autosuggest__container {
    position: relative;
  }

  .react-autosuggest__input {
    width: 100%;
    height: auto;
    margin-top: 10px;
    padding: 10px 20px;
    font-family: Helvetica, sans-serif;
    font-weight: 300;
    font-size: 16px;
    border-width: 2px;
    border-color: rgba(75, 85, 99, 1);
    border-radius: 0.25em;
  }

  .react-autosuggest__input--focused {
    outline: none;
  }

  .react-autosuggest__input--open {
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
  }

  .react-autosuggest__suggestions-container {
    display: none;
  }

  .react-autosuggest__suggestions-container--open {
    display: block;
    position: absolute;
    top: 51px;
    width: 100%;
    max-height: 200px;
    overflow: auto;
    border: 1px solid #aaa;
    background-color: #fff;
    font-family: Helvetica, sans-serif;
    font-weight: 300;
    font-size: 16px;
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
    z-index: 2;
  }

  .react-autosuggest__suggestions-list {
    margin: 0;
    padding: 0;
    list-style-type: none;
  }

  .react-autosuggest__suggestion {
    cursor: pointer;
    padding: 10px 20px;
  }

  .react-autosuggest__suggestion--highlighted {
    background-color: #ddd;
  }
`;

interface AutoCompleteInputProp {
  placeHolder: string;
  filteredSuggestion: string[];
  onSuggestionsFetchRequested: (value: string, reason: string) => Promise<void>;
  inputValue: string;
  inputOnChange: (value: string) => void;
  id?: string;
}

export const AutoCompleteInput: FunctionComponent<AutoCompleteInputProp> = ({
  filteredSuggestion,
  onSuggestionsFetchRequested,
  inputValue,
  inputOnChange,
  placeHolder,
  id,
}) => {
  return (
    <AutoCompleteStyle>
      <Autosuggest
        id={id}
        suggestions={filteredSuggestion}
        onSuggestionsFetchRequested={({ value, reason }) => onSuggestionsFetchRequested(value, reason)}
        shouldRenderSuggestions={(): boolean => {
          return true;
        }}
        getSuggestionValue={(suggestion) => suggestion}
        renderSuggestion={(suggestion) => <span>{suggestion}</span>}
        inputProps={{
          placeholder: placeHolder,
          value: inputValue,
          onChange: (_, { newValue }) => {
            inputOnChange(newValue);
          },
        }}
      />
    </AutoCompleteStyle>
  );
};
