import React from 'react';
import { Layout, Menu, Breadcrumb } from 'antd';
const { Header, Content, Footer } = Layout;
import {Link} from 'react-router';
import ContactInfo from '../components/ContactInfo/ContactInfo'
import styles from './App.css';

const MenuItem = ({active, children, to}) => (
    <Link to={to} className={styles["menu-item"]}>
          {children}
    </Link>
)

export default class App extends React.Component {
  render() {
    return (
      <div>
      <Layout>
    <Header className={styles.header}>
      <img className={styles.logo} src={'/images/logo.png'}/>
      <Menu
        theme="light"
        mode="horizontal"
        defaultSelectedKeys={['2']}
        style={{ lineHeight: '64px' }}
      >
        <Menu.Item key="1" ><Link to={'/repair'} >수리견적요청</Link></Menu.Item>
        <Menu.Item key="2"><Link to={'/admin'} >관리자페이지</Link></Menu.Item>
      </Menu>
    </Header>
    <Content className="content">
      <div style={{ background: '#fff', padding: '100px', minHeight: '480px' }}>{this.props.children}</div>
    </Content>
    <Footer style={{ textAlign: 'center' }}>
     뭐든지수리 ©2017 Created by 뭐든지수리
    </Footer>
  </Layout>
      </div>
    );
  };
}
