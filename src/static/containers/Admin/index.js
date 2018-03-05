import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';
import Button from 'antd/lib/button';
import Icon from 'antd/lib/icon';
import Menu from 'antd/lib/menu';
import Layout from 'antd/lib/layout';
import Dropdown from 'antd/lib/dropdown';
import Link from 'react-router-dom';
import './style.scss';

const { Header, Content, Footer, Sider } = Layout;

class AdminView extends Component {
    state = {
        openKey: null,
        collapsed: false,   
        
    }

    onCollapse = (collapsed) => {
        console.log(collapsed);
        this.setState({ collapsed });
    }

    handleClick = (e) => {
        this.setState({
            openKey: e.key
        });
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
        return (
            <div className="admin-page">
                <Layout style={{ minHeight: '85.2vh' }}>
                    <Sider
                        collapsible
                        collapsed={this.state.collapsed}
                        onCollapse={this.onCollapse}
                    >
                        <div className="logo" />
                        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                            <Menu.Item key="1">
                                <Icon type="pie-chart" />
                                <span>概览</span>
                            </Menu.Item>
                            <Menu.Item key="2">
                                <Icon type="user" />
                                <span>用户管理</span>
                            </Menu.Item>
                            <Menu.Item key="3">
                                <Icon type="copy" />
                                <span>介绍内容管理</span>
                            </Menu.Item>
                            <Menu.Item key="4">
                                <Icon type="shop" />
                                <span>周边内容管理</span>
                            </Menu.Item>
                            <Menu.Item key="5">
                                <Icon type="compass" />
                                <span>帖子管理</span>
                            </Menu.Item>
                            <Menu.Item key="6">
                                <Icon type="user-add" />
                                <span>学生数据管理</span>
                            </Menu.Item>
                            <Menu.Item key="7">
                                <Icon type="lock" />
                                <span>个人中心</span>
                            </Menu.Item>
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
                            <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
                                Bill is a cat.
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