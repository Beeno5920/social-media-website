import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';

import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'


function App() {
    const [authDetails, setAuthDetails] = React.useState(
        localStorage.getItem('token')
    );

    function setAuth(token, id) {
        localStorage.setItem('token', token);
        localStorage.setItem('userID', id);
        setAuthDetails(token);
    }

    return (
    <MuiThemeProvider>
          <Router>
              <Switch>
                  <Route exact path="/" component={HomePage} />
              </Switch>
              <Switch>
                  <Route
                      exact
                      path="/login"
                      render={(props) => {
                          return <LoginPage {...props} setAuth={setAuth} />;
                      }}
                  />
              </Switch>
          </Router>
      </MuiThemeProvider>
  );
}

export default App;
