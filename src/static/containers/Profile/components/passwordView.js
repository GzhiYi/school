import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import * as actionCreators from '../../../actions/auth';
import Icon from 'antd/lib/icon';
import message from 'antd/lib/message';
import Input from 'antd/lib/input';
import Button from 'antd/lib/button';
import Radio from 'antd/lib/radio';
import DatePicker from 'antd/lib/date-picker';
import Select from 'antd/lib/select';
import Spin from 'antd/lib/spin';
import Alert from 'antd/lib/alert';

const RadioGroup = Radio.Group;
const Search = Input.Search;
const Option = Select.Option;
class PasswordView extends Component {
	constructor(props) {
		super(props);
		this.state = {
			formValues: {
				oldPassword: null,
				newPassword: null,
				confirmPassword: null,
			}
		}
	}

	onInputChange = (e) => {
		let formValues = this.state.formValues;
		formValues[e.target.name] = _.trim(e.target.value);
		this.setState({
			formValues
		});
	}

	resetPassword = () => {
		let formValues = this.state.formValues;
		if (formValues.newPassword !== formValues.confirmPassword) {
			message.error("密码和确认密码不一致，请确认！");
		} else {
			this.props.actions.resetPassword(Cookies.get('token'), formValues.oldPassword, formValues.newPassword);
		}
	}

	render() {
		return (
			<div className="basic-view">
				<div className="basic-form">
					<div className="form-horizontal">
						<div className="form-group">
							<label className="col-md-4 control-label">原密码</label>
							<div className="col-md-5">
								<Input
									type="password"
									placeholder="原密码"
									className="profile-input"
									name="oldPassword"
									onChange={this.onInputChange}
								/>
							</div>
						</div>
						<div className="form-group">
							<label className="col-md-4 control-label">新密码</label>
							<div className="col-md-5">
								<Input
									name="newPassword"
									type="password"
									placeholder="新密码"
									className="profile-input"
									onChange={this.onInputChange}
								/>
							</div>
						</div>
						<div className="form-group">
							<label className="col-md-4 control-label">确认密码</label>
							<div className="col-md-5">
								<Input
									name="confirmPassword"
									type="password"
									placeholder="确认密码"
									className="profile-input"
									onChange={this.onInputChange}
								/>
							</div>
						</div>
						<div className="alert-div">
							<Alert message="密码修改成功需要重新登录!" type="info" />
						</div>
						<div className="form-group">
							<div className="col-md-9 text-right">
								<Button
									type="primary"
									onClick={this.resetPassword}
								>
									{
										this.props.isUpdatingProfile
											?
											"修改中..."
											:
											"修改密码"
									}
								</Button>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}


const mapStateToProps = (state) => {
	return {
		isFetchingComments: state.forum.isFetchingComments,
		comments: state.forum.comments
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		dispatch,
		actions: bindActionCreators(actionCreators, dispatch)
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(PasswordView);
export { PasswordView };