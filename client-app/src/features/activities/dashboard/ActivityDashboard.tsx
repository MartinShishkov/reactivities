import React, { useEffect } from 'react';
import { Grid } from 'semantic-ui-react';
import ActivityList from './ActivityList';
import { useStore } from '../../../app/stores/store';
import { observer } from 'mobx-react-lite';
import Loading from '../../../app/layout/Loading';
import ActivityFilters from './ActivityFilters';

const ActivityDashboard: React.FC = () => {
  const { activityStore } = useStore();
  const { activityRegistry } = activityStore;

  useEffect(() => {
    if (activityRegistry.size === 0) {
      activityStore.loadActivities();
    }
  }, [activityStore]);

  if (activityStore.loadingInitial) {
    return <Loading content='Loading app' />
  }

  return (
    <Grid>
      <Grid.Column width={10}>
        <ActivityList />
      </Grid.Column>
      <Grid.Column width={6}>
        <ActivityFilters />
      </Grid.Column>
    </Grid>
  );
}
export default observer(ActivityDashboard);