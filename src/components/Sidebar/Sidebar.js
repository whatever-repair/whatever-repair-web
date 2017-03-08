import React from 'react';
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
const { SubMenu } = Menu;
import { Badge } from 'antd';
const { Header, Content, Footer, Sider } = Layout;

export default class Sidebar extends React.Component {
  render() {
    return (
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
              <Menu.Item onClick={() => history.push('/repairlist') } key="1">검토목록  <Badge count={5} /></Menu.Item>
              <Menu.Item key="2">수리완료 목록</Menu.Item>
            </SubMenu>
            <SubMenu key="sub2" title={<span><Icon type="calendar" />수리스케쥴</span>} />
            <SubMenu key="sub3" title={<span><Icon type="area-chart" />매출계산</span>} />
          </Menu>
        </Sider>
    );
  };
}
