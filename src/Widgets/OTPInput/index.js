import PropTypes from "prop-types";
import { useCallback, useState } from "react";
import "./styles.css";

const focusInput = (id) => {
  if (document.getElementById(id)) {
    document.getElementById(id).focus();
  }
};

const OTPInput = ({ length, onSubmit }) => {
  const [text, setText] = useState(() => {
    return new Array(length).fill("");
  });

  const isFull = useCallback(() => {
    return text.filter((t) => t !== "").length === length;
  }, [length, text]);

  const onChange = (e) => {
    if (e.keyCode === 8) {
      if (isFull()) {
        text[length - 1] = "";
        focusInput(`otp_input_${length - 2}`);
      } else {
        const index = text.findIndex((t) => t === "");
        text[index - 1] = "";
        focusInput(`otp_input_${index - 2}`);
      }
      setText([...text]);
    } else if (e.keyCode === 13) {
      if (isFull()) {
        const otp = text.join("");
        typeof onSubmit === "function" && onSubmit(otp);
        alert(`LELO OTP => ${otp}`);
      } else {
        alert(`MC OTP pura barde`);
      }
    } else if (isFull()) {
      alert("MC input full hogaya");
    } else if (e.keyCode >= 48 && e.keyCode <= 57) {
      const index = text.findIndex((t) => t === "");
      text[index] = e.key;
      focusInput(`otp_input_${index + 1}`);
      setText([...text]);
    }
  };

  return (
    <section onKeyUp={onChange} className="otp_box">
      {text.map((t, i) => {
        return (
          <input
            id={`otp_input_${i}`}
            key={i}
            type="number"
            value={t || ""}
            onChange={() => {}}
            autoFocus={i === 0}
          />
        );
      })}
    </section>
  );
};

OTPInput.propTypes = {
  length: PropTypes.number.isRequired,
  onSubmit: PropTypes.func,
};

export default OTPInput;
