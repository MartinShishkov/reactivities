import React, { useEffect } from 'react';
import { Grid } from 'semantic-ui-react';
import ProfileHeader from './ProfileHeader';
import ProfileContent from './ProfileContent';
import { useStore } from '../../app/stores/store';
import { observer } from 'mobx-react-lite';
import { useParams } from 'react-router-dom';
import Loading from '../../app/layout/Loading';

type ProfilePageProps = {
  
};

const ProfilePage: React.FC<ProfilePageProps> = () => {
  const { username } = useParams<{ username: string }>();
  const { profileStore } = useStore();
  const { loadProfile, loadingProfile, profile } = profileStore;

  useEffect(() => {
    if (username) {
      loadProfile(username);
    }
  }, [loadProfile, username]);

  if (loadingProfile) {
    return <Loading content='Loading profile...' />
  }

  return (
    <Grid>
      <Grid.Column width={16}>
        {profile && (
          <>
            <ProfileHeader profile={profile} />
            <ProfileContent profile={profile} />
          </>
        )}
      </Grid.Column>
    </Grid>
  );
}

export default observer(ProfilePage);