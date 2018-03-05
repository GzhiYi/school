import React, { Component } from 'react';
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
class MailView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            formValues: {
                newPhone: null,
                code: null,
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
        console.log('formValues', formValues);
    }

    render() {
        return (
            <div className="basic-view">
                <div className="basic-form">
                    <div className="form-horizontal">
                        <div className="form-group">
                            <label className="col-md-4 control-label">新手机</label>
                            <div className="col-md-5">
                                <Input
                                    type="number"
                                    placeholder="请输入新的手机号码"
                                    className="profile-input"
                                    name="newPhone"
                                    onChange={this.onInputChange}
                                />
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="col-md-4 control-label">验证码</label>
                            <div className="col-md-5">
                                <Search 
                                    placeholder="验证码" 
                                    enterButton="发送" 
                                    className="profile-input"
                                    // onSearch＝
                                />
                            </div>
                        </div>
                        <div className="alert-div">
                            <Alert message="您当前的手机号为13415****74，更换后可用新手机号登录" type="info" />
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
                                            "确认修改"
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

export default MailView;