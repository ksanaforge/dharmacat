const React=require("react");
const E=React.createElement;
const Codemirror=require("ksana-codemirror").Component;
const {serialize,deserialize}=require("../unit/serialization");
//raw input
//serialized 
const testdata=require("../testdata/n99");
const footnotes=require("../testdata/footnotes");
//deserialized

class TranslationView extends React.Component {
	constructor(props){
		super(props);
		this.state={data:testdata,sourcemarkups:[],
			footnote:"",value:"",rawmode:true}
	}
	showFootNote(e){
		this.setState({footnote:footnotes[e.target.innerHTML]});
	}
	createFootNote(start,footnote){
		const widget=document.createElement("span");
		widget.className="footnote";
		widget.innerHTML=footnote.match(/fn(\d+)/)[1];
		widget.onmouseenter=this.showFootNote.bind(this);
		widget.dataset.payload=footnote;
		this.cm.setBookmark(start,{widget,handleMouseEvents:true});
	}
	renderMarkups(){
		this.cm.getAllMarks().forEach(m=>m.clear());
		for (var i=0;i<this.state.markups.length;i++) {
			const mrk=this.state.markups[i];
			const start=this.cm.posFromIndex(mrk[0]);
			const end=this.cm.posFromIndex(mrk[1]);
			const r=this.props.cor.parseRange(mrk[2]);
			if (r.start) {
				this.cm.markText(start,end,{className:"source",payload:mrk[2]});
			} else {
				this.createFootNote(start,mrk[2].substr(1,mrk[2].length-2));
			}
		}
	}
	componentWillReceiveProps(nextProps){
		if (nextProps.cor!==this.props.cor && nextProps.cor && this.cm) {
			this.previewMode();
		}
	}
	setCM(cmviewer){
		if (!cmviewer)return;
		this.cm=cmviewer.getCodeMirror();
	}
	rawMode(){
		if (this.state.rawmode)return;
		const value=serialize(this.cm);
		this.setState({rawmode:true,value,data:value});
	}
	previewMode(){
		if (!this.state.rawmode)return;
		const {value,markups}=deserialize(this.state.data);

		this.setState({rawmode:false,value,markups},()=>{
			this.renderMarkups();
		});
	}
	render(){
		return E("div",{},
				E("button",{onClick:this.previewMode.bind(this)},"Preview"),
				E("button",{onClick:this.rawMode.bind(this)},"Raw"),
				E("span",{},this.state.footnote),
				E(Codemirror,{ref:this.setCM.bind(this),value:this.state.value,theme:"ambiance"})
			);
	}
}
module.exports=TranslationView;
