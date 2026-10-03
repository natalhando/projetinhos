import { useState } from 'react'
import styled from 'styled-components'

const Container = styled.div``;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 0.5fr);
  grid-template-rows: repeat(6, 1fr);
`;
const Row = styled.div`
  display: contents;
`;
const Cell = styled.div`
  border: 1px solid black;
  height: 60px;
  text-transform: uppercase;
`;

const CorrectCell = styled(Cell)`
  background-color: #c5ffc5;
`;

const PartialCell = styled(Cell)`
  background-color: #ffffb1;
`;

const IncorrectCell = styled(Cell)`
  background-color: #ffc7c7;
`;

const Input = styled.input``;

const Button = styled.button``;

function Wordle() {
  const secret_words = [
    'APPLE',
    'DATES',
    'ELDER',
    'FRUIT',
    'NORMA',
    'MANGO',
    'PEACH',
    'BERRY',
    'GRAPE',
    'LEMON',
    'STARE',
    'CRANE',
    'PLANT',
    'SUGAR',
    'WATER',
    'COLOR',
    'LIGHT',
    'NIGHT',
  ];
  const [secret_word, setSecretWord] = useState(
    () => secret_words[Math.floor(Math.random() * secret_words.length)]
  );
  const ATTEMPTS = 5;
  const WORD_LENGTH = 5;

  const LETTER_INDEX = 0;
  const LETTER_STATUS = 1;

  const [rows, setRows] = useState(Array.from({ length: 0 }, () => Array.from({ length: WORD_LENGTH }, () => ['', 'blank'])));
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (e) => {
    const value = e.target.value.toUpperCase();
    setInputValue(value);
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      if (rows.length < ATTEMPTS) {
        const validatedWord = validateWord(Array.from(inputValue).slice(0, WORD_LENGTH));
        setRows([...rows, validatedWord]);
        setInputValue('');
      }
    }
  }

  const validateWord = (word) => {
    const secret_word_array = Array.from(secret_word);
    return secret_word_array.map((letter, index) => {
      if (letter === word[index]) {
        return [word[index], 'correct'];
      }
      if (secret_word_array.includes(word[index])) {
        return [word[index], 'partial'];
      }
      return [word[index], 'incorrect'];
    });
  }

  const didUserWin = () => {
    if (rows.length === 0) return false;
    const lastRow = rows[rows.length - 1];
    return lastRow.every(cell => cell[LETTER_STATUS] === 'correct');
  }

  return (
    <Container>
      <h1>Guess the word</h1>
      <Grid>
        <Row>
          {rows.map((row) => row.map(cell => {
            switch (cell[LETTER_STATUS]) {
              case 'correct':
                return <CorrectCell>{cell[LETTER_INDEX]}</CorrectCell>;
              case 'partial':
                return <PartialCell>{cell[LETTER_INDEX]}</PartialCell>;
              case 'incorrect':
                return <IncorrectCell>{cell[LETTER_INDEX]}</IncorrectCell>;
              default:
                return <Cell>{cell[LETTER_INDEX]}</Cell>;
            }
          }))}
        </Row>
      </Grid>
      <Input
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        disabled={rows.length >= ATTEMPTS || didUserWin()}
      />
      {rows.length >= ATTEMPTS && <p>Game Over! The secret word was: {secret_word}</p>}
      {didUserWin() && <p>Congratulations! You guessed the secret word!</p>}

      {rows.length >= ATTEMPTS || didUserWin() && (
        <Button onClick={() => {
          setRows([]);
          setInputValue('');
          setSecretWord(secret_words[Math.floor(Math.random() * secret_words.length)]);
        }}>
          Play again
        </Button>
      )}
    </Container>
  )
}

export default Wordle;
