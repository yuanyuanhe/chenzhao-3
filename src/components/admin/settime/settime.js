import React, { Component } from 'react';
import Pagination from '../../pagination/Pagination';
import MonthlySelect from '../../monthlySelect/MonthlySelect'
import * as api from '../../../config/api'
import message from 'antd/lib/message';
import * as tools from '../../../config/tools'
class NotFoundPage extends Component {
    constructor(args) {
        super()
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
        }
    }
    show(){
        let params={
            classify:1,
            pageno:this.state.jumpPage,
            branchCode:this.state.branchCode,
            cityCode:this.state.cityCode,
            partyId:this.state.healthChkpartyId,
            packageCode:this.state.packageCode,
            packageName:this.state.packageName
            
        }

         api.branchpackage(params).then((data) => {
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
      rests(){

      }
      appends(){

      }
      modify(){

      }
      del(){

      }
      ok(){

      }
    render(){
    	return(
    		   	  <div className='settime'>
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
                    <a className="button btn-color-red" onClick={()=>this.show()}>查 询</a>
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
                        <th>分公司</th>
                        <th>城市</th>
                        <th>体检机构</th>
                        <th>时间</th>
                        <th>名额</th>
                        <th>备注</th> 
                        <th>操作</th>
                    </tr>
                    {
                        this.state.partyBranchPackageList.map((item,index)=>{
                            return (
                        <tr key={index}>
                        <td>{index+1}</td>
                        <td>{item.cityName}</td>
                        <td>{item.partyName}</td>
                        <td>{item.packageCode}</td>
                        <td>{item.packageName}</td>
                        <td>{item.packagePrice}</td>
                        <td>{item.remarks}</td>
                        <td><a data-reveal-id="edIt" onClick={()=>this.modify(item)}>修改</a><a data-reveal-id="addalldata" 
                        onClick={() => {
                        this.setState({
                            packageId: item.packageId
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
            <Pagination totalPage={this.state.totalPage} jump={this.jump.bind(this)} />
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


            {/*新增*/}
   <div id="edIt" className="reveal-modal">
    <h1>{this.state.action=='add'?'新增':'修改'}体检套餐</h1>
    <div className="main">
        <div className="clearfix"></div>
       
        <div className="edit-time">
            {
                this.state.action=="add"? <MonthlySelect required={true} change={this.change2.bind(this)}  ref="monthlySelect1"  />:
                <MonthlySelect required={true} change={this.change3.bind(this)}   branchCode={this.state.branchCodes} cityCode={this.state.cityCodes}  partyId={this.state.partyIds}/>
            }
        </div>
        <div className="clearfix"></div>
         <div className="edit-time">
            <label className="fl" >体检时间:<span className='required-time'>*</span></label>
            <input type="text" className="tl fl width20" placeholder="" data-input-clear={5}  ref="packageCode" />
        </div>
        <div className="edit-time">
            <label className="fl">体检名额:<span className='required-time'>*</span></label>
            <input type="text" className="tl fl width20" placeholder="" data-input-clear={5}  ref="packagePrice" />
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
    </div>
                  </div>
    		)
    }
}

export default NotFoundPage;