import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Link,
  Route,
} from "react-router-dom";
import { connect } from 'react-redux'
import { alertActions } from './actions/alert.actions'
import Login from './components/Login';
import TutorDashboard from './components/tutor/TutorDashboard';
import StaffDashboard from './components/staff/StaffDashboard';

class App extends React.Component {
  
  render() {
    return (
      <Router>
        <div>
          <ul>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/dashboard">Dashboard</Link>
            </li>
          </ul>

          <hr />

          {/*
            A <Switch> looks through all its children <Route>
            elements and renders the first one whose path
            matches the current URL. Use a <Switch> any time
            you have multiple routes, but you want only one
            of them to render at a time
          */}
          <Switch>
            <Route exact path="/login">
              <Login />
            </Route>
            <Route path="/dashboard">
              <StaffDashboard />
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
}

function mapState(state) {
  const { alert } = state;
  return { alert };
}

const actionCreators = {
  clearAlerts: alertActions.clear
};

export default connect(mapState, actionCreators)(App);
