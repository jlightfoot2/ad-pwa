import React,{Component} from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';
// From https://github.com/oliviertassinari/react-swipeable-views
import SwipeableViews from 'react-swipeable-views';
import { connect } from 'react-redux';
import { tabChangeIndex } from './actions';
import Catalog from './Catalog.js';
import MyApps from './MyApps.js';

class MainTabs extends Component {
  componentWillMount () {
    this.props.appBarTitle && this.props.appBarTitle('');
  }
  render () {
    var {slideIndex, handleTabChange} = this.props;
    const handleChange = (index) => {
      this.props.appBarTitle(tabs[index].title);
      handleTabChange('mainTab', index);
    };

    var tabs = [
      {title: 'MyApps', ele: <MyApps {...this.props} />, i: 0},
      {title: 'T2 Catalog', ele: <Catalog {...this.props} />, i: 1}
    ];
    return (
      <div>
        <Tabs
          style={{opacity: 0.5}}
          onChange={handleChange}
          value={slideIndex}
        >
          {tabs.map(({title, i}) => (<Tab label={title} value={i} />))}

        </Tabs>
        <SwipeableViews
          index={slideIndex}
          onChangeIndex={handleChange}
        >
        {tabs.map(({ele}, i) => {
          return <div>{ele}</div>;
        })}
        </SwipeableViews>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    slideIndex: state.view.tabs.mainTab
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleTabChange: (id, index) => dispatch(tabChangeIndex(id, index))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainTabs);

