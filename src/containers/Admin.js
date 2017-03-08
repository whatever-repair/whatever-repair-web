import React from 'react';
import { Layout, Menu, Breadcrumb, Icon, Row } from 'antd';
const { SubMenu } = Menu;
import { Badge } from 'antd';
import Sidebar from '../components/Sidebar/Sidebar'
const { Header, Content, Footer, Sider } = Layout;

export default class Admin extends React.Component {
  render() {
    return (
      <Layout style={{ padding: '24px 0', background: '#fff' }}>
        <Sidebar></Sidebar>
        <Content style={{ padding: '0 24px', minHeight: 480 }}>
         <div style={{ background: '#ECECEC', padding: '20px'}}>
         <Row type='flex'>
          {this.props.children}
          </Row> 
          </div>
        </Content>
      </Layout>
    );
  };
}
