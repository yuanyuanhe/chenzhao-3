import React, { Component } from 'react';
import Pagination from '../../pagination/Pagination';
import * as api from '../../../config/api'
import * as tools from '../../../config/tools'
import message from 'antd/lib/message';
class constantMaintenance extends Component{
 constructor(args){
     super();
     this.state={
        totalPage:1,
        jumpPage:1,
        action:"add",
        codeMstList:[],
        codeType:"",
        codeName:"",
        codeId:"",
        disabled :false
     }
 }

 componentDidMount() {
    this.show();
}


 jump(page) {
    this.setState({
        jumpPage: page
    }, () => {
        this.show();
    })
}

show(num){
    let params = {
        pageno: num===1?1:this.state.jumpPage,
        codeType:this.state.codeType,
        codeName:this.state.codeName
    }
  
    api.Constantmaintenance(params).then((data) => {
        if(num===1){
            this.refs.page.indexpage(1)
        }
        if (tools.checkResult(data)) {
           
            this.setState({
                codeMstList:data.codeMstList,
                totalPage: data.totalPage
            })
        } else {
            tools.toast.error(data.errMsg || '网络错误');
        }
    }, (reject) => {
        tools.toast.offline(reject);
    })

}
resetForm(){
    this.setState({
        action:"add",
        disabled:false
    })
    for(let i in this.refs){
        this.refs[i].value=""
    }
}
pushData(item){
    this.setState({
        action:"edit",
        codeId:item.codeId,
        disabled:true
    })
    for(let i in this.refs){
        this.refs[i].value=item[i]
    }
}
add(){
    if(this.refs.codeType.value===""){
        message.error('请输入常量代码');
        return
    }
    if(this.refs.codeName.value===""){
        message.error('请输入常量名称');
        return
    }
    if(this.refs.codeValue.value===""){
        message.error('请输入常量值');
        return
    }
let params={}
for(let i in this.refs){
    params[i]=this.refs[i].value
}
api.Appendmaintenance(params).then((data) => {
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
    if(this.refs.codeName.value===""){
        message.error('请输入常量名称');
        return
    }
    if(this.refs.codeValue.value===""){
        message.error('请输入常量值');
        return
    }
    let params={}
         params={codeId:this.state.codeId}
    for(let i in this.refs){
        params[i]=this.refs[i].value
    }
    api.Appendmaintenance(params).then((data) => {
        if(tools.checkResult(data)){
          window.$('.reveal-modal').trigger('reveal:close');
          this.show(); 
      }else {
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
remove(){
    this.setState({
        codeType:"",
        codeName:""
    })
}
numberInputs=(e)=>{
    
 e.target.value= e.target.value.replace(/[^\d]/g,'')
 
}
del(codeId){
    let params={
        codeId,
        delFlag:0
    }
    api.Appendmaintenance(params).then((data) => {

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
                    <label className="fl" >常量代码：</label>
                    <input type="text" className="tl fl width20" placeholder="" data-input-clear="5"  value={this.state.codeType.replace(/[^\d]/g,'')} onChange={(e)=>
                    this.setState({
                        codeType:e.target.value
                    })
                    }/>

                    <label className="fl" >常量名称：</label>
                    <input type="text" className="tl fl width20" placeholder="" data-input-clear="5" value={this.state.codeName} onChange={
                        (e)=>this.setState({
                            codeName:e.target.value
                        })
                    }/>


                    <a  className="button btn-color-red" onClick={()=>this.show(1)}>查 询</a>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a  className="button" onClick={()=>this.remove()}>重 置</a>

                </div>

            </div>
            <div className="clear"></div>
        </div>
        <div className="main1"  id="myTab2_2Content0">
            <div className="title-add"><a className="add-data" data-reveal-id="edIt" onClick={()=>this.resetForm()}>+新增</a></div>
            <div className="box1 table-overflow m-b-2">
                <table width="100%" border="0" className="table1">
                    <tbody>
                    <tr>
                        <th>序号</th>
                        <th>常量代码</th>
                        <th>常量名称</th>
                        <th>常量值</th>
                        <th>操作</th>
                    </tr>
                    {this.state.codeMstList.map((item,index)=>{
                        return(
                            <tr key={index}>
                                <td>{index+1}</td>
                                <td>{item.codeType}</td>
                                <td>{item.codeName}</td>
                                <td>{item.codeValue}</td>
                                <td><a  data-reveal-id="edIt" onClick={()=>this.pushData(item)}>修改</a>
                             <a  data-reveal-id="addalldata"  onClick={() => {
                        this.setState({
                            codeId: item.codeId
                        })
                    }}>删除</a></td>
                            </tr>
                        )})
                    }
                    </tbody>
                </table>
            </div>
            <Pagination totalPage={this.state.totalPage} jump={this.jump.bind(this)} ref="page"></Pagination>
        </div>


 <div id="edIt" className="reveal-modal">
    {
        this.state.action==="add"?<h1>新增常量</h1>:<h1>编辑常量</h1>
    }
    <div className="main">
        <div className="clearfix"></div>
        <div className="edit-time">
            <label className="fl" >常量代码:<span className='required-time'>*</span></label>
            <input type="text" className="tl fl width30"  data-input-clear="5" ref="codeType" onKeyUp={this.numberInputs} maxLength="2" disabled={this.state.disabled}/>
            <label className="fl" >常量名称：<span className='required-time'>*</span></label>
            <input type="text" className="tl fl width30"  data-input-clear="5"  ref="codeName"/>
        </div>
        <div className="edit-time">
            <label className="fl" >常量值:<span className='required-time'>*</span></label>
            <input type="text" className="tl fl width70"  data-input-clear="5" ref="codeValue" onKeyUp={this.numberInputs}  maxLength="2"/>

        </div>
        <div className="clearfix"></div>
        <div className="btn-main m-t-2">
            <span><a  className="button btn-color-red"  onClick={()=>this.ok()}>确 认</a></span>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <span><a  className="button" onClick={() => {
                window.$('.reveal-modal').trigger('reveal:close');
            }}>取 消</a></span>
        </div>
    </div>
    <a className="close-reveal-modal">&#215;</a>
</div>  

{/* <!--删除--> */}
<div id="addalldata" className="reveal-modal">
    <h1>提示信息</h1>
    <div className="main">
        <p className="tallyou">确定要删除吗？</p>
        <div className="btn-main m-t-2">
            <span><a  className="button btn-color-red" onClick={() => this.del(this.state.codeId)}>确 认</a></span>
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

export default constantMaintenance