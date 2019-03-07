import React, { Component } from 'react';
import Pagination from '../../pagination/Pagination';
import MonthlySelect from '../../monthlySelect/MonthlySelect'
import * as api from '../../../config/api'
import message from 'antd/lib/message';
import * as tools from '../../../config/tools' 
import './mechanismPackage.css'
//机构体检套餐维护
const $ = window.$;
class MechanismPackage extends Component{
    constructor(args){
        super();
        this.state={
            totalPage: 1,
            jumpPage: 1,
            partyBranchPackageList:[],
            itemList:[],
            action:"add",
            branchCode:"",
            cityCode:"",
            healthChkpartyId:"",
            branchCode1:"",
            cityCode1:"",
            healthChkpartyId1:"",
            partyIds:"",
            branchCodes:"",
            cityCodes:"",
            packageCode:"",
            packageName:"",
            packagePrice:"",
            packageId:"",
            disabled :false,
            allChecked:"",
            itemLists:""
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
      change2(branchCode1,cityCode1,healthChkpartyId1){
        this.setState({
          branchCode1,
          cityCode1,
          healthChkpartyId1
        })
      }
      change3(branchCodes,cityCodes,partyIds){
        this.setState({
          branchCodes,
          cityCodes,
          partyIds
        })
      }
    show(num){
        let params={
            classify:1,
            pageno:num===1?1:this.state.jumpPage,
            branchCode:this.state.branchCode,
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
                            totalPage:data.totalPager,
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
     chooseItem(checkupLists,branchCode,e){
        e.stopPropagation();
        this.projectSelect(checkupLists,branchCode)
     }
     projectSelect(checkupLists,branchCode) {
        let parmas={
            branchCode:branchCode
        }
        api.checkupitemmstel(parmas).then((data) => {
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
     appends(){
       
         this.setState({
            action:"add",
            branchCodes:"",
            cityCodes:"",
            partyIds:"",
            disabled:false
         })
         for (let i in this.refs){
            this.refs[i].value=""
        }
          this.refs.monthlySelect1.rest()  
     }
     modify(item,e){
        e.stopPropagation();
         this.setState({
             action:"edit",
             packageId:item.packageId,
             branchCodes:item.branchCode,
             cityCodes:item.cityCode,
             partyIds:item.partyId,
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
         if(this.refs.packagePrice.value===""){
            message.error('请输入套餐价格');
                 return;
                }
        if(this.state.branchCode1===""){
            message.error('请输入分公司');
                return;
                        }
        if(this.state.cityCode1===""){
            message.error('请输入城市');
                return;
                                } 
        if(this.state.healthChkpartyId1===""){
           message.error('请输入医院名称');
             return;
            }                                                 
         let params={
            Classify:1,
            branchCode:this.state.branchCode1,
            cityCode:this.state.cityCode1,
            partyId:this.state.healthChkpartyId1,
            packageCode:this.refs.packageCode.value,
            packageName:this.refs.packageName.value,
            PackagePrice:this.refs.packagePrice.value,
            remarks:this.refs.remarks.value,
            
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
        let params={
            classify:1,
            branchCode:this.state.branchCodes,
            cityCode:this.state.cityCodes,
            partyId:this.state.partyIds,
            packageCode:this.refs.packageCode.value,
            packageName:this.refs.packageName.value,
            packagePrice:this.refs.packagePrice.value,
            remarks:this.refs.remarks.value,
            packageId:this.state.packageId
         }
         if(this.refs.packageName.value===""){
            message.error('请输入套餐名称');
                 return;
         }
         if(this.refs.packagePrice.value===""){
            message.error('请输入套餐价格');
                 return;
         }
         if(this.state.branchCodes===""){
            message.error('请输入分公司');
                return;
                        }
        if(this.state.cityCodes===""){
            message.error('请输入城市');
                return;
                                } 
        if(this.state.partyIds===""){
           message.error('请输入医院名称');
             return;
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
    rests(){
  
        this.setState({
            branchCode:"",
            cityCode:"",
            healthChkpartyId:"",
            packageCode:"",
            packageName:"",
           
        })
        this.refs.monthlySelect.rest()  
    }
    chooseAll(e){
        $(".checkBox").prop("checked", e.target.checked);
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
               
           }else{
             tools.toast.error(data.errMsg || '网络错误')
             window.$('.reveal-modal').trigger('reveal:close');
           }     
         })  
    }
    lowe=(e)=>{
        e.target.value=e.target.value.replace(/[^\d.]/g, "").
        //只允许一个小数点              
        replace(/^\./g, "").replace(/\.{2,}/g, ".").
        //只能输入小数点后两位
        replace(".", "$#$").replace(/\./g, "").replace("$#$", ".").replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3')
    }
    checkBox(){
        $(".checkBoxs").prop("checked", false);
    }
    details(branchCode,packageCode){
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
                <MonthlySelect change={this.change.bind(this)}  ref="monthlySelect"/>
                </div>
                <div className="clearfix"></div>
                <div>
                    <label className="fl">体检套餐代码：</label>
                    <input type="text" className="tl fl width20" placeholder="" data-input-clear={5}  onChange={(e)=>
                      this.setState({
                        packageCode:e.target.value
                      })
                    } value={this.state.packageCode} />
                    <label className="fl">体检套餐名称:</label>
                    <input type="text" className="tl fl width20" placeholder="" data-input-clear={5}  onChange={(e)=>
                    this.setState({
                        packageName:e.target.value
                    })} value={this.state.packageName}/>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <a className="button btn-color-red" onClick={()=>this.show(1)}>查 询</a>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a className="button"  onClick={()=>this.rests()}>重 置</a>

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
                        <th>城市</th>
                        <th>机构名称</th>
                        <th>体检套餐代码</th>
                        <th>体检套餐名称</th>
                        <th>套餐价格（元）</th>
                        <th>备注</th> 
                        <th>操作</th>
                    </tr>
                    {
                        this.state.partyBranchPackageList.map((item,index)=>{
                            return (
                        <tr key={index} onClick={()=>this.details(item.branchCode,item.packageCode)}>
                        <td>{index+1}</td>
                        <td>{item.cityName}</td>
                        <td>{item.partyName}</td>
                        <td>{item.packageCode}</td>
                        <td>{item.packageName}</td>
                        <td>{item.packagePrice}</td>
                        <td>{item.remarks}</td>
                        <td><a data-reveal-id="edIt" onClick={(e)=>this.modify(item,e)}>修改</a><a data-reveal-id="addalldata" 
                        onClick={(e) => {e.stopPropagation();
                        this.setState({
                            packageId: item.packageId
                        })
                    }}
                        >删除</a><a data-reveal-id="contectM" onClick={(e) => {this.chooseItem(item.checkupList,item.branchCode,e)
                            this.setState({
                                packageId: item.packageId,
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
                        <th><input type="checkbox" onChange={(e)=>this.chooseAll(e)} className="checkBoxs"/>全选</th>
                        <th>名称</th>
                        <th>费用</th>
                    </tr>
                   
                    {
                        this.state.itemList.map((item,index)=>{
                            return(
                    <tr key={index}>
                        <td><input value={item.checkupItemId} name="checkbox" type="checkbox"  className="checkBox" onClick={(e)=>this.checkBox(e)}/></td>
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
            <span><a  className="button btn-color-red " onClick={()=>this.query()}>确 认</a></span>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <span><a  className="button btn-color-red " onClick={() => {window.$('.reveal-modal').trigger('reveal:close');}}>取 消</a></span>
        </div>
		    <a className="close-reveal-modal">&#215;</a>
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
        <div className="edit-time">
            <label className="fl">套餐价格:<span className='required-time'>*</span></label>
            <input type="text" className="tl fl width20" placeholder="" data-input-clear={5}  ref="packagePrice" onKeyUp={this.lowe} />
            </div>
        <div className="clearfix"></div>
        <div className="edit-time">
            {
                this.state.action=="add"? <MonthlySelect change={this.change2.bind(this)}  ref="monthlySelect1"  />:
                <MonthlySelect dis={true} change={this.change3.bind(this)}   branchCode={this.state.branchCodes} cityCode={this.state.cityCodes}  partyId={this.state.partyIds}/>
            }
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



export default MechanismPackage