import React, { useEffect, useState } from 'react';
import { Button, Form, Segment } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';
import { observer } from 'mobx-react-lite';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { v4 as uuid } from 'uuid';

const ActivityForm:React.FC = () => {
  const { activityStore } = useStore();
  const { selectedActivity: activity, createActivity, updateActivity, loading, loadActivity, loadingInitial } = activityStore;
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    id: '',
    title: '',
    description: '',
    category: '',
    date: '',
    city: '',
    venue: ''
  });

  useEffect(() => {
    console.log('here');
    if (id) {
      loadActivity(id);
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.id) {
      form.id = uuid();
      createActivity(form).then(() => navigate(`/activities/${form.id}`));
    } else {
      updateActivity(form).then(() => navigate(`/activities/${form.id}`));
    }
  };

  const handleFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <Segment clearing>
      <Form onSubmit={handleSubmit} autoComplete='off'>
        <Form.Input name='title' placeholder='Title' value={form.title} onChange={handleFieldChange} />
        <Form.Input name='description' placeholder='Description' value={form.description} onChange={handleFieldChange}/>
        <Form.Input name='category' placeholder='Category' value={form.category} onChange={handleFieldChange}/>
        <Form.Input name='date' type='date' placeholder='Date' value={form.date} onChange={handleFieldChange}/>
        <Form.Input name='city' placeholder='City' value={form.city} onChange={handleFieldChange}/>
        <Form.Input name='venue' placeholder='Venue' value={form.venue} onChange={handleFieldChange}/>

        <Button loading={loading} floated='right' positive type='submit' content='Submit' />
        <Button as={Link} to='/activities' floated='right' type='button' content='Cancel' />
      </Form>
    </Segment>
  )
}
export default observer(ActivityForm);