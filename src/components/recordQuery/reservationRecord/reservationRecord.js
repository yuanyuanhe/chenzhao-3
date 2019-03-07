import React, { Component } from 'react';
import Pagination from '../../pagination/Pagination';
import * as api from '../../../config/api'
import * as tools from '../../../config/tools'
import "./reservationRecord.css"
class reservationRecord extends Component{
    constructor(args){
        super();
        this.state={
            totalPage: 1,
            jumpPage: 1,
            appointmentRecordDetail:[],
            projectOperationList:[]
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
        this.show()
    }
 
    show(){
        let params={
            checkupOrderId:this.props.match.params.id
           }
           api.appointmentRecordDetail(params).then((data) => {
            if (tools.checkResult(data)) {
                this.setState({
                    appointmentRecordDetail:data.appointmentRecordDetail,
                    projectOperationList:data.projectOperationList,
                })
            } else {
                tools.toast.error(data.errMsg || '网络错误');
            }
        }, (reject) => {
            tools.toast.offline(reject);
        })
    }
  
    render(){
        let itme = this.state.appointmentRecordDetail
        return(
            <div className="content-right">
       
            <div className="main1">
                <div className="box2">
    
                    <div className="clearfix"></div>
                    <h3>预约记录详情</h3>
                    <div className="clearfix"></div>
                    <div>
                        <ul className="detailUl text-l two-span-style">
                            <li>
                                <label><span>保单号:</span><span>{itme.policyNo}</span></label>
                                <label><span>客户姓名:</span><span>{itme.personName}</span></label>
    
                            </li>
    
                             <li>
                                <label><span>预约人代号:</span><span>{itme.salesId}</span></label>
                                <label><span>体检时间:</span><span>{itme.checkupDate}</span></label>
                            </li> 
                           
     
                            <li>
                                <label><span>体检机构:</span><span>{itme.partyName}</span></label>
                                <label><span>状态:</span> <span> {
                        (()=>{
                            switch (itme.statusId) {
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
                         } </span> </label>
                                
                                
                            </li>
    
                            <li>
                                <label><span>地址:</span><span>{itme.partyAddress}</span></label>
                                <label><span>电话:</span><span>{itme.partyTel}</span></label>
                            </li>
    
                            <li>
                                <div style={{marginLeft:"14px"}}><span >体检项目:</span><span>{itme.checkupName}</span></div>
                            </li> 
    
                        </ul>
                    </div>
    
                    <div className="clearfix"></div>
    
                    
                </div>
                <div className="clear"></div>
    
            </div>
            <div className="clearfix"></div>
            <div className="main1"  id="myTab2_2Content0">
                <div className="box1 table-overflow m-b-2">
                    <table width="100%" border="0" className="table1">
                        <tbody>
                        <tr>
    
                            <th>序号</th>
                            <th>操作时间</th>
                            <th>操作者</th>
                            <th>内容</th>
                        </tr>
                        {
                            this.state.projectOperationList.map((itme,index)=>{
                                return(
                                   <tr key={index}>
                            <td>{index+1}</td>
                            <td>{itme.operationTime}</td>
                            <td>{itme.operationUser}</td>
                            <td>{itme.operationText}</td>
                            </tr>
                                )
                           
                            })
                        }

                        </tbody>
                    </table>
                </div>
    
    
            </div>
            <div className="clearfix"></div>
            <div className="btn-main m-t-4">
                <span><a onClick={()=>{window.history.back() }} className="button btn-color-red spec-colse-widbg">返回上一页</a></span>
            </div>
        </div>
        )
    }
    
    }
    
    export default reservationRecord