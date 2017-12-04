import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { push } from 'react-router-redux';
import PropTypes from 'prop-types';

import * as actionCreators from '../../actions/data';

import './style.scss';

class SurroundingView extends React.Component {
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

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                This is surrounding page.
            </div>
        )
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

export default connect(mapStateToProps, mapDispatchToProps)(SurroundingView);
export { SurroundingView as SurroundingViewNotConnected };