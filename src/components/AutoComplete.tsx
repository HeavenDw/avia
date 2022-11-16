import React, { FC, useState } from 'react';
import styles from '../styles/AutoComplete.module.scss';
import { city } from '../types/Data';

interface AutoCompleteProps {
  suggestions: city[];
  placeholder: string;
  value: string;
  onChange: (arg: string) => void;
}

const AutoComplete: FC<AutoCompleteProps> = ({
  suggestions,
  placeholder,
  value: input,
  onChange: setInput,
}) => {
  const [filteredSuggestions, setFilteredSuggestions] = useState<city[]>([]);
  const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(0);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const userInput = e.target.value;

    const regex = new RegExp(`^${userInput}`, 'i');

    // Filter out suggestions that don't start with the user's input
    const unLinked = suggestions
      .sort()
      .filter((suggestion) => regex.test(suggestion.name.toLowerCase()))
      .slice(0, 4);

    setInput(userInput);
    setFilteredSuggestions(unLinked);
    setActiveSuggestionIndex(0);
    setShowSuggestions(true);
  };

  // On click set suggestion and clear suggestions
  const onClick = (e: React.MouseEvent<HTMLElement>) => {
    setFilteredSuggestions([]);
    setInput(e.currentTarget.innerText);
    setActiveSuggestionIndex(0);
    setShowSuggestions(false);
  };

  // Controls for suggestions list
  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    switch (e.code) {
      case 'Enter':
        setInput(filteredSuggestions[activeSuggestionIndex].name);
        setActiveSuggestionIndex(0);
        setShowSuggestions(false);
        break;
      case 'ArrowUp':
        if (activeSuggestionIndex === 0) {
          return;
        }

        setActiveSuggestionIndex(activeSuggestionIndex - 1);
        break;
      case 'ArrowDown':
        if (activeSuggestionIndex - 1 === filteredSuggestions.length) {
          return;
        }

        setActiveSuggestionIndex(activeSuggestionIndex + 1);
        break;
      case 'Escape':
        setShowSuggestions(false);
        break;
    }
  };

  // Create suggestions list
  const SuggestionsListComponent = () => {
    return filteredSuggestions.length > 0 ? (
      <ul className={styles.suggestions}>
        {filteredSuggestions.map((suggestion, index) => {
          let className;

          // Flag the active suggestion with a class
          if (index === activeSuggestionIndex) {
            className = styles.suggestionActive;
          }

          return (
            <li className={className} key={suggestion.population} onClick={onClick}>
              {suggestion.name}
            </li>
          );
        })}
      </ul>
    ) : null;
  };

  return (
    <div
      className={styles.autocomplete}
      onBlur={() => {
        setTimeout(() => {
          setShowSuggestions(false);
        }, 100);
      }}>
      <input
        className={styles.input}
        type="text"
        onChange={onChange}
        onKeyDown={onKeyDown}
        value={input}
        placeholder={placeholder}
        onFocus={() => setShowSuggestions(true)}
        required
      />
      {showSuggestions && input && <SuggestionsListComponent />}
    </div>
  );
};

export default AutoComplete;
