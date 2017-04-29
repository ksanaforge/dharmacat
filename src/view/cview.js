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
	componentDidMount(){
		setTimeout(function(){
			this.fetchArticle(this.state.address);
		}.bind(this),500);
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
		});
	}
	setAddress(e){
		this.setState({address:e.target.value});
	}
	setSelection({cm,selections,selectionText,corpus,caretTexts,ranges}) {
		caret.setSourceRange(ranges[0]);
		caret.setSourceSelection(selections,selectionText,caretTexts);
		this.setState({selection:ranges[0]})
	}
	inputkeypress(e){
		if (e.key=="Enter"){
			this.fetchArticle(this.state.address);
		}
	}
	render (){
		if (!this.props.cor) {
			return E("div",{},"cor not opened");
		}
		
		const range=this.props.cor.stringify(this.state.selection);

		return E("div",{},
			E("input",{value:this.state.address,
				onChange:this.setAddress.bind(this)
				,onKeyPress:this.inputkeypress.bind(this)}),
			E("span",{},range),
			E(CorpusView,{
				cor:this.props.cor,
				decorators,
				hlAddress:caret.store.sourceHightlightAddress,
				fields:this.state.fields,
				setSelection:this.setSelection.bind(this),
				article:this.state.article,
				rawlines:this.state.rawlines,
				address:caret.store.sourceAddress
			})
		);
	}
}
module.exports=observer(CView);