import React from 'react';
import ReactDOM from 'react-dom';
import Home from './Components/Home';
import NewFile from './Components/NewFile';
import History from "./Components/History";
import Login from "./Components/Login";
import Theme from "./Components/Theme";
import { Route, BrowserRouter as Router } from 'react-router-dom';

const router = (
  <Router>
    <div>
      <Route path="/home" component={Home} />
      <Route path="/newfile/:open?" component={NewFile} />
      <Route path="/history" component={History} />
      <Route path="/login" component={Login} />
      <Route path="/theme" component={Theme} />
    </div>
  </Router>
);

ReactDOM.render(router, document.getElementById('root'));
