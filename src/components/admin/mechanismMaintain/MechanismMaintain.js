import React, { Component } from 'react';
import { Link , withRouter } from 'react-router-dom';
import Pagination from '../../pagination/Pagination'
import * as api from '../../../config/api'
import * as tools from '../../../config/tools'
import './mechanismMaintain.css'
class MechanismMaintain extends Component {
  constructor(args) {
    super();
    this.state = {
      healthCheckupPartyList: [],
      totalPage: 1,
      jumpPage: 1,
      cityCode: '',
      partyName: '',
      partyStatus: '',
      cityinfomstList: [],
      action: 'add',
      del_id: '',
      branchList: [],
      cityList:[],
      branchCode: ''
    }
  }
  componentDidMount() {
    this.show();
  }
  jump(page) {
    this.setState({
      jumpPage: page
    }, () => {
      this.show();
    })
  }
  show(num) {
    let params = {
      pageno: num===1?1:this.state.jumpPage,
      branchCode: this.state.branchCode,
      cityCode: this.state.cityCode,
      partyName: this.state.partyName,
      partyStatus: this.state.partyStatus
    }
    api.healthcheckupparty_selectall(params).then((data) => {
      if(num===1){
        this.refs.page.indexpage(1)
      }
      if (tools.checkResult(data)) {
        this.setState({
          healthCheckupPartyList: data.healthCheckupPartyList,
          cityinfomstList: data.cityinfomstList,
          totalPage: data.totalPage
        })
      } else {
        tools.toast.error(data.errMsg || '网络错误');
      }
    }, (err) => {
      tools.toast.offline(err);
    })
    api.monthlyselect({
      isContext: 1
    }).then((data) => {
      if (tools.checkResult(data)) {
        this.setState({
          branchList: data.branchList,
          cityList: data.cityList,
        })
      } else {
        tools.toast.error(data.errMsg || '网络错误');
      }
    })
  }
  reset() {
    this.setState({
      branchCode: '',
      cityCode: '',
      partyName: '',
      partyStatus: ''
    },()=>{
      this.changeBranch();
    })
  }
  del(id) {
    let params = {
      id
    }
    api.healthcheckupparty_delete(params).then((data) => {
      if (tools.checkResult(data)) {
        window.$('.reveal-modal').trigger('reveal:close');
        this.show();
      } else {
        tools.toast.error(data.errMsg || '网络错误');
      }
    })
  }
  changeBranch(branchCode) {
    let branchList = this.state.branchList;
    let provinceCode;
    for (let i in branchList) {
      if (branchList[i].branchCode === branchCode) {
        provinceCode = branchList[i].provinceCode;
        break;
      }
    }
    this.setState({
      provinceCode,
      branchCode,
      cityCode:''
    })
  }
  edit(id,e){
    e.stopPropagation();
    this.props.history.push(`/admin/editMechanism/${id}`)
  }
  detail(id){
    this.props.history.push(`/admin/mechanismDetail/${id}`)
  }
  render() {
    let resultCityList = [];
    let cityList = this.state.cityList;
    let branchList = this.state.branchList;
    for (let i in cityList) {
      if (this.state.provinceCode === cityList[i].provinceCode) {
        resultCityList.push(cityList[i])
      }
    }
    return (
      <div>
          <div className='content-right'>
          <div className="main1">
          <div className="box2">
          <div>

               <label className="fl">分公司</label>
               <select value={this.state.branchCode} onChange={(e) => this.changeBranch(e.target.value)} className="fl-none fl width15" >
               <option value="">请选择</option>
               {this.state.branchList.map((item, index) => {
                return (
                    <option key={index} value={item.branchCode}>{item.branchName}</option>
                )
              })}
               </select>

               <label className="fl">城市</label>
               <select value={this.state.cityCode} onChange={(e) => {this.setState({cityCode: e.target.value})}} className="fl-none fl width15" >
               <option value="">请选择</option>
               {resultCityList.map((item, index) => {
                return (
                    <option key={index} value={item.cityCode}>{item.cityName}</option>
                )
               })}
               </select>

               <label className="fl">体检机构</label>
               <input value={this.state.partyName} onChange={(e)=>{this.setState({partyName:e.target.value})}} type="text" className="tl fl width20" data-input-clear={5} />
                 

               <div className="clearfix" />

                <label className="fl">状态</label>
                <select value={this.state.partyStatus} onChange={(e)=>{this.setState({partyStatus:e.target.value})}} className="fl-none fl width15" name="choose" id="choose">
                   <option value="">请选择</option>
                   <option value="1">开放</option>
                   <option value="0">暂停</option>
                 </select>




          <a className="button btn-color-red" onClick={() => this.show(1)} >查 询</a>
          <a className="button" onClick={() => this.reset()}  >重 置</a>
          </div>
          </div>
          <div className="clear" />
          </div>

          <div className="main1" id="myTab2_2Content0">
          <div className="title-add">
          <Link to='/admin/addMechanism' className="add-data">新增</Link>
          </div>
          <div className="box1 table-overflow m-b-2">
          <table width="100%" border={0} className="table1">
          <tbody>
          <tr>
            <th>序号</th>
            <th>分公司</th>
            <th>城市</th>
            <th>体检机构</th>
            <th>地址</th>
            <th>联系人</th>
            <th>电话</th>
            <th>交通</th>
            <th>备注</th>
            <th>状态</th>
            <th>操作</th>
          </tr>

           {this.state.healthCheckupPartyList.map((item, index) => {
               let branchName = '',
                 cityName = '';
               for (let i in branchList) {
                 if (branchList[i].branchCode === item.branchCode) {
                   branchName = branchList[i].branchName;
                   break;
                 }
               }
               for (let i in cityList) {
                 if (cityList[i].cityCode === item.cityCode) {
                   cityName = cityList[i].cityName;
                   break;
                 }
               }
               return (
                 <tr onClick={()=>this.detail(item.id)} key={index}>
                     <td>{index + 1}</td>
                     <td>{item.branchName}</td>
                     <td>{item.cityName}</td>
                     <td>{item.partyName}</td>
                     <td>{item.partyAddress}</td>
                     <td>{item.contactPerson}</td>
                     <td>{item.partyTel}</td>
                     <td>{item.partyTrafficInfo}</td>
                     <td>{item.remarks}</td>
                     <td>
                       {(() => {
                           switch (item.partyStatus) {
                           case '0':
                               return ('暂停');
                           case '1':
                               return ('开放');
                           default:
                               return ('未知')
                           }
                       })()}
                     </td>
                     <td>
                     <a onClick={(e) => this.edit(item.id,e)} >修改</a>
                     <a data-reveal-id="healthCheckupParty_del_modal" onClick={(e) => {e.stopPropagation();this.setState({del_id: item.id})}} >删除</a>
                     </td>
                     </tr>
               )
             })
            }
          </tbody>
          </table>
          </div>
          <Pagination totalPage={this.state.totalPage} jump={this.jump.bind(this)} ref="page"/>
          </div>
          </div>


          <div id="healthCheckupParty_del_modal" className="reveal-modal">
          <h1>提示信息</h1>
          <div className="main">
          <p className="tallyou">确定要删除吗？</p>
          <div className="btn-main m-t-2">
          <span><a onClick={() => this.del(this.state.del_id)} className="button btn-color-red">确 认</a></span>
               
          <span><a onClick={() => {window.$('.reveal-modal').trigger('reveal:close');}} className="button">取 消</a></span>
          </div>
          </div>
          <a className="close-reveal-modal">×</a>
          </div>

          </div>

    );
  }
}

export default withRouter(MechanismMaintain);