import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import App from './containers/App';
import Repair from './containers/Repair';
import Admin from './containers/Admin';
import Login from './containers/Login';
import ContactInfo from './components/ContactInfo/ContactInfo';
import Calendar from './components/Calendar/Calendar';
import RepairFrom from './components/RepairList/RepairList';

import 'antd/dist/antd.css';
import injectTapEventPlugin from 'react-tap-event-plugin';
//메뉴아이템을 렌더합니다.

injectTapEventPlugin();
ReactDOM.render(
  <Router history={browserHistory}>
     <IndexRoute component={Repair} />
    <Route path="/" component={App}>
    <Route path="repair" component={Repair}/>
    <Route path="/admin" component={Admin} >
      <Route path='/admin/repairFrom' component={RepairFrom} />
      <Route path='/admin/repairlist' component={ContactInfo} />
      <Route path='/admin/repairschedule' component={Calendar} />

    </Route>
    <Route path="login" component={Login}/>
    </Route>
  </Router>,
  
  document.getElementById('app')
);
