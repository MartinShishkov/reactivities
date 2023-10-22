import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios';
import { Header, List, ListItem } from 'semantic-ui-react';

function App() {
  const [activities, setActivities] = useState<{id: string, title: string}[]>([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/activities").then((result) => {
      setActivities(result.data);
    });
  }, []);

  return (
    <>
      <Header as='h2' icon='users' content='Reactivities'/>
      
      <List>
      {activities.map((activity) => (
        <ListItem key={activity.id}>
          {activity.title}
        </ListItem>
      ))}
      </List>
      
    </>
  )
}

export default App
