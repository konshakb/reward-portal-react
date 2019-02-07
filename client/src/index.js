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
import AdminFeature from './containers/AdminPage';
import HomepageHeading from './containers/Landing';


const store = createStore(
    reducers,
    {
        auth: {authenticated: localStorage.getItem('token') },
        admin: false
    },
    applyMiddleware(reduxThunk)
);

const routing = (
    <Provider store={store}>
        <Router>
            <Homepage>
                <Route path='/' exact component={HomepageHeading} />
                <Route path='/signin' component={Signin} />
                <Route path='/signup' component={Signup} />
                <Route path='/signout' component={Signout} />
                <Route path='/feature' component={Feature} />     
                <Route path='/admin-feature' component={AdminFeature} />     
            </Homepage>
        </Router>
    </Provider>
);

ReactDOM.render(routing, document.getElementById('root'));