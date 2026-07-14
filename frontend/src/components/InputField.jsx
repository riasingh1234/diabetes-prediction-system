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
  description,
}) {

  return (

    <div className="input-group">


      <label htmlFor={name}>

        {label}

        {description && (
          <span 
            title={description}
            style={{
              marginLeft:"8px",
              cursor:"help",
              color:"#2563eb"
            }}
          >
            ⓘ
          </span>
        )}

      </label>



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

        <small className="error-message">

          ⚠ {error}

        </small>

      )}


    </div>

  );

}


export default InputField;