import React, { useEffect, useState } from 'react';
import { Button, Header, Segment } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';
import { observer } from 'mobx-react-lite';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { v4 as uuid } from 'uuid';
import {Formik, Form } from 'formik';
import * as Yup from 'yup';
import TextInput from '../../../app/common/form/TextInput';
import TextArea from '../../../app/common/form/TextArea';
import SelectInput from '../../../app/common/form/SelectInput';
import { categoryOptions } from '../../../app/common/options/category-options';
import DateInput from '../../../app/common/form/DateInput';
import { ActivityFormValues } from '../../../app/models/activity';

const ActivityForm:React.FC = () => {
  const { activityStore } = useStore();
  const { selectedActivity: activity, createActivity, updateActivity, loadActivity } = activityStore;
  const { id } = useParams();
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    title: Yup.string().required('The activity title is required'),
    description: Yup.string().required('The activity description is required'),
    category: Yup.string().required(),
    date: Yup.string().required(),
    venue: Yup.string().required(),
    city: Yup.string().required()
  });

  const [form, setForm] = useState<ActivityFormValues>(new ActivityFormValues());

  useEffect(() => {
    if (id) {
      loadActivity(id).then(activity => setForm(new ActivityFormValues(activity)));
    }

    return () => {
      // set selected activity to undefined
    }
  }, [id]);

  useEffect(() => {
    if (activity) {
      setForm(activity);
    }
  }, [activity]);

  const handleSubmit = (activity: ActivityFormValues) => {
    if (!activity.id) {
      let newActivity = {
        ...activity,
        id: uuid()
      };
      createActivity(newActivity).then(() => navigate(`/activities/${activity.id}`));
    } else {
      updateActivity(activity).then(() => navigate(`/activities/${activity.id}`));
    }
  };

  return (
    <Segment clearing>
      <Header content='Activity Details' sub color='teal' />
      <Formik 
        enableReinitialize 
        initialValues={form}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ handleSubmit, isValid, isSubmitting, dirty }) => (
          <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
            <TextInput name='title' placeholder='Title' />
            <TextArea rows={3} name='description' placeholder='Description' />
            <SelectInput options={categoryOptions} name='category' placeholder='Category' />
            <DateInput name='date' placeholderText='Date' showTimeSelect timeCaption='time' dateFormat='MMMM d, yyyy h:mm aa' />
            
            <Header content='Location Details' sub color='teal' />
            <TextInput name='city' placeholder='City' />
            <TextInput name='venue' placeholder='Venue' />

            <Button
              disabled={isSubmitting || !isValid || !dirty}
              loading={isSubmitting} 
              floated='right' 
              positive 
              type='submit' 
              content='Submit' 
            />
            <Button as={Link} to='/activities' floated='right' type='button' content='Cancel' />
          </Form>
        )}
      </Formik>
    </Segment>
  )
}
export default observer(ActivityForm);