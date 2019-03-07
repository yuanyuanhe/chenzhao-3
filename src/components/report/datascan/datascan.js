import React, { Component } from 'react';
import Pagination from '../../pagination/Pagination';
import MonthlySelect from '../../monthlySelect/MonthlySelect'
import * as api from '../../../config/api'
import * as tools from '../../../config/tools'
import './datascan.css'
import DatePicker from 'antd/lib/date-picker'; 
const { RangePicker } = DatePicker;
//清单数据扫描


class Datascan extends Component{
   constructor(args){
	   super();
	   this.state={
		totalPage: 1,
        jumpPage: 1,
        policyNo:'',
        personName:'',
        medicalReportDateMin:'',
        medicalReportDateMax:'',
        dataDetailList:[],
        chooseDate:[],
        branchCode:"",
        cityCode:"",
        healthChkpartyId:""
	   }
   }
   jump(page) {
	this.setState({
		jumpPage: page
	}, () => {
		this.show();
	})
}
componentDidMount() {
    this.show();   
}
change(branchCode,cityCode,healthChkpartyId){
    this.setState({
      branchCode,
      cityCode,
      healthChkpartyId
    })
  }
show(num) {
    let params={}
	 params = {
         pageno: num===1?1:this.state.jumpPage,
         branchCode:this.state.branchCode,
         cityCode:this.state.cityCode,
         healthChkpartyId: this.state.healthChkpartyId,
         personName:this.state.personName,
         policyNo:this.state.policyNo,
         medicalReportDateMin:this.state.medicalReportDateMin,
         medicalReportDateMax:this.state.medicalReportDateMax         
 }

	api.listdataScanning(params).then((data) => {
        if(num===1){
            this.refs.page.indexpage(1)
        }
		if (tools.checkResult(data)) {
            this.setState({
                dataDetailList:data.dataDetailList,
                totalPage: data.totalPage
            })
			
		} else {
			tools.toast.error(data.errMsg || '网络错误');
		}
	}, (err) => {
	  tools.toast.offline(err);
    })
    
}

reset(){
    this.setState({
        chooseDate:[],
        policyNo:"",
        personName:"",
        branchCode:"",
        cityCode:"",
        healthChkpartyId:""
    })
    this.refs.monthlySelect.rest()
}
onChange(value, dateString) {
    this.setState({
        chooseDate:value,
        medicalReportDateMin:dateString[0],
        medicalReportDateMax:dateString[1]
    })
  }
  exportExcel(){
    
   let params = {
        branchCode:this.state.branchCode,
        cityCode:this.state.cityCode,
        healthChkpartyId: this.state.healthChkpartyId,
        personName:this.state.personName,
        policyNo:this.state.policyNo,
        medicalReportDateMin:this.state.medicalReportDateMin,
        medicalReportDateMax:this.state.medicalReportDateMax         
}
    api.exportExcels(params).then((data)=>{
                var date=new Date()
                var date=tools.format(date,"yyyy-mm-dd HH-mm-ss")
                var name=date+"清单数据.xls"
                tools.downFile(data,name)
    });
}
	render(){
   
		return(
			<div className="content-right">
               
        <div className="main1">
            <div className="box2">
                <div>
                    <label className="fl" >保单号</label>
                        <input type="text" value={this.state.policyNo} className="tl fl width15" onChange={(e) => {this.setState({policyNo: e.target.value})}}
                         placeholder="" data-input-clear="5" ref="policyNo" />
                    <label className="fl" >客户姓名</label>
                    <input type="text" className="tl fl width15"  value={this.state.personName} onChange={(e)=>{this.setState({
                        personName:e.target.value
                    })}} 
                    placeholder="" data-input-clear="5" ref="personName"/>
                    <label className="fl" >登记:</label>
                    <RangePicker
                          value={this.state.chooseDate}
					      showTime={{ format: 'HH:mm' }}
					      format="YYYY-MM-DD HH:mm"
					      placeholder={['开始日期', '结束日期']}
					      onChange={this.onChange.bind(this)}
					    />
                </div>
                <div className="clearfix"></div>
                <MonthlySelect change={this.change.bind(this)}  ref="monthlySelect"/>
                <div className="selt-btn-center">
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <a  className="button btn-color-red" onClick={() => this.show(1)}>查 询</a>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a  className="button" onClick={()=>this.reset()}>重 置</a>
                </div>
            </div>
            <div className="clear"></div>
        </div>
        <div className="main1"  id="myTab2_2Content0">
            <div className="box1 table-overflow m-b-2">
            <div className="title-add">
                <span><a  className="add-data" onClick={()=>this.exportExcel()}>打印扫描登记报告</a></span>
            </div>
                <table width="100%" border="0" className="table1">
                    <tbody>
                    <tr>

                        <th>序号</th>
                        <th>体检机构</th>
                        <th>客户姓名</th>
                        <th>保单号</th>
                        <th>体检项目</th>
                        <th>收到日期</th>
                       <th>扫描类型</th> 
                        <th>报告页数</th>
                    </tr>
                    {this.state.dataDetailList.map((item,index)=>{
                       return(
                        <tr key={index}>
                        <td>{index+1}</td>
                        <td>{item.partyName}</td>
                        <td>{item.personName}</td>
                        <td>{item.policyNo}</td>
                        <td>{item.checkupName}</td>
                        <td>{item.medicalReportDate}</td>
                        <td>{item.scanType}</td>
                        <td>{item.medicalReportPageCnt}</td>
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


        )
	}
}
export default Datascan