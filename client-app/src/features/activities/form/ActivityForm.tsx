import React, { useState } from 'react';
import { Button, Form, Segment } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';
import { observer } from 'mobx-react-lite';

const ActivityForm:React.FC = () => {
  const { activityStore } = useStore();
  const { selectedActivity: activity, closeForm, createActivity, updateActivity, loading } = activityStore;

  const initialState = activity ?? {
    id: '',
    title: '',
    description: '',
    category: '',
    date: '',
    city: '',
    venue: ''
  };

  console.log({activity, initialState});

  const [form, setForm] = useState(initialState);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    form.id 
      ? updateActivity(form)
      : createActivity(form);
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
        <Button floated='right' type='button' content='Cancel' onClick={closeForm} />
      </Form>
    </Segment>
  )
}
export default observer(ActivityForm);