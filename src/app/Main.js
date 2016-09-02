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
var {windowResize} = deviceActions;

const styles = {
  wrapper: {
    maxWidth: '1500px',
    margin: '0 auto 0 auto',
    overflowY: 'auto'
  },
  content: {
    backgroundImage: 'url(' + require('../images/wallpaper/cold-ocean.jpg') + ')',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    display: 'flex',
    height: '100%'
  }
};

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: '#315B85',
    primary2Color: '#315B85',
    accent1Color: '#DEA326',
    accent2Color: '#DEA326',
    accent3Color: '#DEA326'
  }
});

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
    var wrapper = {...styles.wrapper,height: device.height};
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div style={wrapper}>
          <AppBar title={this.state.title}
            titleStyle={{textAlign: 'center'}}
            iconElementLeft={<AppBarMenuIcon />}
          />
          <div style={styles.content}>
            {React.cloneElement(this.props.children, {appBarTitle: this.handleTitle})}
            <AppSnackBar />
          </div>
        </div>
      </MuiThemeProvider>
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
