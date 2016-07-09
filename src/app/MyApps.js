import React from 'react';
import ReactDOM from 'react-dom';
import {GridList, GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import Subheader from 'material-ui/Subheader';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';
import { connect } from 'react-redux';
import {moveMyAppToT2Apps} from './actions';

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


 const MyApps = ({appList,moveToT2Apps}) => (
  <div style={styles.root}>
    <GridList
      cellHeight={200}
      style={styles.gridList}
    >
      <Subheader>Your Scripts</Subheader>
      {appList.map((tile) => (
        <GridTile
          key={tile.img}
          title={tile.title}
          subtitle={<span>by <b>{tile.author}</b></span>}
          onClick={() => moveToT2Apps(tile.id)}
        >
          <img src={tile.img}  />
        </GridTile>
      ))}
    </GridList>
  </div>
);

const mapStateToProps = (state) => {
  return {
    appList: state.myAppIds.map((v) => state.apps.get(v+""))
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    moveToT2Apps: (id) => {
      dispatch(moveMyAppToT2Apps(id))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MyApps);