import { useCallback, useMemo, useState } from "react";
import useModal from "../../Components/PopupModal";
import "./styles.css";

const playerA = "X";
const playerB = "O";

const getBorderStyles = (length, i, boxLen) => {
  let style = ` `;
  if (i >= 0 && i < length) style += `no-bt `;
  else if (i >= boxLen - length && i < boxLen) style += `no-bb `;

  const mod = i % length;
  if (mod === 0) style += `no-bl `;
  else if (mod === length - 1) style += `no-br `;

  return style;
};

const XOX = ({ length }) => {
  const boxLen = useMemo(() => Number(length) * Number(length), [length]);
  const [state, setState] = useState(() => {
    return new Array(boxLen).fill("");
  });
  const { DialogBox, setPopupProps } = useModal();

  const [player, setPlayer] = useState(playerA);

  const checkGame = useCallback(
    (state) => {
      const filled = state.filter((s) => !!s);
      if (filled.length < 2 * length - 1) return;

      // horizontally
      for (let i = 0; i < state.length; i += length) {
        let temp = state[i];
        loop1: for (let j = 0; j < length; j++) {
          if (temp !== state[i + j]) {
            temp = null;
            break loop1;
          }
          temp = state[i + j];
        }
        if (temp) {
          return true;
        }
      }

      // vertically
      for (let i = 0; i < length; i++) {
        let temp = state[i];
        loop2: for (let j = i; j < state.length; j += length) {
          console.log(`${temp} ${state[j]}`);
          if (temp !== state[j]) {
            temp = null;
            break loop2;
          }
          temp = state[j];
        }
        if (temp) {
          return true;
        }
      }

      // diagonally left
      let temp = state[0];
      loop3: for (let i = 1; i < length; i++) {
        if (temp !== state[i * length + i]) {
          temp = null;
          break loop3;
        }
        temp = state[i * length + i];
      }
      if (temp) {
        return true;
      }

      // diagonally right
      temp = state[length - 1];
      loop4: for (let i = 1; i < length; i++) {
        const next = (i + 1) * (length - 1);
        if (temp !== state[next]) {
          temp = null;
          break loop4;
        }
        temp = state[next];
      }
      if (temp) {
        return true;
      }

      if (filled.length === boxLen) return `finish`;
    },
    [length]
  );

  const onCellClick = useCallback(
    (i) => {
      // ref to clear
      if (state[i]) {
        setPopupProps({
          show: true,
          title: `This cell is already filled`,
          CTAClick: function () {
            setPopupProps({});
          },
        });
        return;
      }

      state[i] = player;
      const result = checkGame(state);
      if (result) {
        const newPopupProps = {
          show: true,
          title: `Game over`,
          CTAText: "Restart",
          CTAClick: function () {
            setPopupProps({});
            reset();
          },
        };
        if (result !== `finish`) {
          newPopupProps[`subTitle`] = `${
            player === playerA ? `Player 1` : `Player 2`
          } won the game`;
        }
        setPopupProps(newPopupProps);
        return;
      }
      setPlayer(player === playerA ? playerB : playerA);
    },
    [state, player]
  );

  const reset = useCallback(() => {
    setState(new Array(boxLen).fill(""));
    setPlayer(playerA);
  }, []);

  return (
    <div className="game-wrapper">
      <h1>TIC TAC TOE</h1>
      <button onClick={reset}>Reset</button>
      <div
        style={{
          "--length": length,
        }}
        className="xox-grid"
      >
        {state.map((cell, i) => {
          return (
            <div
              key={i}
              className={`xox-cell ${getBorderStyles(length, i, boxLen)} ${
                cell === playerA
                  ? `xox-cell-a`
                  : cell === playerB
                  ? `xox-cell-b`
                  : ``
              }`}
              onClick={() => onCellClick(i)}
            >
              {cell}
            </div>
          );
        })}
      </div>
      <DialogBox />
    </div>
  );
};

export default XOX;
