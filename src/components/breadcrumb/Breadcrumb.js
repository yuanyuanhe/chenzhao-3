import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
class Breadcrumb extends Component {
    constructor(args) {
        super();
        this.state = {
            page1: '',
            page2: ''
        }
    }
    componentWillReceiveProps(nextProps) {
        this.page1(nextProps.location.pathname)
        this.page2(nextProps.location.pathname)
    }
    componentWillMount() {
        this.page1(this.props.location.pathname)
        this.page2(this.props.location.pathname)
    }
    page1(pathname) {
        let page1 = '';
        if (pathname === '/') {
            page1 = localStorage.getItem('powercode') !== '0016'?'预约体检':'系统后台设置';
        }
        if (pathname.indexOf('admin') !== -1) {
            page1 = '系统后台设置';
        }
        if (pathname.indexOf('appointmentManage') !== -1) {
            page1 = '预约管理';
        }
        if (pathname.indexOf('appointmentExamination') !== -1) {
            page1 = '预约体检';
        }
        if (pathname.indexOf('report') !== -1) {
            page1 = '报表中心';
        }
        if(pathname.indexOf('recordQuery') !== -1){
            page1 = '查询中心';
        }
        if(pathname.indexOf('notFoundPage') !== -1){
            page1 = '404';
        }
        this.setState({
            page1
        })
    }
    page2(pathname) {
        let data = [];
        let page2 = '';
        data.push({
            page: 'projectMaintain',
            text: '体检项目维护'
        })
        data.push({
            page: 'classMaintain',
            text: '体检项目类别维护'
        })
        data.push({
            page: 'mechanismMaintain',
            text: '体检机构维护'
        })
        data.push({
            page: 'addMechanism',
            text: '新增机构'
        })
        data.push({
            page: 'mechanismPackage',
            text: '机构体检套餐维护'
        })
        data.push({
            page: 'datascan',
            text: '清单数据扫描'
        })
        data.push({
            page: 'checkout',
            text: '结账'
        })
        data.push({
            page: 'monthlyreport',
            text: '月报表'
        })
        data.push({
            page: 'reservationRecordQuery',
            text: '预约记录查询'
        })
        data.push({
            page:"constantMaintenance",
            text: '常量维护'
        })
        data.push({
            page:"thelatestTime",
            text: '最迟预约下一个工作日时间'
        })
        data.push({
            page: 'testinfo',
            text: '预约体检详情'
        })
        data.push({
            page: 'testtime',
            text: '预约体检登记'
        })
        data.push({
            page: 'editUnsendHospital',
            text: '待发医院编辑'
        })
        data.push({
            page: 'cancelDetail',
            text: '取消体检记录详情'
        })
        data.push({

            page: 'reservationRecord',
            text: '预约记录详情'
        })
        data.push({
            page: 'detail',
            text: '预约体检详情'
        })
        data.push({
            page: 'sendset',
            text: '发送设置'
        })
        data.push({
            page: 'addRegister',
            text: '体检资料补登'
        })
        data.push({
            page: 'editRegister',
            text: '体检资料修改'
        })
        data.push({

            page: 'fenmeweihu',
            text: '分公司体检套餐维护'
        })
        data.push({
            page: 'userMaintain',
            text: '用户组维护'
        })
        data.push({
            page: 'uesrJurisdiction',
            text: '用户权限设置'
        })
         data.push({
            page: 'holiday',
            text: '节假日设置'
        })
         data.push({
            page: 'settime',
            text: '设置默认时间和名额'
        })
         data.push({
            page: 'unsendHospitalDetail',
            text: '待发医院详情'
        })
        data.push({
            page: 'registerDetail',
            text: '资料返回详情'
        })
        
        data.push({
            page: 'mechanismDetail',
            text: '体检机构详情'
        })
        for (let i in data) {
            if (pathname.indexOf(data[i].page) !== -1) {
                page2 = data[i].text;
                break;
            }
        }
        this.setState({
            page2
        })
    }
    render() {
        return (
            <div className="breadcrumb">
                <div className="tab">
                    当前位置：{this.state.page1} <span>{this.state.page2 !== '' ? '-> ' : ''}{this.state.page2}</span>
                </div>
            </div>
        );
    }
}

export default withRouter(Breadcrumb);
