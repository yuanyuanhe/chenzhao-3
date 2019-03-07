import React, { Component } from 'react';
import * as api from '../../config/api'
import * as tools from '../../config/tools'
import { Link } from 'react-router-dom';
import MonthlySelect from '../monthlySelect/MonthlySelect'
import DatePicker from 'antd/lib/date-picker';
import ProjectInput from '../projectInput/ProjectInput'
import PackageInput from '../packageInput/PackageInput'
const $ = window.$;
class AddRegister extends Component {
	constructor(args) {
		super()
		this.state = {
			policyNo: '',
			personName: '',
			branchCode: '',
			cityCode: '',
			partyId: '',
			checkupDate: '',
			checkupItemName: '',
			packageName:'',
			peInstruction: '',
            checkupItemMstList:[],
			partyBranchPackageList:[],
			checkupCode:"",
			packageCode:""
			
		}
	}
	save(iconId) {
		if(!/^\S{10,10}$/.test(this.state.policyNo)){
			tools.toast.error('请输入10位保单号');
			return;
		}
		let params = {
			policyNo: this.state.policyNo,
			personName: this.state.personName,
			branchCode: this.state.branchCode,
			cityCode: this.state.cityCode,
			partyId: this.state.partyId,
			checkupDate: this.state.checkupDate,
			checkupCode:this.state.checkupCode,
			packageCode:this.state.packageCode,
			checkupItemName: this.state.checkupItemName,
			peInstruction: this.state.peInstruction,
			iconId,
		}
		for (let i in params) {
			if (params[i] === '' && i != "peInstruction") {
				tools.toast.error('资料填写不完整');
				return;
			}
		}
		if (this.state.checkupItemName === ''&&this.state.packageName === '') {
			tools.toast.error('请选择体检套餐或体检项目');
			return;
		}
		let checkupCode = '',
			packageCode = '';
		$('#editProject').find('input[name="checkbox"]:checked').each(function(index, el) {
			checkupCode += `${$(el).val()},`
		});
		params.checkupCode = checkupCode

		$('#editPackage').find('input[name="checkbox"]:checked').each(function(index, el) {
			packageCode += `${$(el).val()},`
		});
		
		params.packageCode = packageCode
		api.insertdatacomplete(params).then((data) => {
			if (tools.checkResult(data)) {
				this.props.history.push(`/appointmentManage/tab/2`)
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
			checkupDate: mode
		})
	}
	changeProjectName(name,code){
		this.setState({
			checkupItemName:name,
			checkupCode: code
		})
	}
	changePackageName(name,code){
		this.setState({
			packageName:name,
			packageCode : code
		})
	}
	render(){
		return(
			<div className="content-right">
                <div className="main1">
                  <div className="box2">
                    <div className="clearfix" />
                    <MonthlySelect required={true} change={this.change.bind(this)} />
					<div className="clearfix" />
                    <div>
                      <label className="fl required">保单号</label>
                      <input value={this.state.policyNo} onChange={(e)=>{this.setState({policyNo:tools.policyNoInput(e)})}} type="text" className="tl fl width15" data-input-clear={5} />
                      <label className="fl required">客户姓名</label>
                      <input value={this.state.personName} onChange={(e)=>{this.setState({personName:e.target.value})}} type="text" className="tl fl width15" data-input-clear={5} />
					  <label className="fl required">体检时间</label>
                        <DatePicker
                          placeholder=""
                          showTime
                          format="YYYY-MM-DD HH:mm:ss"
                          onChange={this.changeDate.bind(this)}
                        />
                    </div>
                    
					<div className="clearfix" />

					<PackageInput change={this.changePackageName.bind(this)} branchCode={this.state.branchCode} packageCode={this.state.packageCode} packageName={this.state.packageName} />

                <div className="clearfix" />
				<ProjectInput change={this.changeProjectName.bind(this)} branchCode={this.state.branchCode} checkupCode={this.state.checkupCode} checkupItemName={this.state.checkupItemName} />
                    <div className="clearfix" />
                    <div>
                      <label className="fl">备注:</label>
                      <textarea value={this.state.peInstruction} onChange={(e)=>{this.setState({peInstruction:e.target.value})}} className="tl fl" id="textarea" rows={5} style={{width:"42%"}}/>
                    </div>
                    <div className="clearfix" />
                    <div className="btn-main m-t-3">
                      <span><a onClick={()=>this.save(0)} className="button btn-color-red" data-reveal-id="saveModel">保 存</a></span>
                      &nbsp;&nbsp;
                      <span><a onClick={()=>this.save(1)} className="button btn-color-red">资料回齐</a></span>
                      <span><Link to='/appointmentManage/tab/2' className="button border-bc">取 消</Link></span>
                    </div>
                  </div>
                  <div className="clear" />
                </div>
			</div>
			)
	}
}
export default AddRegister