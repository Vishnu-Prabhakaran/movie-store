import React from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import { NavBar } from '../components';
import 'bootstrap/dist/css/bootstrap.min.css';

import { MovieList, MoviesInsert, MoviesUpdate } from '../pages';

function App() {
  return (
    <Router>
      <NavBar />
      <Switch>
        <Route path='movies/List' exact component={MovieList} />
        <Router path='movies/create' exact component={MoviesInsert} />
        <Route path='movies/update/:id' exact component={MoviesUpdate} />
      </Switch>
    </Router>
  );
}

export default App;
