import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';
import Button from 'antd/lib/button';
import Icon from 'antd/lib/icon';
import Menu from 'antd/lib/menu';
import Layout from 'antd/lib/layout';
import Dropdown from 'antd/lib/dropdown';
import logo from '../../images/logo.png';

import AdminIntroduceView from './components/adminIntroduce';
import AdminOverview from './components/adminOverview';
import AdminPostsView from './components/adminPosts';
import AdminStudentDataView from './components/adminStudentData';
import AdminSurroundingView from './components/adminSurrounding';
import AdminUserView from './components/adminUser';

import './style.scss';

const { Header, Content, Footer, Sider } = Layout;

class AdminView extends Component {
    state = {
        openKey: null,
        collapsed: false,   
        
    }

    componentDidMount() {
        const openKey = location.pathname.split('/')[2];
        this.setState({
            openKey
        });
    }
    

    onCollapse = (collapsed) => {
        console.log(collapsed);
        this.setState({ collapsed });
    }

    changeMenu = (e) => {
        console.log(e.key);
        this.setState({
            openKey: e.key
        });
        this.props.dispatch(push(`/admin/${e.key}`));
    }

    goTo = (directTo) => {
        this.props.dispatch(push(directTo));
    } 

    render() {
        const menu = (
            <Menu>
                <Menu.Item>
                    <a onClick={() => {this.goTo('/')}}><Icon type="home" /> 主页</a>
                </Menu.Item>
                <Menu.Item>
                    <a onClick={() => {this.goTo('/introduce')}}><Icon type="copy" /> 介绍</a>
                </Menu.Item>
                <Menu.Item>
                    <a onClick={() => {this.goTo('/surrounding')}}><Icon type="shop" /> 周边</a>
                </Menu.Item>
                <Menu.Item>
                    <a onClick={() => {this.goTo('/forum')}}><Icon type="compass" /> 交流</a>
                </Menu.Item>
            </Menu>
        );
        const path = location.pathname.split('/')[2];
        console.log(this.state.openKey);
        let displayContent = '';
        switch (path) {
            case 'user':
                displayContent = <AdminUserView />;
                break;
            case 'introduce':
                displayContent = <AdminIntroduceView />;
                break;
            case 'surrounding':
                displayContent = <AdminSurroundingView />;
                break;
            case 'posts':
                displayContent = <AdminPostsView />;
                break;
            case 'stu-data':
                displayContent = <AdminStudentDataView />;
                break;
            default:
                displayContent = <AdminOverview />;
                break;
        }
        return (
            <div className="admin-page">
                <Layout style={{ minHeight: '85.2vh' }}>
                    <Sider
                        collapsible
                        collapsed={this.state.collapsed}
                        onCollapse={this.onCollapse}
                    >
                        <div className="logo">
                        </div>
                        <Menu 
                            theme="dark" 
                            defaultSelectedKeys={['overview']} 
                            mode="inline"
                            onClick={this.changeMenu}
                            selectedKeys={[`${this.state.openKey}`]}
                        >
                            <Menu.Item key="overview">
                                <Icon type="pie-chart" />
                                <span>概览</span>
                            </Menu.Item>
                            <Menu.Item key="user">
                                <Icon type="user" />
                                <span>用户管理</span>
                            </Menu.Item>
                            <Menu.Item key="introduce">
                                <Icon type="copy" />
                                <span>介绍内容管理</span>
                            </Menu.Item>
                            <Menu.Item key="surrounding">
                                <Icon type="shop" />
                                <span>周边内容管理</span>
                            </Menu.Item>
                            <Menu.Item key="posts">
                                <Icon type="compass" />
                                <span>帖子管理</span>
                            </Menu.Item>
                            {/* <Menu.Item key="stu-data">
                                <Icon type="user-add" />
                                <span>学生数据管理</span>
                            </Menu.Item> */}
                        </Menu>
                    </Sider>
                    <Layout>
                        <Header style={{ background: '#fff', padding: 0 }}>
                            <Dropdown overlay={menu}>
                                <a className="ant-dropdown-link">
                                    主页导航<Icon type="down" />
                                </a>
                            </Dropdown>
                        </Header>
                        <Content style={{ margin: '16px 16px' }}>
                            <div style={{ padding: 24, background: '#fff', minHeight: 558 }}>
                                {displayContent}
                            </div>
                        </Content>
                    </Layout>
                </Layout>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        isAuthenticated: state.auth.isAuthenticated,
        location: state.routing.location
    };
};

export default connect(mapStateToProps)(AdminView);