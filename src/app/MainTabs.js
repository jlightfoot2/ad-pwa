import React from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';
// From https://github.com/oliviertassinari/react-swipeable-views
import SwipeableViews from 'react-swipeable-views';
import { connect } from 'react-redux';
import { tabChangeIndex } from './actions';
import Catalog from './Catalog.js';
import MyApps from './MyApps.js';
const styles = {
  headline: {
    fontSize: 24,
    paddingTop: 16,
    marginBottom: 12,
    fontWeight: 400,
  },
  slide: {
    padding: 10,
  },
};

const MainTabs = ({slideIndex,handleTabChange}) => {

  const handleChange = (value) => {
 
      handleTabChange('mainTab',value);
  };

    return (
      <div>
        <Tabs
          onChange={handleChange}
          value={slideIndex}
        >
          <Tab label="My Apps" value={0} />
          <Tab label="T2 Catalog" value={1} />
        </Tabs>
        <SwipeableViews
          index={slideIndex}
          onChangeIndex={handleChange}
        >
          <div>
            <MyApps />
          </div>
          <div style={styles.slide}>
            <Catalog />
          </div>
        </SwipeableViews>
      </div>
    );
}



const mapStateToProps = (state) => {
  return {
    slideIndex: state.view.tabs.mainTab
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleTabChange: (id,index) => dispatch(tabChangeIndex(id,index))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainTabs);

