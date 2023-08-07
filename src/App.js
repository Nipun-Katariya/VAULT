
import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import LoginPage from './Components/LoginPage/LoginPage';
import CreateAccountPage from './Components/CreateAccountPage/CreateAccountPage';
import Dashboard from './Components/Dashboard/Dashboard';
import AuthContextProvider from './Authorisation/AuthContext'; // Import AuthContextProvider
import PrivateRoute from './Authorisation/PrivateRoute';

const App = () => {
  return (
    <AuthContextProvider>
      <Router>
        <Switch>
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/create-account" component={CreateAccountPage} />
          <PrivateRoute exact path="/dashboard" component={Dashboard} />
          <Redirect to="/login" />
        </Switch>
      </Router>
    </AuthContextProvider>
  );
};

export default App;
