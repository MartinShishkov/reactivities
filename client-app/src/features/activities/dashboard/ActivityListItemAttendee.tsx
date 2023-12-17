import { observer } from 'mobx-react-lite';
import React from 'react';
import { Image, List, Popup } from 'semantic-ui-react';
import { Profile } from '../../../app/models/profile';
import { Link } from 'react-router-dom';
import ProfileCard from '../../profiles/ProfileCard';

type ActivityListItemAttendeeProps = {
  attendees: Profile[]
};

const ActivityListItemAttendee:React.FC<ActivityListItemAttendeeProps> = ({ attendees }) => {
  const styles = {
    borderColor: 'orange',
    borderWidth: 2
  };

  return (
    <List horizontal>
      {attendees.map((attendee) => (
        <Popup hoverable key={attendee.username} trigger={
          <List.Item key={attendee.username} as={Link} to={`/profiles/${attendee.username}`}>
            <Image 
              circular
              bordered
              size='mini' 
              src={attendee.image || '/assets/user.png'}
              style={attendee.following ? styles : null}
            />
          </List.Item>
        }>
          <Popup.Content>
            <ProfileCard profile={attendee} />
          </Popup.Content>
        </Popup>
      ))}
    </List>
  );
}

export default observer(ActivityListItemAttendee);