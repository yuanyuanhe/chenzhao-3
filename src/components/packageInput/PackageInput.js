import React, { Component } from 'react';
import * as api from '../../config/api'
import * as tools from '../../config/tools'
const $ = window.$;
class PackageInput extends Component {
  constructor(args) {
    super()
    this.state = {
      partyBranchPackageList: [],
      packageName: ''
    }
  }
  static defaultProps = {
    change: 　() => {},
    packageCode: ''
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      packageName: nextProps.packageName
    })
  }
  PackageSelect() {
    let params = {
      branchCode:this.props.branchCode
    }
    api.partybranchpackage_selectalpackage(params).then((data) => {
      if (tools.checkResult(data)) {
        this.setState({
          partyBranchPackageList: data.packageList
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
    $('#editPackage').find('input[type=checkbox]').each((index, el) => {
      if (this.props.packageCode.split(',').indexOf($(el).val()) !== -1) {
        $(el).attr("checked", true);
      }
    })
  }
  saveChoosePackage() {
    let packageName = '';
    let packageCode = '';
    $('#editPackage').find('input[name="checkbox"]:checked').each(function(index, el) {
      packageName += `${$(el).parent().next().text()},`
      packageCode += `${$(el).val()},`;
    });
    this.setState({
      packageName
    })
    this.props.change(packageName,packageCode);
    $('.reveal-modal').trigger('reveal:close');
  }
  render() {
    return (
      <div id='tjxm'>
                  <label className="fl " style={{marginLeft:"-3px"}}>体检套餐</label>
                  <input onFocus={()=>{this.PackageSelect();$("#editPackage").reveal("{data-animation:'none'}");}} value={this.state.packageName} type="text" className="tl fl width40" data-input-clear={5} />
                  <a onClick={()=>this.PackageSelect()} data-reveal-id="editPackage" ><img alt='icon' className='inputImg'  src={require('../../style/images/edit-ico.png')} /></a>
                 
                    <div id="editPackage" className="reveal-modal">
                      <h1>体检套餐修改</h1>
                      <div className="main"> 
{/*                        <div className="reveal-modal-title">体检套餐</div> */}
                        <div className="reveal-modal-main xiangmu">
                          {this.state.partyBranchPackageList.map((item,index)=>{
                            return(
                                  <dl key={index}>
                                    <dt><input value={item.packageCode} name="checkbox" type="checkbox" /></dt>
                                    <dd>{item.packageName}</dd>
                                  </dl>
                              )
                          })}
                        </div> 
                        <div className="btn-main m-t-2">
                          <span><a onClick={()=>this.saveChoosePackage()} className="button btn-color-red">确 认</a></span>
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

export default PackageInput;