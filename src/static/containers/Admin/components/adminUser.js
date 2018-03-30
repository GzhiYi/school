import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import * as actionCreators from '../../../actions/admin';
import Table from 'antd/lib/table';
import Input from 'antd/lib/input';
import Button from 'antd/lib/button';
import Popconfirm from 'antd/lib/popconfirm';
import message from 'antd/lib/message';
import Spin from 'antd/lib/spin';
import moment from 'moment';
const Search = Input.Search;
class AdminUserView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedRows: [],
            selectedRowKeys: [],
        }
    }

    componentDidMount() {
        this.props.actions.getUsers(Cookies.get('token'));
    }
    
    confirm = (e) => {
        const selectedRows = this.state.selectedRows;
        console.log("删除的", selectedRows);
        let putArray = [];

        _.map(selectedRows, (row, index) => {
            if (row.isDelete === "正常") {
                putArray.push(row.id);
            }
        })
        if (putArray.length !== 0) {
            let putData = {
                "id": putArray,
                "method": 0
            };
            this.setState({
                selectedRows: [],
                selectedRowKeys: [],
            });
            this.props.actions.delUsers(Cookies.get('token'), putData);
        } else {
            message.info("您选的用户都已经是删除的！")
        }
    }

    confirmRecovery = (text, value) => {
        console.log(value);
        let putData = {};
        if (text !== "正常") {
            putData = {
                "id": [value.id],
                "method": 1
            };
        }
        this.props.actions.delUsers(Cookies.get('token'), putData);
    }

    cancel = (e) => {
        console.log(e);
        message.info('操作已取消');
    }
    render() {
        const rowSelection = {
            onChange: (selectedRowKeys, selectedRows) => {
                console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
                this.setState({
                    selectedRows,
                    selectedRowKeys
                });
            }
        };
        const columns = [{
            title: '用户名',
            dataIndex: 'name',
        }, {
            title: '性别',
            dataIndex: 'sex'
        }, {
            title: '邮箱',
            dataIndex: 'email'
        }, {
            title: '手机号',
            dataIndex: 'phone',
            sorter: (a, b) => a.category.localeCompare(b.category, 'zh-Hans-CN', { sensitivity: 'accent' })
        }, {
            title: '注册时间',
            dataIndex: 'registerTime',
            sorter: (a, b) => new Date(a.registerTime) - new Date(b.registerTime),
        }, {
            title: '上一次登陆',
            dataIndex: 'lastLoginTime',
            sorter: (a, b) => new Date(a.lastLoginTime) - new Date(b.lastLoginTime),
        }, {
            title: '状态',
            dataIndex: 'isDelete',
            sorter: (a, b) => a.isDelete.localeCompare(b.isDelete, 'zh-Hans-CN', { sensitivity: 'accent' }),
            render: (text, index) => <a onClick={()=>{this.confirmRecovery(text, index)}} className={text === "已删除" ? "deleted" : 'normal'}>{text}</a>
        }];
        let data = [];
        let userData = this.props.userData;
        let paginationSetting = {}
        if (userData) {
            paginationSetting = {
                'total': userData.count,
                'pageSize': 20,
                onChange: (pageNum, num) => {
                    this.props.actions.getUsers(Cookies.get('token'), null, pageNum);
                }
            }
            _.map(userData.results, (item, index) => {
                if (item.email !== JSON.parse(Cookies.get('user')).email) {
                    data.push({
                        key: index,
                        id: item.id,
                        name: item.first_name,
                        sex: item.gender === 'M' ? "男" : "女",
                        email: item.email,
                        phone: item.phone_number === null ? "未填写手机号" : item.phont_number,
                        registerTime: moment(item.date_joined).format("YYYY-MM-DD"),
                        lastLoginTime: item.last_login === null ? "未登录过" : moment(item.last_login).format("YYYY-MM-DD"),
                        isDelete: item.is_active === true ? "正常" : "已删除"
                    });
                }
                
            })
        }
        const { selectedRows } = this.state;
        // console.log(data);
        return (
            <div>
                <div className="search">
                    {
                        selectedRows.length > 0
                            ?
                            // [
                            <Popconfirm
                                title="确认删除所选用户？"
                                onConfirm={this.confirm}
                                onCancel={this.cancel}
                                okText="确认"
                                cancelText="算了"
                                placement="left"
                                key="0"
                            >
                                <Button className="del-post-btn" type="danger">删除</Button>
                            </Popconfirm>
                            //  ,
                            // <Popconfirm
                            //     title="确认恢复所选用户？"
                            //     onConfirm={this.confirmRecovery}
                            //     onCancel={this.cancel}
                            //     okText="确认"
                            //     cancelText="算了"
                            //     placement="left"
                            //     key="1"
                            // >
                            //     <Button className="del-post-btn" type="primary">恢复激活</Button>
                            // </Popconfirm>]
                            :
                            ''
                    }
                    <Search
                        placeholder="用户名"
                        onSearch={value => this.props.actions.getUsers(Cookies.get('token'), value)}
                        style={{ width: 200, marginLeft: 20 }}
                />
                </div>
                <Spin tip="加载用户数据中..." spinning={this.props.isFetchingUserData}>
                    <Table
                        rowSelection={rowSelection}
                        columns={columns}
                        dataSource={data}
                        pagination={paginationSetting}
                    />
                </Spin>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.auth.isAuthenticated,
        isAuthenticating: state.auth.isAuthenticating,
        statusText: state.auth.statusText,
        userData: state.admin.userData,
        isFetchingUserData: state.admin.isFetchingUserData
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        dispatch,
        actions: bindActionCreators(actionCreators, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminUserView);
export { AdminUserView };