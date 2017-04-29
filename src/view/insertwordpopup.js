const React=require("react");
const E=React.createElement;
const styles={
	popup:{
		position:"absolute",
		padding:"5px"
	}
	,container:{
		top:"-1em",
		position:"relative",
		zIndex:200	
	}
	,button:{
		cursor:"pointer",
		color:"blue",
		background:"silver",
		borderRadius:"5px"
	}
}
class InsertWordPopup extends React.Component {
	constructor(props) {
		super(props);
		this.state={selected:0}
	}
	setChoice(selected){
		this.setState({selected});
	}
	renderChoice(choice,key){
		const defaultChecked=key==this.state.selected;
		return E("label",{key},
			E("input",{type:"radio","name":"choice",defaultChecked
				,onChange:this.setChoice.bind(this,key)}),choice[0]);
	}
	insertTranslation(t){
		const sourcetext=this.props.data[this.state.selected][0];
		const krange=this.props.data[this.state.selected][2];
		this.props.action(t,sourcetext,krange);
	}
	renderTranslation(choice,key){
		if (!choice)return;
		var translations=choice[1];
		if (typeof translations=="string") {
			translations=[translations];
		}
		return E("span",{},
			translations.map((t,key)=>{
				return E("span",{style:styles.button,key
					,onClick:this.insertTranslation.bind(this,t)},t);	
			})
		)
	}
	render(){
		const choice=this.props.data[this.state.selected];

		return E("span",{style:styles.popup},
				E("span",{style:styles.container},
				E("span",{},
					this.props.data.map(this.renderChoice.bind(this)),
					this.renderTranslation(choice)
				)
		))
	}
}
module.exports=InsertWordPopup;