const React=require("react");
const E=React.createElement;
const CView=require("./cview");
const TranslationView=require("./translationview");
const {openCorpus}=require("ksana-corpus-lib");
const SplitPane=require("react-split-pane");

const styles={
	container:{display:"flex"},
	leftpanel:{flex:3},
	rightpanel:{flex:2}
}
class Main extends React.Component {
	constructor(props){
		super(props);
		this.state={cor:null};
	}
	componentWillMount(){
		openCorpus("taisho",(err,cor)=>{
			this.setState({cor});
		});
	}
	onChangeMainSize(){

	}
	render(){
		return E("div",{},
			E(SplitPane,{split:"vertical",minSize:200,
				defaultSize:800,
				style:{paddingBottom:"2em"}, //need this because splitPanel set height to 100%
				onChange:this.onChangeMainSize.bind(this)
			},
				E("div",{style:styles.leftpanel},
					E(TranslationView,{cor:this.state.cor})
				),
				E("div",{style:styles.rightpanel},
					E(CView,{cor:this.state.cor})
				)
		))
	}
}
module.exports=Main;