import { useCallback, useEffect, useMemo, useState } from "react";
import "./styles.css";
import { setRandomWord, checkWord } from "./requests";
import useModal from "../../Components/PopupModal";
import { Cell, Keyboard } from "./common";
const colors = {
  default: "black",
  correct: "#538d4e",
  absent: "#3a3a3c",
};

const cache = {};

const Wordle = ({ guesses, wordLength }) => {
  const [colorsToUse, setColorsToUse] = useState(colors);
  const noOfBoxes = Number(guesses) * Number(wordLength);
  const { DialogBox, setPopupProps, popupProps } = useModal();

  const [words, setWords] = useState(() => {
    return new Array(noOfBoxes).fill({
      letter: "",
      color: colorsToUse.default,
    });
  });

  const [activeWordIndex, setActiveWordIndex] = useState(0);
  const [gameOver, setGameOverFlag] = useState(false);
  const [foundLetters, setFoundLetters] = useState({});

  const MemoisedKeyboard = useMemo(() => {
    return (
      <Keyboard greyOutColor={colorsToUse.absent} foundLetters={foundLetters} />
    );
  }, [foundLetters, colorsToUse.absent]);

  const WordleGrid = useMemo(() => {
    return (
      <>
        {words.map((guess, i) => (
          <Cell key={i} {...guess} />
        ))}
      </>
    );
  }, [words]);

  const AlertPopup = useMemo(() => <DialogBox />, [popupProps]);

  const displayAlert = useCallback(
    (message) => {
      setPopupProps({
        show: true,
        title: message,
        CTAClick: () => setPopupProps({}),
      });
    },
    [setPopupProps]
  );

  const onSubmit = useCallback(
    async (word) => {
      let result;
      if (cache[word]) {
        result = cache[word];
      } else {
        result = await checkWord({ word });
      }
      if (result.success && result.result) {
        const start = activeWordIndex * wordLength;
        let correctLetters = 0;
        result.result.forEach((l, i) => {
          const { letter, color } = l;
          if (color === colorsToUse.correct) correctLetters++;
          foundLetters[`${letter}`] =
            foundLetters[`${letter}`] === colorsToUse.correct
              ? colorsToUse.correct
              : color;
          words[start + i] = l;
        });

        setFoundLetters({ ...foundLetters });

        if (correctLetters === wordLength) {
          setTimeout(() => {
            setGameOverFlag(true);
          }, 500);
        } else {
          setActiveWordIndex((i) => i + 1);
          setWords([...words]);
        }
      } else {
        displayAlert(result.message || "Something went wrong");
      }
      cache[word] = result;
    },
    [
      activeWordIndex,
      wordLength,
      guesses,
      words,
      colorsToUse,
      displayAlert,
      foundLetters,
    ]
  );

  const onKeyUp = useCallback(
    (e) => {
      if (popupProps.show) {
        document.getElementById("dialog-box").focus();
      } else if (gameOver) {
        displayAlert("Game over. You have guessed the correct word");
      } else if (activeWordIndex >= guesses) {
        displayAlert("Game over. You have used all your guesses");
      } else if (e.keyCode >= 65 && e.keyCode <= 90) {
        const letter = e.key;
        const index = words.findIndex((l) => l.letter === "");
        if (index < noOfBoxes && (activeWordIndex + 1) * wordLength > index) {
          words[index] = {
            letter,
            color: colorsToUse.default,
          };
          setWords([...words]);
        }
      } else if (e.key === "Enter") {
        const start = activeWordIndex * wordLength;
        const word = words
          .slice(start, start + wordLength)
          .reduce((final, curr) => (final += curr.letter), "");
        if (word.length === wordLength) {
          onSubmit(word);
        } else {
          displayAlert(`Please complete the guess`);
        }
      } else if (e.key === "Backspace") {
        const i = words.findIndex((l) => l.letter === "");
        const index = i >= 0 ? i : noOfBoxes;
        if (activeWordIndex * wordLength < index) {
          words[index - 1] = {
            letter: "",
            color: colorsToUse.default,
          };
          setWords([...words]);
        }
      }
    },
    [
      words,
      activeWordIndex,
      gameOver,
      colorsToUse,
      popupProps,
      displayAlert,
      guesses,
      noOfBoxes,
      onSubmit,
      wordLength,
    ]
  );

  useEffect(() => {
    if (wordLength) {
      setRandomWord({ wordLength }).then((resp) => {
        resp.colors && setColorsToUse(resp.colors);
      });
    }
  }, [wordLength]);

  useEffect(() => {
    gameOver &&
      typeof displayAlert === "function" &&
      displayAlert(`Well done. Congratulations`);
  }, [gameOver, displayAlert]);

  useEffect(() => {
    const eventToListen = `keyup`;
    document.addEventListener(eventToListen, onKeyUp);
    return () => {
      document.removeEventListener(eventToListen, onKeyUp);
    };
  }, [activeWordIndex, words, gameOver, onKeyUp]);

  return (
    <div className="wordle-wrap">
      <h1>Wordle</h1>
      <div
        style={{
          "--columns": wordLength,
        }}
        className="wordle-grid"
      >
        {WordleGrid}
      </div>
      {AlertPopup}
      {MemoisedKeyboard}
    </div>
  );
};

export default Wordle;
