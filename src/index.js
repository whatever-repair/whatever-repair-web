import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import App from './containers/App';
import Repair from './containers/Repair'

//메뉴아이템을 렌더합니다.
ReactDOM.render(
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Repair}/>
      <Route path="repair" component={Repair}/>
    </Route>
  </Router>,
  
  document.getElementById('app')
);
