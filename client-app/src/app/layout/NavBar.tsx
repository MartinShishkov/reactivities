import { Button, Container, Menu } from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';
import { NavLink } from 'react-router-dom';

const NavBar:React.FC = () => {
  return (
    <Menu inverted fixed='top'>
      <Container>
        <Menu.Item as={NavLink} to='/' header>
          <img src="/assets/logo.png" alt="logo" style={{ marginRight: 10 }} />
        </Menu.Item>
        <Menu.Item as={NavLink} to='/activities' name='Activities'/>
        <Menu.Item>
          <Button 
            as={NavLink} 
            to='/create-activity' 
            positive content='Create Activity'
          />
        </Menu.Item>
      </Container>
    </Menu>
  );
}

export default observer(NavBar);