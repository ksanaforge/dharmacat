const serialize=function(cm){
	const cmmarks=cm.getAllMarks();
	var out="";
	const marks=[];
	for (var i=0;i<cmmarks.length;i++) {
		const cmmark=cmmarks[i];
		const linech=cmmark.find();
		if (linech.from) {
			if (cmmark.className=="source") {
				const from=cm.indexFromPos(linech.from);
				const to=cm.indexFromPos(linech.to);
				marks.push([from,to, cmmark.payload ] );							
			}
		} else {
			const from=cm.indexFromPos(linech);
			const w=cmmark.replacedWith;
			if (!w)continue;
			if (w.className=="footnote") {
				marks.push([from,from,w.dataset.payload]);
			}
		}
	}
	marks.sort(function(a,b){
		return a[0]-b[0];
	})
	
	const text=cm.getValue();
	var now=0;
	for (var i=0;i<text.length;i++) {

		if (now<marks.length && i==marks[now][1] && i>marks[now][0]) { //close tag
			out+="}";
			now++;
		}

		if (now<marks.length&&i==marks[now][0]) {
			out+= "{"+marks[now][2];
			if (marks[now][2].substr(0,2)=="fn")  {
				out+="}";
				now++;
			} else {
				out+="|";
			}
		}

		out+=text.charAt(i);
	}
	return out;
}
const deserialize=function(rawdata){
	var taglength=0;
	var markups=[]; // start,end, type
	const value=rawdata.replace(/\{.*?\}/g,function(m,idx){
		const sep=m.indexOf("|");
		if (sep>0) { //kpos
			const text=m.substr(sep+1, m.length-sep-2);
			const kpos=m.substr(1,sep-1);
			markups.push([idx-taglength,idx-taglength+text.length, kpos ]);
			taglength+=kpos.length+3;
			return text;
		} else { //fn
			markups.push([idx-taglength,idx-taglength,m]);
			taglength+=m.length;
			return "";
		}		
	});
	return {value,markups};
}
module.exports={deserialize,serialize}