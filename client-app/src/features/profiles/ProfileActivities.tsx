import React from 'react';
import { Grid, Header, Tab } from 'semantic-ui-react';
import ProfileActivitiesTab from './ProfileActivitiesTab';
import { observer } from 'mobx-react-lite';

const panes = [
  {
    menuItem: 'Past',
    render: () => <ProfileActivitiesTab key='past-activities' predicate='past' />,
  },
  {
    menuItem: 'Future',
    render: () => <ProfileActivitiesTab key='future-activities' predicate='future' />,
  },
  {
    menuItem: 'Hosting',
    render: () => <ProfileActivitiesTab key='hosting-activities' predicate='hosting' />,
  },
];

const ProfileActivities: React.FC = () => {
  return (
    <Tab.Pane>
      <Grid>
        <Grid.Column width={16}>
          <Header floated='left' icon='user' content='Events' />
        </Grid.Column>
        <Grid.Column width={16}>
          <Tab menu={{ secondary: true, pointing: true }} panes={panes} />
        </Grid.Column>
      </Grid>
    </Tab.Pane>
  );
}

export default observer(ProfileActivities);