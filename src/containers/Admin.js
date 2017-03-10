import React from 'react';
import { Layout, Menu, Breadcrumb, Icon, Row, Switch, Badge, Button } from 'antd';
import {Link} from 'react-router';
const { SubMenu } = Menu;
const { Header, Content, Footer, Sider } = Layout;

const MenuItem = ({active, children, to}) => (
    <Link to={to} className={styles["menu-item"]}>
          {children}
    </Link>
)

export default class Admin extends React.Component {
  render() {
    return (
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
            <SubMenu key="sub1" title={<Link to={'/admin/repairFrom'}><span><Icon type="tool" />수리요청</span></Link>}>
              <Menu.Item key="1"><Link to={'/admin/repairlist'}>검토목록<Badge count={5} /></Link></Menu.Item>
              <Menu.Item key="2">수리완료 목록</Menu.Item>
            </SubMenu>
            <SubMenu key="sub2" title={<Link to={'/admin/repairschedule'}><span><Icon type="calendar" />수리스케쥴</span></Link>} />
            <SubMenu key="sub3" title={<span><Icon type="area-chart" />매출계산</span>} />
           <SubMenu title={<Button type="primary" icon="logout">로그아웃</Button>}></SubMenu>
          </Menu>
        </Sider>
        <Content style={{ padding: '0 24px', minHeight: 480 }}>
         <div style={{ background: '#fff', padding: '20px'}}>
         <Row type='flex'>
          {this.props.children}
          </Row> 
          </div>
        </Content>
      </Layout>
    );
  };
}
