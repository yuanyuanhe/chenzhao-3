import React, { Component } from 'react';
import Pagination from '../../pagination/Pagination'
import * as api from '../../../config/api'
import * as tools from '../../../config/tools'
import DatePicker from 'antd/lib/date-picker';
import MonthlySelect from '../../monthlySelect/MonthlySelect'
import moment from 'moment';
import './checkout.css'
const {RangePicker} = DatePicker;
const $ = window.$;
class Checkout extends Component {
  constructor(args) {
    super()
    this.state = {
      payBillList: [],
      totalPage: 1,
      jumpPage: 1,
      branchCode: '',
      partyId: '',
      settlementStatus: '',
      checkupDateMin: '',
      checkupDateMax: '',
      branchList: [],
      cityList: [],
      hospitalList: [],
      chooseDate: [],
      cityCode: '',
      chooseSettlementStatus: '',
      typeyear:[],
      bannian:[{value:'1',name:'上半年'},{value:'2',name:'下半年'}],
      jidu:[{value:'1',name:'第一季度'},{value:'2',name:'第二季度'},{value:'3',name:'第三季度'},{value:'4',name:'第四季度'}],
      yue:[{value:'1',name:'一月'},{value:'2',name:'二月'},{value:'3',name:'三月'},{value:'4',name:'四月'},{value:'5',name:'五月'},
      {value:'6',name:'六月'},{value:'7',name:'七月'},{value:'8',name:'八月'},{value:'9',name:'九月'},{value:'10',name:'十月'},
      {value:'11',name:'十一月'},{value:'12',name:'十二月'}],
      payWay:'',
      year:'',
      payWayType:'',
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
  change(branchCode,cityCode,partyId){
    this.setState({
      branchCode,
      cityCode,
      partyId
    })
  }
  show(num) {
    let params = {
      pageno: num===1?1:this.state.jumpPage,
      branchCode: this.state.branchCode,
      cityCode: this.state.cityCode,
      partyId: this.state.partyId,
      settlementStatus: this.state.settlementStatus,
      checkupDateMin: this.state.checkupDateMin,
      checkupDateMax: this.state.checkupDateMax,
      payWayType:this.state.payWayType,
      payWay:this.state.payWay,
      year:this.state.year,
    }
    api.payBill_payBillList(params).then((data) => {
      if(num===1){
        this.refs.page.indexpage(1)
      }
      if (tools.checkResult(data)) {
        this.setState({
          payBillList: data.payBillList,
          totalPage: data.totalPage
        })
      } else {
        tools.toast.error(data.errMsg || '网络错误');
      }
    }, (err) => {
      tools.toast.offline(err);
    })
  }
  ok() {
    let id = ''
    $('input[name="choose_checkbox"]:checked').each(function(index, el) {
      id += `${$(el).val()},`
    });
    let params = {
      settlementStatus: this.state.chooseSettlementStatus,
      id
    }
    api.payBill_changeSettlementStatus(params).then((data) => {
      if (tools.checkResult(data)) {
        this.show();
      } else {
        // tools.toast.error(data.errMsg || '网络错误');
      }
      $('.reveal-modal').trigger('reveal:close');
    })
  }
  export () {
    let params = {
      branchCode: this.state.branchCode,
      city: this.state.city,
      partyId: this.state.partyId,
      settlementStatus: this.state.settlementStatus,
      checkupDateMin: this.state.checkupDateMin,
      checkupDateMax: this.state.checkupDateMax
    }
    api.payBill_exportExcel(params).then((data) => {
      let name = '结账报表数据_' + Math.round(new Date().getTime());
      tools.downFile(data, name);
    })
  }
  chooseAll(e) {
    $("input[name=choose_checkbox]").prop("checked", e.target.checked);
  }
  disabledDate(current) {
    // Can not select days before today and today
    return current && current < moment().endOf('day');
  }
  changeDate(value, mode) {
    this.setState({
      chooseDate: value,
      checkupDateMin: mode[0],
      checkupDateMax: mode[1]
    })
  }
  rest() {
    this.setState({
      chooseDate: [],
      checkupDateMin: '',
      checkupDateMax: '',
      cityCode: '',
      branchCode: '',
      partyId: '',
      settlementStatus: '',
      payWayType:'',
      payWay:'',
      year:'',
    })
    this.refs.monthlySelect.rest();
  }
  typeyear(e){
     console.log(e.target.value)
     if(e.target.value=='01'){
      this.setState({
        typeyear:this.state.yue,
        payWay:e.target.value,
        year:'',
        payWayType:''
      })
    }
      if(e.target.value=='02'){
      this.setState({
        typeyear:this.state.jidu,
        payWay:e.target.value,
        year:'',
        payWayType:''
      })
    }
      if(e.target.value=='03'){
      this.setState({
        typeyear:this.state.bannian,
        payWay:e.target.value,
        year:'',
        payWayType:''
      })
     }
     if(e.target.value=='04'){
      this.setState({
        typeyear:[],
        payWay:e.target.value,
        year:'',
        payWayType:''
      })
     }
  }
  year(e){
    this.setState({
      year:e.target.value
    })
  }
  month(e){
    this.setState({
      payWayType:e.target.value
    })
  }
  render() {
    return (
      <div className="checkout content-right" >

              <div className="main1">
                <div className="box2">
                  <div>

                  <MonthlySelect ref='monthlySelect' change={this.change.bind(this)} />

                  </div>
                  <div className="clearfix" />
                  <div>
                    <label className="fl" >结账方式</label>
                    <select className="fl-none fl width10" value={this.state.payWay} onChange={(e)=>this.typeyear(e)} >
                      <option value="请选择">请选择</option>
                      <option value="04">年结</option>
                      <option value="03">半年结</option>
                      <option value="02">季结</option>
                      <option value="01">月结</option>
                    </select>

                    <select className="right-input fl-none fl width10" value={this.state.year} onChange={(e)=>this.year(e)}>
                     <option value="请选择">请选择</option>
                    {tools.year().map((item,index)=>{
                      return(
                            <option key={index} value={item}>{item}</option>
                        )                       
                    })} 
                    </select>
                    <select className="right-input fl-none fl width10" value={this.state.payWayType} onChange={(e)=>this.month(e)}>
                      <option value="请选择">请选择</option>
                      {this.state.typeyear.map((item,index)=>{
                      return(
                            <option key={index} value={item.value}>{item.name}</option>
                        )                       
                    })} 
                    </select>
                    
                    <label className="fl">体检日期:</label>
                    <RangePicker  
                    showToday={false}
                    value={this.state.chooseDate}
                    //disabledDate={this.disabledDate}
                    onChange={this.changeDate.bind(this)}
                     />
                  </div>

                  <div className="clearfix" />
                  <a className="button btn-color-red" onClick={()=>this.show(1)} >查 询</a>
                  <a className="button" onClick={()=>this.rest() } >重 置</a>
                </div>
                <div className="clear" />
              </div>

              <div className="main1" id="payBillList_table">
                <div className="box1 table-overflow m-b-2">
                <div className="title-add">
                  <span><a className="add-data" onClick={()=>this.export()} >导出Excel文件</a></span>
                  <span><a className="add-data" data-reveal-id="operAtion">批量更新状态</a></span>
                  {/* <span><a className="add-data">打印</a></span> */}
                </div>
                  <table width="100%" border={0} className="table1">
                    <tbody>
                      <tr>
                        <th><input type="checkbox" onChange={(e)=>this.chooseAll(e)} /> 全选</th>
                        <th>体检时间</th>
                        <th>客户姓名</th>
                        <th>性别</th>
                        <th>保单号</th>
                        <th>体检项目</th>
                        <th>体检+问卷(元)</th>
                        {/*<th>特殊</th>*/}
                        <th>结账状态</th>
                      </tr>

                      {this.state.payBillList.map((item,index)=>{
                        return(
                          <tr key={index}>
                              <td><input value={item.id} name='choose_checkbox' type="checkbox"/></td>
                              <td>{item.checkupDate}</td>
                              <td>{item.personName}</td>
                              <td>{item.sex==="1"?'男':item.sex==="2"?'女':'其他'}</td>
                              <td>{item.policyNo}</td>
                              <td>{item.checkupName?item.checkupName.slice(0,10):'无'}</td>
                              <td>{item.checkupFee}</td>
                              <td>{item.settlementStatus==='01'?'已结账':'未结账'}</td>
                             </tr>
                          )
                      })}

                    </tbody>
                  </table>
                </div>
                <Pagination totalPage={this.state.totalPage} jump={this.jump.bind(this)} ref="page"/>
              </div>


            <div id="operAtion" className="reveal-modal">
              <h1>批量操作</h1>
              <div className="main sen-fax">
                <div className="edit-time ml200">
                  <label className="fl">状态</label>
                  <select value={this.state.chooseSettlementStatus} onChange={(e)=>{this.setState({chooseSettlementStatus:e.target.value})}} className="fl-none fl width40" name="choose" id="choose">
                    <option value="">请选择</option>
                    <option value="01">已结账</option>
                    <option value="02">未结账</option>
                  </select>
                </div>
                <div className="btn-main m-t-2">
                  <span><a onClick={()=>this.ok()} className="button btn-color-red">确 认</a></span>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <span><a onClick={() => {window.$('.reveal-modal').trigger('reveal:close');}} className="button">取 消</a></span>
                </div>
              </div>
              <a className="close-reveal-modal">×</a>
            </div>




            </div>
    )
  }
}
export default Checkout