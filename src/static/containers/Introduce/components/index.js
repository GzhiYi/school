import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import * as actionCreators from '../../../actions/introduce';


class IntroduceDetailView extends Component {
    componentDidMount() {
        let type = location.pathname.split('/')[2];
        console.log(type);
        this.props.actions.getIntroduceDetail(type);
    }
    
    render() {
        return (
            <div>
                dddddd
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.auth.isAuthenticated,
        isAuthenticating: state.auth.isAuthenticating,
        statusText: state.auth.statusText,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        dispatch,
        actions: bindActionCreators(actionCreators, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(IntroduceDetailView);
export { IntroduceDetailView };