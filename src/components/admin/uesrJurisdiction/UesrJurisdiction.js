import React, { Component } from 'react';
import Iframe from 'react-iframe'
const $ = window.$;
class UesrJurisdiction extends Component {
    constructor(args) {
        super()
    }
    componentDidMount() {
        $('.content-right').height($(window).height() - 120);
    }
    render(){
    	return(
    		   	  <div className="content-right">
                            <Iframe 
                             url={`${window.server}/userauthoritysetting/search`}
                             position="relative"
                             width="100%"
                             height="100%"
                             allowFullScreen/>
    		   	  </div>
    		)
    }
}

export default UesrJurisdiction;