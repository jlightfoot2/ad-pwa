import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import {showFlashMessage, removeT2AppFromMyApps, tabChangeIndex} from './actions';
import Paper from 'material-ui/Paper';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import RaisedButton from 'material-ui/RaisedButton';

const styles = {
  content: {
    overflowY: 'auto',
    display: 'flex',
    flexFlow: 'column',
    justifyContent: 'space-between',
    alignContent: 'center',
    height: '100%'
  },

  body: {
    overflowY: 'auto',
    display: 'flex',
    flexFlow: 'row wrap',
    justifyContent: 'flex-start',
    alignContent: 'center'
  },

  appContainer: {
    width: '150px',
    height: '150px',
    textAlign: 'center',
    color: 'black',
    display: 'flex',
    flexFlow: 'column',
    justifyContent: 'center'
  },

  appActionContainer: {

    position: 'absolute',
    width: 60,
    bottom: 40,
    left: 0,
    right: 0,
    margin: '0 auto'

  },

  appImage: {
    width: '100px',
    height: '100px',
    borderRadius: '20px'
  },

  centeredLink: {

  },
  messageBox: {
    margin: 20,
    minHeight: 50,
    padding: 20,
    textAlign: 'center',
    alignSelf: 'center',
    flex: '0 0 auto'
  }
};

class MyApps extends Component {
  componentWillMount () {
    this.props.appBarTitle && this.props.appBarTitle('My Apps');
  }
  render () {
    var {appList} = this.props;
    styles.body.justifyContent = appList.length ? 'flex-start' : 'center';

    var pageContent = <Paper style={styles.messageBox} zDepth={2}><div>
          Your home page is empty! Add some apps using the button below.</div>

          <Link to="/catalog"><RaisedButton style={{margin: 10}} label="Get Started" primary={true} /></Link>
    </Paper>;
    if (appList.length > 0) {
      pageContent = appList.map((tile, i) => (
                        <div key={i + 1} style={styles.appContainer}>
                          <div>
                            <a href={tile.url} target='_blank'>
                            <img style={styles.appImage} src={tile.img} />
                            </a>
                          </div>
                          <div>
                            <span>{tile.title}</span>
                          </div>
                        </div>
                    ));
    }

    return (
      <div style={styles.content}>
        <div style={styles.body}>

        {pageContent}

        </div>
        <div style={styles.appActionContainer}>
            <Link style={styles.centeredLink} to="/catalog">
              <FloatingActionButton>
                <ContentAdd />
              </FloatingActionButton>
            </Link>
        </div>
      </div>

    );
  }
};

const mapStateToProps = (state) => {
  return {
    appList: state.myAppIds.map((v) => state.apps[v + ''])
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    removeT2App: (id) => dispatch(removeT2AppFromMyApps(id)),
    flashMessage: (text) => dispatch(showFlashMessage(text))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MyApps);
