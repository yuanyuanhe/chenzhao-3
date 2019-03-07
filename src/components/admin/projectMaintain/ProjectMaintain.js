import React, { Component } from 'react';
import Pagination from '../../pagination/Pagination'
import * as api from '../../../config/api'
import * as tools from '../../../config/tools'
import message from 'antd/lib/message';
import './projectMaintain.css'
class ProjectMaintain extends Component {
  constructor(args) {
    super();
    this.state = {
      checkupItemMstList: [],
      totalPage: 1,
      jumpPage: 1,
      checkupItemCode: '',
      checkupItemName: '',
      healthCategoryList: [],
      action: 'add',
      del_checkupItemId: '',
      healthCategory:'',
      branchNameList:[],
      branchCode:"",
    }
  }
  componentDidMount() {
    this.show();
    let params={account:localStorage.getItem('account')}
    api.loginselect(params).then((data)=>{
            if(tools.checkResult(data)){
                this.setState({
                    branchNameList:data.branchNameList,
                })
            }else{
                tools.toast.error(data.errMsg|| '网络错误')
            }
        }) 
        
    api.healthcategory_selectall().then((data) => {
      if (tools.checkResult(data)) {
        this.setState({
          healthCategoryList: data.healthCategoryList
        })
      } else {
        tools.toast.error(data.errMsg || '网络错误');
      }
    }, (reject) => {
      tools.toast.offline(reject);
    })
  }
  jump(page) {
    this.setState({
      jumpPage: page
    }, () => {
      this.show();
    })
  }
  show(num) {
    let params = {
      pageno: num===1?1:this.state.jumpPage,
      checkupItemCode: this.state.checkupItemCode,
      checkupItemName: this.state.checkupItemName,
      healthCategory:this.state.healthCategory,
      branchCode:this.state.branchCode
    }
    api.checkupitemmst_selectall(params).then((data) => {
      if(num===1){
        this.refs.page.indexpage(1)
      }
      if (tools.checkResult(data)) {
        this.setState({
          checkupItemMstList: data.checkupItemMstList,
          totalPage: data.totalPage
        })
      } else {
        tools.toast.error(data.errMsg || '网络错误');
      }
    }, (err) => {
      tools.toast.offline(err);
    })
  }
  reset() {
    this.setState({
      checkupItemCode: '',
      checkupItemName: '',
      healthCategory:'',
      branchCode:"",
    })
  }
  resetForm() {
    this.setState({
      action: 'add'
    })
    for (let i in this.refs) {
      this.refs[i].value = '';
    }
  }
  pushData(item) {
    this.setState({
      action: 'edit'
    })
    for (let i in this.refs) {
      this.refs[i].value = item[i];
    }
  }
  checkCode(code) {
    return code.indexOf(" ") === -1 && code.length === 4;
  }
  add() {
    if (!this.checkCode(this.refs.checkupItemCode.value)) {
      message.error('请输入四位不含空字符的项目代码');
      return;
    }
    let params = {};
    for (let i in this.refs) {
      if (!this.refs[i].value  && i!='remarks'&&i!='checkupItemId') {
        message.error(`请填写完整(${tools.messageText(i)})`);
        return;
      }
      params[i] = this.refs[i].value
    }
    api.checkupitemmst_insert(params).then((data) => {
      if (tools.checkResult(data)) {
        window.$('.reveal-modal').trigger('reveal:close');
        this.show();
      } else {
        message.error(data.errMsg);
      }
    }, (err) => {
      tools.toast.offline(err);
    })
  }
  edit(item) {
    let params = {};
    for (let i in this.refs) {
      params[i] = this.refs[i].value
    }
    api.checkupitemmst_update(params).then((data) => {
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
  del(checkupItemId) {
    let params = {
      checkupItemId
    }
    api.checkupitemmst_delete(params).then((data) => {
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
  ok() {
    if (this.state.action === 'add') {
      this.add();
    } else {
      this.edit();
    }
  }
  render() {
    return (
      <div>
          <div className='content-right'>
          <div className="main1">
          <div className="box2">
          <div className="clearfix" />
          <div>
          <label className="fl">项目代码</label>
          <input value={this.state.checkupItemCode} onChange={(e) => {this.setState({checkupItemCode: e.target.value})}} type="text" className="tl fl width20"  data-input-clear={5} />
          <label className="fl">项目名称</label>
          <input value={this.state.checkupItemName} onChange={(e) => {this.setState({checkupItemName: e.target.value})}} type="text" className="tl fl width20"  data-input-clear={5} />
          
          <label className="fl ">项目类别:</label>
          <select value={this.state.healthCategory} onChange={(e)=>this.setState({healthCategory:e.target.value})} className="fl-none fl width20" name="choose" id="choose">
          <option value="" >请选择</option>
          {this.state.healthCategoryList.map((item, index) => {
                return (
                    <option key={index} value={item.categoryCode}>{item.categoryName}</option>
                )
            })}
          </select>
          <div className="clearfix" />


           <label className="" >分公司:</label>
                    <select name="choose" id="choose" value={this.state.branchCode} onChange={(e)=>this.setState({branchCode:e.target.value})} className="fl-none  width20">
                        <option value="" >请选择</option>
                        {this.state.branchNameList.map((item,index)=>{
                            return(
                                 <option key={index} value={item.id}>{item.branchName}</option>
                                )
                        })}
                       
                    </select>


          <a className="button btn-color-red" onClick={() => this.show(1)} >查 询</a>
          <a className="button" onClick={() => this.reset()}  >重 置</a>
          </div>
          </div>
          <div className="clear" />
          </div>

          <div className="main1" id="myTab2_2Content0">
          <div className="title-add"><a onClick={() => this.resetForm()} className="add-data" data-reveal-id="checkupitem_modal">新增</a></div>
          <div className="box1 table-overflow m-b-2">
          <table width="100%" border={0} className="table1">
          <tbody>
          <tr>
          <th>序号</th>
          <th>项目代码</th>
          <th>项目名称</th>
          <th>项目类别</th>
          <th>默认费用</th>
          <th>备注</th>
          <th>操作</th>
          </tr>

          {this.state.checkupItemMstList.map((item, index) => {
                return (
              <tr key={index}>
              <td>{index + 1}</td>
              <td>{item.checkupItemCode}</td>
              <td>{item.checkupItemName}</td>
              <td>{item.categoryName}</td>
              <td>{item.cost}</td>
              <td>{item.remarks}</td>
              <td>
              <a data-reveal-id="checkupitem_modal" onClick={() => this.pushData(item)} >修改</a>
              <a data-reveal-id="checkupitem_del_modal" onClick={() => {this.setState({del_checkupItemId: item.checkupItemId})}} >删除</a>
              </td>
              </tr>
                )
            })}
          </tbody>
          </table>
          </div>
          <Pagination totalPage={this.state.totalPage} jump={this.jump.bind(this)} ref="page"/>
          </div>
          </div>

          <div id="checkupitem_modal" className="reveal-modal">
          <h1>{this.state.action==='add'?'新增':'修改'}体检项目</h1>
          <div className="main">
          <div className="clearfix" />




          <div className="edit-time">
          <label className="fl required">项目代码:</label>
          <input disabled={this.state.action==='edit'}  ref='checkupItemCode' type="text" className="tl fl width30"  data-input-clear={5} />
          <input hidden ref='checkupItemId' type="text" className="tl fl width30"  data-input-clear={5} />
          <label className="fl required">项目名称:</label>
          <input ref='checkupItemName' type="text" className="tl fl width30"  data-input-clear={5} />
          </div>
          <div className="edit-time">
          <label className="fl required">项目类别:</label>
          <select ref='healthCategory' className="fl-none fl width30" name="choose" id="choose">
          {this.state.healthCategoryList.map((item, index) => {
                return (
                    <option key={index} value={item.categoryCode}>{item.categoryName}</option>
                )
            })}
          </select>
          <label className="fl required">默认费用:</label>
          <input ref='cost' type="text" className="tl fl width30"  data-input-clear={5} />
          </div>
          <div className="clearfix" />
          
           <div className="edit-time">
           <label className="fl required" >分公司:</label>
                    <select disabled={this.state.action==='edit'}  name="choose" id="choose" ref='branchCode' className="fl-none fl width30">
                        {this.state.branchNameList.map((item,index)=>{
                            return(
                                 <option key={index} value={item.id}>{item.branchName}</option>
                                )
                        })}
                       
                    </select>
           </div>

          <div className="edit-time">
          <label className="fl">备注:</label>
          <textarea ref='remarks' className="tl fl width70" rows={5} />
          </div>
          <div className="clearfix" />

          

          <div className="btn-main m-t-2">
          <span><a className="button btn-color-red" onClick={() => this.ok()} >确 认</a></span>
               
          <span><a className="button" onClick={() => {
                window.$('.reveal-modal').trigger('reveal:close');
            }} >取 消</a></span>
          </div>
          </div>
          <a className="close-reveal-modal">×</a>
          </div>

          <div id="checkupitem_del_modal" className="reveal-modal">
          <h1>提示信息</h1>
          <div className="main">
          <p className="tallyou">确定要删除吗？</p>
          <div className="btn-main m-t-2">
          <span><a onClick={() => this.del(this.state.del_checkupItemId)} className="button btn-color-red">确 认</a></span>
               
          <span><a onClick={() => {window.$('.reveal-modal').trigger('reveal:close');}} className="button">取 消</a></span>
          </div>
          </div>
          <a className="close-reveal-modal">×</a>
          </div>
          </div>

    );
  }
}

export default ProjectMaintain;