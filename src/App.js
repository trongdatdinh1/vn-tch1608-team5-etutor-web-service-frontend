import React from 'react';
import './App.css';
import {
  Router,
  Switch,
  Link,
  Route,
} from "react-router-dom";
import { connect } from 'react-redux'
import { alertActions } from './actions/alert.actions'
import Login from './components/Login';
import TutorDashboard from './components/tutor/TutorDashboard';
import StaffDashboard from './components/staff/StaffDashboard';
import StudentDashboard from './components/student/StudentDashboard';
import { history } from './helpers/history';
import Chat from './components/chat/Chat';
class App extends React.Component {
  
  render() {
    return (
      <Router history={history} basename={window.location.pathname || ''} >
        <div>
          {/* <ul>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/staff_dashboard">Staff Dashboard</Link>
            </li>
            <li>
              <Link to="/tutor_dashboard">Tutor Dashboard</Link>
            </li>
            <li>
              <Link to="/chat">Chat</Link>
            </li>
          </ul>

          <hr /> */}

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
            <Route path="/staff_dashboard">
              <StaffDashboard />
            </Route>
            <Route path="/staff/tutor_dashboard/:tutor_id">
              <TutorDashboard />
            </Route>
            <Route path="/tutor_dashboard">
              <TutorDashboard />
            </Route>
            <Route path="/staff/student_dashboard/:student_id">
              <StudentDashboard />
            </Route>
            <Route path="/student_dashboard">
              <StudentDashboard />
            </Route>
            <Route path="/chat">
              <Chat />
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
