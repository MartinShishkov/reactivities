import { FC, useEffect } from 'react';
import { Tab } from 'semantic-ui-react';
import { useStore } from '../../app/stores/store';
import { observer } from 'mobx-react-lite';

type ProfileActivitiesTabProps = {
  predicate: 'hosting' | 'past' | 'future';
};

const ProfileActivitiesTab: FC<ProfileActivitiesTabProps> = ({ predicate }) => {
  const { profileStore } = useStore();
  const { activities, loadingActivities, loadActivities, clearActivities } = profileStore;

  useEffect(() => {
    loadActivities(predicate);

    return () => {
      clearActivities();
    }
  }, [loadActivities, predicate]);

  return (
    <Tab.Pane loading={loadingActivities}>
      {activities.map((a) => <p key={a.id}>{a.title}</p>)}
    </Tab.Pane>
  );
}

export default observer(ProfileActivitiesTab);