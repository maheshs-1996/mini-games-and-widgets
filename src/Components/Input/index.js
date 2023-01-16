import { forwardRef } from "react";

const Input = forwardRef(({ value, placeholder, onChange }, ref) => {
  return (
    <input
      ref={ref}
      type="text"
      onChange={(e) => onChange(e.target.value)}
      value={value}
      placeholder={placeholder}
    ></input>
  );
});

export default Input;
