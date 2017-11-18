import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { push } from 'react-router-redux';
import t from 'tcomb-form';
import PropTypes from 'prop-types';
import message from 'antd/lib/message';

import * as actionCreators from '../../actions/auth';

import './style.scss';
const Form = t.form.Form;

const RegisterForm = t.struct({
    email: t.String,
    password: t.String,
});

const RegiserFormOptions = {
    auto: 'placeholders',
    fields: {
        password: {
            type: 'password',
            attrs: {
                placeholder: "请输入密码"
            }
        },
        email: {
            type: 'email',
            attrs: {
                placeholder: "邮箱",
            }
        },
        // mobile: {
        //     attrs: {
        //         className: "mobile"
        //     }
        // }
    }
};

class RegisterView extends React.Component {
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
                password: ''
            },
            redirectTo: redirectRoute,
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

    register = (e) => {
        e.preventDefault();
        const value = this.registerForm.getValue();
        if (value) {
            // if (this.state.emailActive) {
            //     this.props.actions.authLoginUser(value.email, value.password, this.state.redirectTo);
            // } else {
                //phone api goes here
            // }

        }
        this.setState({
            showStatusText: true
        });
    };

    goToSignIn = (e) => {
        e.preventDefault();
        this.props.dispatch(push('/login'));
    }

    render() {
        let statusText = null;
        if (this.props.statusText && this.state.showStatusText) {
            message.error(this.props.statusText);
            this.setState({
                showStatusText: false
            });
            const statusTextClassNames = classNames({
                'alert': true,
                'alert-danger': this.props.statusText.indexOf('Authentication Error') === 0,
                'alert-success': this.props.statusText.indexOf('Authentication Error') !== 0
            });

            statusText = (
                <div className="row">
                    <div className="col-sm-12">
                        <div className={statusTextClassNames}>
                            {this.props.statusText}
                        </div>
                    </div>
                </div>
            );
        }

        return (
            <div className="container login">
                <div className="login-container margin-top-medium">
                    <div className="login-label">
                        <h2 className="text-center">加入广药大家园!</h2>
                    </div>

                    <form className="login-form" onSubmit={this.register}> 
                        <div className="login-form">
                            <Form ref={(ref) => { this.registerForm = ref; }}
                                type={RegisterForm}
                                options={RegiserFormOptions}
                                value={this.state.formValues}
                                onChange={this.onFormChange}
                            />
                        </div>
                        <button disabled={this.props.isAuthenticating}
                            type="submit"
                            className="btn btn-auth-register"
                        >
                            注册
                        </button>
                    </form>
                    <div className="hr-outer">
                        <hr className="hr-inner" />
                        <span className="hr-span">更多</span>
                        <hr className="hr-inner" />
                    </div>
                    <div className="register-more">
                        <a onClick={this.goToSignIn} className="login-more-sign-up">立即登录</a>
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

export default connect(mapStateToProps, mapDispatchToProps)(RegisterView);
export { RegisterView as RegisterViewNotConnected };