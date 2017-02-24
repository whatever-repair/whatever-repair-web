import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import App from './containers/App';
import Repair from './containers/Repair'
import Admin from './containers/Admin'

//메뉴아이템을 렌더합니다.
ReactDOM.render(
  <Router history={browserHistory}>
    <Route path="/" component={App}>
    <Route path="repair" component={Repair}/>
    <Route path="admin" component={Admin}/>
    </Route>
  </Router>,
  
  document.getElementById('app')
);
