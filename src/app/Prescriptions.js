import React from 'react';
import ReactDOM from 'react-dom';
import {GridList, GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import Subheader from 'material-ui/Subheader';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';

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
};

const tilesData = [
  {
    img: require('../images/ad_injury_home.png'),
    title: 'Physical Injuries',
    author: 'T2',
  },
  {
    img: require('../images/ad_pts_home.png'),
    title: 'PTS',
    author: 'T2',
  },
  {
    img: require('../images/ad_tobacco_home.png'),
    title: 'Tobacco',
    author: 'T2',
  }
];

 const Prescriptions = () => (
  <div style={styles.root}>
    <GridList
      cellHeight={200}
      style={styles.gridList}
    >
      <Subheader>Your Scripts</Subheader>
      {tilesData.map((tile) => (
        <GridTile
          key={tile.img}
          title={tile.title}
          subtitle={<span>by <b>{tile.author}</b></span>}
          actionIcon={<IconButton><StarBorder color="white" /></IconButton>}
        >
          <img src={tile.img} />
        </GridTile>
      ))}
    </GridList>
  </div>
);

export default Prescriptions