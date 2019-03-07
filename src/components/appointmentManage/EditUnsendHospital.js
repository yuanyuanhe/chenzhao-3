import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import * as api from '../../config/api'
import * as tools from '../../config/tools'
import './edit.css'
import MonthlySelect from '../monthlySelect/MonthlySelect'
import ProjectInput from '../projectInput/ProjectInput'
import PackageInput from '../packageInput/PackageInput'
const $ = window.$;
class EditUnsendHospital extends Component {
  constructor(args) {
    super()
    this.state = {
      healthCheckupOrders: {
        projectOperation: {},
        healthCheckupParty:{}
      },
      checkupPerson: '',
      EWSList: [],
      caseHistory: '',
      peInstruction: '',
      projectOperationList: [],
      checkupItemMstList: [],
      partyBranchPackageList: [],
      checkupItemName: '',
      packageCode: '',
      strPics:"",
      picContentPath:"",
      branchCode:''
    }
  }
  componentDidMount() {
    this.show();
  }
  changeBranch(value) {
    let branchList = this.state.branchList;
    let branchName = '';
    for (let i in branchList) {
      if (branchList[i].cityCode === value) {
        branchName = branchList[i].branchName;
        break;
      }
    }
    this.setState({
      cityCode: value,
      branchName
    })
  }
  show() {
    let params = {
      id: this.props.match.params.id
    }
    api.updatecheckuporder(params).then((data) => {
      if (tools.checkResult(data)) {
        this.setState({
          healthCheckupOrders: data.healthCheckupOrders,
          checkupPerson: data.healthCheckupOrders.checkupPerson,
          projectOperationList: data.projectOperationList,
          caseHistory: data.healthCheckupOrders.checkupPerson.caseHistory || '',
          peInstruction: data.healthCheckupOrders.peInstruction || '',
          branchCode: data.healthCheckupOrders.branchCode,
          cityCode: data.healthCheckupOrders.cityCode,
          partyId: data.healthCheckupOrders.healthchkPartyId,
          checkupCode: data.healthCheckupOrders.checkupCode||'',
          checkupItemName: data.healthCheckupOrders.checkupItemName,
          packageCode: data.healthCheckupOrders.packageCode||'',
          packageName: data.healthCheckupOrders.packageName,
          EWSList:data.selectEWSList,
          strPics:data.strPics,
          picContentPath:data.picContentPath,
        })
      }
    }, (err) => {
      tools.toast.offline(err);
    })
  }
  change(branchCode, cityCode, partyId) {
    this.setState({
      branchCode,
      cityCode,
      partyId
    })
  }
  save() {
    let params = {
      id: this.props.match.params.id,
      branchCode: this.state.branchCode,
      partyId: this.state.partyId,
      cityCode: this.state.cityCode,
      caseHistory: this.state.caseHistory,
      peInstruction: this.state.peInstruction,
      checkupCode:this.state.checkupCode,
      packageCode:this.state.packageCode
    }
    api.updatedetails(params).then((data) => {
      if (tools.checkResult(data)) {
        this.props.history.push(`/appointmentManage/tab/0`)
      } else {
        tools.toast.error(data.errMsg || '网络错误');
      }
    }, (err) => {
      tools.toast.offline(err);
    })
  }
  changeProjectName(name, code) {
    this.setState({
      checkupItemName: name,
      checkupCode: code
    })
  }
  changePackageName(name,code) {
    this.setState({
      packageName: name,
      packageCode : code
    })
  }
  render() {
    let healthCheckupOrders = this.state.healthCheckupOrders;
    let checkupPerson = this.state.checkupPerson;
    let projectOperationList = this.state.projectOperationList;
    return (
      <div className="content-right">

          <div className="main1">
            <div className="title">
              预约信息
            </div>                  
            <div className="manage">
              <dl>
                <dt>保单号:&nbsp;&nbsp;
                {healthCheckupOrders.policyNo}</dt>
                <dt>客户姓名:&nbsp;&nbsp;
                {checkupPerson.personName}</dt>
                <dt>营销员姓名:&nbsp;&nbsp;
                {healthCheckupOrders.salesName}</dt>
                <dt>营销员手机号:
                {healthCheckupOrders.salesTel}</dt>
              </dl>
              <dl>
                <dt>体检时间:&nbsp;&nbsp;
                {healthCheckupOrders.checkupDate}</dt>
                <dt>指定体检地点:&nbsp;&nbsp;
                {healthCheckupOrders.isFixedHospital}</dt>
                <dt>体检标识:&nbsp;&nbsp;
                
                          {(() => {
                              switch (healthCheckupOrders.healthchkCount) {
                              case '1':
                                  return '首次体检';
                              case '2':
                                  return '追加体检项目';
                              case '3':
                                  return '复查尿';
                              default:
                                  return ''
                              }
                          })()}</dt>
                
                <dt>预约电话:&nbsp;&nbsp;
                {healthCheckupOrders.healthCheckupParty.partyTel}</dt>
              </dl>
              <dl>
                <dt>体检项目更新时间:&nbsp;&nbsp;
                {healthCheckupOrders.projectOperation.operationTime}</dt>
                <dt>状态:&nbsp;&nbsp;
                {(() => {
                              switch (healthCheckupOrders.statusId) {
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
                          })()}</dt>
                
              </dl>
              <dl>
              <dt>核保员说明:&nbsp;&nbsp;
                {healthCheckupOrders.underwritingMemo}</dt>
                </dl>
              <ul>


                <li style={{marginLeft:"-15px"}}>
                <MonthlySelect dis={true} cityCode={this.state.cityCode} branchCode={this.state.branchCode} partyId={this.state.partyId} change={this.change.bind(this)} />

          
                </li>

                <div className="clearfix" />

                <ProjectInput change={this.changeProjectName.bind(this)} branchCode={this.state.branchCode} checkupCode={this.state.checkupCode} checkupItemName={this.state.checkupItemName} />

                 <div className="clearfix" />

                 <PackageInput change={this.changePackageName.bind(this)} branchCode={this.state.branchCode} packageCode={this.state.packageCode} packageName={this.state.packageName} />

                <li>
                  <label style={{marginLeft:"3px"}}>病史:</label>
                  <input value={this.state.caseHistory} onChange={(e)=>{this.setState({caseHistory:e.target.value})}} type="text" className="tl fl width70" data-input-clear={5} />
                </li>
                <li>
                  <label style={{marginLeft:"3px"}}>备注:</label>
                  <textarea value={this.state.peInstruction} onChange={(e)=>{this.setState({peInstruction:e.target.value})}} className="tl fl width70" id="textarea" rows={5}/>
                </li>
              </ul>
            </div>
            <div className="clearfix" />
            <div className="title">
              保单&amp;EWS信息
            </div> 
            <div className="table-main">
              <h1>保单信息</h1>
              <div className="table-overflow">
                <table width="100%" border={0} className="table1">
                  <tbody>
                    <tr>
                      <th>保单号</th>
                      <th>姓名</th>
                      <th>性别</th>
                      <th>年龄</th>
                      <th>出生年月</th>
                      <th>身份证号</th>                              
                    </tr>
                    <tr>
                      <td>{healthCheckupOrders.policyNo}</td>
                      <td>{checkupPerson.personName}</td>
                      <td>{checkupPerson.sex=='1'?'男':checkupPerson.sex=='2'?'女':'其他'}</td>
                      <td>{healthCheckupOrders.age}</td>
                      <td>{checkupPerson.birthday}</td>
                      <td>{checkupPerson.certiCode}</td>
                    </tr>                            
                  </tbody>
                </table>
              </div>
              <h1>EWS信息</h1>
              <div className="table-overflow">
                <table width="100%" border={0} className="table1">
                  <tbody>
                    <tr>
                      <th>序号</th>
                      <th>来源</th>
                      <th>时间</th>
                      <th>内容</th>                             
                    </tr>
                    {this.state.EWSList.map((item,index)=>{
                      return(
                          <tr>
                            <td>{index+1}</td>
                            <td>{item.sysCod}</td>
                            <td>{item.crtDate}</td>
                            <td dangerouslySetInnerHTML={{
    __html:tools.connect(item.comment,this.state.picContentPath,this.state.strPics)||'无'
    }}></td>
                          </tr>  
                        )
                    })}                               
                  </tbody>
                </table>
              </div>
              <h1>体检项目操作历史</h1>
              <div className="table-overflow">
                <table width="100%" border={0} className="table1">
                  <tbody>
                    <tr>
                      <th>序号</th>
                      <th>操作时间</th>
                      <th>操作者</th>                            
                    </tr>
                    {projectOperationList.map((item,index)=>{
                      return(
                          <tr key={index} >
                            <td>{index+1}</td>
                            <td>{item.operationTime}</td>
                            <td>{item.operationUser}</td>
                          </tr>  
                        )
                    })}                            
                  </tbody>
                </table>
              </div>
            </div>                                
            <div className="btn-main">
              <span><a onClick={()=>this.save()} className="button btn-color-red">保 存</a></span>
              &nbsp;&nbsp;
              <span><Link to='/appointmentManage/tab/0' className="button">取 消</Link></span>
            </div>
          </div>

       </div>
    );
  }
}

export default withRouter(EditUnsendHospital);