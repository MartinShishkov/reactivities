import { ErrorMessage, Form, Formik, FormikHelpers } from 'formik';
import React from 'react';
import TextInput from '../../app/common/form/TextInput';
import { Button, Header, Label } from 'semantic-ui-react';
import { useStore } from '../../app/stores/store';
import { observer } from 'mobx-react-lite';
import * as Yup from 'yup';
import ValidationError from '../errors/ValidationError';

type RegisterForm  = {
  displayName: string;
  username: string;
  email: string;
  password: string;
  error: string | null;
}

const RegisterForm:React.FC = () => {
  const { userStore } = useStore();

  const initialValues: RegisterForm = {
    displayName: '',
    username: '',
    email: '',
    password: '',
    error: null
  }

  const handleSubmit = async (values: RegisterForm, { setErrors } : FormikHelpers<RegisterForm>) => {
    try {
      await userStore.register(values);
    } catch (error) {
      setErrors({
        error: error as unknown as string
      });
    }
  };

  const validationSchema = Yup.object({
    displayName: Yup.string().required(),
    username: Yup.string().required(),
    email: Yup.string().required(),
    password: Yup.string().required(),
  });

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
    >
      {({handleSubmit, isSubmitting, errors, isValid, dirty}) => (
        <Form className='ui form error' onSubmit={handleSubmit} autoComplete='off'>
          <Header as='h2' content='Sing up to Reactivities' color='teal' textAlign='center' />
          <TextInput placeholder='Display name' name='displayName' />
          <TextInput placeholder='Username' name='username' />
          <TextInput placeholder='Email' name='email' />
          <TextInput placeholder='Password' name='password' type='password' />

          <ErrorMessage 
            name='error' 
            render={() => 
              <ValidationError errors={errors.error as unknown as string[]} />
            }
          />

          <Button disabled={!isValid || !dirty || isSubmitting} loading={isSubmitting} positive content='Register' type='submit' fluid />
        </Form>
      )}
    </Formik>
  );
}

export default observer(RegisterForm);