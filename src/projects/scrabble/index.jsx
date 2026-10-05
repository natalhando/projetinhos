import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";

const Container = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  padding: 24px;
`;

const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 8px;
  width: 100%;
  max-width: 480px;
`;

const Input = styled.input`
  flex: 1 1 220px;
  min-width: 0;
  padding: 10px 12px;
  border: 2px solid var(--border);
  border-radius: 6px;
  font: inherit;
  letter-spacing: 4px;
  text-transform: uppercase;

  &:focus-visible {
    outline: 2px solid var(--accent);
    outline-offset: 2px;
  }
`;

const Button = styled.button`
  padding: 10px 16px;
  border: 0;
  border-radius: 6px;
  background: var(--accent);
  color: white;
  font: inherit;
  cursor: pointer;

  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }
`;

const Results = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 8px;
  margin: 0;
  padding: 0;
  list-style: none;
`;

const Word = styled.li`
  padding: 6px 10px;
  border: 1px solid var(--border);
  border-radius: 5px;
  background: var(--code-bg);
  color: var(--text-h);
  font-family: var(--mono);
  letter-spacing: 1px;
`;

const canBuildWord = (word, letters) => {
  const counts = new Map();
  for (const letter of letters) {
    counts.set(letter, (counts.get(letter) ?? 0) + 1);
  }

  for (const letter of word) {
    const count = counts.get(letter) ?? 0;
    if (count === 0) return false;
    counts.set(letter, count - 1);
  }

  return true;
};

const Scrabble = () => {
  const [dictionary, setDictionary] = useState(null);
  const [loadError, setLoadError] = useState(false);
  const [letters, setLetters] = useState("");
  const [results, setResults] = useState(null);
  const [inputError, setInputError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://gist.githubusercontent.com/brydenfogelman/b35955805e7dca0fe57f6aa25950231c/raw/4233a5653536fe4b6984702bb9273c967c35ef91/dictionary.json",
        );
        if (!Array.isArray(response.data)) {
          throw new Error("The dictionary response was not a word list.");
        }
        setDictionary(
          [...new Set(response.data.map((word) => String(word).trim().toUpperCase()))].filter(
            Boolean,
          ),
        );
      } catch (error) {
        console.error("Error fetching dictionary:", error);
        setLoadError(true);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!letters) {
      setInputError("Enter at least one letter to find words.");
      setResults(null);
      return;
    }

    const availableLetters = Array.from(letters);
    setInputError("");
    setResults(
      dictionary
        .filter((word) => canBuildWord(word, availableLetters))
        .sort((first, second) => second.length - first.length || first.localeCompare(second)),
    );
  };

  const handleInputChange = (event) => {
    setLetters(event.target.value.replace(/[^a-z]/gi, "").toUpperCase());
    setResults(null);
    setInputError("");
  };

  if (dictionary === null) {
    return <Container>{loadError ? "Couldn't load the word list." : "Loading word list..."}</Container>;
  }

  return (
    <Container>
      <h1>Scrabble word finder</h1>
      <p>Enter your letter tiles to find every word you can make.</p>
      <Form onSubmit={handleSubmit}>
        <Input
          aria-label="Your Scrabble letters"
          autoComplete="off"
          autoFocus
          onChange={handleInputChange}
          placeholder="YOUR LETTERS"
          value={letters}
        />
        <Button type="submit">Find words</Button>
      </Form>
      {inputError && <p role="alert">{inputError}</p>}
      {results !== null && (
        <>
          <p role="status">
            {results.length
              ? `${results.length} ${results.length === 1 ? "word" : "words"} found`
              : "No words found for those letters."}
          </p>
          <Results aria-label="Possible words">
            {results.map((word) => (
              <Word key={word}>{word}</Word>
            ))}
          </Results>
        </>
      )}
    </Container>
  );
};

export default Scrabble;
