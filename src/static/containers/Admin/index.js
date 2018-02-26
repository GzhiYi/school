import React, { Component } from 'react';
import Button from 'antd/lib/button';
import Icon from 'antd/lib/icon';
import Menu from 'antd/lib/menu';
import Layout from 'antd/lib/layout';
import './style.scss';

const SubMenu = Menu.SubMenu;
const { Header, Sider, Content } = Layout;

class AdminView extends Component {
    state = {
        openKey: null,
        
    }

    handleClick = (e) => {
        this.setState({
            openKey: e.key
        });
    }
    render() {
        return (
            <div className="admin-page">
                <Layout>
                    <Sider
                        trigger={null}
                        collapsible
                    >
                        <div className="logo">
                            {/* <img src={logoImg} /> */}
                        </div>
                        <Menu
                            mode="inline"
                            theme="dark"
                            inlineCollapsed={this.state.collapsed}
                            onClick={this.handleClick}
                            defaultOpenKeys={['sub1']}
                            defaultSelectedKeys={['0']}
                            selectedKeys={["0"]}
                        >
                            <SubMenu key="sub1" title={<span><Icon type="edit" /><span>技术测试</span></span>}>
                                <Menu.Item key="0">第一题</Menu.Item>
                                <Menu.Item key="1">第二题</Menu.Item>
                                <Menu.Item key="2">第三题</Menu.Item>
                            </SubMenu>
                        </Menu>

                    </Sider>
                </Layout>
            </div>
        );
    }
}

export default AdminView;