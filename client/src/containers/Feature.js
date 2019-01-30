import React, { Component } from 'react';
import requireAuth from './requireAuth';

class Feature extends Component {
    render() {
        return <div style={{'padding-top': '5em'}}>Welcome, you are logged in.</div>
    }
}

export default requireAuth(Feature);