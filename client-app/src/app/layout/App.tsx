import { Container } from 'semantic-ui-react';
import NavBar from './NavBar';
import HeroDashboard from '../../features/Hero/HeroDashboard';
import { Route, Switch, useLocation } from 'react-router-dom';
import HeroForm from '../../features/Form/HeroForm';
import HeroDetalis from '../../features/Hero/details/HeroDetails';
import LoginForm from '../../features/user/LoginForm';
import { useStore } from '../stores/store';
import { useEffect } from 'react';
import RegisterForm from '../../features/user/RegisterForm';
import { observer } from 'mobx-react-lite';
import LoadingComponent from './LoadingComponent';
import { ToastContainer } from 'react-toastify';

function App() {
  const location = useLocation();
  const { commonStore, userStore } = useStore();

  useEffect(() => {
    if (commonStore.token) {
      userStore.getUser().finally(() => commonStore.setAppLoaded());
    } else {
      commonStore.setAppLoaded();
    }
  }, [commonStore, userStore])

  if (!commonStore.appLoaded) return <LoadingComponent content='Loading App..' />

  return (
    <>
      <ToastContainer position='bottom-right' hideProgressBar />
      <NavBar />
      <Container style={{ marginTop: '7em' }} >
        <Switch>
          <Route exact path='/' component={HeroDashboard} />
          <Route path='/heroes/:id' component={HeroDetalis} />
          <Route path='/login' component={LoginForm} />
          <Route path='/register' component={RegisterForm} />
          <Route key={location.key} path={['/createHero', '/manage/:id']} component={HeroForm} />
        </Switch>
      </Container>
    </>
  );
}

export default observer(App)
