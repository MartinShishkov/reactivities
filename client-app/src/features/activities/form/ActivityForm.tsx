import React, { useState } from 'react';
import { Button, Form, Segment } from 'semantic-ui-react';
import { Activity } from '../../../app/models/activity';

type ActivityFormProps = {
  activity?: Activity;
  blockUi: boolean;
  onSubmit: (data: Activity) => void;
  onClose: () => void;
};

const ActivityForm:React.FC<ActivityFormProps> = ({ activity, blockUi, onSubmit, onClose }) => {
  
  const initialState = activity ?? {
    id: '',
    title: '',
    description: '',
    category: '',
    date: '',
    city: '',
    venue: ''
  };

  const [form, setForm] = useState(initialState);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(form);
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

        <Button loading={blockUi} floated='right' positive type='submit' content='Submit' />
        <Button floated='right' type='button' content='Cancel' onClick={onClose} />
      </Form>
    </Segment>
  )
}
export default ActivityForm;