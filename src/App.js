import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, lazy, Suspense } from 'react';
import { useDispatch } from 'react-redux';
import { Switch } from 'react-router-dom';
import operations from './redux/auth/auth-operations';

import PrivateRoute from './components/PrivateRoute';
import PublicRoute from './components/PublicRoute';
import AppBar from './components/Navigation/AppBar';
import Spinner from './components/Loader/Loader';

const HomePage = lazy(() => import('./pages/HomePage'));
const RegisterPage = lazy(() => import('./pages/RegisterPage'));
const LoginPage = lazy(() => import('./pages/LoginPage'));
const ContactsPage = lazy(() => import('./pages/ContactsPage'));

export default function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(operations.getCurrentUser());
  }, [dispatch]);

  return (
    <>
      <AppBar />
      <Suspense fallback={<Spinner />}>
        <Switch>
          <PublicRoute exact path="/" component={HomePage} />
          <PrivateRoute
            exact
            path="/contacts"
            redirectTo="/login"
            component={ContactsPage}
          />
          <PublicRoute
            exact
            path="/register"
            redirectTo="/contacts"
            restricted
            component={RegisterPage}
          />
          <PublicRoute
            exact
            path="/login"
            redirectTo="/contacts"
            restricted
            component={LoginPage}
          />
        </Switch>
      </Suspense>
    </>
  );
}
