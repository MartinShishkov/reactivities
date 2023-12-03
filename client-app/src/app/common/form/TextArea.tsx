import { useField } from 'formik';
import React from 'react';
import { Form, Label } from 'semantic-ui-react';

type TextAreaProps = {
  placeholder: string;
  name: string;
  label?: string;
  rows: number;
};

const TextArea: React.FC<TextAreaProps> = ({ rows, placeholder, name, label }) => {
  const [field, meta] = useField(name);

  return (
    <Form.Field error={meta.touched && !!meta.error}>
      <label htmlFor="">{label}</label>
      <textarea rows={rows} {...field} name={name} placeholder={placeholder} />
      {meta.touched && meta.error ? (
        <Label basic color='red' content={meta.error} />
      ) : null}
    </Form.Field>
  )
}
export default TextArea;