import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './pages/Home';
import NoMatch from './pages/NoMatch';
import Station from './pages/Station';

const Router: React.FC = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route exact path="/station/:id">
        <Station />
      </Route>
      <Route>
        <NoMatch />
      </Route>
    </Switch>
  </BrowserRouter>
);

export default Router;
