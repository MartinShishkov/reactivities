import React from 'react';
import { Button, Card, Image } from 'semantic-ui-react';
import { Activity } from '../../../app/models/activity';

type ActivityDetailsProps = {
  activity: Activity;
  onEdit: (id: string) => void;
  onCancel: () => void;
};

const ActivityDetails:React.FC<ActivityDetailsProps> = ({ activity, onEdit, onCancel }) => {
  
  return (
    <Card fluid>
      <Image src={`/assets/categoryImages/${activity.category}.jpg`} wrapped ui={false} />
      <Card.Content>
        <Card.Header>{activity.title}</Card.Header>
        <Card.Meta>
          <span>{activity.date}</span>
        </Card.Meta>
        <Card.Description>
          {activity.description}
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Button.Group widths={2}>
          <Button basic color='blue' content='Edit' onClick={() => onEdit(activity.id)} />
          <Button basic color='grey' content='Cancel' onClick={onCancel} />
        </Button.Group>
      </Card.Content>
    </Card>
  );
}
export default ActivityDetails;