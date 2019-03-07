import React, { Component } from 'react';
import Pagination from '../../pagination/Pagination'
import MonthlySelect from '../../monthlySelect/MonthlySelect'
import { Link,withRouter } from 'react-router-dom';
import * as api from '../../../config/api.js'
import * as tools from '../../../config/tools'
import { Document, Page } from 'react-pdf';
import DatePicker from 'antd/lib/date-picker'; 
import moment from 'moment'; 

const $ = window.$;	


class AppointmentExamination extends Component {
	constructor(args) {
        super()
        this.state = {
             totalPage: 1,
             jumpPage:1,
             statusList:[],//状态集合
             privateLetterRusult:[],//列表查询
             statusId:'',//体检状态
             branchCode:'',
             cityCode:'',
             partyId:'',
             salesId:'',//预约人代号
             checkupDate:'',
             chooseDate: null,
             personName:'',
             policyNo:'',
             statusList1:[],//批量修改状态
             statusId2:'',
             medicalLetterURL:'',
             pageNumber: 1,
             pdfurl:'',
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
    change(branchCode,cityCode,partyId){
    this.setState({
      branchCode,
      cityCode,
      partyId
    })
  }
  changeDate(value,mode){
  	this.setState({
  		 chooseDate:value,
       checkupDate: mode
  	})
  }
    show(num){
      $("input[name=checkbox]").prop("checked", false)
      $("input[name=choose_checkbox]").prop("checked", false)
    	let params={
       pageno:num?1:this.state.jumpPage,
			 cityCode:this.state.cityCode,
			 salesId:this.state.salesId,
			 branchCode:this.state.branchCode,
			 healthChkPartyId:this.state.partyId,
			 checkupDates:this.state.checkupDate, 
			 personName:this.state.personName, 
			 policyNo:this.state.policyNo, 
			 statusId:this.state.statusId,
    	}
    	api.healthorderqueryAll(params).then((data)=>{
            if(num===1){
                 this.refs.page.indexpage(1)
            }
    		if (tools.checkResult(data)) {
    		this.setState({
             totalPage: data.totalPage,
             statusList:data.statusList,//状态集合
             privateLetterRusult:data.privateLetterRusult
    		})
    	}else{
          tools.toast.error(data.errMsg)
        }
    	})
    }
    reset() {
        this.setState({
			 pageno:1,
			 cityCode:'',
			 salesId:'',
			 branchCode:'',
			 healthChkPartyId:'',
			 partyId:'',
			 checkupDate:[], 
			 chooseDate: null,
			 personName:'', 
			 policyNo:'', 
			 statusId:'',
		})
		this.refs.monthlySelect.rest()
    }
    godetail(item){
    this.props.history.push(`/appointmentExamination/detail/${item.id}`)
    }
    goinfo(e,item,type){
    	 e.stopPropagation();
    	 if(type===1){
    	 	this.props.history.push(`/appointmentExamination/testinfo/${item.id}`)

    	 }else{
        this.props.history.push({
            pathname:`/appointmentExamination/testorder/${item.orderType}`,
              query:{
                id:item.id,
              }
        })
            //this.props.history.push(`/appointmentExamination/testorder/${item.orderType}`)
    	 }
    }
    batchquery(){
    	let id = ''
      $('input[name="choose_checkbox"]:checked').each(function(index, el) {
      $(el).parent().nextAll().each(function(index, el) {
        if ($(el).attr('name') === 'id') {
          id += $(el).text() + ','
        }
      });
    });
      let params={ids:id}
      api.plbatchStatus(params).then((data)=>{
      	if(tools.checkResult(data)){
      		this.setState({
      			statusList1:data.statusList1
      		})
      		window.$('#operAtion').reveal("{data-animation:'none'}");
      	}else{
      		tools.toast.error(data.errMsg || '网络错误')
      	}
      })
    }
    ok(item){
    	let id = ''
      $('input[name="choose_checkbox"]:checked').each(function(index, el) {
      $(el).parent().nextAll().each(function(index, el) {
        if ($(el).attr('name') === 'id') {
          id += $(el).text() + ','
        }
      });
    });
      let params={ids:id,statusId2:this.state.statusId2}
      api.plupdateBatchStatus(params).then((data)=>{
      	if(tools.checkResult(data)){
           $("input[name=checkbox]").prop("checked", false)
           $("input[name=choose_checkbox]").prop("checked", false)
         
      		tools.toast.success('修改成功')
      		this.show()
      		$('.reveal-modal').trigger('reveal:close');
      	}
      })
    }
	choose(e) {
		let $ = window.$;
		$("input[name=choose_checkbox]").prop("checked", e.target.checked);
	}
  tijianxin(e,item){
     e.stopPropagation()
     this.setState({
      pdfurl:item.medicalLetterURL
     })
     let params ={
      medicalLetterURL:item.medicalLetterURL
     }
     api.selectCheckupLetter(params).then((data)=>{
      this.setState({
        medicalLetterURL:data.medicalLetterURL?'data:application/pdf;base64,'+data.medicalLetterURL:null
      },()=>{
        window.$('#expeRience').reveal("{data-animation:'none'}");
      }) 
     })
  }
  downpdf(){
     let params ={
       medicalLetterURL:this.state.pdfurl
      }
      api.downpdf(params).then((data)=>{
             var  base=data.medicalLetterURL
           let name = '体检信' + Math.round(new Date().getTime());
            tools.downpdf(tools.dataURLtoBlob(base),name);
     })
  }
  // addinput(){
  //   console.log(2222)
  //          var obj=document.createElement("input");
  //          var odiv=document.createElement("div");
  //          $(odiv).attr('className','clearfix')
  //          $(obj).attr('className','tl fl width20')
  //          $(obj).attr('type','text')
  //          $(odiv).append(obj);
  //          $('#myTab2_2Content0').append(odiv)
  // }
  render() {
    let istyle={
      width:595,
      height:841,
      margin:'0 auto',
      textAlign:'center',
    }
    const { pageNumber, numPages } = this.state;
    return (
             <div className="content-right">
        <div className="main1">
            <div className="box2">
                <div>
                   <MonthlySelect  ref='monthlySelect' change={this.change.bind(this)} />
                </div>
                <div className="clearfix"></div>
                <div>
                    <label className="fl">预约人代号:</label>
                    <input value={this.state.salesId} type="text" className="tl fl width20" placeholder="" data-input-clear={5} onChange={(e)=>{this.setState({salesId:e.target.value})}} />
                    <label className="fl">客户姓名:</label>
                    <input value={this.state.personName} type="text" className="tl fl width20" placeholder="" data-input-clear={5} onChange={(e)=>{this.setState({personName:e.target.value})}}/>
                    <label className="fl">保单号:</label>
                    <input value={this.state.policyNo} type="text" className="tl fl width20" placeholder="" data-input-clear={5} onChange={(e)=>{this.setState({policyNo:e.target.value})}}/>
                </div>
                <div className="clearfix"></div>
                <div>
                    <label className="fl" >状态</label>
                        <select  value={this.state.statusId} className="fl-none fl width20" name="choose" onChange={(e)=>this.setState({statusId:e.target.value})} >
                        <option value="" >请选择</option>
                        {this.state.statusList.map((item,index)=>{
                        	return(
                                    <option key={index} value={item.codeValue}>{item.codeName}</option>
                        		)
                        })}
                        </select>
                        <label className="fl">体检日期:</label>
                   <DatePicker  value={this.state.chooseDate} onChange={this.changeDate.bind(this)} />
                    <a  className="button btn-color-red" onClick={() => this.show(1)}>查 询</a>
                    <a  className="button" onClick={()=>this.reset()}>重 置</a>
                </div>
            </div>
            <div className="clear"></div>
        </div>
        <div className="main1"  id="myTab2_2Content0">
            <div className="box1 table-overflow m-b-2">
            <div className="title-add">

                <span><Link to="/appointmentExamination/testtime" className="add-data">
                预约体检登记</Link></span>
                <span><a className="add-data" 
                onClick={()=>{this.batchquery()}}>批量操作</a></span>
            </div>
                <table width="100%" border="0" className="table1">
                    <tbody>
                    <tr>
                        <th><input type="checkbox" onChange={(e)=>this.choose(e)} name="checkbox" /> 全选</th>
                        <th>保单号</th>
                        <th>预约人代号</th>
                        <th>体检类型</th>
                        <th>照会截至日期</th>
                        <th>体检机构</th>
                        <th>体检时间</th>
                        <th>客户姓名</th>
                        <th>修改时间</th>
                        <th>修改体检标识</th>
                        <th>状态</th>
                        <th>操作</th>
                    </tr>
                    {this.state.privateLetterRusult.map((item,index)=>{
                        	return(
                    <tr key={index}  onClick={ () =>this.godetail(item)}> 
                        <td><input name="choose_checkbox" type="checkbox" onClick={(e)=> e.stopPropagation()}  /></td>
                        <td>{item.policyNo}</td>
                        <td name='id' style={{display:'none'}}>{item.id}</td>
                        <td>{item.salesId}</td>
                        <td>
                            {(()=>{
                            	switch(item.orderType){
                            		case '01':
                            		return '团险预约';
                            		case '02':
                            		return '预核保无保单预约';
                            		case '03':
                            		return '个险';
                            		default:
                        		    return ''
                            	}
                            })()}
                        </td>
                        <td>{item.noteDate}</td>
                        <td>{item.partyName}</td>
                        <td>{item.checkupDate}</td>
                        <td>{item.personName}</td>
                        <td>{item.updateTime}</td>
                        <td>
                            {
                            (()=>{
                                    switch (item.healthchkCount) {
                              case '01':
                                  return '首次体检';
                              case '02':
                                  return '追加体检';
                              default:
                                  return '首次体检'
                              }
                                })()
                            }
                        </td>
                        <td>
                            {(() => {
                              switch (item.statusId) {
                              case '01':
                                  return '待预约';
                              case '02':
                                  return '已预约';
                              case '03':
                                  return '取消预约';
                              case '04':
                                  return '已发医院';
                              case '05':
                                  return '已逾期';
                              case '06':
                                  return '已体检';
                              case '07':
                                  return '报告回齐';
                              case '08':
                                  return '取消体检';
                              default:
                                  return ''
                              }
                          })()}
                        </td>
                        <td>
                        {(()=>{
                        	switch(item.statusId){
                        		case '02':
                        		return <a onClick={(e)=>{this.goinfo(e,item,1)}}>修改</a>;
                            case '03':
                            return <a onClick={(e)=>{this.goinfo(e,item,1)}}>预约</a>;
                        		case '01':
                        		return <a onClick={(e)=>{this.goinfo(e,item,2)}}>预约</a>;
                        		default:
                        		return null
                        	}
                        })()}
                        {item.medicalLetterURL?<a onClick={(e)=>this.tijianxin(e,item)}>体检信</a>:null}
                </td> 		
                    </tr>
                    )
                        })}
                    </tbody>
                </table>
            </div>
            <Pagination totalPage={this.state.totalPage} jump={this.jump.bind(this)} ref="page"></Pagination>
        </div>

{/*批量操作*/}
<div id="operAtion" className="reveal-modal">
    <h1>批量操作</h1>
    <div className="main sen-fax">
        <div className="edit-time ml200">
            <label className="fl">状态</label>
            <select className="fl-none fl width40" name="choose" id="choose" value={this.state.statusId2}
            onChange={(e)=>this.setState({statusId2:e.target.value})}>
                <option value="请选择" >请选择</option>
                {this.state.statusList1.map((items)=>{
                	return(
                        items.map((item,index)=>{
                		return(
                        <option value={item.codeValue} key={index}>{item.codeName}</option>
                        )
                	})
                		)
                })}
            </select>
        </div>
        <div className="btn-main m-t-2">
            <span><a  className="button btn-color-red spec-colse-widbg"
            onClick={()=>this.ok()}>确 认</a></span>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <span><a  className="button" onClick={() => {window.$('.reveal-modal').trigger('reveal:close');}}>取 消</a></span>
        </div>
    </div>
    <a className="close-reveal-modal">&#215;</a>
</div>


{/*体检信*/}
<div id="expeRience" className="reveal-modal  width595">
{/*<iframe style={istyle} src={this.state.medicalLetterURL} >
        </iframe>*/}
         <Document style={istyle}
          file={this.state.medicalLetterURL} >
          <Page pageNumber={pageNumber} />
        </Document>     
        <p className="foot-toview">
            <a  className="button btn-color-red" onClick={()=>this.downpdf()}>下载PDF文件</a>
        </p>
</div>





    </div>
    );
  }
}

export default withRouter(AppointmentExamination);
