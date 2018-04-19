import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import message from 'antd/lib/message';
import PropTypes from 'prop-types';

export default function requireAdmin(Component) {
    class AuthenticatedComponent extends React.Component {
        componentWillMount() {
            this.checkAdmin();
        }

        componentWillReceiveProps(nextProps) {
            this.checkAdmin();
        }

        checkAdmin() {
            let user = Cookies.get('user');
            console.log(user == undefined, "哈哈哈");
            if (user == undefined) {
                message.error("请先登录！")
                const redirectAfterLogin = this.props.location.pathname;
                this.props.dispatch(push(`/login?next=${redirectAfterLogin}`));
            } else {
                if (!JSON.parse(user).is_superuser) {
                    message.error("您访问的是管理员页面，请用管理员账号登录！")
                    const redirectAfterLogin = this.props.location.pathname;
                    this.props.dispatch(push(`/login?next=${redirectAfterLogin}`));
                }
            }
        }

        render() {
            let user = Cookies.get('user');
            console.log("jiancha", user, user == undefined);
            return (
                <div>
                    {
                        user != undefined
                        ?
                            JSON.parse(user).is_superuser
                            ? <Component {...this.props} />
                            : null
                        :
                            null
                    }
                </div>
            );
        }
    }

    const mapStateToProps = (state) => {
        return {
            isAuthenticated: state.auth.isAuthenticated,
            token: state.auth.token
        };
    };

    return connect(mapStateToProps)(AuthenticatedComponent);
}
