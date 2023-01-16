export const Cell = ({ letter, color }) => (
  <div
    style={{
      background: color,
    }}
    className="wordle-cell"
  >
    {letter}
  </div>
);

export const KeyboardCell = ({
  letter,
  isLetter = true,
  color = "",
  greyOut,
}) => {
  const onClick = () => {
    document.dispatchEvent(
      new KeyboardEvent("keyup", {
        key: isLetter ? letter.toLowerCase() : letter,
        keyCode: isLetter ? letter.toUpperCase().charCodeAt() : "",
      })
    );
  };

  const styleObj = color ? { backgroundColor: color } : {};
  return (
    <div
      onClick={onClick}
      style={styleObj}
      className={`keyboard-cell ${greyOut ? `greyout` : ``}`}
    >
      {letter}
    </div>
  );
};

export const Keyboard = ({ foundLetters, greyOutColor }) => {
  const top = `QWERTYUIOP`.split("");
  const middle = `ASDFGHJKL`.split("");
  const bottom = ["Enter", ...`ZXCVBNM`.split(""), "Backspace"];

  const allKeys = [top, middle, bottom];

  return (
    <div className="keyboard">
      {allKeys.map((keys, i1) => (
        <div key={i1} className="keyboard-row">
          {keys.map((k, i2) => {
            const isLetter = k !== "Enter" && k !== "Backspace";
            const color = foundLetters[k.toLowerCase()];
            return (
              <KeyboardCell
                key={`${i1}_${i2}`}
                color={color}
                greyOut={color === greyOutColor}
                letter={k}
                isLetter={isLetter}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
};
