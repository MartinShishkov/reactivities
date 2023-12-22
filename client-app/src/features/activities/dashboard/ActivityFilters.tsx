import { observer } from 'mobx-react-lite';
import React from 'react';
import Calendar from 'react-calendar';
import { Header, Menu } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';

type ActivityFiltersProps = {
  
};

const ActivityFilters:React.FC<ActivityFiltersProps> = () => {
  const { activityStore } = useStore();
  const { predicate, setPredicate } = activityStore;

  return (
    <>
      <Menu vertical size='large' style={{width: '100%', marginTop: 25}}>
        <Header icon='filter' attached color='teal' contents='Filters' />
        <Menu.Item content='All activities' active={predicate.has('all')} onClick={() => setPredicate('all', 'true')} />
        <Menu.Item content="I'm going" active={predicate.has('isGoing')} onClick={() => setPredicate('isGoing', 'true')} />
        <Menu.Item content="I'm hosting" active={predicate.has('isHost')} onClick={() => setPredicate('isHost', 'true')} />
      </Menu>
      <Header />
      <Calendar 
        value={predicate.get('startDate') || new Date()}
        onChange={(date) => setPredicate('startDate', date as Date)}
      />
    </>
  )
}

export default observer(ActivityFilters);