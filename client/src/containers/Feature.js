import React, { Component } from 'react';
import requireAuth from './requireAuth';
import requireEmployee from './requireEmployee';

class Feature extends Component {
    render() {
        return <div style={{'padding-top': '5em'}}>Welcome, you are logged in.</div>
    }
}

export default requireEmployee(Feature);