import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import * as api from '../../config/api.js'
import * as tools from '../../config/tools'
import img1 from '../../style/images/login.jpg'
import message from 'antd/lib/message';
import './login.css'
const CryptoJS=window.CryptoJS

const $ = window.$;
function encrypt(word){
    var key = CryptoJS.enc.Utf8.parse("abcdefgabcdefg12");
    var srcs = CryptoJS.enc.Utf8.parse(word);
    var encrypted = CryptoJS.AES.encrypt(srcs, key, {mode:CryptoJS.mode.ECB,padding: CryptoJS.pad.Pkcs7});
    return encrypted.toString();
   }
class Login extends Component {
    constructor(args) {
        super()
        this.state = {
            account: '',
            password: '',
            id:'',
            branchNameList:[]
        }
    }
    

    login() {

         if(!this.state.account){
          message.error('请输入用户代码');
          return;
        }
        if(!this.state.password){
          message.error('请输入用户密码');
          return;
        }
        // if(!this.state.id){
        //   message.error('请选择分公司');
        //   return;
        // }
        var  parmas = {
            account:encrypt(this.state.account),
            password: encrypt(this.state.password),
            id:encrypt(this.state.id)
        }
        api.login(parmas).then((data) => {
            if (tools.checkResult(data)) {
                tools.toast.success('登录成功')
                localStorage.setItem('isLogin', true);
                localStorage.setItem('powercode',data.rileCodeList)
                localStorage.setItem('account',data.userInfo.account) 
                localStorage.setItem('ldToken',data.ldToken) 
                window.location.reload();
            } else {
                tools.toast.error(data.errMsg || '网络错误')
            }
        },(error)=>{
            tools.toast.error(error)
        })
    }
    componentDidMount() {
        $('.login-back').height($(window).height())
    }
    blur(){
        if(this.state.account!=''){
           let parmas={
            account:this.state.account
        }
        api.loginselect(parmas).then((data)=>{
            if(tools.checkResult(data)){
                console.log(data)
                this.setState({
                    branchNameList:data.branchNameList,
                })
            }else{
                tools.toast.error(data.errMsg|| '网络错误')
            }
        }) 
        }      
    }
    render() {
        return (
            <div className='login'>
               <img className='login-back' src={img1} />
                 <div className="logingo-server">
                 
            <div className="left">
                <img src={require("../../style/images/icon.png")} />
            </div>
            <div className="right">
                <h3>MMS系统</h3>
                <div className="clearfix"></div>
                <p className="loginp"><label>用户代码</label><input type="text" 
                value={this.state.account} onBlur={()=>this.blur()}
                onChange={(e)=>this.setState({account:e.target.value})} 
                /></p>
                <p className="loginp"><label>密码</label><input type="password" 
                value={this.state.password}
                onChange={(e)=>this.setState({password:e.target.value})}
                onKeyUp = {(e) => {e.keyCode === 13 && this.login()}}
                 /></p>
                <div className="loginp">
                    <label className="" >分公司</label>
                    <select name="choose" id="choose" onChange={(e)=>this.setState({id:e.target.value})}>
                        <option value="" >请选择</option>
                        {this.state.branchNameList.map((item,index)=>{
                            return(
                                 <option key={index} value={item.id}>{item.branchName}</option>
                                )
                        })}
                       
                    </select>
                </div>
                <div className="btn-are">
                    <button value="" id="loginsure" 
                    onClick={()=>{this.login()}}
                    >登录</button>
                    <button value="" id="loginno">取消</button>
                </div>
            </div>
        </div>
</div>

    		)

        

    }
}

export default withRouter(Login);