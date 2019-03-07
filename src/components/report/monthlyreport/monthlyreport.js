//月报表
import React, { Component } from 'react';
import Pagination from '../../pagination/Pagination'
import MonthlySelect from '../../monthlySelect/MonthlySelect'
import * as api from '../../../config/api'
import * as tools from '../../../config/tools'
import DatePicker from 'antd/lib/date-picker'; 
import moment from 'moment'; 
const { RangePicker } = DatePicker;


class Monthlyreport extends Component{
	 constructor(args) {
        super()
        this.state = {
            totalPage: 1,
            jumpPage:1,
            monthlylist:[],
            policyNo:'',
            chooseDate:[],
            branchCode:"",
            cityCode:"",
            healthChkpartyId:"",
            checkupDateMin:'',
            checkupDateMax:'',
            checkupOrderId:'',
        }
    }
    componentDidMount() {
    	this.show()
    	
    }
    jump(page) {
        this.setState({
            jumpPage: page
        }, () => {
            this.show();
        })
    }
    change(branchCode,cityCode,healthChkpartyId){
        this.setState({
          branchCode,
          cityCode,
          healthChkpartyId
        })
      }
    show(num){
    	let params ={
    		pageno:num===1?1:this.state.jumpPage,
            branchCode:this.state.branchCode,
            cityCode:this.state.cityCode,
            healthChkpartyId: this.state.healthChkpartyId,
            returnRegisterDateMin:this.state.checkupDateMin,
            returnRegisterDateMax:this.state.checkupDateMax
        }

    	api.monthlystatementlist(params).then((data)=>{
            if(num===1){
                console.log(1233)
                this.refs.page.indexpage(1)
            }
            if (tools.checkResult(data)) {
    		this.setState({
    			monthlylist:data.MonthlyReportList,
    			totalPage: data.totalPage
    		})
        }
    	})
    }

    reset() {
        this.setState({
			chooseDate: [],
			checkupDateMin:'',
			checkupDateMax:'',
            branchCode:"",
            cityCode:"",
            healthChkpartyId:""
        })
        this.refs.monthlySelect.rest()
    }
    del(checkupOrderId){
      let params = {
        checkupOrderId
      }
      api.monthlymesDelete(params).then((data)=>{
              window.$('.reveal-modal').trigger('reveal:close');
              this.show();
      })
    }
    exportExcel(){
    	let params={
            pageno:this.state.jumpPage,
            branchCode:this.state.branchCode,
            cityCode:this.state.cityCode,
            healthChkpartyId: this.state.healthChkpartyId,
            returnRegisterDateMin:this.state.checkupDateMin,
            returnRegisterDateMax:this.state.checkupDateMax
    	}
    	api.monthlyExcel(params).then((data)=>{
		            let name = '月报表' + Math.round(new Date().getTime());
                    tools.downFile(data, name);
        });
    }
 
     changeDate(value, mode) {
		this.setState({
			chooseDate:value,
			checkupDateMin:mode[0],
			checkupDateMax:mode[1]
		})
	}
	render(){

		return(
            <div className="content-right">
            
            	<div className="main1">
            <div className="box2">
            <MonthlySelect change={this.change.bind(this)}  ref="monthlySelect"/>
                <div className="clearfix"></div>
                <div>
                    <label className="fl" >返回登记日期:</label>
                    <div>
					    <RangePicker  
                    value={this.state.chooseDate}
                    onChange={this.changeDate.bind(this)}
                     />
					    <a className="button btn-color-red" onClick={()=>this.show(1)}>查 询</a>
                   <a className="button" onClick={() => this.reset()}>重 置</a>
					 </div>                 
                </div>
            </div>
            <div className="clear"></div>
        </div>
        <div className="main1"  id="myTab2_2Content0">
            <div className="box1 table-overflow m-b-2">
            <div className="title-add">
                <span><a className="add-data" onClick={()=>this.exportExcel()}>导出Excel文件</a></span>
            </div>
                <table width="100%" border="0" className="table1">
                    <tbody>
                    <tr>

                        <th>序号</th>
                        <th>体检机构</th>
                        <th>保单号</th>
                        <th>保单类型</th>
                        <th>客户姓名</th>
                        <th>体检项目</th>
                        <th>体检时间</th>
                        {/* <th>体检类型</th> */}
                        <th>报告返回时间</th>
                        <th>TAT</th>
                        <th>体检费用</th>
                        {/* <th>是否HIV</th>
                        <th>是否HNV</th> */}
                        <th>渠道</th>
                        <th>是否异地体检</th>
                        <th>操作</th>

                    </tr>
                    {this.state.monthlylist.map((item,index)=>{
                    	return(
                    	<tr key={index}>
                        <td>{index+1}</td>
                        <td>{item.partyName}</td>
                        <td>{item.policyNo}</td>
                        <td>{item.orderType==='01'?'团险预约':item.orderType==='02'?'预核保无保单预约':'个险'}</td>
                        <td>{item.personName}</td>
                        <td>{item.checkupName?item.checkupName.slice(0,10):'无'}</td>
                        <td>{item.checkupDate}</td>
                        {/* <td>{item.checkupTypeName}</td> */}
                        <td>{item.medicalReportDate}</td>
                        <td>{item.TAT}</td>
                        <td>{item.checkupFee}</td>
                        {/* <td>111</td>
                        <td>222</td> */}
                        <td>{item.salesChannelCode==='01'?'理赔':item.salesChannelCode==='02'?'POS':item.salesChannelCode==='03'?'银保':'无'}</td>
                        <td>{item.isOtherCityCheckup==='0'?'否':'是'}</td>
                        <td><a data-reveal-id="deleId" onClick={()=>{this.setState({checkupOrderId:item.id})}}>删除</a></td>
                    </tr>
                    )
                    })}
      
                    </tbody>
                </table>
            </div>
            <Pagination totalPage={this.state.totalPage} jump={this.jump.bind(this)} ref="page"></Pagination>
           
        </div>

   {/*删除*/}
    <div id="deleId" className="reveal-modal">
    <h1>提示消息</h1>
    <div className="main">
        <div className="reveal-modal-del">
            您确定要删除吗?
        </div>
        <div className="btn-main m-t-2">
            <span><a className="button btn-color-red"
            onClick={()=>this.del(this.state.checkupOrderId)}>确 认</a></span>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <span><a className="button" onClick={() => {
                window.$('.reveal-modal').trigger('reveal:close');
            }} >取 消</a></span>
        </div>
	    </div>
	    <a className="close-reveal-modal">&#215;</a>
	</div>

    </div>
			)
	}
}
export default Monthlyreport