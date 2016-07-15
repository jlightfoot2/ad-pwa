import React from 'react';
import ReactDOM from 'react-dom';
import {GridList, GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import Subheader from 'material-ui/Subheader';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';
import { connect } from 'react-redux';
import { showFlashMessage,removeT2AppFromMyApps} from './actions';

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
  img: {
    width: '100px',
    height: '100px'
  }
};


 const MyApps = ({appList,removeT2App,flashMessage}) => (
  <div style={styles.root}>
    <GridList
      cellHeight={100}
      cols={4}
      padding={20}
      style={styles.gridList}
    >

      <Subheader>Dashboard</Subheader>

      {appList.map((tile) => (
        <GridTile
          key={tile.id}

          onClick={() => {
            flashMessage(tile.title+ " has been removed from \"My Apps\"");
            removeT2App(tile.id);
          }}
        >
          <img src={tile.img}  />
        </GridTile>
      ))}
    </GridList>
  </div>
);

const mapStateToProps = (state) => {
  return {
    appList: state.myAppIds.map((v) => state.apps[v+""])
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    removeT2App: (id) => {
      dispatch(removeT2AppFromMyApps(id))
    },
    flashMessage: (text) => dispatch(showFlashMessage(text))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MyApps);