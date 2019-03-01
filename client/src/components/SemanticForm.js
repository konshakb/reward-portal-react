import React from "react";
import PropTypes from "prop-types";
import { Form, Input } from "semantic-ui-react";
import { Dropdown } from "semantic-ui-redux-form-fields";

export default function semanticFormField({
  input,
  type,
  label,
  placeholder,
  meta: { touched, error, warning },
  as: As = Input,
  ...props
}) {
  function handleChange(e, { value }) {
    return input.onChange(value);
  }
  return (
    <Form.Field>
      <As
        {...props}
        {...input}
        Dropdown={Dropdown}
        value={input.value}
        type={type}
        label={label}
        placeholder={placeholder}
        onChange={handleChange}
      />
      {touched &&
        ((error && (
          <span>
            <i>{error}</i>
          </span>
        )) ||
          (warning && (
            <span>
              <i>{warning}</i>
            </span>
          )))}
    </Form.Field>
  );
}

semanticFormField.propTypes = {
  as: PropTypes.any,
  input: PropTypes.object,
  type: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  meta: PropTypes.object
};
