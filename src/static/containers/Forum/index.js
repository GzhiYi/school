import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { push } from 'react-router-redux';
import PropTypes from 'prop-types';
import ForumCarousel from './components/forumCarousel';
import Posts from './components/posts'

import * as actionCreators from '../../actions/data';

import './style.scss';

class ForumView extends React.Component {
    static propTypes = {
        dispatch: PropTypes.func.isRequired,
        isAuthenticated: PropTypes.bool.isRequired,
        isAuthenticating: PropTypes.bool.isRequired,
        statusText: PropTypes.string,
        actions: PropTypes.shape({
            // authLoginUser: PropTypes.func.isRequired
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
            <div className="forum-page">
            <div className="container">
                <div className="row">
                    <div className="col-md-9">
                        <div className="carousel-content">
                            <ForumCarousel />
                        </div>

                        <div>
                            <Posts />
                        </div>
                    </div>
                    <div className="col-md-3">
                        right over here
                    </div>
                </div>
            </div>
               
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

export default connect(mapStateToProps, mapDispatchToProps)(ForumView);
export { ForumView as ForumViewNotConnected };