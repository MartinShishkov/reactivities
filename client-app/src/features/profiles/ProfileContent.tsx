import React from 'react';
import { Tab } from 'semantic-ui-react';
import ProfilePhotos from './ProfilePhotos';
import { Profile } from '../../app/models/profile';
import { observer } from 'mobx-react-lite';
import ProfileFollowings from './ProfileFollowings';
import ProfileActivities from './ProfileActivities';

type ProfileContentProps = {
  profile: Profile;
};

const ProfileContent:React.FC<ProfileContentProps> = ({ profile }) => {
  const panes = [
    { menuItem: 'About', render: () => <Tab.Pane>About content</Tab.Pane> },
    { menuItem: 'Photos', render: () => <ProfilePhotos profile={profile} /> },
    { menuItem: 'Events', render: () => <ProfileActivities /> },
    { menuItem: 'Followers', render: () => <ProfileFollowings predicate='followers' /> },
    { menuItem: 'Following', render: () => <ProfileFollowings predicate='following' /> },
  ];

  return (
    <Tab 
      menu={{ fluid: true, vertical: true }}
      menuPosition='right'
      panes={panes}
    />
  );
}
export default observer(ProfileContent);