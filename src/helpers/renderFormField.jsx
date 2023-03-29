import React from 'react';

const renderFormField = (props) => {
  const {
    input,
    tips,
    label,
    required,
    meta: { touched, error, warning },
  } = props;
  return (
    <>
      {label && (
        <label className={`form-label ${required ? 'required' : ''}`} htmlFor={input.name}>
          {label}
        </label>
      )}
      <input {...input} {...props} id={input.name} className="form-control" />
      {tips && <div className="form-text">{tips}</div>}
      {touched && ((error && <div className="invalid-feedback">{error}</div>) || (warning && <span>{warning}</span>))}
    </>
  );
};
export default renderFormField;
