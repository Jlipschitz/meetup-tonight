import React from 'react';
import {IndexRoute, Route} from 'react-router';

// utility function
import authedRoute from './lib/authedRoute';

// actual app components
import App from './App';
import Blog from './Blog';
// import Profile from './Profile';
import About from './About';
import NotFound from './NotFound';

export default store => (
  <Route path='/' component={App}>
    { /* Unauthed routes */ }
    <IndexRoute component={Blog}/>
    <Route
      path='about'
      component={About}
    />
    { /* Routes requiring login */ }
    <Route onEnter={authedRoute(store)}>
      {/* <Route
        path='profile'
        component={Profile}
      /> */}
    </Route>

    { /* Catch all route */ }
    <Route
      path='*'
      component={NotFound}
      status={404}
    />
  </Route>
);
