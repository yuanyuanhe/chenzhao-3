import React,{Component} from 'react'
import {getObject} from '../../config/tools'
class Pagination extends Component {
	constructor(args) {
		super();
		this.state = {
			jumpPage: 1
		}
	}
	static defaultProps = {
		totalPage: 0,
		jump: () => {}
	}
	jumpPage(page) {
		this.setState({
			jumpPage: page
		})
		this.props.jump(page);
	}
	indexpage(page){
		this.setState({
			jumpPage: page
		})
	}
	previousPage() {
		let page = this.state.jumpPage - 1;
		if (page < 1) {
			page = 1;
		}
		this.setState({
			jumpPage: page
		})
		this.props.jump(page);
	}
	nextPage(e) {
		let page = this.state.jumpPage + 1;
		if (page > this.props.totalPage) {
			page = this.props.totalPage;
		}
		this.setState({
			jumpPage: page
		})
		this.props.jump(page);
	}
	lastPage() {
		let page = this.props.totalPage;
		this.setState({
			jumpPage: page
		})
		this.props.jump(page);
	}
	componentWillReceiveProps(nextProps){
		if(nextProps.changePage !== undefined && this.props.changePage !== nextProps.changePage){
			this.jumpPage(nextProps.changePage);
		}
	}
	render(){
		let totalPage = this.props.totalPage;
		let jumpPage = this.state.jumpPage;
		return(
				   <div>
				      {this.props.totalPage>1?
						<ul className="mui-pagination mui-pagination-lg tr">
				
						    {jumpPage === 1 ?null:<li className="mui-previous" onClick={()=>this.previousPage()}>
						        <a>«</a>
						    </li>}


						    {getObject(totalPage).map((item,index)=>{
						    	let page = index + 1;
						    	let a = jumpPage <= 6 && index < 10;
						    	let b = jumpPage >6 && (Math.abs(page-jumpPage)<=4 || page - jumpPage === -5);
						    	let c = totalPage - jumpPage < 5 && totalPage - index <= 10; 
						    	return(
						    		<li style={{display:a || b || c?'inline':'none'}} key={index} onClick={()=>this.jumpPage(page)}>
						    		   <a className={jumpPage===page?"active":""}>{page}</a>
						    		</li>
						    		)
						    })}
					        {jumpPage === totalPage ?null:
						    <li className="mui-next mui-disabled" onClick={()=>this.nextPage()}>
						        <a>»</a>
						    </li>
						    }

						</ul>
					:null}
					</div>
			)
	}
}
export default Pagination;