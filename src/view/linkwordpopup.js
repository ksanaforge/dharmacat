const React=require("react");
const E=React.createElement;
const styles={
	popup:{
		position:"absolute",
		padding:"5px"
	}
	,container:{
		top:"-1.5em",
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
class LinkWordPopup extends React.Component {
	render(){
		return E("span",{style:styles.popup},
				E("span",{style:styles.container},
				E("button",{style:styles.button
					,onClick:this.props.action
				},this.props.data)
			))
	}
}
module.exports=LinkWordPopup;