import React from 'react';
import {IndexRoute, Route} from 'react-router';

// utility function
import authedRoute from './lib/authedRoute';

// actual app components
import App from './App';
import Blog from './Blog';
import Profile from './Profile';
<<<<<<< HEAD
=======
import About from './About';
>>>>>>> 8119d0042709891509c1e388492f7d75453988a4
import NotFound from './NotFound';

export default store => (
  <Route path='/' component={App}>
    { /* Unauthed routes */ }
    <IndexRoute component={Blog}/>

<<<<<<< HEAD
=======
    <Route
      path='about'
      component={About}
    />

>>>>>>> 8119d0042709891509c1e388492f7d75453988a4
    { /* Routes requiring login */ }
    <Route onEnter={authedRoute(store)}>
      <Route
        path='profile'
        component={Profile}
      />
    </Route>

    { /* Catch all route */ }
    <Route
      path='*'
      component={NotFound}
      status={404}
    />
  </Route>
);
