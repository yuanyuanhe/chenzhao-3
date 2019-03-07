import React, { Component } from 'react';
import Pagination from '../../pagination/Pagination';
import MonthlySelect from '../../monthlySelect/MonthlySelect'
import * as api from '../../../config/api'
import * as tools from '../../../config/tools' 
import message from 'antd/lib/message';
class sendset extends Component{
    constructor(args){
        super();
        this.state={
            totalPage: 1,
            jumpPage: 1,
            sendSettingList:[],
            attachModelList:[],
            sendModelList:[],
            action:"add",
            branchCode:"",
            cityCode:"",
            healthChkpartyId:"",
            id:"",
            partyIds:"",
            branchCodes:"",
            cityCodes:"",
            branchCode2:"",
            cityCode2:"",
            healthChkpartyId2:""
        }
    }
    jump(page) {
        this.setState({
            jumpPage: page
        }, () => {
            this.show();
        })
    }
    change(branchCode,cityCode,healthChkpartyId){
        this.setState({
          branchCode,
          cityCode,
          healthChkpartyId
        })
      }
      change2(branchCodes,cityCodes,partyIds){
        this.setState({
          branchCodes,
          cityCodes,
          partyIds
        })
      }
      change3(branchCode2,cityCode2,healthChkpartyId2){
          this.setState({
            branchCode2,
            cityCode2,
            healthChkpartyId2
          })
     
      }
show(){
   
    let  params={
        companyCode:this.state.branchCode,
        cityCode:this.state.cityCode,
        partyCode:this.state.healthChkpartyId,
        currentPage:this.state.jumpPage
    }
	api.setCodeList(params).then((data) => {
                if (tools.checkResult(data)) {
                    this.setState({
                        sendSettingList:data.sendSettingList,
                        totalPage: data.totalPager
                    })
                    
                } else {
                    tools.toast.error(data.errMsg || '网络错误');
                }
            }, (err) => {
              tools.toast.offline(err);
            })

            api.selectList().then((data) => {
                
                         if (tools.checkResult(data)) {
                             this.setState({
                                 sendModelList:data.sendModelList,
                                 attachModelList:data.attachModelList
                             })
                             
                         } else {
                             tools.toast.error(data.errMsg || '网络错误');
                         }
                     }, (err) => {
                       tools.toast.offline(err);
                     })
}    
componentDidMount() {
    this.show();   
}
appends(){
this.setState({
    action:"add",
    branchCodes:"",
    cityCodes:"",
    partyIds:""
})
for (let i in this.refs){
    this.refs[i].value=""
}
this.refs.monthlySelect.rest()
}
modify(item){
    this.setState({
        action:"edit",
        id:item.id,
        branchCodes:item.companyCode,
        cityCodes:item.cityCode,
        partyIds:item.partyCode
    
    })
    for (let i in this.refs){
        this.refs[i].value=item[i]
    }

}
add(){
    if(this.state.branchCode2===""){
        message.error('请输入分公司');
        return;
    }
    if(this.state.cityCode2===""){
        message.error('请输入城市');
        return;
    }
    if(this.state.healthChkpartyId2===""){
        message.error('请输入医院名称');
        return;
    }
    if(this.refs.sendCode.value===""){
        message.error('请输入发送方式');
        return;
    }
    if(this.refs.attachCode.value===""){
        message.error('附件模式');
        return;
    }
    let params={}
    params={
        companyCode:this.state.branchCode2,
        cityCode:this.state.cityCode2,
        partyCode:this.state.healthChkpartyId2,
        sendCode:this.refs.sendCode.value,
        attachCode:this.refs.attachCode.value
        
    }
    
    api.appendsetList(params).then((data) => {
       
        if(tools.checkResult(data)){
          window.$('.reveal-modal').trigger('reveal:close');
          this.show(); 
      }else{
        tools.toast.error(data.errMsg || '网络错误')
        window.$('.reveal-modal').trigger('reveal:close');
      }     
    })
}
edit(){
    if(this.state.branchCodes===""){
        message.error('请输入分公司');
        return
    }
    if(this.state.cityCodes===""){
        message.error('请输入城市');
        return;
    }
    if(this.state.partyIds===""){
        message.error('请输入医院名称');
        return;
    }
    if(this.refs.sendCode.value===""){
        message.error('请输入发送方式');
        return;
    }
    if(this.refs.attachCode.value===""){
        message.error('附件模式');
        return;
    }
    let params={}
    params={
        companyCode:this.state.branchCodes,
        cityCode:this.state.cityCodes,
        partyCode:this.state.partyIds,
        sendCode:this.refs.sendCode.value,
        attachCode:this.refs.attachCode.value,
        id:this.state.id
        
    }
    api.updateList(params).then((data) => {
        if(tools.checkResult(data)){
          window.$('.reveal-modal').trigger('reveal:close');
          this.show(); 
      }else{
        tools.toast.error(data.errMsg || '网络错误')
        window.$('.reveal-modal').trigger('reveal:close');
      }     
    })
}
ok(){
    if(this.state.action==="add"){
        this.add()
    }else{
        this.edit()
    }

}
del(id){
    
    let params = {
        id
    }
    api.removeadd(params).then((data) => {
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
reset(){
    this.refs.monthlySelect1.rest()
    this.setState({
        branchCode:"",
        cityCode:"",
        healthChkpartyId:""
    })
    
}

    render(){
        return(
            <div className="content-right">
    
            <div className="main1">
                <div className="box2">
                    <div className="clearfix"></div>
                    <div>
                         <MonthlySelect  change={this.change.bind(this)}   ref="monthlySelect1" />
                        <a  className="button btn-color-red" onClick={()=>this.show()}>查 询</a>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a  className="button" onClick={() => this.reset()}>重 置</a>
    
                    </div>
    
                </div>
                <div className="clear"></div>
            </div>
            <div className="main1"  id="myTab2_2Content0">
                <div className="title-add"><a  className="add-data" data-reveal-id="edIt" onClick={()=>this.appends()}>+新增</a></div>
                <div className="box1 table-overflow m-b-2">
                    <table width="100%" border="0" className="table1">
                        <tbody>
                        <tr>
                            <th>序号</th>
                            <th>分公司</th>
                            <th>城市</th>
                            <th>体检机构名称</th>
                            <th>发送模式</th>
                            <th>附件模式</th>
                            <th>操作</th>
                        </tr>
                        {this.state.sendSettingList.map((item,index)=>{

                            return(
                            <tr key={index}>
                            <td>{index+1}</td>
                            <td>{item.companyName}</td>
                            <td>{item.cityName}</td>
                            <td>{item.partyName}</td>
                            <td>{item.sendName}</td>
                            <td>{item.attachName}</td>
                            <td><a  data-reveal-id="edIt" onClick={()=>this.modify(item)}>修改</a><a  data-reveal-id="addalldata" onClick={() => {
                        this.setState({
                            id: item.id
                        })
                    }}>删除</a></td>
                        </tr>
                            )
                        })

                        }
                        
                        </tbody>
                    </table>
                </div>
                <Pagination totalPage={this.state.totalPage} jump={this.jump.bind(this)} />
            </div>



            <div id="edIt" className="reveal-modal">
   {this.state.action=="add"?<h1>新增</h1>:<h1>编辑</h1>} 
    <div className="main">
        <div className="clearfix"></div>
        <div className="edit-time">
            {
                this.state.action=="add"?<MonthlySelect big={true} change={this.change3.bind(this)}   ref="monthlySelect" />:
                <MonthlySelect big={true} change={this.change2.bind(this)}    branchCode={this.state.branchCodes} cityCode={this.state.cityCodes}  partyId={this.state.partyIds}/>
            }
           
        </div>

        <div className="edit-time">
            <label className="fl" >发送方式:</label>
            <select className="fl-none fl width20" name="choose" id="choose" ref="sendCode">
                <option value="" >请选择</option>
                {
                    this.state.sendModelList.map((item,index)=>{
                      return(
                        <option value={item.codeValue} key={index}>{item.codeName}</option>
                      )
                    })
                }
            </select>

            <label className="fl" >附件模式:</label>
            <select className="fl-none fl width20" name="choose" id="choose" ref="attachCode">
                <option value="" >请选择</option>
               {
                   this.state.attachModelList.map((item,index)=>{
                     return(
                        <option value={item.codeValue} key={index}>{item.codeName}</option>
                     )
                   })
               }
            </select>

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
    <h1>删除</h1>
    <div className="main">
        <p className="tallyou">确定要删除吗？</p>
        <div className="btn-main m-t-2">
            <span><a  className="button btn-color-red" onClick={()=>this.del(this.state.id)}>确 认</a></span>
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

export default sendset;