import React from 'react';
import ReactDOM from 'react-dom';
import {GridList, GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import Subheader from 'material-ui/Subheader';
import CheckBox from 'material-ui/svg-icons/toggle/check-box';
import { connect } from 'react-redux';
import { toggleT2AppFromMyList, addT2AppsToMyApps } from './actions';
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

const MyCheckbox = ({isInstalled}) => {
  var color = isInstalled ? 'green' : 'white';
  console.log(isInstalled);
  return (
    <IconButton>
      <CheckBox color={color} />
    </IconButton>
  );
}

const Catalog = ({appList,toggleToMyApps}) => {
  console.log(appList);
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
          onClick={() => toggleToMyApps(tile.id)}
          actionIcon={<MyCheckbox isInstalled={tile.installed} />}
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
    //appListOld: state.t2AppIds.map((v) => state.apps.get(v+""))
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    toggleToMyApps: (id) => {
      dispatch(toggleT2AppFromMyList(id))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Catalog);