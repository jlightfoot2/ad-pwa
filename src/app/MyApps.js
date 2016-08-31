import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import {GridList, GridTile} from 'material-ui/GridList';

import { connect } from 'react-redux';
import {showFlashMessage, removeT2AppFromMyApps} from './actions';

const styles = {
  gridList: {
    width: 500,
    height: 500,
    overflowY: 'auto',
    marginBottom: 24
  },
  img: {
    width: '100px',
    height: '100px'
  }
};

class MyApps extends Component{
  componentWillMount () {
    this.props.appBarTitle && this.props.appBarTitle("T2 Catalog");
  }
  render () {
    var {appList} = this.props;

    var cols = appList.length < 4 ? appList.length : 4;
    return (
      <div>
        <GridList
          cellHeight={100}
          cols={cols}
          padding={20}
          style={styles.gridList}
        >
          {appList.map((tile) => (
            <a href={tile.url} target="_blank">
            <GridTile
              key={tile.id}

            >
              <img src={tile.img} />
            </GridTile>
            </a>
          ))}
        </GridList>
      </div>
    );
  }
};

const mapStateToProps = (state) => {
  return {
    appList: state.myAppIds.map((v) => state.apps[v+""])
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    removeT2App: (id) => {
      dispatch(removeT2AppFromMyApps(id))
    },
    flashMessage: (text) => dispatch(showFlashMessage(text))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MyApps);