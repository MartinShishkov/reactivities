import React, { SyntheticEvent, useState } from 'react';
import { Button, Item, Label, Segment } from 'semantic-ui-react';
import { Activity } from '../../../app/models/activity';

type ActivityListProps = {
  activities: Activity[];
  blockUi: boolean;
  onSelect: (id: string) => void;
  onDelete: (id: string) => void;
};

const ActivityList:React.FC<ActivityListProps> = ({ activities, blockUi, onSelect, onDelete }) => {
  const [target, setTarget] = useState('');

  const handleDelete = (e: SyntheticEvent<HTMLButtonElement>, id: string) => {
    setTarget(e.currentTarget.name);
    onDelete(id);
  };

  return (
    <Segment>
      <Item.Group divided>
        {activities.map((activity) => (
          <Item key={activity.id}>
            <Item.Content>
              <Item.Header as='a'>
                {activity.title}
              </Item.Header>
              <Item.Meta>
                {activity.date}
              </Item.Meta>
              <Item.Description>
                <div>{activity.description}</div>
                <div>{activity.city}, {activity.venue}</div>
              </Item.Description>
              <Item.Extra>
                <Button floated='right' content='View' color='blue' onClick={() => onSelect(activity.id)} />
                <Button name={activity.id} loading={blockUi && target === activity.id} floated='right' content='Delete' color='red' onClick={(e) => handleDelete(e, activity.id)} />
                <Label basic content={activity.category} />
              </Item.Extra>
            </Item.Content>
          </Item>
        ))}
      </Item.Group>
    </Segment>
    
  );
}
export default ActivityList;