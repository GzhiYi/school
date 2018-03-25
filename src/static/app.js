import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import Avatar  from 'antd/lib/avatar';
import Popover from 'antd/lib/popover';

import { authLogoutAndRedirect } from './actions/auth';
import './styles/main.scss';
import Img from "./images/github.png";

class App extends React.Component {
    static propTypes = {
        isAuthenticated: PropTypes.bool.isRequired,
        children: PropTypes.shape().isRequired,
        dispatch: PropTypes.func.isRequired,
        location: PropTypes.shape({
            pathname: PropTypes.string
        })
    };

    static defaultProps = {
        location: undefined
    };

    logout = () => {
        this.props.dispatch(authLogoutAndRedirect());
    };

    goToIndex = () => {
        this.props.dispatch(push('/'));
    };

    goToLogin = () => {
        this.props.dispatch(push('/login'));
    };

    goToRegister = () => {
        this.props.dispatch(push('/register'));
    };

    goToProtected = () => {
        this.props.dispatch(push('/protected'));
    };

    goToIntroduce = () => {
        this.props.dispatch(push('/introduce'));
    }

    goToSurrounding = () => {
        this.props.dispatch(push('/surrounding'));
    }

    goToForum = () => {
        this.props.dispatch(push('/forum'));
    }

    openGithub = () => {
        window.open('https://github.com/GzhiYi/school');
    }

    goToProfile = () => {
        this.props.dispatch(push('/profile/basic'));
    }

    goToAdmin = () => {
        this.props.dispatch(push('/admin/overview'));
    }

    render() {
        const homeClass = classNames({
            active: this.props.location && this.props.location.pathname === '/'
        });
        const protectedClass = classNames({
            active: this.props.location && this.props.location.pathname === '/protected'
        });
        const loginClass = classNames({
            active: this.props.location && this.props.location.pathname === '/login'
        });
        const introduceClass = classNames({
            active: location.pathname.split('/')[1] === 'introduce'
        });
        const surroundingClass = classNames({
            active: location.pathname.split('/')[1] === 'surrounding'
        });
        const forumClass = classNames({
            active: (this.props.location && this.props.location.pathname === '/forum') || (this.props.location && this.props.location.pathname === '/forum/new-post')
        });
        let content = 
            <div>
                <ul className="avatar-auth">
                    <li className="avatar-auth-li" onClick={this.goToLogin}><a>登录</a></li>
                    <li className="avatar-auth-li" onClick={this.goToRegister}><a>注册</a></li>
                </ul>
            </div>;
        let user = null;
        console.log(Cookies.get('user') == undefined);
        if (Cookies.get('user') !== undefined) {
            user = JSON.parse(Cookies.get('user'));
        }
        console.log(user, user !== null);
        if (user) {
            content = 
            <div>
                <ul className="avatar-auth">
                    <li className="avatar-auth-li"><a onClick={this.goToProfile}>个人中心</a></li>
                    {
                        user !== undefined && user !== null
                        ?
                            user.is_superuser
                            ?
                                <li className="avatar-auth-li"><a onClick={this.goToAdmin}>管理中心</a></li>
                            :
                                ''
                        :
                            ''
                    }
                    <li className="avatar-auth-li" onClick={this.logout}><a>退出登录</a></li>
                </ul>
            </div>;
        }
        return (
            <div className="app">
                {
                    (location.pathname.split('/')[1] === 'admin')
                    ?
                        ''
                    :
                        <nav className="navbar navbar-default">
                            <div className="container-fluid">
                                <div className="navbar-header">
                                    <button type="button"
                                        className="navbar-toggle collapsed"
                                        data-toggle="collapse"
                                        data-target="#top-navbar"
                                        aria-expanded="false"
                                    >
                                        <span className="sr-only">Toggle navigation</span>
                                        <span className="icon-bar" />
                                        <span className="icon-bar" />
                                        <span className="icon-bar" />
                                    </button>
                                    <a className="navbar-brand">
                                        <Popover placement="bottomLeft" content={content} title={this.props.isAuthenticated ? "你好,gzhiyi!" : "游客，你好！"} trigger="hover">
                                            <Avatar size="large" icon="user" />
                                        </Popover>
                                    </a>
                                </div>
                                <div className="collapse navbar-collapse" id="top-navbar">
                                    {/* {this.props.isAuthenticated ?
                                <ul className="nav navbar-nav navbar-right">
                                    <li className={homeClass}>
                                        <a className="js-go-to-index-button">
                                            <i className="fa fa-home" /> Home
                                        </a>
                                    </li>
                                    <li className={protectedClass}>
                                        <a className="js-go-to-protected-button" onClick={this.goToProtected}>
                                            <i className="fa fa-lock" /> Protected
                                        </a>
                                    </li>
                                    <li>
                                        <a className="js-logout-button" onClick={this.logout}>
                                            Logout
                                        </a>
                                    </li>
                                </ul>
                                : */}
                                    <ul className="nav navbar-nav navbar-right">
                                        <li className={homeClass}>
                                            <a className="js-go-to-index-button" onClick={this.goToIndex}>
                                                你好
                                        </a>
                                        </li>
                                        <li className={introduceClass}>
                                            <a className="js-login-button" onClick={this.goToIntroduce}>
                                                介绍
                                        </a>
                                        </li>
                                        <li className={surroundingClass}>
                                            <a className="js-login-button" onClick={this.goToSurrounding}>
                                                周边
                                        </a>
                                        </li>
                                        <li className={forumClass}>
                                            <a className="js-login-button" onClick={this.goToForum}>
                                                交流
                                        </a>
                                        </li>
                                    </ul>
                                    {/* } */}
                                </div>
                            </div>
                        </nav>

                }

                <div>
                    {this.props.children}
                </div>
                {
                    (this.props.location && this.props.location.pathname === '/forum')
                    ?
                        ""
                    :
                        <div className="top-footer">
                            <div className="basic-info">
                                <img src={Img} alt="" onClick={this.openGithub}/>
                            </div>
                        </div>
                }
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

export default connect(mapStateToProps)(App);
export { App as AppNotConnected };
