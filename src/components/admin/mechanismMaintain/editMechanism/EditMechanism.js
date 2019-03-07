/**
 * @Author:      jichuangwei
 * @DateTime:    2018-03-28 16:31:52
 * @Description: Description
 */
import React, { Component } from 'react';
import * as api from '../../../../config/api'
import * as tools from '../../../../config/tools'
import { withRouter } from 'react-router-dom';
import TimePicker from 'antd/lib/time-picker'
import DatePicker from 'antd/lib/date-picker';
import moment from 'moment';
import message from 'antd/lib/message';
const $ = window.$;
class EditMechanism extends Component {
  constructor(args) {
    super();
    this.state = {
      tab:0,
      cityList: [],
      branchList:[],
      itemList:[],
      cityCode: '',
      branchCode:'',
      partyName: '',
      branchName:'',
      partyTel: '',
      partyStatus: '',
      contactPerson: '',
      partyAddress: '',
      partyTrafficInfo: '',
      remarks: '',
      ambaginTime:'08:00',
      amendTime:'12:00',
      pmbaginTime:'13:00',
      pmendTime:'18:00',
      isTime:'',
      healthCheckupParty:{},
      ambaginTime_moment:moment('08:00','HH:mm'),
      amendTime_moment:moment('12:00','HH:mm'),
      pmbaginTime_moment:moment('13:00','HH:mm'),
      pmendTime_moment:moment('18:00','HH:mm'),
      healthItemRelationList:[],

      actionType:'add',
      editIndex:'',
      timeNumber: 0,
      schedulingDate: '',
      schedulingPeriod: '',
      schedulingDate_moment: null,
      schedulingPeriod_moment: null,
      orderPeronCnt: '',
      time_remarks: '',
      timeList:[],
      emailList:[],
      partyEmail:'',
      partyLogo:'',
      hosHead:'',
      flag:1,
    }
  }
  edit() {
    let checkupItemId = ''
    $('input[name="choose_checkbox"]:checked').each(function(index, el) {
      checkupItemId += `${$(el).val()},`
    });
    let editId = '' , editCost = '' , editCheckupItemId = '';
    $('#editCost').find('input').each(function(index, el) {
      editCheckupItemId += `${$(el).next().text()},`
      editId += `${$(el).prev().text()},`
      editCost += `${$(el).val()},`
    });
    let timeList = [];
    $('.time-tr').each(function(index, el) {
      timeList.push({
        schedulingDate: $(el).find('td').eq(1).text(),
        schedulingPeriod: $(el).find('td').eq(2).text(),
        orderPeronCnt: $(el).find('td').eq(3).text(),
        remarks: $(el).find('td').eq(4).text()
      })
    });

    let partyEmail="";
    let value=""
    $('#email').find('input[name="checkbox"]').each(function(index, el) {
       value=$(el).val()
       partyEmail += `${$(el).val()},`
      });
      var myreg = /(\S)+[@]{1}(\S)+[.]{1}(\w)+/;
      if(value===""){
        message.error('请输入邮箱')
        return;
      }
      if(!myreg.test(value)){
        message.error('请输入格式正确的e-mail')
       return;
      }
    timeList = JSON.stringify(timeList);
    let params = {
      id: this.props.match.params.id,
      branchCode: this.state.branchCode,
      cityCode:  this.state.cityCode,
      partyName:  this.state.partyName,
      partyAddress:  this.state.partyAddress,
      partyTel:  this.state.partyTel,
      partyTrafficInfo:  this.state.partyTrafficInfo,
      partyStatus:  this.state.partyStatus,
      contactPerson:  this.state.contactPerson,
      AMbaginTime:  this.state.ambaginTime,
      AMendTime:  this.state.amendTime,
      PMbaginTime:  this.state.pmbaginTime,
      PMendTime:  this.state.pmendTime,
      isTime:this.state.isTime,
      partyEmail,
      timeList
    }
    for (let i in params) {
      if (!params[i]&&i != "partyTrafficInfo"&&i!="AMbaginTime"&&i!="AMendTime"&&i!="PMbaginTime"&&i!="PMendTime"&&i!="partyEmail") {
        message.error(`请填写完整(${tools.messageText(i)})`);
        return;
      }
    }
  
    // let myreg = /(\S)+[@]{1}(\S)+[.]{1}(\w)+/;
    // if(!myreg.test(this.state.partyEmail)){
    //   message.error('请输入格式正确的e-mail')
    //   return;
    // }
    params.flag = this.state.flag,
    params.hosHead = this.state.hosHead,
    params.remarks = this.state.remarks;
    params.checkupItemId = checkupItemId;
    params.editId = editId;
    params.editCheckupItemId = editCheckupItemId;
    params.editCost = editCost;
    let formData = new FormData();
    for (let i in params) {
      formData.append(i,params[i])
    }
      api.healthcheckupparty_update(formData).then((data) => {
        if (tools.checkResult(data)) {
          this.props.history.push(`/admin/mechanismMaintain`)
        } else {
          tools.toast.error(data.errMsg || '网络错误');
        }
      })
     
     
    
  }
  componentDidMount() {
    this.show();
  }
  citySelect() {
    api.monthlyselect().then((data) => {
      if (tools.checkResult(data)) {
        this.setState({
          cityList: data.cityList,
          branchList:data.branchList
        },()=>{
          this.changeBranch(this.state.branchCode);
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
    api.healthcheckupparty_selectone(params).then((data) => {
      if (tools.checkResult(data)) {
        let item = data.healthCheckupParty;
        for (let i in item) {
          item[i] = item[i] === null ? '' : item[i];
        }
        this.setState({
          branchName: item.branchName,
          partyName:  item.partyName,
          branchCode: item.branchCode,
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
          isTime: item.isTime || '',
          healthItemRelationList: data.healthItemRelationList,
          timeList:data.partySchedulingInfoList,
          emailList:data.emailList,
          partyEmail:item.partyEmail||'',
          partyLogo:data.partyLogo?'data:image/'+item.imageType+';base64,'+data.partyLogo:null,
         
        },()=>{
          
          this.cleanIndex();
          this.citySelect();
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
  chooseAll(e) {
    $("input[name=choose_checkbox]").attr("checked", e.target.checked);
  }
  chooseFile(e){
    $('#file_text').val(e.target.value);
    $('#partyImage').attr('src',URL.createObjectURL(e.target.files[0]));
    this.setState({
      flag:0,
      hosHead:e.target.files[0]
    })
  }
  disabledDate(current) {
    // Can not select days before today and today
    return current && current < moment().endOf('day');
  }
  changeDate(value, mode) {
    this.setState({
      chooseDate:value,
      checkupDate: mode
    })
  }
  delTime(e) {
    let index = $(e.target).parent().siblings(":first").text();
    $('.time-tr').eq(index).remove();
    this.cleanIndex();
  }
  cleanIndex(){
    $('.time-tr').each(function(index, el) {
      $(el).find('td').first().text(index);
    });
  }
  clearInput() {
    this.setState({
      schedulingDate: '',
      schedulingPeriod: '',
      schedulingDate_moment: null,
      schedulingPeriod_moment: null,
      orderPeronCnt: '',
      time_remarks: ''
    })
  }
  addTime(){
    this.setState({
      timeNumber: this.state.timeNumber + 1,
    },()=>{
      this.cleanIndex();
      let td_list = $('.time-tr').last().find('td');
      td_list.eq(1).text(this.state.schedulingDate);
      td_list.eq(2).text(this.state.schedulingPeriod);
      td_list.eq(3).text(this.state.orderPeronCnt);
      td_list.eq(4).text(this.state.time_remarks);
      $('.reveal-modal').trigger('reveal:close');
      this.clearInput();
    })
  }
  pushEditData(e) {
    let index = $(e.target).parent().siblings(":first").text();
    let td_list = $('.time-tr').eq(index).find('td');
    this.setState({
      schedulingDate: td_list.eq(1).text(),
      schedulingPeriod: td_list.eq(2).text(),
      schedulingDate_moment: moment(td_list.eq(1).text(), 'YYYY-MM-DD'),
      schedulingPeriod_moment: moment(td_list.eq(2).text(), 'HH:mm'),
      orderPeronCnt: td_list.eq(3).text(),
      time_remarks: td_list.eq(4).text(),
      actionType: 'edit',
      editIndex:index
    }, () => {
      $("#timeModal").reveal("{data-animation:'none'}");
    })
  }
  editTime() {
    let td_list = $('.time-tr').eq(this.state.editIndex).find('td');
    td_list.eq(1).text(this.state.schedulingDate);
    td_list.eq(2).text(this.state.schedulingPeriod);
    td_list.eq(3).text(this.state.orderPeronCnt);
    td_list.eq(4).text(this.state.time_remarks);
    $('.reveal-modal').trigger('reveal:close');
    this.clearInput();
  }
  checkData() {
    if (this.state.schedulingDate === '') {
      return 'schedulingDate'
    }
    if (this.state.schedulingPeriod === '') {
      return 'schedulingPeriod'
    }
    if (this.state.orderPeronCnt === '') {
      return 'orderPeronCnt'
    }
    return 'true';
  }
  ok(){
    let result = this.checkData();
    if(result !== 'true'){
      message.error(`请填写完整(${tools.messageText(result)})`);
      return;
    }
    if(this.state.actionType === 'add'){
      this.addTime();
    }else{
      this.editTime();
    }
  }
  changeBranch(branchCode) {
    let branchList = this.state.branchList;
    let provinceCode;
    for (let i in branchList) {
      if (branchList[i].branchCode === branchCode) {
        provinceCode = branchList[i].provinceCode;
        break;
      }
    }
    this.setState({
      provinceCode,
      branchCode
    },()=>{
      this.projectSelect();
    })
  }
  appendEmail(){
    $("#email").append('<input type="text" className="tl fl width20" style="margin-left: 10px;" name="checkbox"/>')
  }
//   removeEmail(){
// $("#email").children().siblings('input').each(function(index,el){
//   console.log(index)
//     $(this)[index].remove('input')
//     })
//   }
  render() {
    let resultCityList = [];
    let cityList = this.state.cityList;
    let branchList = this.state.branchList;
    for (let i in cityList) {
      if (this.state.provinceCode === cityList[i].provinceCode) {
        resultCityList.push(cityList[i])
      }
    }
    return (
      <div className="content-right" >

        <div className="main1">
        <div className="box2">
        <div>


         <label className="fl required">分公司</label>
         <select value={this.state.branchCode} onChange={(e) => this.changeBranch(e.target.value)} className="fl-none fl width15" >
         <option value="">请选择</option>
         {this.state.branchList.map((item, index) => {
          return (
              <option key={index} value={item.branchCode}>{item.branchName}</option>
          )
        })}
         </select>


         <label className="fl required" style={{marginLeft:"71px"}}>城市</label>
         <select value={this.state.cityCode} onChange={(e) => {this.setState({cityCode: e.target.value})}} className="fl-none fl width15" >
         <option value="">请选择</option>
         {resultCityList.map((item, index) => {
          return (
              <option key={index} value={item.cityCode}>{item.cityName}</option>
          )
         })}
         </select>

         <label className="fl required" style={{marginLeft:"108px"}}>体检机构</label>
         <input value={this.state.partyName} onChange={(e)=>{this.setState({partyName:e.target.value})}} type="text" className="tl fl width20" data-input-clear={5} />



        </div>
        <div className="clearfix" />

        <div>
        <label className="fl required">机构状态</label>
        <p className="tl fl width20 modify" data-input-clear={5}>
        <input value="1"  checked={this.state.partyStatus === '1'} onChange={(e)=>{this.setState({partyStatus:e.target.value})}} type="radio"/>开放
        <input value="0"  checked={this.state.partyStatus === '0'} onChange={(e)=>{this.setState({partyStatus:e.target.value})}} type="radio"/>暂停</p>

        <label className="fl required">有无时间选择</label>
        <p className="tl fl width20 modify" data-input-clear={5}>
        <input value="1"  checked={this.state.isTime === '1'} onChange={(e)=>{this.setState({isTime:e.target.value})}} type="radio"/>有
        <input value="0"  checked={this.state.isTime === '0'} onChange={(e)=>{this.setState({isTime:e.target.value,timeNumber:0})}} type="radio"/>无</p>
        <label className="fl required">机构地址</label>
        <input value={this.state.partyAddress} onChange={(e)=>{this.setState({partyAddress:e.target.value})}} type="text" className="tl fl width20" data-input-clear={5} />
         <div className="clearfix" />

        <label className="fl required">联系人</label>
        <input value={this.state.contactPerson} onChange={(e)=>{this.setState({contactPerson:e.target.value})}} type="text" className="tl fl width20" data-input-clear={5} />

        <label className="fl required" style={{marginLeft:"17px"}}>电话</label>
        <input value={this.state.partyTel} onChange={(e)=>{this.setState({partyTel:e.target.value})}} type="text" className="tl fl width20" data-input-clear={5}/>

        <label className="fl" style={{marginLeft:"54px"}}>交通</label>
        <input value={this.state.partyTrafficInfo} onChange={(e)=>{this.setState({partyTrafficInfo:e.target.value})}} type="text" className="tl fl width20" data-input-clear={5} />
        </div>
        <div className="clearfix" />
        <div>
        <div  id="email"  style={{display:"inline"}}>
        <label className="fl required">机构邮箱</label>
        {this.state.emailList.map((partyEmail,index)=>{
                  return(
                    <input defaultValue={partyEmail}  type="text" className="tl fl width20" data-input-clear={5} name="checkbox" />
                        )
                })} 
        </div>
        <span onClick={()=>{this.appendEmail()}} className="uploadingImg">添加邮箱</span>
        {/* <span class="link"  onClick={()=>{this.removeEmail()}}>删除</span> */}
        </div>
        <div className="clearfix" />
        
        
        <div className="clearfix" />

        <div>
        <label className="fl">机构图片</label>
        <input accept="image/*" onChange={(e)=>this.chooseFile(e)} type="file" hidden id='mechanism_image' className="tl fl" data-input-clear={5} />
        <input disabled id="file_text" className="tl fl width40" type="text" hidden />
       {
         this.state.partyLogo!=null?<img id="partyImage" src={this.state.partyLogo}/>:null
       } 
        <a onClick={()=>{$('#mechanism_image').click()}} className="uploadingImg">选择</a>
        </div>

        <div className="clearfix" />
        <div>
        <label className="fl">工作时间</label>
        <span className="m-r-2">上午 </span>
        <TimePicker value={this.state.ambaginTime_moment} onChange={(value,string)=>{this.setState({ambaginTime_moment:value,ambaginTime:string})}} placeholder='' format='HH:mm' disabledHours={this.disabledHoursAM.bind(this)} />
        <span> ~ </span>
        <TimePicker value={this.state.amendTime_moment} onChange={(value,string)=>{this.setState({amendTime_moment:value,amendTime:string})}} placeholder='' format='HH:mm' disabledHours={this.disabledHoursAM.bind(this)}   />

        <span className="m-r-2 m-l-2">下午 </span>
        <TimePicker  value={this.state.pmbaginTime_moment} onChange={(value,string)=>{this.setState({pmbaginTime_moment:value,pmbaginTime:string})}} placeholder='' format='HH:mm' disabledHours={this.disabledHoursPM.bind(this)} />
        <span> ~ </span>
        <TimePicker  value={this.state.pmendTime_moment} onChange={(value,string)=>{this.setState({pmendTime_moment:value,pmendTime:string})}} placeholder='' format='HH:mm' disabledHours={this.disabledHoursPM.bind(this)} />

        </div>


        <div className="clearfix" />
        <div>
        <label className="fl">备注:</label>
        <textarea value={this.state.remarks} onChange={(e)=>{this.setState({remarks:e.target.value})}} className="tl fl width70" id="textarea" rows={5} />
        </div>
        </div>
        <div className="clear" />
        </div>

        {this.state.isTime==='1'?
      <div className="main1">
          <div className="title-modify-time"><label>可预约时间明细</label>
          <span><a data-reveal-id="timeModal" onClick={()=>{this.clearInput();this.setState({actionType:'add'})}} >+添加时间</a></span>
          </div>
          <div className="box1 table-overflow m-b-2">
            <table width="100%" border={0} className="table1">
              <tbody>
                <tr>
                  <th>序号</th>
                  <th>可预约体检日期</th>
                  <th>时间</th>
                  <th>名额</th>
                  <th>备注</th>
                  <th>操作</th>
                </tr>

                {this.state.timeList.map((item,index)=>{
                  return(
                        <tr className='time-tr' key={index} >
                          <td>{index}</td>
                          <td>{tools.format(item.schedulingDate,'y-m-d')}</td>
                          <td>{item.schedulingPeriod}</td>
                          <td>{item.orderPeronCnt}</td>
                          <td>{item.remarks}</td>
                          <td>
                              <a onClick={(e)=>this.pushEditData(e)} >修改</a>
                              <a onClick={(e)=>this.delTime(e)} >删除</a>
                          </td>
                        </tr>
                        )
                })}


                {tools.getObject(this.state.timeNumber).map((item,index)=>{
                  return(
                        <tr className='time-tr' key={index} >
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td>
                              <a onClick={(e)=>this.pushEditData(e)} >修改</a>
                              <a onClick={(e)=>this.delTime(e)} >删除</a>
                          </td>
                        </tr>
                    )
                })}

              </tbody>
            </table>
          </div>
        </div>:null}
        
  

<div className="main1">
  <ul id="myTab2" className="ls_index">
    <li className={this.state.tab === 0 ? "active" : "normal"} onClick={() => this.changeTab(0)}><span className="ico_none">体检项目编辑</span></li>
    <li className={this.state.tab === 1 ? "active" : "normal"} onClick={() => this.changeTab(1)}><span className="ico_none">体检项目费用</span></li>
  </ul>
  <div className="clear" />
</div>



        <div style={{display:this.state.tab === 0?'block':'none'}} className="main1">
            <div className="box1 table-overflow m-b-2">
                <table width="100%" border="0" className="table1">
                    <tbody>
                    <tr>
                        <th><input onChange={(e)=>this.chooseAll(e)} type="checkbox"/>全选</th>
                        <th>名称</th>
                        <th>费用</th>
                    </tr>
                    {this.state.itemList.map((item,index)=>{
                      return(
                          <tr key={index}>
                              <td><input value={item.checkupItemId} name="choose_checkbox" type="checkbox"/></td>
                              <td>{item.checkupItemName}</td>
                              <td>{item.cost}</td>
                          </tr>
                        )
                    })}
                    </tbody>
                </table>
            </div>
        </div>

        <div style={{display:this.state.tab === 1?'block':'none'}} id='editCost' className="main1">
            <div className="box1 table-overflow m-b-2">
                <table width="100%" border="0" className="table1">
                    <tbody>
                    <tr>
                        <th>名称</th>
                        <th>费用</th>
                    </tr>
                    {this.state.healthItemRelationList.map((item,index)=>{
                      let itemList = this.state.itemList;
                      let checkupItemName;
                      for(let i in itemList){
                        if(itemList[i].checkupItemId === item.checkupItemId){
                          checkupItemName = itemList[i].checkupItemName;
                        }
                      }
                      return(
                          <tr key={index}>
                              <td>{checkupItemName}</td>
                              <td>
                              <div hidden >{item.id}</div>
                              <input type='number' defaultValue={item.cost} />
                               <div hidden >{item.checkupItemId}</div>
                              </td>
                          </tr>
                        )
                    })}
                    </tbody>
                </table>
            </div>
        </div>


        <div className="main1">
            <div className="btn-main add-btn">
              <span><a onClick={()=>this.edit()} className="button btn-color-red">保 存</a></span>
              &nbsp;&nbsp;
              <span><a onClick={()=>{window.history.back()}} className="button">取 消</a></span>
            </div>
        </div>

<div id="timeModal" className="reveal-modal">
  <h1>{this.state.actionType === 'add'?'添加':'修改'}时间</h1>
  <div className="main">

    <div className="edit-time">
        <label className="fl required">可预约体检日期 </label>
        <DatePicker 
        showToday={false}
        format='YYYY-MM-DD'
        disabledDate={this.disabledDate}
        onChange={(value,string)=>{this.setState({schedulingDate_moment:value,schedulingDate:string})}}
        value={this.state.schedulingDate_moment}
        />
    </div>


    <div className="edit-time">
        <label className="fl required">时间 </label>
        <TimePicker value={this.state.schedulingPeriod_moment} onChange={(value,string)=>{this.setState({schedulingPeriod_moment:value,schedulingPeriod:string})}} placeholder='' format='HH:mm'/>
    </div>


    <div className="edit-time">
      <label className="fl required">名额 </label>
      <input type="number" value={this.state.orderPeronCnt} onChange={(e)=>{this.setState({orderPeronCnt:e.target.value})}} className="tl fl width30" data-input-clear={5} />
    </div>


    <div className="edit-time">
      <label className="fl">备注 </label>
      <textarea value={this.state.time_remarks} onChange={(e)=>{this.setState({time_remarks:e.target.value})}} className="tl fl width70" id="textarea" rows={5}/>
    </div>



    <div className="btn-main m-t-2">
      <span><a className="button btn-color-red" onClick={()=>this.ok()} >确 定</a></span>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <span><a className="button" onClick={() => {$('.reveal-modal').trigger('reveal:close');}}>取 消</a></span>
    </div>
  </div>
  <a className="close-reveal-modal">×</a>
</div>

    </div>

    );
  }
}

export default withRouter(EditMechanism);