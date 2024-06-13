import React, { useId } from "react";

function SelectBtn(
  { options = [], label, className = "", ...props },
  ref
) {
  const id = useId();
  return (
    <div className="w-full">
      {label && <label htmlFor={id}></label>}
      <select name="" {...props} ref={ref} id={id} className={`${className}`}>
        {options.map((option) => (
          <option value={option} key={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default React.forwardRef(SelectBtn);
