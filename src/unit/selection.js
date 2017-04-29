const getSelection=function(cm){ //see ksana-corpus-view/selectionactivity.js
	const sels=cm.listSelections();	
	var selections=[];
	for (var i=0;i<sels.length;i++) {
		const sel=sels[i];
		if (sel.anchor.line==sel.head.line&&
			sel.anchor.ch<sel.head.ch) {
			selections.push([sel.anchor,sel.head]);	
		} else {
			selections.push([sel.head,sel.anchor]);
		}
	}
	return selections;
}
module.exports={getSelection};