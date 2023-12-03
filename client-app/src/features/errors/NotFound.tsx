import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Header, Icon, Segment } from 'semantic-ui-react';

const NotFound: React.FC = () => {
  return (
    <Segment placeholder>
      <Header icon>
        <Icon name='search'/>
        Oops, not found
      </Header>
      <Segment.Inline>
        <Button as={Link} to='/activities'>
          Return to activities page
        </Button> 
      </Segment.Inline>
    </Segment>
  )
}

export default NotFound;