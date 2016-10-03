/**
 * In this file, we create a React component
 * which incorporates components provided by Material-UI.
 */
import React, {Component} from 'react';

import {deepOrange500} from 'material-ui/styles/colors';

import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import AppBar from 'material-ui/AppBar';

import MenuIcon from 'material-ui/svg-icons/navigation/menu';
import IconButton from 'material-ui/IconButton/IconButton';
import ArrowBack from 'material-ui/svg-icons/navigation/arrow-back';
import AppBarMenuIcon from './AppBarMenuIcon.js';
import {Link} from 'react-router';
import AppSnackBar from './AppSnackBar.js';
import { connect } from 'react-redux';
import {deviceActions} from 'local-t2-device-redux';
import {UpdateDialogContainer} from 'local-t2-app-redux/lib/components';

var {windowResize} = deviceActions;

const styles = {
  wrapper: {
    overflowY: 'auto'
  },
  content: {
    display: 'flex',
    justifyContent: 'center',
    flexFlow: 'row',
    height: '100%'
  },
  bgDiv: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    background: 'url(' + require('../images/flag.jpg') + ') center center',
    opacity: 0.1,
    width: '100%',
    height: '100%',
    zIndex: -2
  }
};

class Main extends Component {
  constructor (props, context) {
    super(props, context);

    this.handleRequestClose = this.handleRequestClose.bind(this);
    this.handleTouchTap = this.handleTouchTap.bind(this);
    this.handleTitle = this.handleTitle.bind(this);

    this.state = {
      open: false,
      title: ''
    };
  }
  componentWillMount () {
    this.props.dispatch(windowResize(window.innerWidth, window.innerHeight));
  }
  handleRequestClose () {
    this.setState({
      open: false
    });
  }

  handleTouchTap () {
    this.setState({
      open: true
    });
  }

  handleTitle (title) {
    this.setState({
      title: title
    });
  }

  render () {
    var {device} = this.props;
    var navBarHeight = 64;
    var wrapper = {...styles.wrapper, minHeight: device.height};
    var content = {...styles.content, minHeight: device.height - navBarHeight};
    return (
        <div style={wrapper}>
          <div style={styles.bgDiv} />
          <AppBar title={this.state.title}
            titleStyle={{zIndex: -1, position: 'relative', left: -20, textAlign: 'center', width: '100%'}}
            iconElementLeft={<AppBarMenuIcon />}

          />
          <div style={content}>
            {React.cloneElement(this.props.children, {appBarTitle: this.handleTitle})}
          </div>
          <AppSnackBar />
          <UpdateDialogContainer />
        </div>
    );
  }
}

export default connect(
  (state) => ({
    device: state.device
  }),
  (dispatch, ownProps) => {
    return {
      dispatch: dispatch
    };
  }
  )(Main);
