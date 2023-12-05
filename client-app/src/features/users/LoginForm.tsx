import { ErrorMessage, Form, Formik, FormikHelpers } from 'formik';
import React from 'react';
import TextInput from '../../app/common/form/TextInput';
import { Button, Header, Label } from 'semantic-ui-react';
import { useStore } from '../../app/stores/store';
import { observer } from 'mobx-react-lite';

type LoginForm  = {
  email: string;
  password: string;
  error: string | null;
}

const LoginForm:React.FC = () => {
  const { userStore } = useStore();

  const initialValues: LoginForm = {
    email: 'bob@test.com',
    password: 'Pa$$w0rd',
    error: null
  }

  const handleSubmit = async (values: LoginForm, { setErrors } : FormikHelpers<LoginForm>) => {
    try {
      await userStore.login(values);
    } catch (error) {
      setErrors({
        error: 'Invalid email or password'
      });
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
    >
      {({handleSubmit, isSubmitting, errors}) => (
        <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
          <Header as='h2' content='Login to Reactivities' color='teal' textAlign='center' />
          <TextInput placeholder='Email' name='email' />
          <TextInput placeholder='Password' name='password' type='password' />

          <ErrorMessage name='error' render={() => <Label style={{marginBottom: 10}} basic color='red' content={errors.error} />}/>

          <Button loading={isSubmitting} positive content='Login' type='submit' fluid />
        </Form>
      )}
    </Formik>
  );
}

export default observer(LoginForm);