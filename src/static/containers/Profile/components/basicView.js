import React, { Component } from 'react';
import Icon from 'antd/lib/icon';
import Upload from 'antd/lib/upload';
import message from 'antd/lib/message';
class BasicView extends Component {
	constructor (props) {
		super(props);
		this.state = {
			loading: false
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

	render() {
		const uploadButton = (
			<div>
				<Icon type={this.state.loading ? 'loading' : 'plus'} />
				<div className="ant-upload-text">Upload</div>
			</div>
		);
		const imageUrl = this.state.imageUrl;

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
			</div>
		);
	}
}

export default BasicView;