import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as api from '../../config/api'
import * as tools from '../../config/tools'
class CancelDetail extends Component {
  constructor(args) {
    super()
    this.state = {
      HealthCheckupOrder: {
        checkupPerson: '',
        healthCheckupParty: ''
      },
      cityList: [],
      branchList: []
    }
  }
  componentDidMount() {
    let params = {
      id : this.props.match.params.id
    }
    api.canceltohospitadetails(params).then((data) => {
      if (tools.checkResult(data)) {
        this.setState({
          HealthCheckupOrder:data.HealthCheckupOrder
        },()=>{
          this.citySelect();
        })
      } else {
        tools.toast.error(data.errMsg || '网络错误');
      }
    }, (err) => {
      tools.toast.offline(err);
    })
  }
  citySelect() {
    api.monthlyselect().then((data) => {
      if (tools.checkResult(data)) {
        this.setState({
          cityList: data.cityList,
          branchList:data.branchList
        })
      } else {
        tools.toast.error(data.errMsg || '网络错误');
      }
    })
  }
  render() {
    let item = this.state.HealthCheckupOrder;
    let cityName = '';
    let cityList = this.state.cityList;
    for(let i in cityList){
      if(item.cityCode === cityList[i].cityCode){
        cityName = cityList[i].cityName;
        break;
      }
    }
    let branchName = '';
    let branchList = this.state.branchList;
    for(let i in branchList){
      if(item.branchCode === branchList[i].branchCode){
        branchName = branchList[i].branchName;
        break;
      }
    }
    return (
       <div className="content-right">
         <div className="main1">
           <div className="box2">
             <div className="clearfix" />
             <h3>取消体检记录详情</h3>
             <div className="clearfix" />
             <div>
               <ul className="detailUl text-l">
                 <li>
                   <label><span>保单号:</span><span>{item.policyNo}</span></label>
                   <label><span>客户姓名:</span><span>{item.checkupPerson.personName}</span></label>
                 </li>
                 <li>
                   <label><span>预约人代号:</span><span>{item.salesId}</span></label>
                   <label><span>体检时间:</span><span>{item.checkupDate}</span></label>
                 </li>
                 <li>
                   <label><span>体检机构:</span><span>{branchName}</span><span>{cityName}</span>
                   <span>{item.healthCheckupParty.partyName}</span></label>
                  
                 </li>
                 <li>
                   <label><span>修改时间:</span><span>{item.updateTime}</span></label>
                   <label><span>状态:</span>
                   <span>
                   {(() => {
                       switch (item.statusId) {
                       case '01':
                           return ('待预约');
                       case '02':
                           return ('已预约');
                       case '03':
                           return ('取消预约');
                       case '04':
                           return ('已发医院');
                       case '05':
                           return ('已逾期');
                       case '06':
                           return ('已体检');
                       case '07':
                           return ('报告回齐');
                       case '08':
                           return ('取消体检');
                       default:
                           return ('其他')
                       }
                   })()}
                   </span></label>
                 </li>
               </ul>
             </div>
             <div className="clearfix" />
             <div className="btn-main m-t-3">
               <span><Link to='/appointmentManage/tab/1' className="button btn-color-red">返回上一页</Link></span>
             </div>
           </div>
           <div className="clear" />
         </div>
       </div>
    );
  }
}

export default CancelDetail;
