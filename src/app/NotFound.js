import { Link } from 'react-router';
import React, {Component} from 'react';

const NotFound = () => {
  return (<div><h1>Page Not Found</h1>
       <p><Link to='/apps'>Home</Link></p>
    </div>);
};

export default NotFound;