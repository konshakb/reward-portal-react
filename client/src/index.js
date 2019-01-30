import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';

import reducers from './reducers';
import Homepage from './containers/Homepage';
import Signin from './containers/Signin';
import Signup from './containers/Signup';
import Signout from './containers/Signout';
import Feature from './containers/Feature';
import Navbar from './containers/Navbar';
import HomepageHeading from './containers/Heading';
import * as serviceWorker from './serviceWorker';
import {
    Button,
    Container,
    Divider,
    Grid,
    Header,
    Icon,
    Image,
    List,
    Menu,
    Responsive,
    Segment,
    Sidebar,
    Visibility,
  } from 'semantic-ui-react'

const store = createStore(
    reducers,
    {
        auth: {authenticated: localStorage.getItem('token') }
    },
    applyMiddleware(reduxThunk)
)

const routing = (
    <Provider store={store}>
        <Router>
            <Homepage>
                <Route path='/' exact component={HomepageHeading} inverted={true}/>
                <Route path='/signin' component={Signin} />
                <Route path='/signup' component={Signup} />
                <Route path='/signout' component={Signout} />
                <Route path='/feature' component={Feature} />     
            </Homepage>
        </Router>
    </Provider>
);

ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
