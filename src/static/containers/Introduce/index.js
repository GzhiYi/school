import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { push } from 'react-router-redux';
import PropTypes from 'prop-types';
import door from '../../images/door.jpg';
import build from '../../images/lib.jpg';
import Button from 'antd/lib/button';
import Modal from 'antd/lib/modal';
import Input from 'antd/lib/input';
import Alert from 'antd/lib/alert';
import _ from 'lodash';

import * as actionCreators from '../../actions/introduce';

import './style.scss';

class IntroduceView extends React.Component {
    state = { 
        visible: false,
		idNum: '', 
    }
    showModal = () => {
        this.setState({
            visible: true,
        });
    }
    handleOk = (e) => {
        console.log(e);
        this.setState({
            visible: false,
        });
    }
    handleCancel = (e) => {
        console.log(e);
        this.setState({
            visible: false,
        });
    }

    componentDidMount() {
        this.props.actions.getIntroduceBase();
    }

    goToLogin = () => {
        this.props.dispatch(push('/login'));
    }

    goToDetail = (type) => {
        this.props.dispatch(push(`/introduce/${type}`));
    }

    searchId = () => {
		this.props.actions.searchAdmission(Cookies.get('token'), this.state.idNum);
    }

    handleChange = (e) => {
        this.setState({
            idNum: e.target.value,
        });
    }

    render() {
        let renderItems = null;
        if (this.props.introduceBase) {
            renderItems = _.map(this.props.introduceBase, (item, index) => {
                return (
                    <li className="card-item" key={index} onClick={() => {this.goToDetail(item.introduce_type)}}>
                        <div className="item">
                            <div className="card-pic">
                                <img src={door} alt="" />
                            </div>
                            <div className="card-content">
                                <h4>{item.title}</h4>
                            </div>
                            {/* <div className="card-footer">
                                                <p>???</p>
                                            </div> */}
                        </div>
                    </li>
                )
            })
        }
        let user = Cookies.get('user');
        console.log(user, '......');
		let admissionResult = this.props.admissionResult;
        return (
            <div>
                <div className="introduce-page">
                    <div className="container-fluid">
                        <div className="row">
                            {/* <div className="header text-center">
                                <h2>广东药科大学</h2>
                                <p>简单介绍</p>
                            </div> */}
                            <div className="col-md-offset-1 col-md-7">
                                <ul className="card">
                                    {renderItems}                                    
                                </ul>
                            </div>
                            <div className="col-md-3">
                                <ul className="card">
                                    <li className="card-item">
                                        <div className="item">
                                            {
                                                Cookies.get('token')
                                                ?
                                                    <div>
                                                        <p>您好，{JSON.parse(user).first_name}。您可以：</p>
                                                        <div className="tool">
                                                            <Button type="primary" onClick={this.showModal}>查看录取情况</Button>
                                                        </div>
                                                    </div>
                                                :
                                                    <p><a onClick={this.goToLogin}>登录</a>以查看录取等个人情况</p>
                                            }
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <Modal
                        title="输入身份证号查看您的录取情况"
                        visible={this.state.visible}
                        onOk={this.handleOk}
                        onCancel={this.handleCancel}
                    >
                        <div style={{marginBottom: 20}}>
                            <Input
                                placeholder="输入身份证号"
                                type="number"
                                onChange={this.handleChange}
                                name="num"
                            />
                        </div>
                        <div style={{marginBottom: 20}}>
                            <Button onClick={this.searchId}>查询</Button>
                        </div>
                        {
							admissionResult
							?
								admissionResult.length > 0
								?
									<div className="result">
										<label >姓名：</label>{admissionResult[0].name} <br />
										<label >录取情况：</label>{admissionResult[0].status}
									</div>
								:
									<Alert message="未找到该身份的录取信息。" type="error" showIcon />		
							:
								''
						}
                    </Modal>
                </div>   
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.auth.isAuthenticated,
        isAuthenticating: state.auth.isAuthenticating,
        statusText: state.auth.statusText,
        introduceBase: state.introduce.introduceBase,
        admissionResult: state.introduce.admissionResult,
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