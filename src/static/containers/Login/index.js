import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { push } from 'react-router-redux';
import t from 'tcomb-form';
import PropTypes from 'prop-types';

import * as actionCreators from '../../actions/auth';

import './style.scss';
const Form = t.form.Form;

const LoginEmail = t.struct({
    email: t.String,
    password: t.String,
    // remenberMe: t.Bool
});

const LoginPhone = t.struct({
    mobile: t.String,
    password: t.String,
    // remenberMe: t.Bool,
});

const LoginFormOptionsEmail = {
    auto: 'placeholders',
    fields: {
        password: {
            type: 'password',
            attrs: {
                placeholder: "密码"
            }
        },
        email: {
            type: 'email',
            attrs: {
                placeholder: "邮箱",
            }
        },
        mobile: {
            attrs: {
                className: "mobile"
            }
        }
    }
};

const LoginFormOptionsPhone = {
    auto: 'placeholders',
    fields: {
        password: {
            type: 'password',
            attrs: {
                placeholder: "密码"
            }
        },
        mobile: {
            attrs: {
                placeholder: "手机号",
            }
        }
    }
};

class LoginView extends React.Component {
    static propTypes = {
        dispatch: PropTypes.func.isRequired,
        isAuthenticated: PropTypes.bool.isRequired,
        isAuthenticating: PropTypes.bool.isRequired,
        statusText: PropTypes.string,
        actions: PropTypes.shape({
            authLoginUser: PropTypes.func.isRequired
        }).isRequired,
        location: PropTypes.shape({
            search: PropTypes.string.isRequired
        })
    };

    static defaultProps = {
        statusText: '',
        location: null
    };

    constructor(props) {
        super(props);
        const redirectRoute = this.props.location ? this.extractRedirect(this.props.location.search) || '/' : '/';
        this.state = {
            formValues: {
                email: '',
                mobile: '',
                password: ''
            },
            redirectTo: redirectRoute,
            emailActive: "active",
            phoneActive: "",
            showStatusText: true
        };
    }

    componentWillMount() {
        if (this.props.isAuthenticated) {
            this.props.dispatch(push('/'));
        }
        this.setState({
            showStatusText: false
        });
    }

    onFormChange = (value) => {
        this.setState({ formValues: value });
    };

    extractRedirect = (string) => {
        const match = string.match(/next=(.*)/);
        return match ? match[1] : '/';
    };

    login = (e) => {
        e.preventDefault();
        const value = this.loginForm.getValue();
        if (value) {
            if (this.state.emailActive) {
                this.props.actions.authLoginUser(value.email, value.password, this.state.redirectTo);
            } else {
                //phone api goes here
            }

        }
        this.setState({
            showStatusText: true
        });
    };

    goToSignUp = (e) => {
        e.preventDefault();
        this.props.dispatch(push('/register'));
    }


    showEmail = (e) => {
        this.setState({
            emailActive: "active",
            phoneActive: ""
        });
    }

    showPhone = (e) => {
        this.setState({
            emailActive: "",
            phoneActive: "active"
        });
    }

    renderForm() {
        let loginForm = null;
        if (this.state.emailActive == "active") {
            loginForm =
                <Form ref={(ref) => { this.loginForm = ref; }}
                    type={LoginEmail}
                    options={LoginFormOptionsEmail}
                    value={this.state.formValues}
                    onChange={this.onFormChange}
                />;
        } else {
            loginForm =
                <Form ref={(ref) => { this.loginForm = ref; }}
                    type={LoginPhone}
                    options={LoginFormOptionsPhone}
                    value={this.state.formValues}
                    onChange={this.onFormChange}
                />
        }
        return (
            <div className="login-form">
                {loginForm}
            </div>
        )
    }


    render() {
        let statusText = null;

        return (
            <div className="container login">
                <div className="login-container margin-top-medium">
                    <div className="login-label">
                        <h2 className="text-center">欢迎回来</h2>
                    </div>

                    <form className="login-form" onSubmit={this.login}>
                        <div className="login-type">
                            <div className="btn-group login-btn-gup">
                                <a
                                    className={`btn email ${this.state.emailActive}`}
                                    onClick={this.showEmail}
                                >邮箱</a>
                                <a
                                    className={`btn phone ${this.state.phoneActive}`}
                                    onClick={this.showPhone}
                                >手机号</a>
                            </div>
                        </div>
                        {this.renderForm()}
                        <button disabled={this.props.isAuthenticating}
                            type="submit"
                            className="btn btn-auth"
                        >
                            登录
                        </button>
                    </form>
                    <div className="hr-outer">
                        <hr className="hr-inner" />
                        <span className="hr-span">更多</span>
                        <hr className="hr-inner" />
                    </div>

                    <div className="login-more">
                        <a className="login-more-fo-pwd">忘记密码</a>
                        <span className="line"> &nbsp;| &nbsp;</span>
                        <a onClick={this.goToSignUp} className="login-more-sign-up">立即注册</a>
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

export default connect(mapStateToProps, mapDispatchToProps)(LoginView);
export { LoginView as LoginViewNotConnected };