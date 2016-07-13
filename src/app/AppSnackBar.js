import React,{Component} from 'react';
import Snackbar from 'material-ui/Snackbar';
import { connect } from 'react-redux';
import {hideFlashMessage} from './actions'
const AppSnackBar = ({open,message,close}) => {

	return (
        <Snackbar
          open={open}
          message={message}
          autoHideDuration={2000}
          onRequestClose={close}
        />
		);
}




const mapStateToProps = function(state,ownProps){
	return {
		message: state.view.flash.message,
		open: state.view.flash.open
	}
}
const mapDispatchToProps = function(dispatch){
	return {
		close: () => dispatch(hideFlashMessage())
	}
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppSnackBar);