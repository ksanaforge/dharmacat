const dictionary={
	'一':'one',
	'一時':'At one time',
	'比':['compare','than'],
	'比丘':['monk','monks','bhikkhu'],
	'正':['correct','right'],
	'正觀':'right insight',
	'如是我聞':'Thus have I heard.',
	'心':'mind',
	'解脫':['liberate','liberates','liberated'],
	'若欲自證':'if he wishes to declare himself',
	'者':'one who',
}
const find=function(caretTexts){
	var out=[];
	for (var i=0;i<caretTexts.length;i++) {
		const key=caretTexts[i][0];
		const translations=dictionary[key];
		if (!translations) continue;
		out.unshift([key,translations,caretTexts[i][1]]);
	}
	return out;
}
module.exports={find};