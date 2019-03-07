import React, { Component } from 'react';
import * as api from '../../../config/api'
import Pagination from '../../pagination/Pagination'
import * as tools from '../../../config/tools'
import message from 'antd/lib/message';
import 'antd/lib/message/style/index.css';
//医院体检类别维护


class ClassMaintain extends Component{
    constructor(args) {
        super();
        this.state = {
            healthCategoryList:[],
            categoryName:'',
            remarks:'',
            categoryId:'',
            totalPage: 1,
            jumpPage: 1,
            categoryCode:'',
            action:'add'
        }
    }
	componentDidMount() {
         this.show()
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
            categoryCode: this.state.categoryCode,
            categoryName: this.state.categoryName
        }
        api.classMaintain(params).then((data) => {
            if(num===1){
                this.refs.page.indexpage(1)
            }
           if (tools.checkResult(data)) {
            this.setState({
                healthCategoryList:data.healthCategoryList,
                totalPage: data.totalPager,
                categoryId:data.categoryId
            })
        }
        }, (err) => {

        })

    }
    reset() {
        this.setState({
            categoryCode: '',
            categoryName: ''
        })
    }
    resetForm(){
        this.setState({
          action:'add'
        })
        for (let i in this.refs) {
          this.refs[i].value = '';
        }
    }
    pushData(item){
        this.setState({
          action:'edit',
          categoryId:item.categoryId
        })
        for (let i in this.refs) {
          this.refs[i].value = item[i];
        }
    }
    checkCode(code){
      return code.indexOf(" ")===-1&&code.length === 5;
    }
    add() {
        if(!this.checkCode(this.refs.categoryCode.value)){
          message.error('请输入五位不含空字符的项目类别代码');
          return;
        }
        if(!this.refs.categoryName.value){
         message.error('请输入类别名称');
         return;
        }
        let params = {};
        for (let i in this.refs) {
            params[i] = this.refs[i].value
        }
        api.addclassMaintain(params).then((data) => {
            if(tools.checkResult(data)){
              window.$('.reveal-modal').trigger('reveal:close');
              this.show(); 
          }else{
            tools.toast.error(data.errMsg|| '网络错误')
            window.$('.reveal-modal').trigger('reveal:close');
          }     
        })
    }
    edit(item){
        let params = {categoryId:this.state.categoryId};
        for (let i in this.refs) {
            params[i] = this.refs[i].value
        }
        api.updataclassMaintain(params).then((data) => {
            if (tools.checkResult(data)) {
              window.$('.reveal-modal').trigger('reveal:close');
              this.show();
            }
        })
    }
    del(categoryId){
      let params = {
        categoryId
      }
      api.remclassMaintain(params).then((data)=>{
        if (tools.checkResult(data)) {
              window.$('.reveal-modal').trigger('reveal:close');
              this.show();
                  }
      })
    }
    ok(){
      if(this.state.action === 'add'){
        this.add();
      }else{
        this.edit();
      }
    }
	render(){
		return(
			<div className='content-right'>
             <div className="main1">
            <div className="box2">
                <div className="clearfix"></div>
                <div>
                    <div>
                        <label className="fl">类别代码</label>
                        <input value={this.state.categoryCode} onChange={(e) => {
                                        this.setState({
                                            categoryCode: e.target.value
                                        })
            }} type="text" className="tl fl width20" placeholder="" data-input-clear={5} />
                        <label className="fl">类别名称</label>
                        <input value={this.state.categoryName} onChange={(e) => {
                                        this.setState({
                                            categoryName: e.target.value
                                        })
            }} type="text" className="tl fl width20" placeholder="" data-input-clear={5} />
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <a  className="button btn-color-red" onClick={() => this.show(1)}>查 询</a>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a  className="button" onClick={() => this.reset()}>重 置</a>
                    </div>
                </div>
            <div className="clear"></div>
        </div>
        </div>
        <div className="main1"  id="myTab2_2Content0">
            <div className="title-add"><a className="add-data" data-reveal-id="edIt" onClick={()=>this.resetForm()}>+新增</a></div>
            <div className="box1 table-overflow m-b-2">
                <table width="100%" border="0" className="table1">
                    <tbody>
                    <tr>
                        <th>序号</th>
                        <th>类别代码</th>
                        <th>类别名称</th>
                        <th>备注</th>
                        <th>操作</th>
                    </tr>
                    {this.state.healthCategoryList.map((item,index)=>{
                        return(
                            <tr key={index}>
                                <td>{index+1}</td>
                                <td>{item.categoryCode}</td>
                                <td>{item.categoryName}</td>
                                <td>{item.remarks}</td>
                                <td><a  data-reveal-id="edIt" onClick={()=>this.pushData(item)}>修改</a><a data-reveal-id="addalldata" onClick={()=>{this.setState({categoryId:item.categoryId})}}>删除</a></td>
                            </tr>
                            )
                    })}
                    
                    </tbody>
                </table>
            </div>
           <Pagination totalPage={this.state.totalPage} jump={this.jump.bind(this)} ref="page"/>
        </div>
      
       

        <div id="edIt" className="reveal-modal">
    <h1>{this.state.action=='add'?'新增':'修改'}项目类别</h1>
    <div className="main">
        <div className="clearfix"></div>
        <div className="edit-time">
            <label className="fl required" >类别代码:</label>
            <input disabled={this.state.action==='edit'} ref='categoryCode' type="text" className="tl fl width30" placeholder="" data-input-clear={5} />
            <label className="fl required" >类别名称:</label>
            <input ref='categoryName' type="text" className="tl fl width30" placeholder="" data-input-clear={5} />
        </div>
        <div className="clearfix"></div>
        <div className="edit-time">
            <label className="fl" >备注:</label>
            <textarea  ref='remarks' className="tl fl width70" id="textarea" rows="5" placeholder="多行文本框"></textarea>
        </div>
        <div className="clearfix"></div>
        <div className="btn-main m-t-2">
            <span><a className="button btn-color-red" onClick={()=>this.ok()}>确 认</a></span>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <span><a className="button" onClick={() => {
                window.$('.reveal-modal').trigger('reveal:close');
            }} >取 消</a></span>
        </div>
        </div>
        <a className="close-reveal-modal">&#215;</a>
    </div>

    <div id="addalldata" className="reveal-modal">
                <h1>提示信息</h1>
                <div className="main">
                    <p className="tallyou">确定要删除吗？</p>
                    <div className="btn-main m-t-2">
                        <span><a  className="button btn-color-red"
                        onClick={()=>this.del(this.state.categoryId)}>确 认</a></span>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <span><a  className="button" onClick={() => {
                window.$('.reveal-modal').trigger('reveal:close');
            }} >取 消</a></span>
                    </div>
                </div>
                <a className="close-reveal-modal">&#215;</a>
            </div>

    </div>

			)
	}
}




export default ClassMaintain