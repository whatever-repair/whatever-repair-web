import React from 'react';
import { Radio } from 'antd';
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
const RadioGroup = Radio.Group;
import { Card, Col, Row } from 'antd';
import styles from './ContactInfo.css';
import ConfirmCheckBox from '../ConfirmCheckBox/ConfirmCheckBox'
import { Carousel } from 'antd';
import axios from 'axios'

export default class ContactInfo extends React.Component {
  constructor(props){
  super(props)
    this.state = {
      orders : []
    }
  }
  componentWillMount(){
    axios.get('/api/order')
         .then(data => {
          if(data){
            data.data.sort((a, b) => a['created_time'] < b['created_time']);
          }
          this.setState({
            orders : data.data
          })
         })
         .catch(err => {
          console.log('err:::', err)
         })
  }

  onChange = (e) => {
    var putdata = {
      id : e.target.name,
      value : e.target.value
    }
    this.setState({
      value : e.target.value
    })
    axios.put('/api/order', putdata)
         .then(putdata => {
          console.log('putdata', putdata)
         })
  }

  render(){
    return(
     <Row type='flex'>
      {this.state.orders.map((order, i) => {
        return (
              <Card key={i} className={styles['ant-card']} title={order.message} extra={order.repairType} bordered={true}>
                <img width="100%" src={'/uploads/' + order.image1 } />
                <Icon type="user" /> 이  름 : {order.private.username}<br/>
                <Icon type="calendar" /> 수리요청 날짜 : {order.reqDate}<br/>
                <Icon type="phone" /> 연락처 : {order.private.phone}<br/>
                <Icon type="notification" /> 수리 내용 : {order.message}<br/>
              <br/>
                <ConfirmCheckBox name={order._id} status={order.status}></ConfirmCheckBox>
              </Card>     
      )}
    )}
    </Row>
  )}
}

