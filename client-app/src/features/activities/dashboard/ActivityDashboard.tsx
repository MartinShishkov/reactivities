import React from 'react';
import { Grid } from 'semantic-ui-react';
import { Activity } from '../../../app/models/activity';
import ActivityList from './ActivityList';
import ActivityDetails from '../details/ActivityDetails';
import ActivityForm from '../form/ActivityForm';

type ActivityDashboardProps = {
  activities: Activity[];
  selectedActivity?: Activity;
  editMode: boolean;
  blockUi: boolean;
  onCreateOrEditActivity: (activity: Activity) => void;
  onSelectActivity: (id: string) => void;
  onCancelSelectActivity: () => void;
  onOpenForm: (id?: string) => void;
  onCloseForm: () => void;
  onDelete: (id: string) => void;
};

const ActivityDashboard: React.FC<ActivityDashboardProps> = ({ activities, selectedActivity, editMode, blockUi, onCreateOrEditActivity, onSelectActivity, onCancelSelectActivity, onOpenForm, onCloseForm, onDelete }) => {
  
  return (
    <Grid>
      <Grid.Column width={10}>
        <ActivityList activities={activities} blockUi={blockUi} onSelect={onSelectActivity} onDelete={onDelete} />
      </Grid.Column>
      <Grid.Column width={6}>
        { selectedActivity && !editMode && (
          <ActivityDetails 
            activity={selectedActivity} 
            onEdit={onOpenForm}
            onCancel={onCancelSelectActivity} 
          />
        )}
        {editMode && <ActivityForm activity={selectedActivity} blockUi={blockUi} onClose={onCloseForm} onSubmit={onCreateOrEditActivity} />}
      </Grid.Column>
    </Grid>
  );
}
export default ActivityDashboard;