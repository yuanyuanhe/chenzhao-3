import React, { Component } from 'react';
import Header from './header/Header'
import Menu from './menu/Menu'
import Breadcrumb from './breadcrumb/Breadcrumb'
import { Link, withRouter } from 'react-router-dom';
const $ = window.$;
class App extends Component {
  constructor(args) {
    super()
  }
  componentDidMount() {
    this.addRequired()
    if (localStorage.getItem('type') === true) {
      localStorage.setItem('type', 1)
    }
  }
  componentWillReceiveProps(nextProps) {
    setTimeout(()=>{
       this.addRequired()
    })
  }
  addRequired(){
    $('.required').after('<span class="required-input">*</span>');
  }
  render() {
    return (
      <div className='app' > 
            <Header/>
              <Menu />
              <Breadcrumb />
              {this.props.children}      
          </div>
    );
  }
}

export default withRouter(App);