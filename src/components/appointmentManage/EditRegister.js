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
class EditRegister extends Component {
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
            checkupItemMstList:[],
            partyBranchPackageList:[],
            chooseDate:'',
            medicalReportPageCnt:'',
            statusId:"",
            checkupPerson:{

            },
            salesChannelCode:'',
            isshow:true,
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
			peInstruction: this.state.peInstruction,
			medicalReportPageCnt: this.state.medicalReportPageCnt,
			policyNo:this.state.policyNo,
			iconId,
		}
		for (let i in params) {
			if (params[i] === '' && i != "peInstruction") {
				tools.toast.error('资料填写不完整');
				return;
			}
		}
		if (this.state.checkupItemName === ''&&this.state.packageName === '') {
			tools.toast.error('请填写体检套餐或体检项目');
			return;
		}
		// if (this.state.packageName === '') {
		// 	tools.toast.error('资料填写不完整');
		// 	return;
		// }
		params.checkupCode = this.state.checkupCode;
		params.packageCode = this.state.packageCode;

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
					peInstruction:data.healthCheckupOrders.peInstruction || '',
					checkupDate:data.healthCheckupOrders.checkupDate,
					chooseDate:data.healthCheckupOrders.checkupDate?moment(data.healthCheckupOrders.checkupDate,'YYYY-MM-DD HH:mm:ss'):null,
					checkupCode:data.healthCheckupOrders.checkupCode||'',
					checkupItemName:data.healthCheckupOrders.checkupItemName,
					packageCode:data.healthCheckupOrders.packageCode||'',
					packageName:data.healthCheckupOrders.packageName,
					medicalReportPageCnt:data.healthCheckupOrders.medicalReportPageCnt||'',
					salesChannelCode:data.healthCheckupOrders.salesChannelCode,
					statusId:data.healthCheckupOrders.statusId,
					isshow:data.icon=='报告回齐'?true:false
				})
			} else {
				tools.toast.error(data.errMsg || '网络错误');
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
	changeDate(value, mode) {
		this.setState({
			chooseDate: value,
			checkupDate: mode
		})
	}
	changeProjectName(name, code) {
		this.setState({
			checkupItemName: name,
			checkupCode: code
		})
	}
	changePackageName(name, code) {
		this.setState({
			packageName: name,
			packageCode: code
		})
	}
	popup(){
		window.$('#zlhq').reveal("{data-animation:'none'}");
	}
	render(){
		return(
			<div id='zldetail'>
			<div className="content-right">
                <div className="main1">
                  <div className="box2">
                    <div className="clearfix" />
                    <div>
                      <label className="fl">流水号：{this.state.seqNo}</label>
                      <label className="fl">保单号：{this.state.policyNo}</label>
                      <label className="fl">客户姓名：{this.state.checkupPerson.personName}</label>
                      <label className="fl">性别：
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
                      <label className="fl">身份证号：{this.state.checkupPerson.certiCode}</label>
                      <label className="fl">渠道：{(() => {
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
                      
                    </div>
                    <div className="clearfix" />
                    <MonthlySelect dis={true} required={true} cityCode={this.state.cityCode} branchCode={this.state.branchCode} partyId={this.state.partyId} change={this.change.bind(this)} />
                    
                    <div className="clearfix" />

                    <div>
                        <label className="fl required">体检时间</label>
                        <DatePicker
                          placeholder=""
                          showTime
                          value={this.state.chooseDate}
                          format="YYYY-MM-DD HH:mm:ss"
                          onChange={this.changeDate.bind(this)}
                        />
                    </div>

                <div className="clearfix" />

                <ProjectInput branchCode={this.state.branchCode} change={this.changeProjectName.bind(this)} checkupCode={this.state.checkupCode} checkupItemName={this.state.checkupItemName} />

                 <div className="clearfix" />

                 <PackageInput branchCode={this.state.branchCode} change={this.changePackageName.bind(this)} packageCode={this.state.packageCode} packageName={this.state.packageName} />

                    <div className="clearfix" />

                     <label className="fl required">报告页数</label>
                     <input value={this.state.medicalReportPageCnt} onChange={(e)=>{this.setState({medicalReportPageCnt:e.target.value})}} type="text" className="tl fl width20" data-input-clear={5} />

                     <div className="clearfix" />
                    
                    <div>
                      <label className="fl">备注:</label>
                      <textarea value={this.state.peInstruction} onChange={(e)=>{this.setState({peInstruction:e.target.value})}} className="tl fl width70" id="textarea" rows={5} />
                    </div>
                    <div className="clearfix" />
                    <div className="btn-main m-t-3">
                      <span><a onClick={()=>this.save(0)} className="button btn-color-red" data-reveal-id="saveModel">保 存</a></span>
                      &nbsp;&nbsp;
                      <span><button  className="button btn-color-red" onClick={()=>this.popup()} disabled={this.state.isshow}>资料回齐</button></span>
                      <span><Link to='/appointmentManage/tab/2' className="button border-bc">取 消</Link></span>
                    </div>
                  </div>
                  <div className="clear" />
                </div>


                 <div id="zlhq" className="reveal-modal">
                <h1>提示消息</h1>
                <div className="main">
                    <p className="tallyou">确定要资料回齐吗？</p>
                    <div className="btn-main m-t-2">
                        <span><a  className="button btn-color-red"
                      onClick={()=>this.save(1)}>确 认</a></span>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <span><a  className="button" onClick={() => {
                window.$('.reveal-modal').trigger('reveal:close');
            }} >取 消</a></span>
                    </div>
                </div>
                <a className="close-reveal-modal">&#215;</a>
            </div>

			</div>
			</div>
			)
	}
}
export default EditRegister