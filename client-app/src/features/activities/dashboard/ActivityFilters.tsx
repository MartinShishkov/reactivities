import React from 'react';
import Calendar from 'react-calendar';
import { Header, Menu } from 'semantic-ui-react';

type ActivityFiltersProps = {
  
};

const ActivityFilters:React.FC<ActivityFiltersProps> = () => {
  
  return (
    <>
      <Menu vertical size='large' style={{width: '100%', marginTop: 25}}>
        <Header icon='filter' attached color='teal' contents='Filters' />
        <Menu.Item content='All activities' />
        <Menu.Item content="I'm going"/>
        <Menu.Item content="I'm going"/>
      </Menu>
      <Header />
      <Calendar />
    </>
  )
}
export default ActivityFilters;