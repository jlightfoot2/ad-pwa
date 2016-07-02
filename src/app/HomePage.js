import React from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import { Link } from 'react-router'
export default class HomePage extends React.Component {
  constructor(props){
    super(props);
  }

  render() {
    return (
  		<Card>
  			<CardTitle title="Scripts" subtitle="The Application Prescription Hub" />
  			<CardText>Intro Text
  			</CardText>
  			<CardActions>
        
  				<RaisedButton 
            containerElement={<Link to="/scripts" />}
            linkButton={true}
            primary={true} label="Get Started!" />
  
  			</CardActions>
  		</Card>
    );
  }
}