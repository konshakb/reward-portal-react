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
import HomepageHeading from './containers/Heading';

const store = createStore(
    reducers,
    {
        auth: {authenticated: localStorage.getItem('token') }
    },
    applyMiddleware(reduxThunk)
);

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
