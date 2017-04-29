const {observable,action,autorun}=require("mobx");

const dictionary=require("./dictionary");
const store=observable({
	sourceAddress:"2p1a0101",
	sourceHightlightAddress:'',//only highlight, not changing caret pos
	sourceSelectionRange: 0, //selecting source krange
	sourceSelection:[], //code mirror linech
	sourceSelectedText:"",
	sourceCaretTexts:"", //text from caret to punc
	targetSelection:[],  //code mirror linech
})
var candidates=[];

const highlightSource=action(address=>{
	store.sourceHightlightAddress=address;
})
const setSourceAddress=action(address=>{
	store.sourceAddress=address;
});

const hasRange=function(sel){
	if (sel.length!==2)return false;
	return sel[0].line!=sel[1].line||sel[0].ch!=sel[1].ch;
}
const isLinkable=()=>{  //source and target has selection
	const sourceHasRange=hasRange(store.sourceSelection);
	const targetHasRange=hasRange(store.targetSelection);
	return sourceHasRange&&targetHasRange;	
}

const isInsertable=()=>{  //source and target has selection
	const sourceHasRange=hasRange(store.sourceSelection);
	return candidates.length&&!store.targetHasRange;	
}

const setSourceRange=action(function(range){
	store.sourceSelectionRange=range;
})
const setSourceSelection=action(function(selections,text,caretTexts){
	if (!selections || !selections.length)return;

	const sel=selections[0];//only take first
	store.sourceSelection=sel;
	store.sourceSelectedText=text;
	store.sourceCaretTexts=caretTexts; //從游標到第一個標點
	//kranges , ranges of 1 token, 2 tokens and so on

	candidates=dictionary.find(caretTexts);//選取文字
})
const setTargetSelection=action(function(selections,text){
	if (!selections || !selections.length)return;
	const sel=selections[0];//only take first
	store.targetSelection=sel;
})
const getCandidate=function(){
	return candidates;
}

module.exports={store,setSourceAddress,highlightSource,
	setTargetSelection,getCandidate,
	setSourceRange,setSourceSelection,isLinkable,isInsertable};