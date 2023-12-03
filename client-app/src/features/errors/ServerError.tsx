import React from 'react';
import { useStore } from '../../app/stores/store';
import { observer } from 'mobx-react-lite';
import { Container, Header, Segment } from 'semantic-ui-react';

const ServerError:React.FC = () => {
  const { globalStore } = useStore();

  return (
    <Container>
      <Header as='h1' content='Server error' />
      <Header sub as='h5' color='red' content={globalStore.error?.message} />
      {globalStore.error?.details && (
        <Segment>
          <Header as='h4' content='Stack trace' color='teal' />
          <code style={{ marginTop: 10 }}>
            {globalStore.error?.details}
          </code>
        </Segment>
      )}
    </Container>
  )
}
export default observer(ServerError);