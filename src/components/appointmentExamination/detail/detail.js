import React, { Component } from 'react';
import * as api from '../../../config/api.js'
import * as tools from '../../../config/tools'
import './detail.css'
import { Document, Page } from 'react-pdf';
class Detail extends Component{
	constructor(args) {
        super()
        this.state = {
             detail:{},
             pageNumber: 1,   
        }
        }
    componentDidMount() {
    	this.show()
    }
    show(){
        let params ={
        	id:this.props.match.params.id
        }
    	api.detailorderParticulars(params).then((data)=>{
    		if (tools.checkResult(data)) {
    		this.setState({
               detail:data.health
    		})
    	}
    	})
    
    }
    succe(){
    	 let params ={
        	id:this.props.match.params.id,
        	result:2//完成体检
        }
    	api.typecancelOrder(params).then((data)=>{
    		if (tools.checkResult(data)) {
              tools.toast.success('完成体检')
               this.setState({
                
               },()=>{
                this.show()
            })
    	    }
    	})
    }
    cancel(){
         let params ={
        	id:this.props.match.params.id,
        	result:3//取消体检
        }
    	api.typecancelOrder(params).then((data)=>{
    		if (tools.checkResult(data)) {
               tools.toast.success('取消体检')
               window.$('.reveal-modal').trigger('reveal:close');
                this.setState({
                
               },()=>{
                this.show()
            })
    	  }
    	})
    }
    goinfo(e,type){
        var id=this.state.detail.id
        var orderType=this.state.detail.orderType
        if(type===1){
            this.props.history.push(`/appointmentExamination/testinfo/${id}`)

        }else{
       this.props.history.push({
           pathname:`/appointmentExamination/testorder/${orderType}`,
             query:{
               id:id,
             }
       })
           //this.props.history.push(`/appointmentExamination/testorder/${item.orderType}`)
        }
   }
   tijianxin(){
   let item=this.state.detail
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
            <div className="content-right appdetail">
            <div className="main1">
            <div className="box2">

                <div className="clearfix"></div>
                <h3>{(() => {
                              switch (this.state.detail.statusId) {
                              case '01':
                                  return '待预约记录详情';
                              case '02':
                                  return '已预约记录详情';
                              case '03':
                                  return '取消预约记录详情';
                              case '04':
                                  return '已发医院记录详情';
                              case '05':
                                  return '已逾期记录详情';
                              case '06':
                                  return '已体检记录详情';
                              case '07':
                                  return '报告回齐记录详情';
                              case '08':
                                  return '取消体检记录详情';
                              default:
                                  return ''
                              }
                          })()}</h3>
                <div className="clearfix"></div>
                <div>
                    <ul className="detailUl text-l">
                        <li>
                            <label><span className="Space">保单号:</span><span>{this.state.detail.policyNo}</span></label>
                            <label><span className="Space">客户姓名:</span><span>{this.state.detail.personName}</span></label>

                        </li>

                        <li>
                            <label><span className="Space">预约人代号:</span><span>{this.state.detail.salesId}</span></label>
                            <label><span className="Space">体检时间:</span><span>{this.state.detail.checkupDate}</span></label>
                        </li>

                        <li>
                            <label><span className="Spaces">分公司:</span><span>{this.state.detail.branchName}</span></label>
                            <label><span className="Spaces" style={{marginLeft:"32px"}}>城市:</span><span>{this.state.detail.cityName}</span></label>
                        </li>
                        
                        <li>
                            <label><span className="Space">修改时间:</span><span>{this.state.detail.updateTime}</span></label>
                            <label><span className="Spaces">医院</span><span>{this.state.detail.partyName}</span></label>
                            <label><span className="Spaces">状态:</span><span>
                             {(() => {
                              switch (this.state.detail.statusId) {
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
                            </span></label>
                        </li>

                    </ul>
                </div>

                <div className="clearfix"></div>

                <div className="btn-main m-t-3">
                    <span><a  className="button btn-color-red" data-reveal-id="saveModel" onClick={()=>this.props.history.goBack()}>返回上一页</a></span>
                    
                               
                     {(()=>{
                        	switch(this.state.detail.statusId){
                        		case '02':
                        		return <a onClick={(e)=>{this.goinfo(e,1)}}  className="button btn-color-red" data-reveal-id="saveModel">修改</a>;
                            case '03':
                            return <a onClick={(e)=>{this.goinfo(e,1)}}  className="button btn-color-red" data-reveal-id="saveModel">预约</a>;
                        		case '01':
                        		return <a onClick={(e)=>{this.goinfo(e,2)}}  className="button btn-color-red" data-reveal-id="saveModel">预约</a>;
                        		default:
                        		return null
                        	}
                        })()} 
                      
                    {(()=>{
                    	switch(this.state.detail.statusId){
                             case '04':
                             return <div style={{display:'inline-block'}}><span><a  className="button btn-color-red" data-reveal-id="saveModel"
                             onClick={()=>this.succe()}>完成体检</a></span>
                                    <span><a  className="button btn-color-red" 
                                     data-reveal-id="esc">取消体检</a></span></div>
                    	     default:
                    	     return ''
                    	}
                    })()}
                    {this.state.detail.medicalLetterURL?<a onClick={(e)=>this.tijianxin()} className="button btn-color-red" data-reveal-id="saveModel">体检信</a>:null}
                </div>
            </div>
            <div className="clear"></div>
        </div>


        <div id="esc" className="reveal-modal">
                <h1>提示消息</h1>
                <div className="main">
                    <p className="tallyou">确定要取消体检吗？</p>
                    <div className="btn-main m-t-2">
                        <span><a  className="button btn-color-red"
                       onClick={()=>this.cancel()}>确 认</a></span>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <span><a  className="button" onClick={() => {
                window.$('.reveal-modal').trigger('reveal:close');
            }} >取 消</a></span>
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
			)
	}
}

export default Detail