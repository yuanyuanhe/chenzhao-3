import React, { Component } from 'react';
import './menu.css'
import { Link } from 'react-router-dom';
import * as tools from '../../config/tools'
const $ = window.$;
class Menu extends Component {
  constructor(args) {
    super()
    this.state = {
        powercode:''
    }
  }
  height() {
    $('.list').height($(window).height() - 80);
  }
  componentDidMount() {
    this.height() 
  }
  componentWillMount() {
     if(localStorage.getItem('powercode')){
       this.setState({
        powercode:localStorage.getItem('powercode')
       })
    }
  }
  componentWillReceiveProps(nextProps) {
    this.height()
  }
  render() {
    let yytj='0012,0013,0014,0015,0011'
    let yygl='0014,0015'
    let cxzx='0012,0013,0014,0015'
    let bbzx='0014,0015'
    let htsz='0015'
    let htqx='0016'
    let htxt='0015,0016'
    return (
      <div className="list">
              <ul className="yiji">
                {tools.Power(yytj,this.state.powercode)?<li><Link to="/appointmentExamination">预约体检</Link></li>:null}
                {tools.Power(yygl,this.state.powercode)?<li><Link to="/appointmentManage">预约管理</Link></li>:null}
                {tools.Power(cxzx,this.state.powercode)? <li><a className="inactive">查询中心</a>
                     <ul>
                       <li><Link to='/recordQuery/reservationRecordQuery'>预约记录查询</Link></li>
                     </ul>
                </li>:null}
                 {tools.Power(bbzx,this.state.powercode)?<li><a className="inactive">报表中心</a>
                      <ul>
                        <li><Link to='/report/monthlyreport'>月报表</Link></li>
                        <li><Link to='/report/checkout'>结账</Link></li>
                        <li><Link to='/report/datascan'>清单数据扫描</Link></li>
                      </ul>
                </li>:null}
                {tools.Power(htxt,this.state.powercode)?<li><a className="inactive">系统后台设置</a>
                      <ul>
                        {tools.Power(htsz,this.state.powercode)?<li><Link to="/admin/mechanismMaintain">体检机构维护</Link></li>:null}
                      
                        {tools.Power(htsz,this.state.powercode)?<li><Link to='/admin/mechanismPackage'>机构体检套餐维护</Link></li>:null}
                        {tools.Power(htsz,this.state.powercode)?<li><Link to='/admin/fenmeweihu'>分公司体检套餐维护</Link></li>:null}
                        {tools.Power(htsz,this.state.powercode)?<li><Link to="/admin/projectMaintain">体检项目维护</Link></li>:null}
                        {tools.Power(htsz,this.state.powercode)?<li><Link to="/admin/classMaintain">体检项目类别维护</Link></li>:null}
                        
                        {tools.Power(htsz,this.state.powercode)?<li><Link to='/admin/thelatestTime'>最迟预约下一个工作日时间</Link></li>:null}
                        {tools.Power(htsz,this.state.powercode)?<li><Link to='/admin/sendset'>发送设置</Link></li>:null}
                        {tools.Power(htsz,this.state.powercode)?<li><Link to='/admin/constantMaintenance'>常量维护</Link></li> :null}     
                        {tools.Power(htqx,this.state.powercode)?<li><Link to='/admin/userMaintain'>用户组维护</Link></li>:null}
                        {tools.Power(htqx,this.state.powercode)?<li><Link to='/admin/uesrJurisdiction'>用户权限设置</Link></li>:null}      
                     </ul>           
                </li>:null}
                </ul>
            </div>
    );
  }
}

export default Menu;


//  {tools.Power(htsz,this.state.powercode)?<li><Link to="/admin/settime">设置默认时间和名额</Link></li>:null}