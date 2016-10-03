import React, {Component} from 'react';
import { connect } from 'react-redux';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import Divider from 'material-ui/Divider';
import MenuIcon from 'material-ui/svg-icons/navigation/menu';
import ArrowBack from 'material-ui/svg-icons/navigation/arrow-back';
import { Link, withRouter } from 'react-router';

const AppBarMenuIcon = ({paths, submenu, parent, onBackClick, router}) => {
  if (paths.current.level > 0) {
    return (<IconButton onTouchTap={(e) => { onBackClick(e, paths, router); }}><ArrowBack /></IconButton>);
  } else {
    return (
      <IconMenu
        iconButtonElement={
          <IconButton><MenuIcon /></IconButton>
        }
        targetOrigin={{horizontal: 'left', vertical: 'top'}}
        anchorOrigin={{horizontal: 'left', vertical: 'top'}}
        >

        {submenu.map((item) => (
           <MenuItem key={item.id} primaryText={item.name} containerElement={<Link to={item.pathname} />} />
        ))}
        <Divider />
        <MenuItem primaryText="Debug" key="99" containerElement={<Link to="/debug" />} />
        <MenuItem disabled key="0" primaryText='v0.0.4' />
      </IconMenu>);
  }
};

const mapStateToProp = (state, ownProps) => {
  return {
    paths: state.navigation.paths,
    submenu: state.navigation.paths.current.childrenIds.map((id) => (state.navigation.tree[id + ''])),
    parent: state.navigation.paths.parent
  };
};

const dispatchToProps = (dispatch, ownProps) => {

  return {
    onBackClick: (e, paths, router) => {
      var link = '/apps';
      if (paths.current.level > 0) {
        if (paths.parent) {
          link = paths.parent.pathname;
        }
      }
      console.log('onBackClick');
      router.push(link);
    }
  };
};
export default connect(mapStateToProp, dispatchToProps)(withRouter(AppBarMenuIcon));

