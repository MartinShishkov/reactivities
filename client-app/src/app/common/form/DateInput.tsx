import { useField } from 'formik';
import React from 'react';
import DatePicker, { ReactDatePickerProps } from 'react-datepicker';
import { Form, Label } from 'semantic-ui-react';

const DateInput:React.FC<Partial<ReactDatePickerProps>> = ({ name, ...props }) => {
  const [field, meta, helpers] = useField(name!);

  return (
    <Form.Field error={meta.touched && !!meta.error}>
      <DatePicker 
        {...field}
        {...props}
        selected={(field.value && new Date(field.value)) || null}
        onChange={(value) => helpers.setValue(value)}
      />

      {meta.touched && meta.error ? (
        <Label basic color='red' content={meta.error} />
      ) : null}
    </Form.Field>
  )
}
export default DateInput;