import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import reducers from './reducers';
import Homepage from './containers/Homepage';
import Signin from './containers/Signin';
import Signup from './containers/Signup';
import Signout from './containers/Signout';
import Feature from './containers/Feature';
import AdminFeature from './containers/AdminPage';
import CreateUser from './containers/CreateUser';
import HomepageHeading from './containers/Landing';
import AdminTable from './containers/AdminTable';
import Profile from './containers/Profile';
import storage from 'redux-persist/lib/storage'
import { PersistGate } from 'redux-persist/integration/react'

const persistConfig = {
    key: 'root',
    storage,
}

const persistedReducer = persistReducer(persistConfig, reducers);

const store = createStore(
    persistedReducer,
    {
        auth: {authenticated: localStorage.getItem('token') },
        admin: false
    },
    applyMiddleware(reduxThunk)
);

let persistor = persistStore(store)


const routing = (
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
        <Router>
            <Homepage>
                <Route path='/' exact component={HomepageHeading} />
                <Route path='/signin' component={Signin} />
                <Route path='/signup' component={Signup} />
                <Route path='/signout' component={Signout} />
                <Route path='/feature' component={Feature} />     
                <Route path='/admin-feature' component={AdminFeature} />     
                <Route path='/create-user' component={CreateUser} />     
                <Route path='/profile' component={Profile} />     
                <Route path='/admin-table' component={AdminTable} />     
            </Homepage>
        </Router>
        </PersistGate>
    </Provider>
);

ReactDOM.render(routing, document.getElementById('root'));