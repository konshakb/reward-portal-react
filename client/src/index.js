import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom';
import './index.css';
import App from './App';
import Landing from './containers/Landing';
import Homepage from './containers/Homepage';
import Signin from './containers/Signin';
import Signup from './containers/Signup';
import * as serviceWorker from './serviceWorker';


const routing = (
    <Router>
        <div>
            <Route path='/' exact component={Homepage} />
            <Route path='/app' component={App} />
            <Route path='/signin' component={Signin} />
            <Route path='/signup' component={Signup} />
            
        </div>
    </Router>
)

ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
