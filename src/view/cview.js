const React=require("react");
const E=React.createElement;

const {CorpusView}=require("ksana-corpus-view");
const {fetchArticle}=require("../unit/article");
const renderHead=function({cm,start,end,target}){
	return cm.markText(start,end,{className:"head head"+target})
}

const decorators={
	'head':renderHead
}

class CView extends React.Component {
	constructor(props){
		super(props);
		this.state={address:"2p1.0101",
			article:{},rawlines:[],selection:0};
	}
	showtext(){
		return JSON.stringify(this.props.cor.meta);
	}
	fetchArticle(){
		const cor=this.props.cor;
		fetchArticle(cor,this.state.address,{},res=>{
			this.setState(res);
		});
	}
	setAddress(e){
		this.setState({address:e.target.value});
	}
	setSelection({selectionText,corpus,caretText,ranges}) {
		this.setState({selection:ranges[0]});
	}
	render (){
		if (!this.props.cor) {
			return E("div",{},"loading....");
		}
		const range=this.props.cor.stringify(this.state.selection);
		return E("div",{},
			E("input",{value:this.state.address,onChange:this.setAddress.bind(this)}),
			E("button",{onClick:this.fetchArticle.bind(this)},"fetch"),
			E("span",{},range),

			E(CorpusView,{
				cor:this.props.cor,
				decorators,
				fields:this.state.fields,
				setSelection:this.setSelection.bind(this),
				article:this.state.article,
				rawlines:this.state.rawlines,
				address:this.state.article.startH
			})
		);
	}
}
module.exports=CView;