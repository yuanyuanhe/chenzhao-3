import React, { Component } from 'react';
import img1 from '../../../style/images/compan.jpg'
import MonthlySelect from '../../monthlySelect/MonthlySelect'
import * as api from '../../../config/api.js'
import * as tools from '../../../config/tools'
import { Link,withRouter } from 'react-router-dom';
import img2 from '../../../style/images/titlepng.jpg'
import './testinfo.css'
import DatePicker from 'antd/lib/date-picker'; 
import moment from 'moment'; 
import message from 'antd/lib/message';
import  TimePicker  from 'antd/lib/time-picker';
const { RangePicker } = DatePicker;
const format = 'HH:mm';

class Testinfo extends Component{
	constructor(args) {
        super()
        this.state = {
               detail:"",
               role:'',
               branchList:[],//公司集合
               cityinfomstList:[],//城市集合
               partyList:[],//机构集合
               timeString:'',
               dateString:'',
               schedulingListAll:[],
               timelist:[],
               people:'',
               checkupDate: "",//体检时间
               id:'',//分公司code
               cityCode:'',
               healthchkPartyId:'',
               show:false,
               party:{},
        }
    }
    componentDidMount() {
        this.show()
     
         


        //判断是否为管理员
         if(localStorage.getItem('powercode')){
           if(tools.datatime(localStorage.getItem('powercode'))){
            this.setState({
                role:'guabi'
            })
        }
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
            id:this.props.match.params.id
        }
        api.detailorderParticulars(params).then((data)=>{
            if (tools.checkResult(data)) {
               let  cityCode=tools.Trim(data.health.cityCode)
               let  branchCode=tools.Trim(data.health.branchCode)
            this.setState({
               detail:data.health,
               cityCode:cityCode,
               id:branchCode,
               healthchkPartyId:data.health.healthchkPartyId,
               branchList:data.branchList,
               cityinfomstList:data.cityinfomstList,
               partyList:data.partyList,
            },()=>{
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
            })
        }
        })
    
    }
    updata(){
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
        if(!this.state.timeString){
          message.error('请选择体检时间');
          return;
        }
       this.setState({
        checkupDate:this.state.dateString+' '+this.state.timeString
      },()=>{
        let params={
                id:this.props.match.params.id,
                cityCode:this.state.cityCode,
                branchCode:this.state.id,
                healthchkPartyId:this.state.healthchkPartyId,
                role:this.state.role,
                checkupTime:this.state.checkupDate,
        }
        api.xgyyupdate(params).then((data)=>{
            if (tools.checkResult(data)) {
                tools.toast.success('修改成功')
                this.props.history.push(`/appointmentExamination`)
               }else{
                tools.toast.error(data.errMsg)
               }
        })
      });    
    }
    // change(branchCode,cityCode,partyId){
    //     this.setState({
    //       branchCode,
    //       cityCode,
    //       partyId
    //     })
    //   }
       cancel(){
         let params ={
            id:this.props.match.params.id,
            result:1//取消预约
        }
        api.typecancelOrder(params).then((data)=>{
            if (tools.checkResult(data)) {
                window.$('.reveal-modal').trigger('reveal:close')
               tools.toast.success('取消预约')
               this.props.history.push(`/appointmentExamination`)
          }
        })
    }
    changeData(date, dateString){
      this.setState({
        dateString:dateString
      });
    }
    changeTime(time,timeString){
      this.setState({
        timeString:timeString,
      });
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
            show:true
        },()=>{
          if(this.state.healthchkPartyId!=''){
          let params ={
         partyId:this.state.healthchkPartyId
      }
      api.selectPartyDetail(params).then((data)=>{
        if(tools.checkResult(data)){
          //console.log(data)
          this.setState({
            party:data.partyDetailList[0]
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
            timeString:this.state.timelist[e].time
        }) 
      }else{
          this.setState({
            people:'',
          })
        }
    }
    quanxian(e){
       this.setState({
        healthchkPartyId:e.target.value,
        show:true,
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
		return( 
<div className="content-right testinfo">
        <div className="main1">
            <div className="box2">

                <div className="clearfix"></div>
                <h3 className="h3-to-view">已预约记录详情  {/*<a  data-reveal-id="expeRience">查看体检信 ></a>*/}</h3>
                <div className="clearfix"></div>
                <div>
                    <ul className="detailUl text-l">
                        <li>
                            <label><span>保单号:</span><span>{this.state.detail.policyNo}</span></label>
                            <label><span>客户姓名:</span><span>{this.state.detail.personName}</span></label>

                        </li>

                        <li>
                            <label><span>预约人代号:</span><span>{this.state.detail.salesId}</span></label>
                            <label><span>体检时间:</span><span>{this.state.detail.checkupDate}</span></label>
                        </li>

                        <li>
                            <label><span>修改时间:</span><span>{this.state.detail.updateTime}</span></label>
                            <label><span>状态:</span><span>
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

                <div className="clearfix"></div>
                <div>
                 {/* <MonthlySelect cityCode={this.state.cityCode} branchCode={this.state.branchCode} partyId={this.state.partyId} change={this.change.bind(this)}/>*/}
                    


                    <label className="fl" >分公司</label>

                        <select disabled={true} onChange={(e)=>this.changeBranch(e.target.value)} value={this.state.id} className="fl-none fl width20" name="choose" >
                        <option value="" >请选择</option>
                        {this.state.branchList.map((item,index)=>{
                          return(
                                    <option key={index} value={item.provinceCode}>{item.branchName}</option>
                            )
                        })}
                        </select>
                        <label className="fl" >城市</label>
                        
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
                        <div><label className="fl" >医院</label>
                        <select className="right-input fl-none fl width15" value={this.state.healthchkPartyId}  onChange={(e)=>this.quanxian(e)} >
                        <option value="">请选择</option>
                        {resultHospitalList.map((item,index)=>{
                          return(
                            <option  key={index} value={item.id}>{item.partyName}</option>
                            )
                        })}
                      </select></div>:
                      <div><label className="fl" >医院</label>
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
                      {this.state.show?
                      tools.datatime(this.state.powercode)?
                        <div> <label className="fl" >体检时间</label>
                        <DatePicker onChange={this.changeData.bind(this)} />
                        <TimePicker className='timestyle' onChange={this.changeTime.bind(this)} defaultOpenValue={moment('8:00','HH:mm')}  format={format}
                        disabledMinutes={this.disabledMinutes} /></div>
                       :
                    <div><label className="fl" >体检日期</label>
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
                          <label className="fl" >体检时间</label>
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
                         <label className="fl" >剩余人数:</label>{this.state.people}</div>:null
                      }
                      



                </div>


                <div className="clearfix"></div>
                <div className="clearfix"></div>
                <div className="btn-main m-t-3">
                    <span><a  className="button btn-color-red" data-reveal-id="saveModel"
                    onClick={()=>this.updata()} >{this.state.detail.statusId=='03'?'预约':'保存'}</a></span>
                    &nbsp;&nbsp;
                    {this.state.detail.statusId=='03'?null:<span><a  className="button border-bc" data-reveal-id="esc"
                    >取消预约</a></span>}
                    <span><a  className="button border-bc" onClick={()=>this.props.history.goBack()}>取 消</a></span>
                </div>
            </div>
            <div className="clear"></div>
        </div>

        

    <div id="expeRience" className="reveal-modal  width540">
    <h1>友邦保险有限公司上海分公司</h1>
    <div className="main sen-fax exp-h exp-p">
        <div className="reveal-modal-title exp-ediv">体检通知书</div>

        <div className="box1 table-overflow m-b-2">
            <ul className="exp-rience">
                <li><label>保险合同编号：</label><label>A1234567889</label></li>
                <li><label>营销服务部:</label><label>张江一部</label></li>
                <li><label>被保险人:</label><label>若曦</label></li>
                <li><label>组别:</label><label>S0000008</label></li>
                <li><label>投保人:</label><label>若兰</label></li>
                <li><label>申请日期:</label><label>2018年1月1日</label></li>
                <li><label>保险营销员电话:</label><label>15890293828</label></li>
            </ul>
        </div>
        <h4 className="reveal-modal-title">尊敬的若曦客户</h4>
        <p>        感谢您选择本公司之保险。为使本公司能进一步审核您的申请，请于本通知书发出日起14日内通过

            保险营销员预约体检时间，并安排 XXXXXXXXXXXXXXXXXXXXXXXXXXXXXX 进行体检。

            本次体检的结果，将成为我司合理审核您本次申请的依据之一。</p>
        <h4>一、体检项目</h4>
        <ul  className="exp-ul-l">
            <li>1.填写告知事项表+体格检查</li>
            <li>2.尿常规(10岁以上的被体检者适用）</li>
            <li>3.BU体检套餐，空腹验血BP1</li>
        </ul>
        <h4 className="reveal-modal-title">二、体检注意事项</h4>
        <div className="list-p">
            <p>1.成年被体检人请携带身份证原件（或有效期内的驾驶证或护照原件）、未满18岁之未成年被体检人请携带身份证或户口簿

                或出生证的原件前往体检。未满18岁之未成年被体检人必须由投保人陪同体检，投保人亦需携带本人之身份证原件
            </p>
            <p>
                2.如在合约医院体检，被体检人（包括成年和未成年人）请同时携带近期免冠彩色照片及此体检通知书前往体检，以便核

                对身份，否则合约医院将无法提供体检服务。

            </p>
            <p>
                2.如在合约医院体检，被体检人（包括成年和未成年人）请同时携带近期免冠彩色照片及此体检通知书前往体检，以便核

                对身份，否则合约医院将无法提供体检服务。

            </p>
            <p>
                3.如有既往疾病史，请携带病历记录及体检报告。

            </p>
            <p>
                4.女性客户请选择在月经干净三天后前来体检，体检时不要穿着连衣裙，连衣裤及裤袜

            </p>
            <p>
                5.体检项目中有注明需要空腹的，以及被体检者有乙肝、脂肪肝、高血脂、糖尿病史或者成年肥胖者，需要空腹前往医务   中心/合约医院体检。

            </p>
            <p>
                6.需空腹体检者请从体检前一天晚上11时始禁饮食（空腹八小时以上），并安排在上午体检。

            </p>
            <p>
                7.体检前一天不要喝酒及浓茶、咖啡等刺激食物，不要进食太甜及油腻的食物，以免影响次日的化验结果，晚上早点休息，保证充足的睡眠, 以确保体检结果的准确。

            </p>
            <p>
                8.请客户不要随意弃检项目，否则有可能对保单承保产生影响，如有任何疑问，请联系营销员或者友邦热线？。

            </p>
            <p>
                9.请于本通知书发出日起14天内通过保险营销员完成体检。

            </p>
        </div>
        <div className="foot-p">
            <p className="foot-footline">注：如本次投保已按本公司要求完成体检者，可不予理会此通知</p>
            <p className="foot-div-indent">
                按照保险法第十三条之规定：投保人提出保险要求，经保险人同意承保，并就合同的条款达成协议，保险合

                同成立。因此，在本公司同意承保之前（即自投保单签署之日起至获核准承保之前），不承保阁下在此期间之保险

                责任。如需查询，请拨打我们的客户服务热线:800-820-3588(固定电话)或400-820-3588(手机用户)，或亲临我公司

                客户服务中心，我们将全心全意为您提供最优质保险服务。
            </p>
            <p>
                <label>此致</label>
                <label>敬礼！</label>
            </p>
        </div>
        <div className="foot-div-img">
            <div className="right-image">
                <img src={img1} />
                <div className="list-compan">
                    <p>友邦上海分公司</p>
                    <p>核保部</p>
                    <p>2017.3.9</p>
                </div>
            </div>
        </div>
        <p className="footUser">
            <label>抄送保险营销员：</label>
            <label>李某某/张某</label>
        </p>
        <p className="foot-toview">
            <a  className="button btn-color-red">下载PDF文件</a>
        </p>
    </div>
    <a className="close-reveal-modal close-c-w">&#215;</a>
    </div>
    

    <div id="esc" className="reveal-modal">
                <h1>提示消息</h1>
                <div className="main">
                    <p className="tallyou">确定要取消预约吗？</p>
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

        <div id="operAtion" className="reveal-modal">
        <h1>医院详情</h1>
        <div className="main sen-fax see-fax">
            <div className="">
                <p className="p-img-title"><img src={img2} /></p>
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


export default withRouter(Testinfo)