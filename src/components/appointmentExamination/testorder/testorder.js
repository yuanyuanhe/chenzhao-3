import React, { Component } from 'react';
import * as api from '../../../config/api.js'
import * as tools from '../../../config/tools'
import img1 from '../../../style/images/titlepng.jpg'
import DatePicker from 'antd/lib/date-picker'; 
import moment from 'moment'; 
import  TimePicker  from 'antd/lib/time-picker';
import message from 'antd/lib/message';
const { RangePicker } = DatePicker;
const format = 'HH:mm';


class Testorder extends Component{

	constructor(props) {
        super(props)
        this.state = {
             testtype:this.props.match.params.orderType,//保险类型
                branchList:[],//公司集合
                cityinfomstList:[],//城市集合
                partyList:[],//机构集合
                certiTypeList:[],//身份类型集合
                channelList:[],//渠道集合
                policyNo: "",//保单号
                salesId: "",//营销员代码
                personName: "",//体检人姓名
                salesTel: "",//营销员电话
                id: "",//分公司code
                cityCode: "",//城市code
                healthchkPartyId: "",//医院code
                checkupDate: "",//体检时间
                certiType: "",//证件类型
                certiCode: "",//证件号码
                salesChannelCode: "",//渠道code
                isOtherCityCheckup: "0",//是否异地体检
                timeString:'',
                dateString:'',
                schedulingListAll:[],
                timelist:[],
                people:'',
                powercode:'',
                role:'',//权限
                party:{},//医院信息
    			orderId:''	 
        }
    }
    componentDidMount() {
    	this.select()
        if(this.props.location.query){
            this.setState({
                orderId:this.props.location.query.id
            })
        this.show()
    }
    }
     componentWillMount() {
      if(localStorage.getItem('powercode')){
           this.setState({
            powercode:localStorage.getItem('powercode')
           })
        }
    }
    show(){
        let params ={
            id:this.props.location.query.id
        }
        api.detailorderParticulars(params).then((data)=>{
            console.log(data)
            if (tools.checkResult(data)) {
            this.setState({
               //detail:data.health,
               personName:data.health.personName,
               policyNo:data.health.policyNo,
               salesId:data.health.salesId,
               salesTel:data.health.salesTel,
            })
        }
        })
    
    }
   alone(e){
        this.setState({
            testtype:e.target.value,
            policyNo: "",//保单号
                salesId: "",//营销员代码
                personName: "",//体检人姓名
                salesTel: "",//营销员电话
                id: "",//分公司code
                cityCode: "",//城市code
                healthchkPartyId: "",//医院code
                checkupDate: "",//体检时间
                certiType: "",//证件类型
                certiCode: "",//证件号码
                salesChannelCode: "",//渠道code
                isOtherCityCheckup: "0",//是否异地体检
                timeString:'',
                dateString:'',
            people:'',
            role:'',
        });
    }
    select(){
        let params={

        }
        api.healthorderOrder(params).then((data)=>{
            if (tools.checkResult(data)) {
                this.setState({
                   branchList:data.branchList,
                   cityinfomstList:data.cityinfomstList,
                   partyList:data.partyList,
                   certiTypeList:data.certiTypeList,
                   channelList:data.channelList
                })
            } else {
                tools.toast.error(data.errMsg || '网络错误');
            }
        }, (err) => {
          tools.toast.offline(err);
        })
    }
    changeData(date, dateString){
    	this.setState({
    		dateString:dateString
    	});
    }
    changeTime(time,timeString){
    	this.setState({
    		checkupDate:this.state.dateString+' '+timeString
    	});
    }
    disabledMinutes(){
    	// let arr=[]
    	// for(var i=1;i<60;i++){
    	// 	arr.push(i)
    	// }
    	// arr.splice(29,1)
    	// return arr
    }
    checkCode(code,len){
      return code.indexOf(" ")===-1&&code.length === len;
    }
    add(){
      // this.setState({
      //   checkupDate:this.state.dateString+' '+this.state.timeString
      // });
        if(this.state.testtype==='03'){
            if(!this.checkCode(this.state.policyNo,10)){
          message.error('请输入正确的十位保单号');
          return;
        }
        if(!this.checkCode(this.state.salesId,9)){
          message.error('请输入正确的九位营销员编号');
          return;
        }
        if(!this.state.personName){
          message.error('请输入体检人姓名');
          return;
        } 
        if(!this.checkCode(this.state.salesTel,11)){
          message.error('请输入正确的手机号');
          return;
        }
        if(!this.state.id){
          message.error('请选择分公司');
          return;
        } 
        if(!this.state.cityCode){
          message.error('请选择城市');
          return;
        } 
        if(!this.state.healthchkPartyId){
          message.error('请选择机构');
          return;
        }  
        if(!this.state.checkupDate&&tools.datatime(this.state.powercode)==false){
          message.error('请选择体检时间');
          return;
        }  
        
        }
        if(this.state.testtype==='01'){
            if(!this.checkCode(this.state.policyNo,10)){
          message.error('请输入正确的十位保单号');
          return;
        }
         if(!this.state.personName){
          message.error('请输入体检人姓名');
          return;
        } 
        if(!this.state.certiType){
          message.error('请选择证件类型');
          return;
        } 
        if(!this.state.certiCode){
          message.error('请输入正确的证件号码');
          return;
        }
        if(!this.state.id){
          message.error('请选择分公司');
          return;
        } 
        if(!this.state.cityCode){
          message.error('请选择城市');
          return;
        } 
        if(!this.state.healthchkPartyId){
          message.error('请选择机构');
          return;
        }
        if(!this.state.checkupDate&&tools.datatime(this.state.powercode)==false){
          message.error('请选择体检时间');
          return;
        }
        if(!this.checkCode(this.state.salesTel,11)){
          message.error('请输入正确的手机号');
          return;
        } 
        if(!this.state.salesChannelCode){
          message.error('请选择渠道');
          return;
        }
        }
        if(this.state.testtype==='02'){
          if(!this.state.personName){
          message.error('请输入体检人姓名');
          return;
        } 
          if(!this.state.certiType){
          message.error('请选择证件类型');
          return;
        } 
        if(!this.state.certiCode){
          message.error('请输入正确的证件号码');
          return;
        }
        if(!this.state.id){
          message.error('请选择分公司');
          return;
        } 
        if(!this.state.cityCode){
          message.error('请选择城市');
          return;
        } 
        if(!this.state.healthchkPartyId){
          message.error('请选择机构');
          return;
        }
         if(!this.state.checkupDate&&tools.datatime(this.state.powercode)==false){
          message.error('请选择体检时间');
          return;
        }
        if(!this.checkCode(this.state.salesTel,11)){
          message.error('请输入正确的手机号');
          return;
        } 
         if(!this.state.salesChannelCode){
          message.error('请选择渠道');
          return;
        }
        }
        
        setTimeout(()=>{
            let params={
                id:this.state.orderId,
                orderType:this.state.testtype,
                policyNo: this.state.policyNo,
                salesId: this.state.salesId,
                personName: this.state.personName,
                salesTel: this.state.salesTel,
                branchCode: this.state.id,
                cityCode: this.state.cityCode,
                healthchkPartyId: this.state.healthchkPartyId,
                checkupTime: this.state.checkupDate,
                certiType: this.state.certiType,
                certiCode: this.state.certiCode,
                salesChannelCode: this.state.salesChannelCode,
                isOtherCityCheckup: this.state.isOtherCityCheckup,
                role:this.state.role,
                statusId:'02',
        }
        api.xgyyupdate(params).then((data)=>{
            if (tools.checkResult(data)) {
                  tools.toast.success('预约成功')
                  this.props.history.push(`/appointmentExamination`)
            } else {
                tools.toast.error(data.errMsg);
            }
        }, (err) => {
          tools.toast.offline(err);
        })
        },0)
    }
    quxiao(){
      this.props.history.push(`/appointmentExamination`)
    }
    changeBranch(value) {
        let branchList = this.state.branchList;
        let id = '';
        value=tools.Trim(value)
        for (let i in branchList) {
            if (branchList[i].provinceCode === value) {
                //id = branchList[i].branchId;
                id = branchList[i].provinceCode;
                break;
            }
        }
        this.setState({
      schedulingListAll:[],
      timelist:[],
      people:'',
            cityCode:'',
            healthchkPartyId:'',
            id
        })
    }
    changeCity(cityCode){
        this.setState({
            cityCode,
            healthchkPartyId:''
        })
    }
    datatime(e){
            this.setState({
            schedulingListAll:[],
            timelist:[],
            people:'',
            healthchkPartyId:e.target.value,  
        },()=>{
          if(this.state.healthchkPartyId!=''){
          let params ={
         partyId:this.state.healthchkPartyId
      }
      api.selectPartyDetail(params).then((data)=>{
        if(tools.checkResult(data)){
          //console.log(data)
          this.setState({
            party:data.partyDetailList[0]?data.partyDetailList[0]:{}
          })
        }
      })
      }
        })
            
        let params={
             branchCode: this.state.id,
             healthChkPartyId:e.target.value
        }
        api.dataOrderTime(params).then((data)=>{
            if (tools.checkResult(data)) {
                this.setState({
                   schedulingListAll:data.schedulingListAll,
                })
            } else {
                tools.toast.error(data.errMsg);
            }
        }, (err) => {
          tools.toast.offline(err);
        }) 
        
    }
    riqi(e){
      
        if(e!=''){
          this.setState({
            timelist:[],
            people:'',
          })
          setTimeout(()=>{
             this.setState({
            timelist:this.state.schedulingListAll[e].timePList,
            dateString:this.state.schedulingListAll[e].date,
            })
          },10)
        }else{
          this.setState({
            timelist:[],
            people:'',
          })
        }
    }
    time(e){
         if(e!=''){
        this.setState({
            people:this.state.timelist[e].people,
            timeString:this.state.timelist[e].time,
            checkupDate:this.state.dateString+' '+this.state.timelist[e].time,
        }) 
      }else{
          this.setState({
            people:'',
          })
        }
    }
    quanxian(e){
      this.setState({
        role:'guabi',
        healthchkPartyId:e.target.value,
      },()=>{
        if(this.state.healthchkPartyId!=''){
        let params ={
         partyId:this.state.healthchkPartyId
      }
      api.selectPartyDetail(params).then((data)=>{
        if(tools.checkResult(data)){
         // console.log(data)
          this.setState({
            party:data.partyDetailList[0]
          })
        }
      })
    }
      })
    }
	render(){
		let resultCityList = [];
        let resultHospitalList = [];
        let cityinfomstList = this.state.cityinfomstList;
        let partyList = this.state.partyList;
        for(let i in cityinfomstList){
            if(this.state.id === cityinfomstList[i].provinceCode){
                resultCityList.push(cityinfomstList[i])
            }
        }

        for(let i in partyList){
            if(this.state.cityCode === partyList[i].cityCode){
                resultHospitalList.push(partyList[i])
            }
        }

        let gexian='0014,0015'
        let hebao='0013,0014,0015'
        let xztime='0014,0015'
		return(
              <div className="content-right">
              <div className="main1">
                <div className="box2">
                    <div className="clearfix"></div>
                    <h3>预约信息</h3>
                    <p className="slt-appment-ty">
                        {(() => {
                              switch (this.props.match.params.orderType) {
                              case '01':
                                  return <label><input type="radio" name='testtype' value='01' defaultChecked={true} onChange={(e)=>this.alone(e)} />团险预约</label>;
                              case '02':
                                  return <label><input type="radio" name='testtype' value='02' defaultChecked={true} onChange={(e)=>this.alone(e)} />预核保无保单预约</label>;
                              case '03':
                                  return  <label><input type="radio" name='testtype' value='03'  defaultChecked={true} onChange={(e)=>this.alone(e)} />个险预约</label>;
                              }
                          })()}
                    </p>

                    {this.state.testtype==='03'?
                    <div>
                    <div>
                        <label className="fl" >保单号<Xing/></label>
                        <input type="text" className="tl fl width20"  data-input-clear={5} onChange={(e)=>{this.setState({policyNo:tools.policyNoInput(e)})}} value={this.state.policyNo}/>
                        <label className="fl" >营销员代码<Xing/></label>
                        <input type="text" className="tl fl width20"  data-input-clear={5} onChange={(e)=>{this.setState({salesId:e.target.value})}} value={this.state.salesId}/>
                    </div>
                    <div className="clearfix"></div>
                    <div>
                        <label className="fl" >体检人姓名<Xing/></label>
                        <input type="text" className="tl fl width20" placeholder="" data-input-clear={5} onChange={(e)=>{this.setState({personName:e.target.value})}} value={this.state.personName}/>
                        <label className="fl" >营销员电话<Xing/></label>
                        <input type="text" className="tl fl width20" placeholder="" data-input-clear={5} onChange={(e)=>{this.setState({salesTel:e.target.value})}} value={this.state.salesTel}/>
                    </div>                  
                    <div className="clearfix"></div>
                    <div>
                        <label className="fl" >分公司<Xing/></label>

                        <select  onChange={(e)=>this.changeBranch(e.target.value)} value={this.state.provinceCode} className="fl-none fl width20" name="choose" >
                        <option value="" >请选择</option>
                        {this.state.branchList.map((item,index)=>{
                            return(
                                    <option key={index} value={item.provinceCode}>{item.branchName}</option>
                                )
                        })}
                        </select>
                        <label className="fl" >城市<Xing/></label>
                        
                       <select value={this.state.cityCode} onChange={(e)=>this.changeCity(e.target.value)} className="fl-none fl width15" >
                          <option value="">请选择</option>
                          {resultCityList.map((item,index)=>{
                            return(
                                <option key={index} value={item.cityCode}>{item.cityName}</option>
                                )
                          })}
                        </select>
                    {/* 权限不同时间选择不同*/}
                       {tools.datatime(this.state.powercode)?
                        <div><label className="fl" >医院<Xing/></label>
                        <select className="right-input fl-none fl width15" value={this.state.healthchkPartyId}  onChange={(e)=>this.quanxian(e)} >
                          <option value="">请选择</option>
                          {resultHospitalList.map((item,index)=>{
                            return(
                                <option  key={index} value={item.id}>{item.partyName}</option>
                                )
                          })}
                        </select></div>:
                      <div><label className="fl" >医院<Xing/></label>
                        <select className="right-input fl-none fl width15" value={this.state.healthchkPartyId} onChange={(e)=>this.datatime(e)}>
                        <option value="">请选择</option>
                        {resultHospitalList.map((item,index)=>{
                          return(
                            <option  key={index} value={item.id}>{item.partyName}</option>
                            )
                        })}
                      </select></div>}
                        <label className="fl"><a href="" data-reveal-id="operAtion">查看医院详情></a></label>
                    </div>
                    <div className="clearfix"></div>
                    <div>
                      {/* 权限不同选择范围不同*/}
                      {tools.datatime(this.state.powercode)?
                        <div> <label className="fl" >体检时间</label>
                        <DatePicker onChange={this.changeData.bind(this)} />
                        <TimePicker className='timestyle' onChange={this.changeTime.bind(this)} defaultOpenValue={moment('8:00','HH:mm')}  format={format}
                        disabledMinutes={this.disabledMinutes} /></div>
                       :
                    <div><label className="fl" >体检日期<Xing/></label>
                         <select className="right-input fl-none fl width15" 
                          onChange={(e)=>this.riqi(e.target.value)} >
                           <option value=''>请选择</option>
                         {this.state.schedulingListAll.map((item,index)=>{
                            return(
                            <option key={index} value={index}>{item.date}</option>
                            )
                         })}
                         }
                         </select>
                          <label className="fl" >体检时间<Xing/></label>
                         <select className="right-input fl-none fl width15"
                         onChange={(e)=>this.time(e.target.value)} >
                             <option value=''>请选择</option>
                        {this.state.timelist.map((item,index)=>{
                            return(
                            <option key={index} value={index}>{item.time}</option>
                            )
                         })}
                         }
                         </select>
                         <label className="fl" >剩余人数:</label>{this.state.people}</div>}
                     
                        

                        {/*<label className="fl" >体检时间</label>
                        <DatePicker onChange={this.changeData.bind(this)} />
                        
                        <TimePicker className='timestyle' onChange={this.changeTime.bind(this)} defaultOpenValue={moment('8:00','HH:mm')}  format={format}
                        disabledMinutes={this.disabledMinutes} />*/}
                        
                    </div>
                    </div>
                    :null}


