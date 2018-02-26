import React, { Component } from 'react';
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
		}
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
		if (info.file.status === 'done') {
			// Get this url from response in real world.
			this.getBase64(info.file.originFileObj, imageUrl => this.setState({
				imageUrl,
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

	}

	render() {
		const uploadButton = (
			<div>
				<Icon type={this.state.loading ? 'loading' : 'plus'} />
				<div className="ant-upload-text">Upload</div>
			</div>
		);
		const imageUrl = this.state.imageUrl;
		const user = JSON.parse(sessionStorage.getItem('user'));
		console.log('user', user);
		return (
			<div className="basic-view">
				<div className="avatar-upload">
					<Upload
						name="avatar"
						listType="picture-card"
						className="avatar-uploader"
						showUploadList={false}
						action="//jsonplaceholder.typicode.com/posts/"
						beforeUpload={this.beforeUpload}
						onChange={this.handleAvatarChange}
					>
						{imageUrl ? <img src={imageUrl} alt="" /> : uploadButton}
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
									// defaultValue={user.phone_number}
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
									// defaultValue={user.gender}
									name="gender"
								>
									<Radio value='male'>男</Radio>
									<Radio value='femile'>女</Radio>
								</RadioGroup>
							</div>
						</div>

						<div className="form-group">
							<label className="col-md-4 control-label">出生日期</label>
							<div className="col-md-5">
								<DatePicker
									// defaultValue={moment(user.date_born)}
									onChange={this.onDatePickerChange}
									placeholder="选择出生日期"
								/>
							</div>
						</div>

						<div className="form-group">
							<div className="col-md-9 text-right">
								<Button
									type="primary"
									onClick={this.updateProfile}
								>
									{
										this.props.isUpdatingProfile
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
		);
	}
}

export default BasicView;