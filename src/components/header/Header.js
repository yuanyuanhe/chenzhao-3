import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

class Header extends Component {
    constructor(args) {
        super();
        this.state={
            username:''
        }
    }
    componentDidMount() {
        this.setState({
            username:localStorage.getItem('account')
        })
    }
    sign(){
        localStorage.setItem('isLogin', false);
        window.location.reload();
    }
    render() {
        return (
            <div className="index-head">
                <div className="logo">
                </div>
                <div className="right-user">
                    <div className="head-user">
                        <span className="user-photo">
                            <img alt='headImage' src={require("../../style/images/icon.png")} />
                        </span>
                        <span className="user-name">{this.state.username}
                           &nbsp; &nbsp;<i onClick={()=>this.sign()}>退出</i>
                        </span>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(Header);