import React, { Component } from 'react';
import { Link , withRouter } from 'react-router-dom';
import * as api from '../../config/api'
import * as tools from '../../config/tools'
import './edit.css'
import MonthlySelect from '../monthlySelect/MonthlySelect'
import ProjectInput from '../projectInput/ProjectInput'
import PackageInput from '../packageInput/PackageInput'
import './ews.css'
const $ = window.$;
class UnsendHospitalDetail extends Component {
  constructor(args) {
    super()
    this.state = {
      healthCheckupOrders: {
        projectOperation:{},
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
      branchName: '',
      cityName: '',
      partyName: '',
      strPics:"",
      picContentPath:"",
      connect:''
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
          projectOperationList:data.projectOperationList,
          caseHistory: data.healthCheckupOrders.checkupPerson.caseHistory||'',
          peInstruction: data.healthCheckupOrders.peInstruction||'',
          branchCode:data.healthCheckupOrders.branchCode,
          cityCode:data.healthCheckupOrders.cityCode,
          partyId:data.healthCheckupOrders.healthchkPartyId,
          checkupCode:data.healthCheckupOrders.checkupCode,
          checkupItemName:data.healthCheckupOrders.checkupItemName,
          packageCode:data.healthCheckupOrders.packageCode,
          packageName:data.healthCheckupOrders.packageName,
          EWSList:data.selectEWSList,
          strPics:data.strPics,
          picContentPath:data.picContentPath,
        },()=>{
          this.citySelect();
        })
      } else {
        tools.toast.error(data.errMsg || '网络错误');
      }
    }, (err) => {
      tools.toast.offline(err);
    })

  }
  change(branchCode,cityCode,partyId){
    this.setState({
      branchCode,
      cityCode,
      partyId
    })
  }
  save(){
    let checkupCode='', packageCode='';
    $('#editProject').find('input[type=checkbox]:[checked]').each(function(index, el) {
      checkupCode+= `${$(el).val()},`
    });
    $('#editPackage').find('input[type=checkbox]:[checked]').each(function(index, el) {
      packageCode+= `${$(el).val()},`
    });
    let params = {
      id: this.props.match.params.id,
      branchCode: this.state.branchCode,
      partyId: this.state.partyId,
      cityCode: this.state.cityCode,
      checkupCode: checkupCode,
      packageCode:packageCode,
      caseHistory:this.state.caseHistory,
      peInstruction:this.state.peInstruction,
      checkupCode,
      packageCode
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
  changeProjectName(name){
    this.setState({
      checkupItemName:name
    })
  }
  changePackageName(name){
    this.setState({
      packageName:name
    })
  }
  citySelect() {
    let params = {
      isContext: 0
    }
    api.monthlyselect(params).then((data) => {
      if (tools.checkResult(data)) {
        let branchList = data.branchList;
        let cityList = data.cityList;
        let hospitalList = data.hospitalList;
        let branchName='',cityName='',partyName='';
        for(let i in branchList){
          if(branchList[i].branchCode === this.state.branchCode){
            branchName = branchList[i].branchName;
            break;
          }
        }
        for(let i in cityList){
          if(cityList[i].cityCode === this.state.cityCode){
            cityName = cityList[i].cityName;
            break;
          }
        }
        for(let i in hospitalList){
          if(hospitalList[i].partyId === this.state.partyId){
            partyName = hospitalList[i].partyName;
            break;
          }
        }
        this.setState({
          branchName,
          cityName,
          partyName,
        })
      } else {
        tools.toast.error(data.errMsg || '网络错误');
      }
    })
  }
  edit(){
    var id=this.props.match.params.id
    this.props.history.push(`/appointmentManage/editUnsendHospital/${id}`)
  }
  render() {   
    let healthCheckupOrders = this.state.healthCheckupOrders;
    let checkupPerson = this.state.checkupPerson;
    let projectOperationList = this.state.projectOperationList;
    // healthCheckupOrders.projectOperation = healthCheckupOrders.projectOperation || {};
    return (
       <div className="content-right" id='ews'>

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
                <dt>营销员手机号:&nbsp;&nbsp;
                {healthCheckupOrders.salesTel}</dt>
              </dl>
              <dl>
              <dt >状态:&nbsp;&nbsp;
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
                  
                <dt>指定体检地点:&nbsp;&nbsp;
                {healthCheckupOrders.isFixedHospital}  </dt>      
                <dt>体检时间:&nbsp;&nbsp;
                {healthCheckupOrders.checkupDate}</dt>
              </dl>

              <dl>
                <dt>分公司:&nbsp;&nbsp;
                {this.state.branchName}</dt>
                <dt>城市:&nbsp;&nbsp;
                {this.state.cityName}</dt>
                <dt>医院名称:&nbsp;&nbsp;
                {this.state.partyName}</dt>
              </dl>



              <dl>
             
                <dt>更新时间:&nbsp;&nbsp;
                {healthCheckupOrders.projectOperation.operationTime}</dt>
                <dt>预约电话:&nbsp;&nbsp;
                {healthCheckupOrders.healthCheckupParty.partyTel}</dt>
              </dl>

            
            <dl>
             <dt>体检套餐:&nbsp;&nbsp;
                {this.state.packageName}</dt>
                </dl>
              <dl>
                <span style={{whiteSpace:"normal"}}>体检项目:&nbsp;&nbsp;
                {this.state.checkupItemName}</span>
              </dl>


              <dl>
                 <dt>核保员说明:&nbsp;&nbsp;
                {healthCheckupOrders.underwritingMemo}</dt>
              </dl>
              <dl>
              <dt>病史:&nbsp;&nbsp;
                {this.state.caseHistory}</dt>
              </dl>
              <dl>
              <dt>备注:&nbsp;&nbsp;
                {this.state.peInstruction}</dt>
              </dl>
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
              <span><Link to='/appointmentManage/tab/0' className="button btn-color-red">返 回</Link></span>
              <span onClick={() => this.edit()} className="button btn-color-red">修改</span>
            </div>
          </div>

          {/* <div dangerouslySetInnerHTML={{
    __html:tools.connect('水电费@##2##@@##1##@111222@##1##@@##6##@.',"/Users/dongfeng/Desktop/demo/img/","1.gif;@##1##@;2.gif;@##2##@;3.gif;@##3##@;4.gif;@##4##@;5.gif;@##5##@;6.gif;@##6##@;c_amp.gif;&amp;;c_plusmn.gif;&plusmn;;c_times.gif;&times;;n_65509.gif;&#65509;;n_8240.gif;&#8240;;n_8451.gif;&#8451;;n_8470.gif;&#8470;;n_8544.gif;&#8544;;n_8545.gif;&#8545;;n_8546.gif;&#8546;;n_8547.gif;&#8547;;n_8548.gif;&#8548;;n_8549.gif;&#8549;;n_8592.gif;&#8592;;n_8593.gif;&#8593;;n_8594.gif;&#8594;;n_8595.gif;&#8595;;n_8800.gif;&#8800;;n_8804.gif;&#8804;;n_8805.gif;&#8805;;n_8853.gif;&#8853;;n_931.gif;&#931;;n_945.gif;&#945;;n_946.gif;&#946;;n_947.gif;&#947;;n_954.gif;&#954;;n_955.gif;&#955;;n_956.gif;&#956;;n_9792.gif;&#9792;;n_9794.gif;&#9794;;")
    }}></div>*/}
       </div>
    );
  }
}

export default withRouter(UnsendHospitalDetail);
