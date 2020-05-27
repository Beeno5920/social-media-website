import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';

import HomePage from './pages/HomePage'


function App() {
  return (
    <MuiThemeProvider>
          <Router>
            <Switch>
              <Route exact path="/" component={HomePage} />
            </Switch>
          </Router>
      </MuiThemeProvider>
  );
}

export default App;
