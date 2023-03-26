import React from "react";

const ChipPreparations = ({ item, isChecked, isDisabled, onChange }) => {
  const { key, value } = item;

  return (
    <li>
      <input
        type="checkbox"
        id={key}
        value={key}
        checked={isChecked}
        disabled={isDisabled}
        onChange={(e) => onChange(e, item)}
      />
      <label htmlFor={key}>
        {value}
      </label>
    </li>
  );
};

export default ChipPreparations;
