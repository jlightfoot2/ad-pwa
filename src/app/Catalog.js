import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import {GridList, GridTile} from 'material-ui/GridList';

import Subheader from 'material-ui/Subheader';

import { connect } from 'react-redux';
import { toggleT2AppFromMyList, showFlashMessage} from './actions';
import { Map } from 'immutable';
import AppButtonIcon from './AppButtonIcon.js';

const styles = {
  gridList: {
    overflowY: 'auto'
  }
};

class Catalog extends Component {
  componentWillMount () {
    this.props.appBarTitle && this.props.appBarTitle("T2 Catalog");
  }
  render () {
    var {appList, device} = this.props;
    var cols = device.size === 'small' ? 2 : 4;
    return (
    <div>
      <GridList
        cellHeight={200}
        style={styles.gridList}
        cols={cols}
      >

        {appList.map((tile) => (
          <GridTile
            key={tile.id}
            {...tile}
            subtitle={<span>by <b>{tile.author}</b></span>}
            actionIcon={<AppButtonIcon {...tile} />}
          >
            <img src={tile.img} />

          </GridTile>
        ))}
      </GridList>
    </div>);
  }

};

const mapStateToProps = (state) => {
  return {
    appList: Map(state.apps).toArray(),
    device: state.device
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    toggleToMyApps: (id) => dispatch(toggleT2AppFromMyList(id)),
    flashMessage: (text) => dispatch(showFlashMessage(text))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Catalog);