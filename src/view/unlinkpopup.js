const React=require("react");
const E=React.createElement;
const styles={
	popup:{
		position:"absolute",
		padding:"5px"
	}
	,container:{
		top:"-2em",
		position:"relative",
		zIndex:200	
	}
	,button:{
		cursor:"pointer",
		color:"yellow",
		background:"red",
		borderRadius:"5px"
	}
}
class UnlinkPopup extends React.Component {
	render(){
		return E("span",{style:styles.popup},
				E("span",{style:styles.container},
				E("button",{style:styles.button
					,onClick:this.props.action
				},"Unlink")
			))
	}
}
module.exports=UnlinkPopup;