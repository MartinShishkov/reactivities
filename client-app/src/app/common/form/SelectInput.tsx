import { useField } from 'formik';
import React from 'react';
import { Form, Label, Select } from 'semantic-ui-react';

type SelectInputProps = {
  placeholder: string;
  name: string;
  label?: string;
  options: any;
};

const SelectInput:React.FC<SelectInputProps> = ({ options, placeholder, name, label }) => {
  const [field, meta, helpers] = useField(name);

  return (
    <Form.Field error={meta.touched && !!meta.error}>
      <label htmlFor="">{label}</label>
      <Select 
        clearable
        options={options}
        {...field}
        name={name}
        value={field.value || null}
        placeholder={placeholder}
        onChange={(_, d) => helpers.setValue(d.value)}
        onBlur={() => helpers.setTouched(true)}
      />
      {meta.touched && meta.error ? (
        <Label basic color='red' content={meta.error} />
      ) : null}
    </Form.Field>
  );
}

export default SelectInput;