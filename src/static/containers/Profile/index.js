import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';
import * as actionCreators from '../../actions/auth';
import { TAB } from '../../constants/index';
import Menu from  'antd/lib/menu';
import Icon from 'antd/lib/menu';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

import './style.scss';
class ProfileView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tab: ''
        }
    }

    componentDidMount() {
        let tab = this.props.match.params.menu;
        this.setState({tab});
    }
    
    handleClick = (e) => {
        this.setState({
            tab: e.key
        });
        this.props.dispatch(push(`/profile/${ e.key }`))
    }

    render() {
        console.log('this.state.tab', this.state.tab);
        return (
            <div className="profile-page">
                <div className="container">
                    <div className="row">
                        <div className="profile-menu col-lg-3">
                            <Menu
                                onClick={this.handleClick}
                                style={{ width: 256 }}
                                selectedKeys={[this.state.tab]}
                                defaultOpenKeys={['sub1', 'sub2']}
                                mode="inline"
                            >
                                <SubMenu key="sub1" title={<span><Icon type="user" /><span>个人信息</span></span>}>
                                    <Menu.Item key={TAB.basic}>基本信息</Menu.Item>
                                    <Menu.Item key={TAB.avatar}>修改头像</Menu.Item>
                                </SubMenu>

                                <SubMenu key="sub2" title={<span><Icon type="mail" /><span>我的帖子</span></span>}>
                                    <Menu.Item key={TAB.posts}>个人帖子</Menu.Item>
                                    <Menu.Item key={TAB.comments}>我的回复</Menu.Item>
                                </SubMenu>

                                <SubMenu key="sub3" title={<span><Icon type="mail" /><span>安全</span></span>}>
                                    <Menu.Item key={TAB.mail_phone}>修改邮箱/手机</Menu.Item>
                                    <Menu.Item key={TAB.password}>修改密码</Menu.Item>
                                </SubMenu>
                                {/* <SubMenu key="sub1" title={<span><Icon type="mail" /><span>Navigation One</span></span>}>
                                    <Menu.Item key="1">Option 1</Menu.Item>
                                    <Menu.Item key="2">Option 2</Menu.Item>

                                </SubMenu> */}
                            </Menu>
                        </div>
                        <div className="col-lg-8">
                            detail  
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.auth.isAuthenticated,
        isAuthenticating: state.auth.isAuthenticating,
        statusText: state.auth.statusText
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        dispatch,
        actions: bindActionCreators(actionCreators, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileView);
export { ProfileView };