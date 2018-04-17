import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import PropTypes from 'prop-types';
import message from 'antd/lib/message';

export default function requireAuthentication(Component) {
    class AuthenticatedComponent extends React.Component {
        static propTypes = {
            isAuthenticated: PropTypes.bool.isRequired,
            location: PropTypes.shape({
                pathname: PropTypes.string.isRequired
            }).isRequired,
            dispatch: PropTypes.func.isRequired
        };

        componentWillMount() {
            this.checkAuth();
        }

        componentWillReceiveProps(nextProps) {
            this.checkAuth();
        }

        checkAuth() {
            let token = Cookies.get('token');
            if (!token) {
                messgage.error("请先登录！");
                const redirectAfterLogin = this.props.location.pathname;
                this.props.dispatch(push(`/login?next=${redirectAfterLogin}`));
            }
        }

        render() {
            let token = Cookies.get('token');
            return (
                <div>
                    {token !== 'undefined'
                        ? <Component {...this.props} />
                        : null
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
