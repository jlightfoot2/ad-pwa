import React from 'react';
import ReactDOM from 'react-dom';
import {GridList, GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import Subheader from 'material-ui/Subheader';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';
import { connect } from 'react-redux';
import { moveT2AppToMyApps } from './actions';

const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  gridList: {
    width: 300,
    height: 300,
    overflowY: 'auto',
    marginBottom: 24,
  },
};


const Catalog = ({appList,moveToMyApps}) => {
	return (
  <div style={styles.root}>
    <GridList
      cellHeight={100}
      style={styles.gridList}
    >
      <Subheader>T2 Catalog</Subheader>
      {appList.map((tile) => (
        <GridTile
          key={tile.img}
          title={tile.title}
          subtitle={<span>by <b>{tile.author}</b></span>}
          onClick={() => moveToMyApps(tile.id)}
        >
          <img src={tile.img} />
        </GridTile>
      ))}
    </GridList>
  </div>);
};

const mapStateToProps = (state) => {
  return {
    appList: state.t2AppIds.map((v) => state.apps.get(v+""))
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    moveToMyApps: (id) => {
      dispatch(moveT2AppToMyApps(id))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Catalog);