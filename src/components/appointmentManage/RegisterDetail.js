import React, { Component } from 'react';
import * as api from '../../config/api'
import * as tools from '../../config/tools'
import { Link } from 'react-router-dom';
import MonthlySelect from '../monthlySelect/MonthlySelect'
import DatePicker from 'antd/lib/date-picker';
import moment from 'moment'
import ProjectInput from '../projectInput/ProjectInput'
import PackageInput from '../packageInput/PackageInput'
import './ews.css'
const $ = window.$;
class RegisterDetail extends Component {
	constructor(args) {
		super()
		this.state = {
			seqNo: '',
			policyNo: '',
			personName: '',
			branchCode: '',
			cityCode: '',
			partyId: '',
			checkupDate: '',
			checkupItemName: '',
			peInstruction: '',
			checkupItemMstList: [],
			partyBranchPackageList: [],
			chooseDate: '',
			medicalReportPageCnt: '',
			checkupPerson: {

			},
			salesChannelCode: '',
			branchName: '',
			cityName: '',
			partyName: '',
		}
	}
	componentDidMount() {
		this.show();
	}
	save(iconId) {
		let params = {
			id: this.props.match.params.id,
			branchCode: this.state.branchCode,
			cityCode: this.state.cityCode,
			partyId: this.state.partyId,
			checkupDate: this.state.checkupDate,
			checkupItemName: this.state.checkupItemName,
			peInstruction: this.state.peInstruction,
			medicalReportPageCnt: this.state.medicalReportPageCnt,
			iconId,
		}
		if (iconId === -1) {
			for (let i in params) {
				if (params[i] === '') {
					tools.toast.error('资料填写不完整');
					return;
				}
			}
			if (this.state.checkupItemName === '') {
				tools.toast.error('资料填写不完整');
				return;
			}
			if (this.state.packageName === '') {
				tools.toast.error('资料填写不完整');
				return;
			}
		}
		let checkupCode = '',
			packageCode = '';
		$('#editProject').find('input[type=checkbox]:[checked]').each(function(index, el) {
			checkupCode += `${$(el).val()},`
		});
		params.checkupCode = checkupCode

		$('#editPackage').find('input[type=checkbox]:[checked]').each(function(index, el) {
			packageCode += `${$(el).val()},`
		});
		params.packageCode = packageCode

		api.updatereturnsthedata(params).then((data) => {
			if (tools.checkResult(data)) {
				this.props.history.push(`/appointmentManage/tab/2`)
			} else {
				tools.toast.error(data.errMsg || '网络错误');
			}
		}, (err) => {
			tools.toast.offline(err);
		})
	}
	show() {
		let params = {
			id: this.props.match.params.id
		}
		api.returndetaildata(params).then((data) => {
			if (tools.checkResult(data)) {
				this.setState({
					policyNo:data.healthCheckupOrders.policyNo,
					checkupPerson:data.healthCheckupOrders.checkupPerson,
					cityCode:data.healthCheckupOrders.cityCode,
					partyId:data.healthCheckupOrders.healthchkPartyId,
					branchCode:data.healthCheckupOrders.branchCode,
					peInstruction:data.healthCheckupOrders.peInstruction,
					checkupDate:data.healthCheckupOrders.checkupDate,
					chooseDate:tools.checkDate(data.healthCheckupOrders.checkupDate)?moment(data.healthCheckupOrders.checkupDate):null,
					checkupCode:data.healthCheckupOrders.checkupCode,
					checkupItemName:data.healthCheckupOrders.checkupItemName,
					packageCode:data.healthCheckupOrders.packageCode,
					packageName:data.healthCheckupOrders.packageName,
					medicalReportPageCnt:data.healthCheckupOrders.medicalReportPageCnt||'',
					salesChannelCode:data.healthCheckupOrders.salesChannelCode
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
	change(branchCode, cityCode, partyId) {
		this.setState({
			branchCode,
			cityCode,
			partyId
		})
	}
	changeDate(value, mode) {
		this.setState({
			chooseDate:value,
			checkupDate: mode
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
	edit(){
	let	id= this.props.match.params.id
	this.props.history.push(`/appointmentManage/editRegister/${id}`)
	}
	render(){
		return(
			<div id='zldetail'>
			<div className="content-right">
                <div className="main1">
                  <div className="box2">
                    <div className="clearfix" />
                    <div>
                      <label className="fl" style={{width:"260px",textAlign:"left"}}>流水号：{this.state.seqNo}</label>
											<label className="fl" style={{width:"260px",textAlign:"left"}}>渠道：
                      {(() => {
                            switch (this.state.salesChannelCode) {
                            case '01':
                                return ('理赔');
                            case '02':
                                return ('POS');
                            case '03':
                                return ('银保');
                            default:
                                return (this.state.salesChannelCode)
                            }
                      })()}
                     </label>
										 
                        <label className="fl" style={{width:"260px",textAlign:"left"}}>体检时间: {this.state.checkupDate}</label>
                     </div>
										 <div className="clearfix" />
										 <label className="fl" style={{width:"260px",textAlign:"left"}}>保单号：{this.state.policyNo}</label>
                      <label className="fl" style={{width:"260px",textAlign:"left"}}>客户姓名：{this.state.checkupPerson.personName}</label>
                      <label className="fl" style={{width:"260px",textAlign:"left"}}>性别：
                      {(() => {
                                  switch (this.state.checkupPerson.sex) {
                                  case '1':
                                      return ('男');
                                  case '2':
                                      return ('女');
                                  default:
                                      return ('其他')
                                  }
                      })()}</label>
                      <label className="fl" style={{width:"260px",textAlign:"left"}}>身份证号：{this.state.checkupPerson.certiCode}</label>

                    <div className="clearfix" />

                     <label className="fl" style={{width:"260px",textAlign:"left"}}>分公司：{this.state.branchName}</label>
                      <label className="fl" style={{width:"260px",textAlign:"left"}}>城市：{this.state.cityName}</label>
                       <label className="fl" style={{width:"260px",textAlign:"left"}}>医院名称：{this.state.partyName}</label>
                    
                    <div className="clearfix" />

                    
                <div className="clearfix" />
								<label className="fl" style={{width:"260px",textAlign:"left"}}>体检套餐：{this.state.packageName}</label>
								<label className="fl" style={{width:"260px",textAlign:"left"}}>报告页数： {this.state.medicalReportPageCnt}</label>
                 <div className="clearfix" />
								 <label >体检项目：{this.state.checkupItemName}</label>
                     <div className="clearfix" />
                    <div>
                      <label className="fl">备注: {this.state.peInstruction}</label>
                    </div>

                    <div className="clearfix" />
                    <div className="btn-main m-t-3">
                      <span><Link to='/appointmentManage/tab/2' className="button btn-color-red">返 回</Link></span>
											<span><a className="button btn-color-red" onClick={()=>this.edit()}>修改</a></span>
                    </div>
                  </div>
                  <div className="clear" />
                </div>

			</div>
			</div>
			)
	}
}
export default RegisterDetail