const {observable,action,autorun}=require("mobx");

const store=observable({
	sourceAddress:"2p1a0101",
	selection:{}
})
const highlightSourceText=action(address=>{
	store.sourceAddress=address;
});

module.exports={store,highlightSourceText};