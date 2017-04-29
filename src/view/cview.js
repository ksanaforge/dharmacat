const React=require("react");
const E=React.createElement;
const {observer}=require("mobx-react");
const {autorun}=require("mobx");
const {CorpusView}=require("ksana-corpus-view");
const {fetchArticle}=require("../unit/article");
const renderHead=function({cm,start,end,target}){
	return cm.markText(start,end,{className:"head head"+target})
}
const caret=require("../model/caret");

const decorators={
	'head':renderHead
}

class CView extends React.Component {
	constructor(props){
		super(props);
		this.state={address:caret.store.sourceAddress,
			article:{},rawlines:[],selection:0};
	}
	showtext(){
		return JSON.stringify(this.props.cor.meta);
	}
	fetchArticle(address){
		address=address||this.state.address;
		const cor=this.props.cor;
		fetchArticle(cor,address,{},res=>{
			if (res.article.at!==this.state.article.at) {
				this.setState(res);	
			}
			if (this.state.address!=address) this.setState({address});
		});
	}
	setAddress(e){
		this.setState({address:e.target.value});
	}
	setSelection({selectionText,corpus,caretText,ranges}) {
		this.setState({selection:ranges[0]});
	}
	inputkeypress(e){
		if (e.key=="Enter"){
			this.fetchArticle();
		}
	}
	render (){
		
		if (!this.props.cor) {
			return E("div",{},"cor not opened");
		}
		
		if (this.state.address!==caret.store.sourceAddress) {
			this.fetchArticle(caret.store.sourceAddress);
		}
		const range=this.props.cor.stringify(this.state.selection);

		return E("div",{},
			E("input",{value:this.state.address,onChange:this.setAddress.bind(this)
				,onKeyPress:this.inputkeypress.bind(this)}),
			E("button",{onClick:this.fetchArticle.bind(this)},"fetch"),
			E("span",{},range),
			E(CorpusView,{
				cor:this.props.cor,
				decorators,
				fields:this.state.fields,
				setSelection:this.setSelection.bind(this),
				article:this.state.article,
				rawlines:this.state.rawlines,
				address:this.state.address
			})
		);
	}
}
module.exports=observer(CView);