import React, { Component } from 'react';
import Pagination from '../../pagination/Pagination';
import * as api from '../../../config/api'
import { Document, Page } from 'react-pdf';
import * as tools from '../../../config/tools' 
import "./record.css"
import { Link } from 'react-router-dom';

class reservationRecordQuery extends Component{
constructor(args){
    super();
    this.state={
        totalPage: 1,
        jumpPage: 1,
        appointmentRecordList:[],
        branchList:[],
        statusList:[],
        branchCode:"",
        statusId:"",
        policyNo:"",
        personName:"",
        pageNumber: 1,
        pdfurl:"",
    }
}
jump(page) {
	this.setState({
		jumpPage: page
	}, () => {
		this.show();
	})
}

show(num){
   let params={
    pageno:num===1?1:this.state.jumpPage,
    branchCode:this.state.branchCode,
    statusId:this.state.statusId,
    policyNo:this.state.policyNo,
    personName:this.state.personName
   }
   api.querycenter(params).then((data) => {
  
    if (tools.checkResult(data)) {
       if(num===1){
           this.refs.page.indexpage(1)
       }
        this.setState({
            appointmentRecordList:data.appointmentRecordList,
            totalPage:data.totalPage
        })
    } else {
        tools.toast.error(data.errMsg || '网络错误');
    }
}, (reject) => {
    tools.toast.offline(reject);
})

}
componentDidMount() {
    this.show();
    let params = {
      isContext: 1
    }
    api.monthlyselect(params).then((data) => {
        if (tools.checkResult(data)) {
            this.setState({
                branchList:data.branchList
            })
        } else {
            tools.toast.error(data.errMsg || '网络错误');
        }
    }, (reject) => {
        tools.toast.offline(reject);
    })
    api.seequerycenter().then((data) => {
          if (tools.checkResult(data)) {
              this.setState({
                statusList:data.statusList
              })
          } else {
              tools.toast.error(data.errMsg || '网络错误');
          }
      }, (reject) => {
          tools.toast.offline(reject);
      })
}
resets(){
    this.setState({
        branchCode:"",
        statusId:"",
        policyNo:"",
        personName:""
    })

}
jumps(item){
    this.props.history.push(`/recordQuery/reservationRecord/${item.checkUpOrderId}`)
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
render(){
  let istyle={
      width:595,
      height:841,
      margin:'0 auto',
      textAlign:'center',
    }
    const { pageNumber, numPages } = this.state;
    return(
        <div className="content-right">
        <div className="main1">
            <div className="box2">
                <div>
                    <label className="fl" >分公司</label>
                    <select className="fl-none fl width15" name="choose" id="" value={this.state.branchCode} onChange={(e)=>this.setState({branchCode:e.target.value})}>
                        <option value="" >请选择</option>
                        {
                            this.state.branchList.map((item,index)=>{
                                return(
                                    <option value={item.branchCode} key={index}>{item.branchName}</option>
                                )
                           
                            })
                        }
                    </select>
                    <label className="fl" >保单号</label>
                    <input type="text" className="tl fl width15" placeholder="" data-input-clear="5" ref="policyNo" onChange={(e)=>this.setState({
                        policyNo:e.target.value

                    })} value={this.state.policyNo}/>
                    <label className="fl" >体检状态</label>
                    <select className="fl-none fl width15" name="choose" id="" value={this.state.statusId} onChange={(e)=>this.setState({statusId:e.target.value})}>
                        <option value="" >请选择</option>
                    {
                        this.state.statusList.map((item,index)=>{
                          return(
                              <option key={index} value={item.codeValue}>{item.codeName}</option>
                          )
                        })
                    }
                    </select>
                    <label className="fl" >客户姓名</label>
                    <input type="text" className="tl fl width15" placeholder="" data-input-clear="5" ref="personName" onChange={(e)=>this.setState({
                        personName:e.target.value
                    })} value={this.state.personName}/>
                </div>
                <div className="clearfix"></div>
                <div className="selt-btn-center">
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <a  className="button btn-color-red" onClick={()=>this.show(1)}>查 询</a>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a  className="button" onClick={()=>this.resets()}>重 置</a>
                </div>
            </div>
            <div className="clear"></div>
        </div>
        <div className="main1"  id="myTab2_2Content0">
            <div className="box1 table-overflow m-b-2">
                <table width="100%" border="0" className="table1">
                    <tbody>
                    <tr>
                        <th>序号</th>
                        <th>保单号</th>
                        <th>预约人代号</th>
                        <th>体检类型</th>
                        <th>体检机构</th>
                        <th>体检时间</th>
                        <th>客户姓名</th>
                        <th>修改时间</th>
                        <th>状态</th>
                        <th>操作</th>
                    </tr>
                    {this.state.appointmentRecordList.map((item,index)=>{
                return(
                 
                 <tr key={index} onClick={()=>this.jumps(item)}>
                     <td>{index+1}</td>
                     <td>{item.policyNo}</td>
                     <td>{item.salesId}</td>
                     <td>
                         {
                        (()=>{
                            switch (item.orderType) {
                             case '01':    
                             return "团险预约";
                            case '02':
                            return "预核保无保单预约"
                            case '03':
                            return "个险"
                             default:
                                 return null;
                         }
                        })()
                         }
                         
                     </td>
                     <td>{item.partyName}</td>
                     <td>{item.checkupDate}</td>
                     <td>{item.personName}</td>
                     <td>{item.updateTime}</td>
                     <td>
                     {
                        (()=>{
                            switch (item.statusId) {
                             case '01':    
                             return "待预约";
                            case '02':
                            return "已预约"
                            case '03':
                            return "取消预约";
                            case '04':
                            return "已发医院";
                            case "05":
                            return "已逾期";
                            case "06":
                            return "已体检";
                            case "07":
                            return "报告回齐";
                            case "08":
                            return "取消体检";
                             default:
                                 return null;
                         }
                        })()
                         } 
                     </td>
                     <td> {item.medicalLetterURL?<a onClick={(e)=>this.tijianxin(e,item)}>体检信</a>:null}</td>
                     </tr>
                  )
              })}   
                  
                    </tbody>
                </table>
            </div>
            <Pagination totalPage={this.state.totalPage} jump={this.jump.bind(this)}  ref="page"/>

        </div>

{/*体检信*/}
<div id="expeRience" className="reveal-modal  width595">
<Document style={istyle}
          file={this.state.medicalLetterURL} >
          <Page pageNumber={pageNumber} />
        </Document>     
 <p className="foot-toview">
            <a  className="button btn-color-red" onClick={()=>this.downpdf()}>下载PDF文件</a>
        </p>
</div>

    </div>
    
    )
}

}

export default reservationRecordQuery