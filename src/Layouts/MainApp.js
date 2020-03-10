import React from 'react';
import Header from '../Components/Common/Header';
import SideBar from '../Components/Common/SideBar';
import Footer from '../Components/Common/Footer';
import PropTypes from "prop-types";
import { useRouteMatch } from 'react-router';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';

import Home from '../Views/Home';

const MainApp = () => {
  const { path } = useRouteMatch();
  return <>
    <div className="container">
      <Header />
      <SideBar />
      <Router>
        <Switch>
          <Route path={`${path}/home`} component={Home} />
        </Switch>
      </Router>
      <Footer />
    </div>
  </>;
}
MainApp.prototype = {
  data: PropTypes.data
}
export default MainApp;