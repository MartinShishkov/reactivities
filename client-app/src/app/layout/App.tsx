import { Container } from 'semantic-ui-react';
import NavBar from './NavBar';
import { observer } from 'mobx-react-lite';
import { Outlet, useLocation } from 'react-router-dom';
import HomePage from '../../features/home/HomePage';
import { ToastContainer } from 'react-toastify';
import { useStore } from '../stores/store';
import { FC, useEffect } from 'react';
import Loading from './Loading';
import ModalContainer from '../common/modals/ModalContainer';

const App: FC = () => {
  const location = useLocation();
  const { globalStore, userStore } = useStore();

  useEffect(() => {
    if (globalStore.token) {
      userStore.getUser().finally(() => {
        globalStore.setAppLoaded();
      });
    } else {
      globalStore.setAppLoaded();
    }
  }, [globalStore, userStore]);

  if (!globalStore.appLoaded) {
    return <Loading content='Loading app...' />
  }

  return (
    <>
      <ModalContainer />
      <ToastContainer position='bottom-right' hideProgressBar theme='colored' />

      {location.pathname === '/' ? <HomePage /> : (
        <>
          <NavBar />
          
          <Container style={{ marginTop: '7em' }}>
            <Outlet />
          </Container>  
        </>
      )}
    </>
  );
}

export default observer(App);
