import React, { Component } from 'react';
import Pagination from '../../pagination/Pagination';
import MonthlySelect from '../../monthlySelect/MonthlySelect'
import * as api from '../../../config/api'
import * as tools from '../../../config/tools' 
import message from 'antd/lib/message';
import './fen.css'

//分公司体检套餐维护
const $ = window.$;
class FenmechanismPackage extends Component{
    constructor(args){
        super();
        this.state={
            totalPage: 1,
            jumpPage: 1,
            partyBranchPackageList:[],
            branchList:[],
            itemList:[],
            itemLists:"",
            action:"add",
            branchCode1:"",
            cityCode:"",
            healthChkpartyId:"",
            packageCode:"",
            packageName:"",
            packageId:"",
            branchCode:"",
            disabled:false,
            branchNameList:[]
        }
    }
    jump(page) {
        this.setState({
            jumpPage: page
        }, () => {
            this.show();
        })
    }
    change(branchCode1,cityCode,healthChkpartyId){
        this.setState({
          branchCode1,
          cityCode,
          healthChkpartyId
        })
      }

    show(num){
        let params={
            classify:0,
            pageno:num===1?1:this.state.jumpPage,
            branchCode:this.state.branchCode1,
            cityCode:this.state.cityCode,
            partyId:this.state.healthChkpartyId,
            packageCode:this.state.packageCode,
            packageName:this.state.packageName
            
        }
         api.branchpackage(params).then((data) => {
             if(num===1){
                this.refs.page.indexpage(1)
             }
                     if (tools.checkResult(data)) {
                         this.setState({
                            partyBranchPackageList:data.partyBranchPackageList,
                            totalPage:data.totalPager
                         }) 
                     } else {
                         tools.toast.error(data.errMsg || '网络错误');
                     }
                 }, (err) => {
                   tools.toast.offline(err);
                 })
     
              
     }   
     chooseItem(checkupLists,branchCode,e){
        e.stopPropagation();
        this.projectSelect(branchCode,checkupLists)
     }
     projectSelect(branchCode,checkupLists) {
        let params={
            branchCode:branchCode
        }
        api.checkupitemmstel(params).then((data) => {
          if (tools.checkResult(data)) {
            this.setState({
              itemList: data.itemList,
            },()=>{
                $("input[name=checkbox]").prop('checked',false);
                if(checkupLists===null){
                    return;
                }
                    $("input[name=checkbox]").each((index, el)=>{
                        if (checkupLists.indexOf($(el).val()) !== -1) {
                            $(el).prop("checked", true);
                          }
                  });
            });
          } else {
            tools.toast.error(data.errMsg || '网络错误');
          }
        })
      }
     componentDidMount() {
         this.show();   
         let params={account:localStorage.getItem('account'),isContext:1}
    api.loginselect(params).then((data)=>{
            if(tools.checkResult(data)){
                this.setState({
                    branchNameList:data.branchNameList,
                })
            }else{
                tools.toast.error(data.errMsg|| '网络错误')
            }
        }) 
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
     appends(){
         this.setState({
            action:"add",
            branchCode:"",
            disabled:false
         })
         for (let i in this.refs){
            this.refs[i].value=""
        }
     }
     modify(item,e){
        e.stopPropagation();
         this.setState({
             action:"edit",
             packageId:item.packageId,
             branchCode:item.branchCode,
             disabled:true
         })
         for (let i in this.refs){
            this.refs[i].value=item[i]
        }
     }
     checkCode(code) {
        return code.indexOf(" ") === -1 && code.length === 4;
      }
     add(){
         if (!this.checkCode(this.refs.packageCode.value)) {
            message.error('请输入四位不含空字符的套餐代码');
            return;
          }
         if(this.refs.packageName.value===""){
            message.error('请输入套餐名称');
            return;
         }
         if(this.state.branchCode===""){
            message.error('请输入分公司');
            return;
         }
         let params={Classify:0}
         for (let i in this.refs){
            params[i]=this.refs[i].value
         }
api.appendbranchpackage(params).then((data) => {
    
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
        if(this.refs.packageName.value===""){
            message.error('请输入套餐名称');
            return;
         }
         if(this.state.branchCode===""){
            message.error('请输入分公司');
            return;
         }
        let params={Classify:0,packageId:this.state.packageId}
        for (let i in this.refs){
           params[i]=this.refs[i].value
        }
         api.appendbranchpackage(params).then((data) => {
            
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
         if(this.state.action=="add"){
            this.add()
         }else{
             this.edit()
         }
       
     }
     del(packageId) {
        let params = {
            packageId,
            delFlag:1
        }
        api.appendbranchpackage(params).then((data) => {
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
    rest(){
  
        this.setState({
            branchCode1:"",
            cityCode:"",
            healthChkpartyId:"",
            packageCode:"",
            packageName:"",
           
        })

    }
    chooseAll(e){
        $("input[name=checkbox]").prop("checked", e.target.checked);
    }
    query(){
        let checkupList = ''
        $('input[name="checkbox"]:checked').each(function(index, el) {
            checkupList += `${$(el).val()},`
        });
        let params={
            checkupList,
            packageId:this.state.packageId,
            delFlag:0
         }
         api.appendbranchpackage(params).then((data) => {
             if(tools.checkResult(data)){
               window.$('.reveal-modal').trigger('reveal:close');
               this.show(); 
               $("input[name=checkbox]").attr("checked", false)
               
           }else{
             tools.toast.error(data.errMsg || '网络错误')
             window.$('.reveal-modal').trigger('reveal:close');
           }     
         })  
    }
    detail(branchCode,packageCode){
     $(".hides").css({"display":"block","cursor":"pointer"})
     $("#contectMs").css("visibility","inherit")
        let params={
            branchCode,
            packageCode
         }
         api.selectitem(params).then((data)=>{
             if(tools.checkResult(data)){
                this.setState({
                    itemLists:data.itemList
                 }) 
             } else {
                 tools.toast.error(data.errMsg || '网络错误');
             } 
         })
    }
    quxiao(){
    
        $(".hides").css("display","none")
        $("#contectMs").css("visibility","hidden")
    }
	render(){
		return(
			<div className='content-right'>
            <div className="main1">
            <div className="box2">
                <div>
                {/*<MonthlySelect change={this.change.bind(this)}  ref="monthlySelect"/>*/}
                </div>
                <div className="clearfix"></div>
                <div>
                    <label className="fl">体检套餐代码：</label>
                    <input type="text" className="tl fl width20" placeholder="" data-input-clear={5}  onChange={(e)=>
                      this.setState({
                        packageCode:e.target.value
                      })
                    } value={this.state.packageCode}/>
                    <label className="fl">体检套餐名称:</label>
                    <input type="text" className="tl fl width20" placeholder="" data-input-clear={5}  onChange={(e)=>
                    this.setState({
                        packageName:e.target.value
                    })} value={this.state.packageName}/>


                    <div className="clearfix"></div>
                     <label className="" >分公司:</label>
                    <select name="choose" id="choose" value={this.state.branchCode1} onChange={(e)=>this.setState({branchCode1:e.target.value})} className="fl-none  width20">
                        <option value="" >请选择</option>
                        {this.state.branchNameList.map((item,index)=>{
                            return(
                                 <option key={index} value={item.id}>{item.branchName}</option>
                                )
                        })}
                       
                    </select>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <a className="button btn-color-red" onClick={()=>this.show(1)}>查 询</a>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a className="button"  onClick={()=>this.rest()}>重 置</a>

                </div>

            </div>
            <div className="clear"></div>
        </div>
        <div className="main1"  id="myTab2_2Content0">
            <div className="title-add"><a className="add-data" data-reveal-id="edIt" onClick={()=>this.appends()}>+新增</a></div>
            <div className="box1 table-overflow m-b-2">
                <table width="100%" border="0" className="table1">
                    <tbody>
                   
                    <tr>
                       
                        <th>序号</th>
                        <th>分公司</th>
                        <th>体检套餐代码</th>
                        <th>体检套餐名称</th>
                        <th>备注</th> 
                        <th>操作</th>
                      
                    </tr>
                    {
                        this.state.partyBranchPackageList.map((item,index)=>{
                            return (
                        <tr key={index} onClick={()=>this.detail(item.branchCode,item.packageCode)}>
                        <td>{index+1}</td>
                        <td>{item.branchName}</td>
                        <td>{item.packageCode}</td>
                        <td>{item.packageName}</td>
                        <td>{item.remarks}</td>
                        <td><a data-reveal-id="edIt" onClick={(e)=>this.modify(item,e)}>修改</a><a data-reveal-id="addalldata" 
                        onClick={(e) => {e.stopPropagation();
                        this.setState({
                            packageId: item.packageId
                        })
                    }}
                        >删除</a><a data-reveal-id="contectM" onClick={(e) => {this.chooseItem(item.checkupList,item.branchCode,e)
                            this.setState({
                                packageId: item.packageId
                            })
                        }}>关联项目</a></td>
                    </tr>
                            )
                        })
                    }
                  



                    </tbody>
                </table>
            </div>
            <Pagination totalPage={this.state.totalPage} jump={this.jump.bind(this)} ref="page"/>
        </div>

    {/*新增*/}
   <div id="edIt" className="reveal-modal">
    <h1>{this.state.action=='add'?'新增':'修改'}体检套餐</h1>
    <div className="main">
        <div className="clearfix"></div>
        <div className="edit-time">
            <label className="fl" >体检套餐代码:<span className='required-time'>*</span></label>
            <input type="text" className="tl fl width20" placeholder="" data-input-clear={5}  ref="packageCode" disabled={this.state.disabled}/>
            <label className="fl">体检套餐名称:<span className='required-time'>*</span></label>
            <input type="text" className="tl fl width20" placeholder="" data-input-clear={5}  ref="packageName"/>
        </div>
        <div className="clearfix"></div>
        <div className="edit-time">
        <label className="fl">分公司<span className='required-time'>*</span></label>
        <select disabled={this.state.action==='edit'}  ref="branchCode" className="fl-none fl width30" name="choose" id="choose" value={this.state.branchCode} onChange={(e)=>this.setState({
            branchCode:e.target.value
                 })}>
             <option value="">请选择</option>
                {this.state.branchList.map((item, index) => {
                    return (
                        <option key={index} value={item.branchCode}>{item.branchName}</option>
                    )
                })}
                </select> 

        </div>
        <div className="clearfix"></div>
        <div className="edit-time">
            <label className="fl">备注:</label>
            <textarea   className="tl fl width70" id="textarea" rows="5" placeholder="" ref="remarks"></textarea>
        </div>
        <div className="clearfix"></div>
        <div className="btn-main m-t-2">
            <span><a  className="button btn-color-red" onClick={()=>this.ok()}>确 认</a></span>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <span><a  className="button" onClick={() => {window.$('.reveal-modal').trigger('reveal:close');}}>取 消</a></span>
        </div>
		    </div>
		    <a className="close-reveal-modal">&#215;</a>
		</div>
    
{/*删除*/}
<div id="addalldata" className="reveal-modal">
    <h1>提示信息</h1>
    <div className="main">
        <p className="tallyou">确定要删除吗？</p>
        <div className="btn-main m-t-2">
            <span><a  className="button btn-color-red" onClick={() => this.del(this.state.packageId)}>确 认</a></span>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <span><a  className="button" onClick={() => {window.$('.reveal-modal').trigger('reveal:close');}}>取 消</a></span>
        </div>
		    </div>
		    <a className="close-reveal-modal">&#215;</a>
		</div>


{/*关联项目*/}
<div id="contectM" className="reveal-modal">
<h1>关联体检项目</h1>
<div className="main">
    <div className="main1"  id="">
        <div className="box1 table-overflow m-b-2">
            <table width="100%" border="0" className="table1">
                <tbody>
                <tr>
                    <th><input type="checkbox" onChange={(e)=>this.chooseAll(e)}/>全选</th>
                    <th>名称</th>
                    <th>费用</th>
                </tr>
                {
                    this.state.itemList.map((item,index)=>{
                        return(
                <tr key={index}>
                    <td><input value={item.checkupItemId} name="checkbox" type="checkbox" /></td>
                    <td>{item.checkupItemName}</td>
                    <td>{item.cost}</td>
                </tr>
                        )
                    })
                } 
                </tbody>
            </table>
        </div>
    </div>
    
        </div>
        <div className="btn-main m-t-2">
        <span><a  className="button btn-color-red" onClick={()=>this.query()}>确 认</a></span>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <span><a  className="button btn-color-red" onClick={() => {window.$('.reveal-modal').trigger('reveal:close');}}>取 消</a></span>
    </div>
        <a className="close-reveal-modal">&#215;</a>
    </div>

    {/*关联项目详情*/}
    <div id="contectMs" className="reveal-modal">
    <h1>关联体检项目详情</h1>
    <div className="main">
        <div className="main1"  id="">
            <div className="box1 table-overflow m-b-2">
                       <span style={{whiteSpace:"initial"}}>{this.state.itemLists}</span>
            </div>
        </div>
        
            </div>
      
            <a onClick={()=>this.quxiao()} className="quxiao">&#215;</a>
        </div>
        <div className="hides"></div>
</div>
        )
}
}


export default FenmechanismPackage