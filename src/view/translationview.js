const React=require("react");
const ReactDOM=require("react-dom");
const E=React.createElement;
const {observer}=require("mobx-react");
const Codemirror=require("ksana-codemirror").Component;
const {serialize,deserialize}=require("../unit/serialization");
const LinkWordPopup=require("./linkwordpopup");
const InsertWordPopup=require("./insertwordpopup");
const UnlinkPopup=require("./unlinkpopup");
const selection=require("../unit/selection");

const testdata=require("../testdata/n99");
const footnotes=require("../testdata/footnotes");
const caret=require("../model/caret");

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
	connectWithSource(start,end,payload){
		this.cm.markText(start,end,{className:"source",payload});
	}
	renderMarkups(){
		this.cm.getAllMarks().forEach(m=>m.clear());
		for (var i=0;i<this.state.markups.length;i++) {
			const mrk=this.state.markups[i];
			const start=this.cm.posFromIndex(mrk[0]);
			const end=this.cm.posFromIndex(mrk[1]);
			const r=this.props.cor.parseRange(mrk[2]);
			if (r.start) {
				this.connectWithSource(start,end,mrk[2]);
			} else {
				this.createFootNote(start,mrk[2].substr(1,mrk[2].length-2));
			}
		}
	}
	componentWillMount(){
		if (this.props.cor) {
			this.previewMode();
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
	sourcePosAtCursor(cm){
		const cursor=cm.getCursor();
		const m=cm.findMarksAt(cursor);
		if (m.length) {
			return m[0].payload;
		}
	}
	clearPopup(){
		this.popup&&this.popup.clear();
		this.popup=null;
	}
	makelink(e){
		const start=caret.store.targetSelection[0];
		const end=caret.store.targetSelection[1];
		const payload=this.props.cor.stringify(caret.store.sourceSelectionRange);
		this.connectWithSource(start,end,payload);
		this.clearPopup();
	}
	unlink(){
		const m=this.cm.findMarksAt(this.cm.getCursor());
		if (m && m[0]) {
			m[0].clear();
		}
		this.clearPopup();
	}
	moveToNextSourceWord(krange){
		const r=this.props.cor.parseRange(krange);
		const nextsourcepos=this.props.cor.stringify(r.end);
		caret.setSourceAddress(nextsourcepos);
	}
	insertword(translation,source,krange){
		this.moveToNextSourceWord(krange);
		const address=this.props.cor.stringify(krange);
		this.clearPopup();
		setTimeout(function(){
			//need some time for candidates to update
			const start=this.cm.getCursor();
			const end={line:start.line,ch:start.ch+translation.length};
			this.cm.replaceSelection(translation+" ");
			this.connectWithSource(start,end,address);
			this.cm.focus();
		}.bind(this),100);
	}
	showPopup(){
		this.clearPopup();
		if (this.state.rawmode)return;
		const linkable=caret.isLinkable();
		const m=this.sourcePosAtCursor(this.cm);
		const insertable=caret.isInsertable();
		var Popup=null,action=null,data="";
		if (linkable){
			data=caret.store.sourceSelectedText;
			Popup=LinkWordPopup;
			action=this.makelink.bind(this);
		}else if (insertable && !m) {
			Popup=InsertWordPopup;
			data=caret.getCandidate();
			action=this.insertword.bind(this);
		} else if (m) {
			Popup=UnlinkPopup;
			action=this.unlink.bind(this);
		}

		if (Popup) {
			const cursor=caret.store.targetSelection[0];
			const widget=document.createElement("span");
			ReactDOM.render(E(Popup,{action,data}),widget);
			this.popup=this.cm.setBookmark(cursor,{widget});
		}
	}
	onCursorActivity(cm){
		clearTimeout(this.timer);
		this.timer=setTimeout(()=>{
			const m=this.sourcePosAtCursor(cm);
			caret.highlightSource(m);
			caret.setTargetSelection( selection.getSelection(cm) );
			this.showPopup();
		},300);
	}
	render(){
		return E("div",{},
				E("button",{onClick:this.previewMode.bind(this)},"Preview"),
				E("button",{onClick:this.rawMode.bind(this)},"HTLL"),
				E("span",{},this.state.footnote),
				E(Codemirror,{ref:this.setCM.bind(this),
					onCursorActivity:this.onCursorActivity.bind(this),
					value:this.state.value,theme:"ambiance"})
			);
	}
}
module.exports=observer(TranslationView);
