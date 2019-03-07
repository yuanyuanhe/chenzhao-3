import React, { Component } from 'react';
import * as api from '../../config/api'
import * as tools from '../../config/tools'
import Pagination from '../pagination/Pagination'
import DatePicker from 'antd/lib/date-picker';
import moment from 'moment';
import { Link , withRouter } from 'react-router-dom';
import PropTypes from "prop-types";
import MonthlySelect from '../monthlySelect/MonthlySelect'
const { RangePicker } = DatePicker;
const $ = window.$;
class Tab0 extends Component {
  constructor(args) {
    super()
    this.state = {
      unSendList: [],
      totalPage: 1,
      jumpPage: 1,
      healthCheckupOrders:[],
      send_type:1,
      choosePartyName:'',
      partyEmail:'',
      partytel:'',
    }
  }
  componentDidMount() {
    this.show();
  }
  show(num) {
   
     $("input[name=checkbox]").prop("checked", false)
     $("input[name=choose_checkbox]").prop("checked", false)
    let params = Object.assign(this.props.params,{pageno:num===1?1:this.state.jumpPage});
    api.unsendhospitallist(params).then((data) => {
      if(num===1){
        this.refs.page.indexpage(1)
      }
      if (tools.checkResult(data)) {
        this.setState({
          unSendList: data.unSendList,
          totalPage: data.totalPage
        })
      } else {
        tools.toast.error(data.errMsg || '网络错误');
      }
    }, (err) => {
      tools.toast.offline(err);
    })
  }
  jump(page) {
    this.setState({
      jumpPage: page
    }, () => {
      this.show();
    })
  }
  chooseAll(e) {
    $("input[name=choose_checkbox]").prop("checked", e.target.checked);
  }
  del(id) {
    let params = {
      id : id
    }
    api.deletecheckuporder(params).then((data) => {
      if (tools.checkResult(data)) {
        this.show();
      } else {
        tools.toast.error(data.errMsg || '网络错误');
      }
    }, (err) => {
      tools.toast.offline(err);
    })
    $('.reveal-modal').trigger('reveal:close');
  }
  edit(item){
    this.props.historyPush(`/appointmentManage/editUnsendHospital/${item.id}`)
  }
  sendMoal(send_type) {
    let testId = '';
    let partyList = [];
    let isSameParty = true;
    $('input[name="choose_checkbox"]:checked').each(function(index, el) {
      if (partyList.length > 0 && partyList.indexOf($(el).parent().next().text()) === -1) {
        isSameParty = false;
        return;
      } else {
        partyList.push($(el).parent().next().text())
      }
      testId += `${$(el).val()},`
    });
    if(!isSameParty){
      tools.toast.error('未选择相同机构', 1000);
      return;
    }
    if (testId === '') {
      tools.toast.error('未选择机构', 1000);
      return;
    }
    this.setState({
      choosePartyName:partyList[0]
    })
    let params = {
      testId
    }
    api.sendfaxandemail(params).then((data) => {
      if (tools.checkResult(data)) {
        this.setState({
          healthCheckupOrders: data.healthCheckupOrders,
          send_type,
          partyEmail:data.healthCheckupOrders[0].healthCheckupParty.partyEmail,
          partytel:data.healthCheckupOrders[0].healthCheckupParty.partyTel,
        }, () => {
          $("#send-modal").reveal("{data-animation:'none'}");
        })
      } else {
        tools.toast.error(data.errMsg || '网络错误');
      }
    })
  }
  email(){
    let testId = ''
    $('input[name="choose_checkbox"]:checked').each(function(index, el) {
      testId += `${$(el).val()},`
    });
    let params = {
      testId,
      iconId:this.state.send_type,
      partyEmail:this.state.partyEmail,
      partyPhone:this.state.partytel,
    }
    api.exportword(params).then((data) => {
      if (tools.checkResult(data)) {
        tools.toast.success('发送成功');
        $('.reveal-modal').trigger('reveal:close');
        setTimeout(()=>{window.location.reload();},1000)
      } else {
        tools.toast.error(data.errMsg || '网络错误');
      }
    })
  }
  detail(id){
    this.props.historyPush(`/appointmentManage/unsendHospitalDetail/${id}`)
  }
  render() {
    return (
      <div className="main1" id="myTab2_2Content0">
        <div className="title-add">
              <span><a className="add-data" onClick={()=>this.sendMoal(1)} >发邮件</a></span>
              {/*<span><a className="button btn-color-red" onClick={()=>this.sendMoal(0)} >发传真</a></span>
*/}            </div>       
            <div className="box1 table-overflow m-b-2">
              <table width="100%" border={0} className="table1">
                <tbody>
                  <tr>                          
                    <th><input onChange={(e)=>this.chooseAll(e)} name="checkbox" type="checkbox" /> 全选</th>
                    <th>医院</th>
                    <th>保单号</th>
                    <th>发送模式</th>
                    <th>客户姓名</th>
                    <th>体检时间</th>
                    <th>营销员姓名</th>
                    <th>营销员电话</th>
                    <th>核保员说明</th>
                    <th>体检机构</th>
                    <th>体检项目更新时间</th>
                    <th>体检标识</th>
                    <th>指定体检点</th>
                    <th>状态</th>
                    <th>操作</th>
                  </tr>

                  {this.state.unSendList.map((item,index)=>{
                    return(
                      <tr key={index}>
                          <td><input value={item.id} onClick={(e)=>{e.stopPropagation();}} name='choose_checkbox' type="checkbox"/></td>
                          <td onClick={() => this.detail(item.id)}>{item.healthCheckupParty.partyName}</td>
                          <td onClick={() => this.detail(item.id)}>{item.policyNo}</td>
                          <td onClick={() => this.detail(item.id)}>{item.sendCode === '01'?'邮件':'无'}</td>
                          <td onClick={() => this.detail(item.id)}>{item.checkupPerson.personName}</td>
                          <td onClick={() => this.detail(item.id)}>{item.checkupDate}</td>
                          <td onClick={() => this.detail(item.id)}>{item.userInfo.username}</td>
                          <td onClick={() => this.detail(item.id)}>{item.salesTel}</td>
                          <td onClick={() => this.detail(item.id)}>{item.underwritingMemo}</td>
                          <td onClick={() => this.detail(item.id)}>{item.healthCheckupParty.partyName}</td>
                          <td onClick={() => this.detail(item.id)}>{item.updateTime}</td>
                          <td>
                          {(() => {
                              switch (item.healthchkCount) {
                              case '1':
                                  return '首次体检';
                              case '2':
                                  return '追加体检项目';
                              case '3':
                                  return '复查尿';
                              default:
                                  return ''
                              }
                          })()}
                          </td>
                          <td>{item.isFixedHospital}</td>
                          <td>{(() => {
                              switch (item.statusId) {
                              case '01':
                                  return ('待预约');
                              case '02':
                                  return ('已预约');
                              case '03':
                                  return ('取消预约');
                              case '04':
                                  return ('已发医院');
                              case '05':
                                  return ('已逾期');
                              case '06':
                                  return ('已体检');
                              case '07':
                                  return ('报告回齐');
                              case '08':
                                  return ('取消体检');
                              default:
                                  return ('其他')
                              }
                          })()}</td>
                          <td>
                          <a onClick={() => this.edit(item)} >修改</a>
                          <a data-reveal-id="del_modal" onClick={() => {this.setState({del_ID: item.id})}} >删除</a>
                          </td>
                         </tr>
                      )
                  })}
                </tbody>
              </table>
            </div>
            <Pagination totalPage={this.state.totalPage} jump={this.jump.bind(this)} ref="page"/>
            <div id="del_modal" className="reveal-modal">
            <h1>提示信息</h1>
            <div className="main">
            <p className="tallyou">确定要删除吗？</p>
            <div className="btn-main m-t-2">
            <span><a onClick={() => this.del(this.state.del_ID)} className="button btn-color-red">确 认</a></span>
            <span><a className="button" onClick={() => {$('.reveal-modal').trigger('reveal:close');}}>取 消</a></span>
            </div>
            </div>
            <a className="close-reveal-modal">×</a>
            </div>

<div id="send-modal" className="reveal-modal">
  <h1>{this.state.send_type === 1?'发邮件':'发传真'}</h1>
  <div className="main sen-fax">
    <div>{this.state.choosePartyName}</div>
    <div className="reveal-modal-title">您好，友邦客户预约体检，资料如下</div>
    <div className="box1 table-overflow m-b-2">
      <table width="100%" border={0} className="table1">
        <tbody>
          <tr>
            <th>保单号</th>
            <th>体检人</th>
            <th>出生年月</th>
            <th>年龄</th>
            <th>性别</th>
            <th>体检项目</th>
            <th>体检时间</th>
            <th>预约电话</th>
          </tr>
          {this.state.healthCheckupOrders.map((item,index)=>{
            return(
                  <tr key={index} >
                    <td>{item.policyNo}</td>
                    <td>{item.checkupPerson.personName}</td>
                    <td>{item.checkupPerson.birthday}</td>
                    <td>{item.age}</td>
                    <td>{item.checkupPerson.sex=='1'?'男':item.checkupPerson.sex=='2'?'女':'其他'}</td>
                    <td>{item.checkupItemName}</td>
                    <td>{item.checkupDate}</td>
                    <td>{item.salesTel}</td>
                  </tr>
              )
          })}
        </tbody>
      </table>
    </div>
    <p>如有疑问，请致电：{this.state.partytel}</p>
    <p>谢谢</p>
    <p>友邦医务中心</p>
    <div className="btn-main m-t-2">
      <span><a className="button btn-color-red" onClick={()=>this.email()} >确 认</a></span>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <span><a className="button" onClick={() => {$('.reveal-modal').trigger('reveal:close');}}>取 消</a></span>
    </div>
  </div>
  <a className="close-reveal-modal">×</a>
</div>


          </div>
    )
  }
}
class Tab1 extends Component {
  static contextTypes = {
    router: PropTypes.object
  }
  constructor(props, context) {
    super(props, context)
    this.state = {
      cancelList: [],
      totalPage: 1,
      jumpPage: 1,
      healthCheckupOrders:[],
      send_type:1,
      choosePartyName:'',
      partyEmail:'',
      partyPhone:'',
    }
  }
  componentDidMount() {
    this.show();
  }
  show(num) {
    let params = Object.assign(this.props.params,{pageno:num===1?1:this.state.jumpPage});
    api.canceltohospitallist(params).then((data) => {
      if(num===1){
        this.refs.page.indexpage(1)
      }
      if (tools.checkResult(data)) {
        this.setState({
          cancelList: data.cancelList,
          totalPage: data.totalPage
        })
      } else {
        tools.toast.error(data.errMsg || '网络错误');
      }
    }, (err) => {
      tools.toast.offline(err);
    })
  }
  jump(page) {
    this.setState({
      jumpPage: page
    }, () => {
      this.show();
    })
  }
  showDetail(id){
    this.context.router.history.push(`/appointmentManage/cancelDetail/${id}`)
  }
  chooseAll(e) {
    $("input[name=choose_checkbox]").attr("checked", e.target.checked);
  }
  sendMoal(send_type) {
    let testId = '';
    let partyList = [];
    let isSameParty = true;
    $('input[name="choose_checkbox"]:checked').each(function(index, el) {
      if (partyList.length > 0 && partyList.indexOf($(el).parent().next().text()) === -1) {
        isSameParty = false;
        return;
      } else {
        partyList.push($(el).parent().next().text())
      }
      testId += `${$(el).val()},`
    });
    if(!isSameParty){
      tools.toast.error('未选择相同机构', 1000);
      return;
    }
    if (testId === '') {
      tools.toast.error('未选择机构', 1000);
      return;
    }
    this.setState({
      choosePartyName:partyList[0]
    })
    let params = {
      testId
    }
    api.sendfaxandemail(params).then((data) => {
      if (tools.checkResult(data)) {
        this.setState({
          healthCheckupOrders: data.healthCheckupOrders,
          send_type,
          partyEmail:data.healthCheckupOrders[0].healthCheckupParty.partyEmail,
          partytel:data.healthCheckupOrders[0].healthCheckupParty.partyTel,
        }, () => {
          $("#send-modal").reveal("{data-animation:'none'}");
        })
      } else {
        tools.toast.error(data.errMsg || '网络错误');
      }
    })
  }
  email(){
    let testId = ''
    $('input[name="choose_checkbox"]:checked').each(function(index, el) {
      testId += `${$(el).val()},`
    });
    let params = {
      testId,
      iconId:this.state.send_type,
      partyEmail:this.state.partyEmail,
      partyPhone:this.state.partytel,
    }
    api.exportword(params).then((data) => {
      if (tools.checkResult(data)) {
        tools.toast.success('发送成功');
        $('.reveal-modal').trigger('reveal:close');
        setTimeout(()=>{window.location.reload();},1000)
      } else {
        tools.toast.error(data.errMsg || '网络错误');
      }
    })
  }
  render() {
    return (
      <div className="main1" id="myTab2_2Content0">       
            <div className="box1 table-overflow m-b-2">
            <div className="title-add">
              <span><a className="add-data" onClick={()=>this.sendMoal(1)}>发邮件</a></span>
              {/*<span><a className="button btn-color-red" onClick={()=>this.sendMoal(0)}>发传真</a></span>*/}
            </div>

              <table width="100%" border={0} className="table1">
                <tbody>                       
                  <tr>                          
                    <th><input onChange={(e)=>this.chooseAll(e)} name="checkbox" type="checkbox"/> 全选</th>
                    <th>医院</th>
                    <th>保单号</th>
                    <th>预约人代号</th>
                    <th>体检机构</th>
                    <th>状态</th>
                    <th>体检时间</th>
                    <th>客户姓名</th>
                    <th>修改时间</th>
                  </tr>
                  {this.state.cancelList.map((item,index)=>{
                    return(
                      <tr onClick={()=>this.showDetail(item.id)} key={index}>
                          <td><input value={item.id} onClick={(e)=>{e.stopPropagation();}} name='choose_checkbox' type="checkbox"/></td>
                          <td>{item.healthCheckupParty.partyName}</td>
                          <td>{item.policyNo}</td>
                          <td>{item.salesId}</td>
                          <td>{item.healthCheckupParty.partyName}</td>
                          <td>                   
                          {(() => {
                              switch (item.statusId) {
                              case '01':
                                  return ('待预约');
                              case '02':
                                  return ('已预约');
                              case '03':
                                  return ('取消预约');
                              case '04':
                                  return ('已发医院');
                              case '05':
                                  return ('已逾期');
                              case '06':
                                  return ('已体检');
                              case '07':
                                  return ('报告回齐');
                              case '08':
                                  return ('取消体检');
                              default:
                                  return ('其他')
                              }
                          })()}
                          </td>
                          <td>{item.checkupDate}</td>
                          <td>{item.checkupPerson.personName}</td>
                          <td>{item.updateTime}</td>
                         </tr>
                      )
                  })}
                </tbody>
              </table>
            </div>
            <Pagination totalPage={this.state.totalPage} jump={this.jump.bind(this)} ref="page"/>
            
<div id="send-modal" className="reveal-modal">
  <h1>{this.state.send_type === 1?'发邮件':'发传真'}</h1>
  <div className="main sen-fax">
    <div>{this.state.choosePartyName}</div>
    <div className="reveal-modal-title">您好，友邦客户取消预约体检，资料如下</div>
    <div className="box1 table-overflow m-b-2">
      <table width="100%" border={0} className="table1">
        <tbody>
          <tr>
            <th>保单号</th>
            <th>体检人</th>
            <th>出生年月</th>
            <th>年龄</th>
            <th>性别</th>
            <th>体检项目</th>
            <th>体检时间</th>
            <th>预约电话</th>
          </tr>
          {this.state.healthCheckupOrders.map((item,index)=>{
            return(
                  <tr key={index} >
                    <td>{item.policyNo}</td>
                    <td>{item.checkupPerson.personName}</td>
                    <td>{item.checkupPerson.birthday}</td>
                    <td>{item.age}</td>
                    <td>{item.checkupPerson.sex=='1'?'男':item.checkupPerson.sex=='2'?'女':'其他'}</td>
                    <td>{item.checkupItemName}</td>
                    <td>{item.checkupDate}</td>
                    <td>{item.salesTel}</td>
                  </tr>
              )
          })}
        </tbody>
      </table>
    </div>
    <p>如有疑问，请致电：{this.state.partytel}</p>
    <p>谢谢</p>
    <p>友邦医务中心</p>
    <div className="btn-main m-t-2">
      <span><a className="button btn-color-red" onClick={()=>this.email()} >确 认</a></span>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <span><a className="button" onClick={() => {$('.reveal-modal').trigger('reveal:close');}}>取 消</a></span>
    </div>
  </div>
  <a className="close-reveal-modal">×</a>
</div>

          </div>
    )
  }
}
class Tab2 extends Component {
  constructor(args) {
    super()
    this.state = {
      dataReturnedList: [],
      totalPage: 1,
      jumpPage: 1,
    }
  }
  componentDidMount() {
    this.show();
  }
  show(num) {
    let params = Object.assign(this.props.params,{pageno:num===1?1:this.state.jumpPage});

    api.datareturnedlist(params).then((data) => {
      if(num===1){
        this.refs.page.indexpage(1)
      }
      if (tools.checkResult(data)) {
        this.setState({
          dataReturnedList: data.dataReturnedList,
          totalPage: data.totalPage
        })
      } else {
        tools.toast.error(data.errMsg || '网络错误');
      }
    }, (err) => {
      tools.toast.offline(err);
    })
  }
  jump(page) {
    this.setState({
      jumpPage: page
    }, () => {
      this.show();
    })
  }
  edit(id){
    this.props.historyPush(`/appointmentManage/editRegister/${id}`)
  }
  detail(id){
    this.props.historyPush(`/appointmentManage/registerDetail/${id}`)
  }
  render() {
    return (
      <div className="main1" id="myTab2_2Content0">       
            <div className="box1 table-overflow m-b-2">
            <div className="title-add">
              <span><Link to='/appointmentManage/addRegister/' className="add-data">补登</Link></span>                    
            </div>
              <table width="100%" border={0} className="table1">
                <tbody>
                  <tr>                          
                    <th>序列</th>
                    <th>体检机构</th>
                    <th>保单号</th>
                    <th>客户姓名</th>
                    <th>性别</th>
                    {/*<th>身份证号</th>*/}
                    <th>返回登记时间</th>
                    <th>体检时间</th>
                    <th>渠道</th>
                    <th>报告页数</th>
                    <th>状态</th>
                    <th>备注</th>
                    <th>操作</th>
                  </tr>
                  {this.state.dataReturnedList.map((item,index)=>{
                    return(
                      <tr key={index}>
                          <td onClick={() => this.detail(item.id)}>{index+1}</td>
                          <td onClick={() => this.detail(item.id)}>{item.partyName}</td>
                          <td onClick={() => this.detail(item.id)}>{item.policyNo}</td>
                          <td onClick={() => this.detail(item.id)}>{item.personName}</td>
                          <td onClick={() => this.detail(item.id)}>
                              {(() => {
                                  switch (item.sex) {
                                  case '1':
                                      return ('男');
                                  case '2':
                                      return ('女');
                                  default:
                                      return ('其他')
                                  }
                              })()}
                          </td>
                          {/*<td onClick={() => this.detail(item.id)}>{item.checkupPerson.certiCode}</td>*/}
                          <td onClick={() => this.detail(item.id)}>
                          {item.statusId=='07'?item.addRegCheckUpInfoUpdateTime:'无'}
                          </td>
                          <td onClick={() => this.detail(item.id)}>{item.checkupDate}</td>
                          <td onClick={() => this.detail(item.id)}>
                              {(() => {
                                  switch (item.salesChannelCode) {
                                  case '01':
                                      return ('理赔');
                                  case '02':
                                      return ('POS');
                                  case '03':
                                      return ('银保');
                                  default:
                                      return (item.salesChannelCode)
                                  }
                              })()}
                          </td>
                          <td onClick={() => this.detail(item.id)}>{item.medicalReportPageCnt}</td>
                          <td onClick={() => this.detail(item.id)}>
                          {(() => {
                              switch (item.statusId) {
                              case '01':
                                  return ('待预约');
                              case '02':
                                  return ('已预约');
                              case '03':
                                  return ('取消预约');
                              case '04':
                                  return ('已发医院');
                              case '05':
                                  return ('已逾期');
                              case '06':
                                  return ('已体检');
                              case '07':
                                  return ('报告回齐');
                              case '08':
                                  return ('取消体检');
                              default:
                                  return ('其他')
                              }
                          })()}
                          </td>
                          <td onClick={() => this.detail(item.id)}>{item.peInstruction}</td>
                          <td><a onClick={() => this.edit(item.id)}>修改</a></td>
                         </tr>
                      )
                  })}
                </tbody>
              </table>
            </div>
            <Pagination totalPage={this.state.totalPage} jump={this.jump.bind(this)} ref="page"/>
          </div>
    )
  }
}
class AppointmentManage extends Component {
  constructor(args) {
    super();
    this.state = {
      tab: '',
      cityCode: '',
      branchCode: '',
      partyId: '',
      checkupDate:'',
      chooseDate: null,
      customerName:'',
      checkupTime:'',
      policyNo:'',
      statusId:'',
      checkupDateMin:'',
      checkupDateMax:'',
    }
  }
  changeTab(tab) {
    this.rest();
    this.props.history.push(`/appointmentManage/tab/${tab}`)
  }
  _render(_props){
    this.setState({
        tab: Number(_props.match.params.tab || 0)
    })
  }
  componentDidMount() {
    this._render(this.props);
  }
  componentWillReceiveProps(nextProps) {
    this._render(nextProps);
  }
  disabledDate(current) {
    // Can not select days before today and today
    return current && current < moment().endOf('day');
  }
  changeDate(value, mode) {
    this.setState({
      chooseDate:value,
      checkupDate: mode
    })
  }
   changeData(value, mode) {
    this.setState({
      chooseDate:value,
      checkupDateMin:mode[0],
      checkupDateMax:mode[1]
    })
  }
  rest() {
    this.setState({
      cityCode: '',
      branchCode: '',
      partyId: '',
      checkupDate:[],
      customerName:'',
      policyNo:'',
      checkupTime:'',
      statusId:'',
      chooseDate: null,
      checkupDateMin:'',
      checkupDateMax:'',
    })
    this.refs.monthlySelect.rest();
  }
  show(num){
    this.refs.tab.show(num);
  }
  change(branchCode,cityCode,partyId){
    this.setState({
      branchCode,
      cityCode,
      partyId
    })
  }
  render() {
    let params = {
      branchCode: this.state.branchCode,
      cityCode: this.state.cityCode,
      partyId: this.state.partyId,
      checkupDate:this.state.checkupDate,
      customerName:this.state.customerName,
      policyNo:this.state.policyNo,
      statusId:this.state.statusId,
      checkupTime:this.state.checkupTime,
      checkupDateMin:this.state.checkupDateMin,
      checkupDateMax:this.state.checkupDateMax
    }
    return (
      <div className="content-right" >
             <div className="main1">
                <ul id="myTab2" className="ls_index">
                    <li className={this.state.tab === 0 ? "active" : "none"} onClick={() => this.changeTab(0)} ><span className="ico_none">待发医院</span></li>
                    <li className={this.state.tab === 1 ? "active" : "none"} onClick={() => this.changeTab(1)} ><span className="ico_none">取消体检通知医院</span></li>
                    <li className={this.state.tab === 2 ? "active" : "none"} onClick={() => this.changeTab(2)} ><span className="ico_none">资料返回登记</span></li>
                </ul>
                <div className="clear"></div>
             </div>
             <div className="main1">
             <div className="box2">
                <MonthlySelect ref='monthlySelect' change={this.change.bind(this)} />
                <div className="clearfix" />
                <div>

                 <label className="fl">客户姓名</label>
                 <input value={this.state.customerName} onChange={(e)=>{this.setState({customerName:e.target.value})}} type="text" className="tl fl width20" data-input-clear={5} />
                 
                 <label className="fl">保单号</label>
                 <input value={this.state.policyNo} onChange={(e)=>{this.setState({policyNo:e.target.value})}} type="text" className="tl fl width20" data-input-clear={5} />
                {this.state.tab === 2 ?  <div><label className="fl">体检日期</label><RangePicker  
                    value={this.state.chooseDate}
                    onChange={this.changeData.bind(this)}
                     /></div>: <div><label className="fl">体检日期</label>
                 <DatePicker 
                 showToday={false}
                 value={this.state.chooseDate}
                 format='YYYY-MM-DD'
                 //disabledDate={this.disabledDate}
                 onChange={this.changeDate.bind(this)} />
                 </div>

                 }
                 
               </div>
               <div className="clearfix" />
               <div>
                 <label className="fl">有无时间体检</label>
                 <select value={this.state.checkupTime} onChange={(e)=>{this.setState({checkupTime:e.target.value})}} className="fl-none fl width20" name="choose" id="choose">
                   <option value="">请选择</option>
                   <option value="0">有</option>
                   <option value="1">无</option>
                 </select>
                {
                  this.state.tab===2?
                  <div>
                  <label className="fl">体检状态</label>
                 <select value={this.state.statusId} onChange={(e)=>{this.setState({statusId:e.target.value})}} className="fl-none fl width20" name="choose" id="choose">
                   <option value="">请选择</option>
                   <option value="06">已体检</option>
                   <option value="04">已发医院</option>
                   <option value="07">报告回齐</option>
                 </select></div>:null
                }
             
                

                 <a onClick={()=>this.show(1)} className="button btn-color-red">查 询</a>
                 <a onClick={()=>this.rest()} className="button">重 置</a>
               </div>                     
             </div>
             <div className="clear" />
           </div>

            {(() => {
                switch (this.state.tab) {
                case 0:
                    return (<Tab0 ref='tab' historyPush = {this.props.history.push}  params={params} />);
                case 1:
                    return (<Tab1 ref='tab' historyPush = {this.props.history.push} params={params} />);
                case 2:
                    return (<Tab2 ref='tab' historyPush = {this.props.history.push} params={params} />);
                default:
                    return (<div>无此TAB</div>)
                }
            })()}

            </div>
    );
  }
}

export default withRouter(AppointmentManage);