import React, { Component } from 'react';
import * as api from '../../config/api'
import * as tools from '../../config/tools'
import './projectInput.css'
const $ = window.$;
class ProjectInput extends Component {
    constructor(args) {
        super()
        this.state = {
            checkupItemMstList: [],
            checkupItemName: '',
            branchCode:""
        }
    }
    static defaultProps = {
        change: 　() => {},
        checkupCode: ''
    }
    componentWillReceiveProps(nextProps) {
        this.setState({
            checkupItemName: nextProps.checkupItemName,
        })
    }
    projectMaintain() {
        let params = {
           branchCode:this.props.branchCode
        }
        api.checkupitemmst_selectallitems(params).then((data) => {
            if (tools.checkResult(data)) {
                this.setState({
                    checkupItemMstList: data.itemList
                }, () => {
                    this.chooseInput();
                })
            } else {
                tools.toast.error(data.errMsg || '网络错误');
            }
        }, (err) => {
            tools.toast.offline(err);
        })
    }
    chooseInput() {
        $('#editProject').find('input[type=checkbox]').each((index, el) => {
            if (this.props.checkupCode.split(',').indexOf($(el).val()) !== -1) {
                $(el).attr("checked", true);
            }
        })
    }
    saveChooseProject() {
        let checkupItemName = '';
        let checkupItemCode = '';
        $('#editProject').find('input[name="checkbox"]:checked').each(function(index, el) {
            checkupItemName += `${$(el).parent().next().text()},`;
            checkupItemCode += `${$(el).val()},`;
        });
        this.setState({
            checkupItemName
        })
        this.props.change(checkupItemName,checkupItemCode);
        $('.reveal-modal').trigger('reveal:close');
    }
    render() {
        return (
            <div id='tjxm'>
                    <label className="fl " style={{marginLeft:"-3px"}}>体检项目</label>
                    <input onFocus={()=>{this.projectMaintain();$("#editProject").reveal("{data-animation:'none'}");}} value={this.state.checkupItemName} type="text" className="tl fl width40" data-input-clear={5} />
                    <a onClick={()=>this.projectMaintain()} data-reveal-id="editProject"><img alt='icon' className='inputImg'  src={require('../../style/images/edit-ico.png')} /></a>
                 
                    <div id="editProject" className="reveal-modal" style={{width:"780px",marginLeft:"-373px"
                    }}>
                      <h1>体检项目修改</h1>
                      <div className="main"> 
{/*                        <div className="reveal-modal-title">体检项目</div> */}
                        <div className="reveal-modal-main xiangmu">
                          {this.state.checkupItemMstList.map((item,index)=>{
                            return(
                                  <dl key={index}>
                                    <dt><input value={item.checkupItemCode} name="checkbox" type="checkbox" /></dt>
                                    <dd>{item.checkupItemName}</dd>
                                  </dl>
                              )
                          })}
                        </div> 
                        <div className="btn-main m-t-2">
                          <span><a onClick={()=>this.saveChooseProject()} className="button btn-color-red">确 认</a></span>
                          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                          <span><a className="button" onClick={() => {$('.reveal-modal').trigger('reveal:close');}} >取 消</a></span>
                        </div>
                      </div>
                      <a className="close-reveal-modal">×</a>
                    </div>
                 </div>
        )
    }
}

export default ProjectInput;