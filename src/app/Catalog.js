import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import {GridList, GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import Subheader from 'material-ui/Subheader';
import CheckBox from 'material-ui/svg-icons/toggle/check-box';
import { connect } from 'react-redux';
import { toggleT2AppFromMyList, addT2AppsToMyApps ,showFlashMessage} from './actions';
import { List, Map } from 'immutable';

const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  gridList: {
    width: 500,
    height: 500,
    overflowY: 'auto',
    marginBottom: 24,
  },
};



const MyCheckbox = ({id,installed,title,toggleToMyApps,flashMessage}) => {
  const color = installed ? 'green' : 'white';
  const message = title + (installed ? ' has been removed from ': ' has been added to ') + ' your dashboard';
  var snackOpen = false;
  var onClick = () => {
       flashMessage(message);
  	   toggleToMyApps(id);
  }

  return (
    <IconButton onClick={onClick} >
      <CheckBox color={color} />
    </IconButton>
  );
}

const Catalog = ({appList,toggleToMyApps,flashMessage}) => {

	return (
  <div style={styles.root}>
    <GridList
      cellHeight={200}
      style={styles.gridList}
    >
      <Subheader>T2 Catalog</Subheader>
      {appList.map((tile) => (
      	
        <GridTile
          key={tile.id}
           {...tile}
          
          subtitle={<span>by <b>{tile.author}</b></span>}
          
          actionIcon={<MyCheckbox {...tile} toggleToMyApps={toggleToMyApps} flashMessage={flashMessage} />}
        >
          <img src={tile.img} />

        </GridTile>
      
       
      ))}
    </GridList>
  </div>);
};

const mapStateToProps = (state) => {
  return {
    appList: Map(state.apps).toArray()
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    toggleToMyApps: (id) => {
      dispatch(toggleT2AppFromMyList(id))
    },
    flashMessage: (text) => dispatch(showFlashMessage(text))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Catalog);