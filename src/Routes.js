import React from 'react';
import { Switch, Route, BrowserRouter as Router, Redirect } from 'react-router-dom';
import MainApp from './Layouts/MainApp'

const Routes = () => {
  return <>
    <Router>
      <Switch>
        <Route path='/app' component={MainApp} />
        <Redirect from="/" to="/app/home" />
      </Switch>
    </Router>
  </>
}

export default Routes;