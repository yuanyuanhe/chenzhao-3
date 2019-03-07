import React, { Component } from 'react';
import * as api from '../../config/api'
import * as tools from '../../config/tools'
class MonthlySelect extends Component {
	constructor(args) {
		super()
		this.state = {
			branchList: [],
			cityList: [],
			hospitalList: [],
			provinceCode:'',
			cityCode:'',
			branchCode:'',
			partyId:''
		}
	}
	componentDidMount() {
		this.show(this.props);
	}
	componentWillReceiveProps(nextProps) {
		 this.show(nextProps);
	}
	show(Props) {
		let selectData = {};
		if(Props.hasOwnProperty('branchCode')){
			selectData.branchCode = Props.branchCode;
		}
		if(Props.hasOwnProperty('cityCode')){
			selectData.cityCode = Props.cityCode;
		}
		if(Props.hasOwnProperty('partyId')){
			selectData.partyId = Props.partyId;
		}
		let params = {
			isContext: 1
		}
		api.monthlyselect(params).then((data) => {
			if (tools.checkResult(data)) {
				this.setState({
					branchList: data.branchList,
					cityList: data.cityList,
					hospitalList: data.hospitalList,
					...selectData
				},()=>{
					let provinceCode;
					for (let i in data.branchList) {
						if (data.branchList[i].branchCode === this.state.branchCode) {
							provinceCode = data.branchList[i].provinceCode;
							break;
						}
					}
					this.setState({
						provinceCode
					})
				})
			} else {
				tools.toast.error(data.errMsg || '网络错误');
			}
		})
	}
	change(){
		this.props.change(this.state.branchCode,this.state.cityCode,this.state.partyId);
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
			partyId:'',
			cityCode:''
		},()=>{
			this.change();
		})
	}
	changeCity(cityCode){
		this.setState({
			cityCode,
			partyId:''
		},()=>{
			this.change();
		})
	}
	changeParty(partyId){
		this.setState({
			partyId
		},()=>{
			this.change();
		})
	}
	rest(){
		this.setState({
			provinceCode:'',
            cityCode:'',
            branchCode:''
		})
	}
	render() {
		let resultCityList = [];
		let resultHospitalList = [];
		let cityList = this.state.cityList;
		let hospitalList = this.state.hospitalList;
		for (let i in cityList) {
			if (this.state.provinceCode === cityList[i].provinceCode) {
				resultCityList.push(cityList[i])
			}
		}
		for (let i in hospitalList) {
			if (this.state.cityCode === hospitalList[i].cityCode) {
				resultHospitalList.push(hospitalList[i])
			}
		}
		let _className = this.props.required?"fl required":"fl";
		let _big=this.props.big?'fl-none fl width20':'fl-none fl width15'
		let dis=this.props.dis?true:false
		return (
			<div>
                <label className={_className }>分公司</label>
                <select value={this.state.branchCode} disabled={dis} onChange={(e)=>this.changeBranch(e.target.value)} className={_big} >
                  <option value="" >请选择</option>
                  {this.state.branchList.map((item,index)=>{
                    return(
                      <option key={index} value={item.branchCode}>{item.branchName}</option>
                      )
                  })}
                </select>

                <label className={_className }>城市</label>
                <select value={this.state.cityCode} onChange={(e)=>this.changeCity(e.target.value)} className={_big} >
                  <option value="">请选择</option>
                  {resultCityList.map((item,index)=>{
                    return(
                      <option key={index} value={item.cityCode}>{item.cityName}</option>
                      )
                  })}
                </select>

                <label className={_className }>医院名称</label>
                <select value={this.state.partyId} onChange={(e)=>this.changeParty(e.target.value)} className={_big} >
                  <option value="">请选择</option>
                  {resultHospitalList.map((item,index)=>{
                    return(
                      <option  key={index} value={item.partyId}>{item.partyName}</option>
                      )
                  })}
                </select>
			</div>
		)
	}
}
export default MonthlySelect