                    {this.state.testtype==='01'?<div>
                        <div>
                            <label className="fl" >保单号<Xing/></label>
                            <input type="text" className="tl fl width20" placeholder="" data-input-clear={5} onChange={(e)=>{this.setState({policyNo:tools.policyNoInput(e)})}} value={this.state.policyNo} />
                            <label className="fl" >体检人姓名<Xing/></label>
                            <input type="text" className="tl fl width20" placeholder="" data-input-clear={5} onChange={(e)=>{this.setState({personName:e.target.value})}} value={this.state.personName}/>
                            
                        </div>
                        <div className="clearfix"></div>
                        <div>
                            <label className="fl" >证件类型<Xing/></label>
                            <select className="fl-none fl width20" name="choose" onChange={(e)=>{this.setState({certiType:e.target.value})}} >
                                <option value="请选择" >请选择</option>
                                {this.state.certiTypeList.map((item,index)=>{
                                    return(
                                          <option key={index} value={item.codeValue}>{item.codeName}</option>
                                        )
                                })}
                                
                            </select>
                            <label className="fl" >证件号码<Xing/></label>
                            <input type="text" className="tl fl width20" placeholder="" data-input-clear={5} onChange={(e)=>{this.setState({certiCode:e.target.value})}} />

                        </div>
                        <div className="clearfix"></div>
                        <div>
                           <label className="fl" >分公司<Xing/></label>

                        <select  onChange={(e)=>this.changeBranch(e.target.value)} value={this.state.provinceCode} className="fl-none fl width20" name="choose" >
                        <option value="" >请选择</option>
                        {this.state.branchList.map((item,index)=>{
                            return(
                                    <option key={index} value={item.provinceCode}>{item.branchName}</option>
                                )
                        })}
                        </select>
                        <label className="fl" >城市<Xing/></label>
                        
                       <select value={this.state.cityCode} onChange={(e)=>this.changeCity(e.target.value)} className="fl-none fl width15" >
                          <option value="">请选择</option>
                          {resultCityList.map((item,index)=>{
                            return(
                                <option key={index} value={item.cityCode}>{item.cityName}</option>
                                )
                          })}
                        </select>
                        {/* 权限不同时间选择不同*/}
                       {tools.datatime(this.state.powercode)?
                        <div><label className="fl" >医院<Xing/></label>
                        <select className="right-input fl-none fl width15" value={this.state.healthchkPartyId}  onChange={(e)=>this.quanxian(e)} >
                        <option value="">请选择</option>
                        {resultHospitalList.map((item,index)=>{
                          return(
                            <option  key={index} value={item.id}>{item.partyName}</option>
                            )
                        })}
                      </select></div>:
                      <div><label className="fl" >医院<Xing/></label>
                        <select className="right-input fl-none fl width15" value={this.state.healthchkPartyId}onChange={(e)=>this.datatime(e)}>
                        <option value="">请选择</option>
                        {resultHospitalList.map((item,index)=>{
                          return(
                            <option  key={index} value={item.id}>{item.partyName}</option>
                            )
                        })}
                      </select></div>}
                            <label className="fl"><a href="" data-reveal-id="operAtion">查看医院详情></a></label>
                        </div>
                        <div className="clearfix"></div>
                        <div>
                            {/* 权限不同选择范围不同*/}
                      {tools.datatime(this.state.powercode)?
                        <div> <label className="fl" >体检时间</label>
                        <DatePicker onChange={this.changeData.bind(this)} />
                        <TimePicker className='timestyle' onChange={this.changeTime.bind(this)} defaultOpenValue={moment('8:00','HH:mm')}  format={format}
                        disabledMinutes={this.disabledMinutes} /></div>
                       :
                    <div><label className="fl" >体检日期</label>
                         <select className="right-input fl-none fl width15" 
                          onChange={(e)=>this.riqi(e.target.value)}>
                           <option value='' >请选择</option>
                         {this.state.schedulingListAll.map((item,index)=>{
                            return(
                            <option key={index} value={index}>{item.date}</option>
                            )
                         })}
                         }
                         </select>
                          <label className="fl" >体检时间</label>
                         <select className="right-input fl-none fl width15"
                         onChange={(e)=>this.time(e.target.value)}>
                             <option value='' >请选择</option>
                        {this.state.timelist.map((item,index)=>{
                            return(
                            <option key={index} value={index}>{item.time}</option>
                            )
                         })}
                         }
                         </select>
                         <label className="fl" >剩余人数:</label>{this.state.people}</div>}
                        </div>
                        <div className="clearfix"></div>
                        <div>
                            <label className="fl" >营销员电话</label>
                            <input type="text" className="tl fl width20" placeholder="" data-input-clear={5} onChange={(e)=>this.setState({salesTel:e.target.value})} />
                            <label className="fl" >渠道<Xing/></label>

                            <select className="fl-none fl width20" name="choose" onChange={(e)=>{this.setState({salesChannelCode:e.target.value})}}>
                                <option value="" >请选择</option>
                                {this.state.channelList.map((item,index)=>{
                                return(
                                      <option key={index} value={item.codeValue}>{item.codeName}</option>
                                    )
                                 })}
                            </select>
                           <label className="fl" >
                                是否异地分公司体检<Xing/>: 否<input defaultChecked={true}
                                type="radio" value={0} name="ycompony" onChange={(e)=>{this.setState({isOtherCityCheckup:e.target.value})}} /> 是:<input type="radio" value={1} onChange={(e)=>{this.setState({isOtherCityCheckup:e.target.value})}} className="m-l-1" name="ycompony" />
                            </label>
                        </div>
                    </div>:null}
                    {this.state.testtype==='02'?<div>
                        <div>
                            <label className="fl" >体检人姓名<Xing/></label>
                            <input type="text" className="tl fl width20" placeholder="" data-input-clear={5} onChange={(e)=>{this.setState({personName:e.target.value})}} value={this.state.personName}/>
                            <label className="fl" >证件类型<Xing/></label>
                            <select className="fl-none fl width20" name="choose" onChange={(e)=>{this.setState({certiType:e.target.value})}}>
                                <option value="" >请选择</option>
                                {this.state.certiTypeList.map((item,index)=>{
                                    return(
                                          <option key={index} value={item.codeValue}>{item.codeName}</option>
                                        )
                                })} 
                            </select>
                            <label className="fl" >证件号码<Xing/></label>
                            <input type="text" className="tl fl width20" placeholder="证件号码" data-input-clear={5} onChange={(e)=>{this.setState({certiCode:e.target.value})}} />

                        </div>
                        <div className="clearfix"></div>
                        <div>

                            <label className="fl" >分公司<Xing/></label>

                        <select  onChange={(e)=>this.changeBranch(e.target.value)} value={this.state.provinceCode} className="fl-none fl width20" name="choose" >
                        <option value="" >请选择</option>
                        {this.state.branchList.map((item,index)=>{
                            return(
                                    <option key={index} value={item.provinceCode}>{item.branchName}</option>
                                )
                        })}
                        </select>
                        <label className="fl" >城市<Xing/></label>
                        
                       <select value={this.state.cityCode} onChange={(e)=>this.changeCity(e.target.value)} className="fl-none fl width15" >
                          <option value="">请选择</option>
                          {resultCityList.map((item,index)=>{
                            return(
                                <option key={index} value={item.cityCode}>{item.cityName}</option>
                                )
                          })}
                        </select>
                         {/* 权限不同时间选择不同*/}
                       {tools.datatime(this.state.powercode)?
                        <div><label className="fl" >医院<Xing/></label>
                        <select className="right-input fl-none fl width15" value={this.state.healthchkPartyId}  onChange={(e)=>this.quanxian(e)} >
                        <option value="">请选择</option>
                        {resultHospitalList.map((item,index)=>{
                          return(
                            <option  key={index} value={item.id}>{item.partyName}</option>
                            )
                        })}
                      </select></div>:
                      <div><label className="fl" >医院<Xing/></label>
                        <select className="right-input fl-none fl width15" value={this.state.healthchkPartyId}onChange={(e)=>this.datatime(e)}>
                        <option value="">请选择</option>
                        {resultHospitalList.map((item,index)=>{
                          return(
                            <option  key={index} value={item.id}>{item.partyName}</option>
                            )
                        })}
                      </select></div>}
                            <label className="fl"><a href="" data-reveal-id="operAtion">查看医院详情></a></label>

                        </div>
                        <div className="clearfix"></div>
                        <div>
 {/* 权限不同选择范围不同*/}
                      {tools.datatime(this.state.powercode)?
                        <div> <label className="fl" >体检时间</label>
                        <DatePicker onChange={this.changeData.bind(this)} />
                        <TimePicker className='timestyle' onChange={this.changeTime.bind(this)} defaultOpenValue={moment('8:00','HH:mm')}  format={format}
                        disabledMinutes={this.disabledMinutes} /></div>
                       :
                    <div><label className="fl" >体检日期<Xing/></label>
                         <select className="right-input fl-none fl width15" 
                          onChange={(e)=>this.riqi(e.target.value)}>
                           <option value=''>请选择</option>
                         {this.state.schedulingListAll.map((item,index)=>{
                            return(
                            <option key={index} value={index}>{item.date}</option>
                            )
                         })}
                         }
                         </select>
                          <label className="fl" >体检时间<Xing/></label>
                         <select className="right-input fl-none fl width15"
                         onChange={(e)=>this.time(e.target.value)}>
                             <option value=''>请选择</option>
                        {this.state.timelist.map((item,index)=>{
                            return(
                            <option key={index} value={index}>{item.time}</option>
                            )
                         })}
                         }
                         </select>
                         <label className="fl" >剩余人数:</label>{this.state.people}</div>}



                        </div>
                        <div className="clearfix"></div>
                        <div>
                            <label className="fl" >营销员电话</label>
                            <input type="text" className="tl fl width20" placeholder="" data-input-clear={5} onChange={(e)=>this.setState({salesTel:e.target.value})} />
                            <label className="fl" >渠道<Xing/></label>
                             <select className="fl-none fl width20" name="choose" onChange={(e)=>this.setState({salesChannelCode:e.target.value})}>
                                <option value="" >请选择</option>
                                {this.state.channelList.map((item,index)=>{
                                return(
                                      <option key={index} value={item.codeValue} >{item.codeName}</option>
                                    )
                                 })}
                            </select>

                            <label className="fl" >
                                是否异地分公司体检<Xing/>: 否<input defaultChecked={true} type="radio" value={0} name="ycompony" onChange={(e)=>{this.setState({isOtherCityCheckup:e.target.value})}} /> 是:<input type="radio" value={1} onChange={(e)=>{this.setState({isOtherCityCheckup:e.target.value})}} className="m-l-1" name="ycompony" />
                            </label>
                        </div>
                    </div>:null}
                    {this.state.testtype!='01'&&this.state.testtype!='02'&&this.state.testtype!='03'?'无保单类型':null}


                    <div className="clearfix"></div>
                    <div className="btn-main">
                        <span><a  className="button btn-color-red" data-reveal-id="saveModel"
                        onClick={()=>this.add()}>保 存</a></span>
                        
                        <span><a  className="button" onClick={()=>this.quxiao()}>取 消</a></span>
                    </div>
                </div>
                <div className="clear"></div>
            </div>


            <div id="operAtion" className="reveal-modal">
        <h1>医院详情</h1>
        <div className="main sen-fax see-fax">
            <div className="">
                <p className="p-img-title"><img src={img1} /></p>
                <p>医院简介：{this.state.party.partyMemo?this.state.party.partyMemo:'无'}
                </p>
                <p>备注:<label className="m-l-2">{this.state.party.remarks?this.state.party.remarks:'无'}</label></p>
            </div>
            <div className="ullisitli" >
                <ul>
                    <li>机构地址:<span>{this.state.party.partyAddress?this.state.party.partyAddress:'无'}</span></li>
                    <li>联系方式：:<span>{this.state.party.partyTel?this.state.party.partyTel:'无'}</span></li>
                    <li>预约时间:<span>
                      {this.state.party.AMBaginTime?this.state.party.AMBaginTime:'无'}~{this.state.party.AMEndTime?this.state.party.AMEndTime:'无'}
                    </span><span className="m-l-1">
                    {this.state.party.PMBaginTime?this.state.party.PMBaginTime:'无'}~{this.state.party.PMEndTime?this.state.party.PMEndTime:'无'}
                    </span></li>
                    <li>交通:<span>{this.state.party.partyTrafficInfo?this.state.party.partyTrafficInfo:'无'}</span></li>
                </ul>

            </div>
            </div>
            <a className="close-reveal-modal">&#215;</a>
        </div>

        </div>
			)
	}
}

class Xing extends Component{
  render(){
    return (
       <span className='required-time'>*</span>
      )
  }
}


export default Testorder