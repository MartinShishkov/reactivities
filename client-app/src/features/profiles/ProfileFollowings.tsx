import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { useStore } from '../../app/stores/store';
import { Card, Grid, Header, Tab } from 'semantic-ui-react';
import ProfileCard from './ProfileCard';

type ProfileFollowingsProps = {
  predicate: 'following' | 'followers'
};

const ProfileFollowings: React.FC<ProfileFollowingsProps> = ({ predicate }) => {
  const { profileStore } = useStore();
  const { profile, followings, loadFollowings, loadingFollowings } = profileStore;

  useEffect(() => {
    loadFollowings(predicate);
  }, [loadFollowings, predicate]);

  const heading = predicate === 'followers' 
    ? `People following ${profile?.displayName}`
    : `People that ${profile?.displayName} is following`;

  return (
    <Tab.Pane loading={loadingFollowings}>
      <Grid>
        <Grid.Column width={16}>
          <Header floated='left' icon='user' content={heading} />
        </Grid.Column>
        <Grid.Column width={16}>
          <Card.Group itemsPerRow={4}>
            {followings.map((profile) => (
              <ProfileCard key={profile.username} profile={profile} />
            ))}
          </Card.Group>
        </Grid.Column>
      </Grid>
    </Tab.Pane>
  );
}

export default observer(ProfileFollowings);