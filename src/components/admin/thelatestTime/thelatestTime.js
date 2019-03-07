import React, { Component } from 'react';
import Pagination from '../../pagination/Pagination';
import * as api from '../../../config/api'
import * as tools from '../../../config/tools'
import TimePicker from 'antd/lib/time-picker'
import "./thelatestTime.css"
import moment from 'moment'
import message from 'antd/lib/message';
class thelatestTime extends Component{
constructor(args){
    super();
    this.state={
        totalPage:1,
        jumpPage:1,
        action:"add",
        lastTimeSetting:[],
        branchList:[],
        companyCode:"",
        id:"",
        AMbaginTime:'',
        ambaginTime_moment:null,
        disabled:false
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
    let params={
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
}

show(num){
    let params = {
        currentPage: num===1?1:this.state.jumpPage,
        companyCode:this.state.companyCode
    }
    api.thelatestTime(params).then((data) => {
        if(num===1){
            this.refs.page.indexpage(1)
        }
        if (tools.checkResult(data)) {
            this.setState({
                lastTimeSetting:data.lastTimeSetting,
                totalPage: data.totalPager
            })
        } else {
            tools.toast.error(data.errMsg || '网络错误');
        }
    }, (reject) => {
        tools.toast.offline(reject);
    })

    }
    resetTime(){
        this.setState({
            action:"add",
            ambaginTime_moment:null,
            disabled:false

        })
       for(let i in this.refs){
        this.refs[i].value="" ;
       }

    }
    pushTime(item){
       
        this.setState({
            action:"edit",
            id:item.id,
            AMbaginTime:item.lastTime,
            ambaginTime_moment: item.lastTime === ""?null:moment(item.lastTime, 'HH:mm'),
            disabled:true
        })
        for(let i in this.refs){
            this.refs[i].value=item[i] ;
           }
    }
    add(){
        if(this.state.AMbaginTime===""){
            message.error('请输入时间');
            return
        }
        if(this.refs.companyCode.value===""){
            message.error('请输入分公司名称');
            return
        }
     let params={}
        params={lastTime:this.state.AMbaginTime}
        for (let i in this.refs) {
            params[i] = this.refs[i].value
        }    
        api.appendTime(params).then((data) => {
            if(tools.checkResult(data)){
              window.$('.reveal-modal').trigger('reveal:close');
              this.show(); 
          }else{
              if(data.errMsg==="1"){
                tools.toast.error("分公司重复")
              }
          }     
        })
    }
    edit(item){
        if(this.state.AMbaginTime===""){
            message.error('请输入时间');
            return
        }
        let params = {};
        params ={id:this.state.id,lastTime:this.state.AMbaginTime}
        for (let i in this.refs) {
            params[i] = this.refs[i].value
        }
        api.modifyTime(params).then((data) => {
            if (tools.checkResult(data)) {
                window.$('.reveal-modal').trigger('reveal:close');
                this.show();
            } else {
                console.log(data.errMsg)
            }
        }, (err) => {
          tools.toast.offline(err);
        })
    }
    ok(){
        if(this.state.action==="add"){
            this.add()
        }else{
            this.edit()
        }
        
    }
    reset(){
        this.setState({
            companyCode:"",
        }) 
    }
    del(id) {
        let params = {
            id
        }
        api.removeTime(params).then((data) => {
            if (tools.checkResult(data)) {
                window.$('.reveal-modal').trigger('reveal:close');
                this.show();
            } else {
                tools.toast.error(data.errMsg || '网络错误');
            }
        }, (err) => {
          tools.toast.offline(err);
        })
    }
  
  
render(){
    return(
        <div className="content-right">
        <div className="main1">
            <div className="box2">
                <div className="clearfix"></div>
                <div>
                    <label className="fl">分公司</label>
             <select  className="fl-none fl width30" name="choose" id="choose" value={this.state.companyCode} onChange={(e)=>this.setState({
                companyCode:e.target.value
                 })} >
             <option value="">请选择</option>
                {this.state.branchList.map((item, index) => {
                    return (
                        <option key={index} value={item.cityCode}>{item.branchName}</option>
                    )
                })}
                </select> 
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <a  className="button btn-color-red" onClick={() => this.show(1)}>查 询</a>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a  className="button" onClick={()=>this.reset()}>重 置</a>

                </div>

            </div>
            <div className="clear"></div>
        </div>
        <div className="main1"  id="myTab2_2Content0">
            <div className="title-add"><a  className="add-data" data-reveal-id="edIt" onClick={()=>this.resetTime()}>+新增</a></div>
            <div className="box1 table-overflow m-b-2">
                <table width="100%" border="0" className="table1">
                    <tbody>
                    <tr>
                        <th>序号</th>
                        <th>分公司名称</th>
                        <th>最迟预约时间</th>
                        <th>备注</th>
                        <th>操作</th>
                    </tr>
                    {
                        this.state.lastTimeSetting.map((item,index)=>{
                         return(
                             <tr key={index}>
                             <td>{index+1}</td>
                             <td>{item.companyName}</td>
                             <td>{item.lastTime}</td>
                             <td>{item.other}</td>
                             <td><a  data-reveal-id="edIt" onClick={() => this.pushTime(item)}>修改</a><a  data-reveal-id="addalldata"
                             onClick={() => {
                        this.setState({
                            id: item.id
                        })
                    }}
                             >删除</a></td>
                             </tr>
                         )
                        })
                    }
                    </tbody>
                </table>
            </div>
            <Pagination totalPage={this.state.totalPage} jump={this.jump.bind(this)}  ref="page"/>
        </div>

        <div id="edIt" className="reveal-modal">
    <h1>{this.state.action=='add'?'新增':'修改'}最迟时间</h1>
    <div className="main">
        <div className="clearfix"></div>
        <div className="edit-time">
            <label className="fl" >分公司名称:<span className='required-time'>*</span></label>
            <select ref='companyCode' className="fl-none fl width30" name="choose" id="choose" disabled={this.state.disabled}>
                <option value="">请选择</option>
            {this.state.branchList.map((item, index) => {
                return (
                    <option key={index} value={item.branchCode}>{item.branchName}</option>
                )
            })}
               
            </select>        
            <label className="fl" >时间:<span className='required-time'>*</span></label>
            <div>
            <TimePicker onChange={(value,string)=>{this.setState({ambaginTime_moment:value,AMbaginTime:string})}} placeholder='' format='HH:mm' value={this.state.ambaginTime_moment}   />
                </div>
        </div>
        <div className="clearfix"></div>
        <div className="edit-time">
            <label className="fl" >备注:</label>
            <textarea   className="tl fl width70" id="textarea" rows="5" ref="other"></textarea>
        </div>
        <div className="clearfix"></div>
        <div className="btn-main m-t-2">
            <span><a  className="button btn-color-red" onClick={()=>this.ok()}>确 认</a></span>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <span><a  className="button" onClick={() => {
                window.$('.reveal-modal').trigger('reveal:close');
            }}>取 消</a></span>
        </div>
    </div>
    <a className="close-reveal-modal">&#215;</a>
</div>   

<div id="addalldata" className="reveal-modal">
    <h1>提示信息</h1>
    <div className="main">
        <p className="tallyou">确定要删除吗？</p>
        <div className="btn-main m-t-2">
            <span><a  className="button btn-color-red" onClick={() => this.del(this.state.id)}>确 认</a></span>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <span><a  className="button" onClick={() => {
                window.$('.reveal-modal').trigger('reveal:close');
            }}>取 消</a></span>
        </div>
    </div>
    <a className="close-reveal-modal">&#215;</a>
</div>

    </div>
    )
}
}

export default thelatestTime