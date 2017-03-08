import React from 'react';
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
const { SubMenu } = Menu;
const { Header, Content, Footer, Sider } = Layout;
import { Card, Col, Row } from 'antd';
import { Radio } from 'antd';
const RadioGroup = Radio.Group;
import styles from './ContactInfo.css';
import ConfirmCheckBox from '../ConfirmCheckBox/ConfirmCheckBox'
import { Carousel } from 'antd';
import { Badge } from 'antd';
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
      <Layout style={{ padding: '24px 0', background: '#fff' }}>
        <Sider 
          breakpoint="lg"
          collapsedWidth="0"
          onCollapse={(collapsed, type) => { console.log(collapsed, type); }}
        >
          <Menu
            mode="inline"
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            style={{ height: '100%' }}
            
          >
            <SubMenu key="sub1" title={<span><Icon type="tool" />수리요청</span>}>
              <Menu.Item key="1">검토목록  <Badge count={5} /></Menu.Item>
              <Menu.Item key="2">수리완료 목록</Menu.Item>
            </SubMenu>
            <SubMenu key="sub2" title={<span><Icon type="calendar" />수리스케쥴</span>} />
            <SubMenu key="sub3" title={<span><Icon type="area-chart" />매출계산</span>} />
          </Menu>
        </Sider>
        <Content style={{ padding: '0 24px', minHeight: 480 }}>
      <div style={{ background: '#ECECEC', padding: '20px'}}>
       <Row type='flex'>
      {this.state.orders.map((order, i) => {
        return (
         
              <Card className={styles['ant-card']} title={order.message} extra={order.repairType} bordered={true}>
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
      </div> 
        </Content>
      </Layout>
    )
  }
}
