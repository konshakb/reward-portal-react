import React, { Component } from 'react';
import requireAuth from './requireAuth';
import requireAdmin from './requireAdmin';

class AdminPage extends Component {
    render() {
        return <div style={{'padding-top': '5em'}}>Welcome to the admin page.</div>
    }
}

export default requireAdmin(AdminPage);