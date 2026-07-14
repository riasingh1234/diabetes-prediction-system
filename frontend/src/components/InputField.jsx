function InputField({
  label,
  name,
  value,
  onChange,
  error,
  type = "number",
  placeholder,
  min,
  max,
  step = "any",
}) {
  return (
    <div className="input-group">

      <label htmlFor={name}>{label}</label>

      <input
        id={name}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        min={min}
        max={max}
        step={step}
        autoComplete="off"
        required
      />

      {error && (
        <small className="error-text">
          {error}
        </small>
      )}

    </div>
  );
}

export default InputField;