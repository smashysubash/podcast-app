import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './login'
import Home from './home'

const Page = () => {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/Login" component={Login} />
          {/* <Route path="/contact" component={Contact} /> */}
        </Switch>
      </Router>
    );
};

export default Page;
  