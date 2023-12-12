import React, { useEffect } from 'react';
import { Grid } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';
import { useParams } from 'react-router-dom';
import Loading from '../../../app/layout/Loading';
import { observer } from 'mobx-react-lite';
import ActivityDetailedHeader from './ActivityDetailedHeader';
import ActivityDetailedInfo from './ActivityDetailedInfo';
import DetailedChat from './DetailedChat';
import ActivityDetailedSidebar from './ActivityDetailedSidebar';

const ActivityDetails: React.FC = () => {
  const { activityStore } = useStore();
  const { selectedActivity: activity, loadActivity, loadingInitial, clearSelectedActivity } = activityStore;
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      loadActivity(id);
    }

    return () => {
      clearSelectedActivity();
    };
  }, [id, loadActivity, clearSelectedActivity]);

  if (loadingInitial || !activity) {
    return <Loading />
  }

  return (
    <Grid>
      <Grid.Column width={10}>
        <ActivityDetailedHeader activity={activity} />
        <ActivityDetailedInfo activity={activity} />
        <DetailedChat activityId={activity.id} />
      </Grid.Column>
      <Grid.Column width={6}>
        <ActivityDetailedSidebar activity={activity} />
      </Grid.Column>
    </Grid>
  );
}
export default observer(ActivityDetails);