import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import * as actionCreators from '../../../actions/auth';
import Icon from 'antd/lib/icon';
import Upload from 'antd/lib/upload';
import message from 'antd/lib/message';
import Input from 'antd/lib/input';
import Button from 'antd/lib/button';
import Radio from 'antd/lib/radio';
import DatePicker from 'antd/lib/date-picker';
import Select from 'antd/lib/select';
import Spin from 'antd/lib/spin';
import _ from 'lodash';

const RadioGroup = Radio.Group;
const Search = Input.Search;
const Option = Select.Option;
class BasicView extends Component {
	constructor (props) {
		super(props);
		this.state = {
			loading: false,
			formValues: {
				firstName: null,
				lastName: null,
				phoneNumber: null,
				gender: null,
				dateBorn: null,
				photoUrl: null
			},
			imageUrl: '',
		}
	}

	componentDidMount() {
		this.props.actions.getUser(Cookies.get('token'));
	}
	

	getBase64 = (img, callback) => {
		const reader = new FileReader();
		reader.addEventListener('load', () => callback(reader.result));
		reader.readAsDataURL(img);
	}

	beforeUpload = (file) => {
		const isJPG = file.type === 'image/jpeg';
		if (!isJPG) {
			message.error('You can only upload JPG file!');
		}
		const isLt2M = file.size / 1024 / 1024 < 2;
		if (!isLt2M) {
			message.error('Image must smaller than 2MB!');
		}
		return isJPG && isLt2M;
	}

	handleAvatarChange = (info) => {
		if (info.file.status === 'uploading') {
			this.setState({ loading: true });
			return;
		}
		console.log("what is info ", info);
		if (info.file.status === 'done') {
			// Get this url from response in real world.
			console.log(info, "$$$$$");
			this.getBase64(info.file.originFileObj, imageUrl => this.setState({
				imageUrl: `http://p7b9iw239.bkt.clouddn.com/${info.file.response.hash}`,
				loading: false,
			}));
		}
	}

	onInputChange = (e) => {
		let formValues = this.state.formValues;
		formValues[e.target.name] = _.trim(e.target.value);
		this.setState({
			formValues
		});
	}

	updateProfile = () => {
		let formValues = this.state.formValues;
		let user = this.props.user;
		let postData = {
			"first_name": user.first_name,
			"gender": user.gender,
			"phone_number": user.phone_number,
			"id": user.id,
			"photo_url": this.state.imageUrl
		}
		_.map(formValues, (value, key) => {
			if (value !== null && value !== '') {
				postData[`${_.snakeCase(key)}`] = value
			}
		})
		this.props.actions.updateUser(Cookies.get('token'), postData);
	}

	render() {
		const uploadButton = (
			<div>
				<Icon type={this.state.loading ? 'loading' : 'plus'} />
				<div className="ant-upload-text">Upload</div>
			</div>
		);
		console.log("看看imgge", this.state.imageUrl);
		const imageUrl = this.state.imageUrl;
		let user = this.props.user;
		let renderInfo = '';
		let uploadData = {
			'token': 'CGcNHo5yT0y9m-kFKMD9j5PSOKdpY3c5OUr6DVVM:mwzjCW_vU4qTtgrqTES2Sn_p1CM=:eyJzY29wZSI6ImltYWdlcyIsImRlYWRsaW5lIjoxNTM2OTEwMzM2fQ=='
		}
		if (user) {
			renderInfo = <div>
				<div className="avatar-upload">
					<Upload
						name="file"
						listType="picture-card"
						className="avatar-uploader"
						showUploadList={false}
						action="https://upload-z2.qiniup.com"
						beforeUpload={this.beforeUpload}
						data={uploadData}
						onChange={this.handleAvatarChange}
					>
						{/* {imageUrl ? <img src={JSON.parse(user).photo_url} alt="" /> : uploadButton} */}
						{
							this.state.imageUrl
							?
								<img src={this.state.imageUrl} alt="" />
							:
								<img src={user.photo_url} alt="" />
						}
					</Upload>
				</div>
				<div className="basic-form">
					<div className="form-horizontal">
						<div className="form-group">
							<label className="col-md-4 control-label">邮箱</label>
							<div className="col-md-5">
								<Input
									placeholder={user.email}
									className="profile-input"
									disabled={true}
								/>
							</div>
						</div>
						<div className="form-group">
							<label className="col-md-4 control-label">用户名</label>
							<div className="col-md-5">
								<Input
									name="firstName"
									placeholder="FirstName"
									defaultValue={user.first_name}
									className="profile-input"
									onChange={this.onInputChange}
								/>
							</div>
						</div>
						<div className="form-group">
							<label className="col-md-4 control-label">电话号码</label>
							<div className="col-md-5">
								<Input
									name="phoneNumber"
									placeholder="Phone"
									defaultValue={user.phone_number}
									className="profile-input"
									onChange={this.onInputChange}
									type="number"
								/>
							</div>
						</div>
						<div className="form-group">
							<label className="col-md-4 control-label">性别</label>
							<div className="col-md-5">
								<RadioGroup
									onChange={this.onInputChange}
									defaultValue={user.gender}
									name="gender"
								>
									<Radio value='M'>男</Radio>
									<Radio value='F'>女</Radio>
								</RadioGroup>
							</div>
						</div>

						{/* <div className="form-group">
							<label className="col-md-4 control-label">出生日期</label>
							<div className="col-md-5">
								<DatePicker
									// defaultValue={moment(user.date_born)}
									onChange={this.onDatePickerChange}
									placeholder="选择出生日期"
								/>
							</div>
						</div> */}

						<div className="form-group">
							<div className="col-md-9 text-right">
								<Button
									type="primary"
									onClick={this.updateProfile}
								>
									{
										this.props.isUpdatingUser
											?
											"上传中..."
											:
											"更新信息"
									}
								</Button>
							</div>
						</div>
					</div>
				</div>
			</div>
		}
		return (
			<div className="basic-view">
				{renderInfo}
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		isAuthenticated: state.auth.isAuthenticated,
		isAuthenticating: state.auth.isAuthenticating,
		statusText: state.auth.statusText,
		user: state.auth.user,
		isUpdatingUser: state.auth.isUpdatingUser
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		dispatch,
		actions: bindActionCreators(actionCreators, dispatch)
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(BasicView);
export { BasicView };