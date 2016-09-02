import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import AddAppIcon from 'material-ui/svg-icons/content/add-circle';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import {showFlashMessage, removeT2AppFromMyApps, tabChangeIndex} from './actions';
import {blue500} from 'material-ui/styles/colors';

const styles = {
  content: {
    overflowY: 'auto',
    display: 'flex',
    flexFlow: 'column',
    justifyContent: 'flex-start',
    alignItem: 'flex-start',
    marginTop: 10
  },
  body: {
    overflowY: 'auto',
    display: 'flex',
    flexFlow: 'row wrap',
    justifyContent: 'flex-start',
    marginTop: 10,
    flex: '1 1 100%'
  },
  appContainer: {
    width: '150px',
    height: '150px',
    textAlign: 'center',
    color: 'white',
    display: 'flex',
    flexFlow: 'column',
    justifyContent: 'center'
  },
  appActionContainer: {
    height: '110px',
    display: 'flex',
    flexFlow: 'column',
    justifyContent: 'center'

  },
  appImage: {
    width: '100px',
    height: '100px',
    borderRadius: '20px'
  }
};

class MyApps extends Component {
  componentWillMount () {
    this.props.appBarTitle && this.props.appBarTitle('T2 Catalog');
  }
  render () {
    var {appList, addApp} = this.props;

    return (
      <div style={styles.content}>
        <div style={styles.body}>

            {appList.map((tile, i) => (
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
            ))}

            <div style={styles.appActionContainer}>
                <Link to="/catalog"><AddAppIcon style={{width: '50px', height: '50px'}} color={blue500} /></Link>
            </div>

        </div>
        <div style={{flex: '2 1 100%'}}>
        
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