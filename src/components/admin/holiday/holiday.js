import React, { Component } from 'react';
import * as tools from '../../../config/tools'
import MonthlySelect from '../../monthlySelect/MonthlySelect'
import * as api from '../../../config/api.js'
import './holiday.css'
const $=window.$
class Holiday extends Component {
    constructor(args) {
        super()
        this.state={
         holiday:[],
         day:'',
         month:"",
         week1:[],
         week2:[],
         week3:[],
         week4:[],
         week5:[],
         week6:[],
         branchCode:'',
         cityCode:'',
         partyId:'',
         flag:'0'
        }
    }
    componentDidMount() {
     this.show()
     // document.getElementById("holi").oncontextmenu = function(){
     //  　　return false;
     //  }
    }
    show(){
       var data=new Date().getMonth()+ 1
      let params={
        branchCode:this.state.branchCode||'0986',
        //cityCode:this.state.cityCode,
        //partyId:this.state.partyId,
        year:this.state.year||'2018',
        month:this.state.month||data,
      }
      api.holiday(params).then((data)=>{
        if (tools.checkResult(data)) {
        this.setState({
            week1:data.monthList.splice(0,7),
            week2:data.monthList.splice(0,7),
            week3:data.monthList.splice(0,7),
            week4:data.monthList.splice(0,7),
            week5:data.monthList.splice(0,7),
            week6:data.monthList.splice(0,7),
        })
      }else{
          tools.toast.error(data.errMsg)
        }
      })
    }
    change(branchCode,cityCode,partyId){
    this.setState({
      branchCode,
      cityCode,
      partyId
    })
  }
    add(value){
      if(value!=undefined){
       window.$('#holiday').reveal("{data-animation:'none'}");
       this.setState({
        day:value
       })
      }
    }
    cha(){
      var month=document.querySelector('select[name="aaa"]').value
      console.log(month)
      this.setState({
        month:month
      },()=>{
         this.show()
      })
     
    }
    upflag(e){
      this.setState({
        flag:e.target.value
      })
    }
    upholiday(){
      let params={
         flag:this.state.flag,
         branchCode:this.state.branchCode||'0986',
         date:this.state.day
      }
      api.upholiday(params).then((data)=>{
        if (tools.checkResult(data)) {
        console.log(data)
        window.$('.reveal-modal').trigger('reveal:close');
        this.show()
      }else{
          tools.toast.error(data.errMsg)
        }
      })
    }
    render(){
     var data=new Date().getMonth()+ 1
      
      return(
          <div>
             { /*
                   <div className="content-right" id='holi'>
                <div className="main1">
              <div className="box2">
                <MonthlySelect  ref='monthlySelect' change={this.change.bind(this)} />
                    <label>年份</label>
                   <select className="">
                     <option>2018</option>
                   </select>
                   <label>月份</label>
                   <select className="" name='aaa'>
                     <option value='1'>一月</option>
                     <option value='2'>二月</option>
                     <option value='3'>三月</option>
                     <option value='4'>四月</option>
                     <option value='5'>五月</option>
                     <option value='6'>六月</option>
                     <option value='7'>七月</option>
                     <option value='8'>八月</option>
                     <option value='9'>九月</option>
                     <option value='10'>十月</option>
                     <option value='11'>十一月</option>
                     <option value='12'>十二月</option>
                   </select>
                    <a  className="button btn-color-red" onClick={()=>this.cha()}>查 询</a>
                </div>
             </div>
                  
                      <div  className="calendar">
                <div className="calendar-header">
                    <span>{this.state.month||data}月</span>
                </div>
                <div className="calendar-body">
                    <ul className="c-body-head">
                        <li>日</li>
                        <li>一</li>
                        <li>二</li>
                        <li>三</li>
                        <li>四</li>
                        <li>五</li>
                        <li>六</li>
                    </ul>
                    <div className="c-body-content">
                             <ul  className="content-row">{this.state.week1.map((item,index)=>{
                                  return( 
                                      <li className={item.flag=='1'?'red':item.flag=='0'?'black':'blue'} key={index}  onClick={()=>this.add(item.date)}>{item.day}</li>
                                    )
                             })}</ul>
                              <ul  className="content-row">{this.state.week2.map((item,index)=>{
                                  return( <li className={item.flag=='1'?'red':item.flag=='0'?'black':'blue'} key={index}  onClick={()=>this.add(item.date)}>{item.day}</li>)
                             })}</ul>
                              <ul  className="content-row">{this.state.week3.map((item,index)=>{
                                  return(  <li className={item.flag=='1'?'red':item.flag=='0'?'black':'blue'} key={index}  onClick={()=>this.add(item.date)}>{item.day}</li>)
                             })}</ul>
                                <ul  className="content-row">{this.state.week4.map((item,index)=>{
                                  return(  <li className={item.flag=='1'?'red':item.flag=='0'?'black':'blue'} key={index}  onClick={()=>this.add(item.date)}>{item.day}</li>)
                             })}</ul>
                                 <ul  className="content-row">{this.state.week5.map((item,index)=>{
                                  return(  <li className={item.flag=='1'?'red':item.flag=='0'?'black':'blue'} key={index}  onClick={()=>this.add(item.date)}>{item.day}</li>)
                             })}</ul>
                                  <ul  className="content-row">{this.state.week6.map((item,index)=>{
                                  return(  <li className={item.flag=='1'?'red':item.flag=='0'?'black':'blue'} key={index}  onClick={()=>this.add(item.date)}>{item.day}</li>)
                             })}</ul>
                                 
                    </div>
                </div>
            </div>
         
               <div id="holiday" className="reveal-modal">
    <h1>假期选择</h1>
    <div className="main sen-fax">
        <div className="edit-time ml200">
            <label className="fl">状态</label>
            <select className="fl-none fl width40" name="choose" id="choose" onChange={(e)=>this.upflag(e)} value={this.state.flag}   >
                <option value="0" >工作日</option>
                 <option value="2" >节假日</option>
                  <option value="1" >休息日</option>
            </select>
        </div>
        <div className="btn-main m-t-2">
            <span><a  className="button btn-color-red spec-colse-widbg" onClick={()=>this.upholiday()}
           >确 认</a></span>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <span><a  className="button" onClick={() => {window.$('.reveal-modal').trigger('reveal:close');}}>取 消</a></span>
        </div>
    </div>
    <a className="close-reveal-modal">&#215;</a>
</div>

            注：黑色为工作日，红色为周末，蓝色为休息
            </div>*/}
           </div>
         
        )
    }
}

export default Holiday;