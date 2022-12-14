export default function ChipPreparacion({
  item,
  isChecked,
  isDisabled,
  onChange
}) {
  const { key, value } = item;

  return (
    <li>
      <input
        type="checkbox"
        id={key}
        className="w-3 h-3"
        value={key}
        checked={isChecked}
        disabled={isDisabled}
        onChange={(e) => onChange(e, item)}
      />
      <label htmlFor={key} className="text-xs movilL:text-base">
        {value}
      </label>
    </li>
  );
}
