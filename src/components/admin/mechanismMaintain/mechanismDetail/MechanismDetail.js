/**
 * @Author:      jichuangwei
 * @DateTime:    2018-04-02 10:25:09
 * @Description: Description
 */
import React, { Component } from 'react';
import * as api from '../../../../config/api'
import * as tools from '../../../../config/tools'
import { withRouter } from 'react-router-dom';
import TimePicker from 'antd/lib/time-picker'
import moment from 'moment'
import './mechaismdetail.css'
const $ = window.$;
class MechanismDetail extends Component {
  constructor(args) {
    super();
    this.state = {
      tab:0,
      cityList: [],
      branchList:[],
      itemList:[],
      cityCode: '',
      partyName: '',
      branchName:'',
      partyTel: '',
      partyStatus: '',
      contactPerson: '',
      partyAddress: '',
      partyTrafficInfo: '',
      remarks: '',
      ambaginTime:'',
      amendTime:'',
      pmbaginTime:'',
      pmendTime:'',
      isTime:'',
      healthCheckupParty:{},
      ambaginTime_moment:null,
      healthItemRelationList:[],
      timeList:[],
      partyLogo:'',
      partyEmail:'',
      id:'',
      branchCode:''
    }
  }
  componentDidMount() {
    this.citySelect();
    this.show();
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
  projectSelect() {
    let parmas={
      branchCode:this.state.branchCode
    }
    api.checkupitemmst_selectallitems(parmas).then((data) => {
      if (tools.checkResult(data)) {
        this.setState({
          itemList: data.itemList,
        }, () => {
          $("input[name=choose_checkbox]").each((index, el)=>{
            let healthItemRelationList = this.state.healthItemRelationList;
            for (let i in healthItemRelationList) {
              if (healthItemRelationList[i].checkupItemId === Number(`${$(el).val()}`)) {
                $(el).attr("checked", true);
                break;
              }
            }
          });
        })
      } else {
        tools.toast.error(data.errMsg || '网络错误');
      }
    })
  }
  show() {
    let params = {
      id: this.props.match.params.id
    }
    this.setState({
      id:this.props.match.params.id
    })
    api.healthcheckupparty_selectone(params).then((data) => {
      if (tools.checkResult(data)) {
        let item = data.healthCheckupParty;
        for (let i in item) {
          item[i] = item[i] === null ? '' : item[i];
        }
        this.setState({
          partyName:  item.partyName,
          isTime:item.isTime,
          branchName: item.branchName,
          partyAddress:  item.partyAddress,
          cityCode:  item.cityCode,
          partyTel:  item.partyTel,
          partyTrafficInfo:  item.partyTrafficInfo,
          partyStatus:  item.partyStatus,
          contactPerson:  item.contactPerson,
          remarks: item.remarks,
          ambaginTime:  item.ambaginTime,
          ambaginTime_moment: item.ambaginTime === ""?null:moment(item.ambaginTime, 'HH:mm'),
          amendTime:  item.amendTime,
          amendTime_moment:  item.amendTime === ""?null:moment(item.amendTime, 'HH:mm'),
          pmbaginTime:  item.pmbaginTime,
          pmbaginTime_moment:  item.pmbaginTime === ""?null:moment(item.pmbaginTime, 'HH:mm'),
          pmendTime:  item.pmendTime,
          pmendTime_moment:  item.pmendTime === ""?null:moment(item.pmendTime, 'HH:mm'),
          partyEmail:item.partyEmail?item.partyEmail:'',
          healthItemRelationList: data.healthItemRelationList,
          timeList:data.partySchedulingInfoList,
          partyLogo:data.partyLogo?'data:image/'+item.imageType+';base64,'+data.partyLogo:null,
          branchCode:item.branchCode
        },()=>{
          this.projectSelect(); 
        })
      } else {
        tools.toast.error(data.errMsg || '网络错误');
      }
    })
  }
  changeTab(tab) {
    this.setState({
      tab
    })
  }
  range(start, end) {
    let result = [];
    for (let i = start; i < end; i++) {
      result.push(i);
    }
    return result;
  }
  disabledHoursAM() {
    let hours = this.range(0, 24);
    hours.splice(0, 13);
    return hours;
  }
  disabledHoursPM() {
    let hours = this.range(0, 24);
    hours.splice(13, 13);
    return hours;
  }
  goedit(id){
    this.props.history.push(`/admin/editMechanism/${id}`)
  }
  render() {
    let cityName = '';
    let cityList = this.state.cityList;
    for(let i in cityList){
      if(this.state.cityCode === cityList[i].cityCode){
        cityName = cityList[i].cityName;
        break;
      }
    }
    let branchName = '';
    let branchList = this.state.branchList;
    for(let i in branchList){
      if(this.state.branchCode === branchList[i].branchCode){
        branchName = branchList[i].branchName;
        break;
      }
    }
    return (
      <div className="detail content-right" >

        <div className="main1 mechaismdetail">
        <div className="box2">
        <div>

        <label className="fl">分公司: {this.state.branchName}</label>

        <label className="fl" style={{marginLeft:'49px'}}>城市: {cityName}</label>

        <label className="fl" style={{marginLeft:'41px'}}>体检机构: {this.state.partyName}</label>

        </div>
        <div className="clearfix" />

        <div>
        <label className="fl">机构状态: {this.state.partyStatus === '1'?'开放':'暂停'}</label>

        <label className="fl" style={{marginLeft:'132px'}}>有无时间选择: {this.state.isTime === '1'?'有':'无'}</label>

        <label className="fl">机构地址: {this.state.partyAddress}</label>
      
        </div>

        <div className="clearfix" />
        <div>
        <label className="fl">联系人: {this.state.contactPerson}</label>
      
      
        </div>
        <div className="clearfix" />
   <div>
   <label className="fl">交通: {this.state.partyTrafficInfo}</label>
     </div>     
     <div className="clearfix" />
<div>
<label className="fl">电话: {this.state.partyTel}</label>
</div>
<div className="clearfix" />
        <div>
        <label className="fl ">机构邮箱:{this.state.partyEmail}</label>
        </div>
        <div className="clearfix" />


        <div className="clearfix" />
        <div>
        <label className="fl">工作时间: </label>
        <span className="m-r-2">上午: </span>
        {this.state.ambaginTime}
        <span> ~ </span>
        {this.state.amendTime}

        <span className="m-r-2 m-l-2">下午: </span>
        {this.state.pmbaginTime}
        <span> ~ </span>
        {this.state.pmendTime}

        </div>

        <div className="clearfix" />
        <div>
        <label className="fl">备注: {this.state.remarks}</label>
        </div>
        <div className="clearfix" /> 

        <div>
        <label className="fl">机构图片:</label>
        {
          this.state.partyLogo!=null?<img id="partyImage" src={this.state.partyLogo}/>:<span>无图片</span>
        }
        </div>
        <div className="clearfix" />


        </div>
        <div className="clear" />
        </div>
        
       

        <div className="main1">
          <div className="title-modify-time">
          <label>可预约时间明细</label>
          </div>
          <div className="box1 table-overflow m-b-2" style={{height:"300px"}}>
            <table width="100%" border={0} className="table1">
              <tbody>
                <tr>
                  <th>序号</th>
                  <th>可预约时间</th>
                  <th>时间</th>
                  <th>名额</th>
                  <th>备注</th>
                </tr>
                {this.state.timeList.map((item,index)=>{
                  return(
                        <tr className='time-tr' key={index} >
                          <td>{index}</td>
                          <td>{tools.format(item.schedulingDate,'y-m-d')}</td>
                          <td>{item.schedulingPeriod}</td>
                          <td>{item.orderPeronCnt}</td>
                          <td>{item.remarks}</td>
                        </tr>
                        )
                })}


              </tbody>
            </table>
          </div>
        </div>
  

<div className="main1">
  <ul id="myTab2" className="ls_index">
    <li className={this.state.tab === 0 ? "active" : "normal"} onClick={() => this.changeTab(0)}><span className="ico_none">体检项目</span></li>
  </ul>
  <div className="clear" />
</div>



        <div style={{display:this.state.tab === 0?'block':'none'}} className="main1">
            <div className="box1 table-overflow m-b-2">
                <table width="100%" border="0" className="table1">
                    <tbody>
                    <tr>
                        <th>名称</th>
                        <th>费用</th>
                    </tr>
                    {this.state.healthItemRelationList.map((item,index)=>{
                      let itemList = this.state.itemList;
                      let checkupItemName='';
                      for(let i in itemList){
                        if(itemList[i].checkupItemId === item.checkupItemId){
                          checkupItemName = itemList[i].checkupItemName;
                        }
                      }
                      return(
                          <tr key={index}>
                              <td>{checkupItemName}</td>
                              <td>{item.cost}</td>
                          </tr>
                        )
                    })}
                    </tbody>
                </table>
            </div>
        </div>




        <div className="main1">
            <div className="btn-main add-btn">
              <span><a onClick={()=>this.goedit(this.state.id)} className="button btn-color-red">修改</a></span>
              <span><a onClick={()=>{window.history.back()}} className="button btn-color-red">返 回</a></span>
            </div>
        </div>

    </div>

    );
  }
}

export default withRouter(MechanismDetail);