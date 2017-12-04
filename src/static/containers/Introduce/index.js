import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { push } from 'react-router-redux';
import t from 'tcomb-form';
import PropTypes from 'prop-types';

import * as actionCreators from '../../actions/auth';

import './style.scss';

class IntroduceView extends React.Component {
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

    componentDidMount() {
       
    }

    render() {
        return (
            <div>
                <div className="introduce-page">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="header text-center">
                                <h2>广东药科大学</h2>
                                <p>简单介绍</p>
                            </div>
                            <div className="col-md-8">
                                <ul className="card">
                                    <li className="card-item"> 
                                        <div className="item">
                                            <div className="card-pic">
                                                <img src="https://blog.teambition.com/wp-content/uploads/2017/11/webv920-454x316.png" alt=""/>
                                                <h4>xue yuan</h4>
                                            </div>
                                            <div className="card-content">
                                                <p>内容</p>
                                            </div>
                                            <div className="card-footer">
                                                <p>???</p>
                                            </div>
                                        </div>
                                    </li>
                                    <li className="card-item">
                                        <div className="item">
                                            <div className="card-pic">
                                                <img src="https://blog.teambition.com/wp-content/uploads/2017/11/webv920-454x316.png" alt="" />
                                                <h4>xue yuan</h4>
                                            </div>
                                            <div className="card-content">
                                                <p>内容</p>
                                            </div>
                                            <div className="card-footer">
                                                <p>???</p>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                            <div className="col-md-4">
                                <ul className="card">
                                    <li className="card-item">
                                        <div className="item">
                                            <div className="card-pic">
                                                <img src="https://blog.teambition.com/wp-content/uploads/2017/11/webv920-454x316.png" alt="" />
                                                <h4>xue yuan</h4>
                                            </div>
                                            <div className="card-content">
                                                <p>内容</p>
                                            </div>
                                            <div className="card-footer">
                                                <p>???</p>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(IntroduceView);
export { IntroduceView as IntroduceViewNotConnected };