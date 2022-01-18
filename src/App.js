import React, { Fragment, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { ScrollContext } from 'react-router-scroll-4';
import PublicRoute from './Utils/PublicRoute';

// ** Import custom components for redux**
import { Provider } from 'react-redux';
import store from './store/index';

// Import custom Components 
import Default from './components/dashboard/defaultCompo/default';
import Ecommerce from './components/dashboard/ecommerce';
import University from './components/dashboard/university';
import UserProfile from './components/users/userProfile';
import UserEdit from './components/users/userEdit';
import UserCards from './components/users/user-cards';
import Calender1 from './components/calender/calender1';
import Calender2 from './components/calender/calender2';
import Social from './components/Social';
import Face from './components/Face';
import Orange from './components/Orange';

// sample page
import {
    Landing,
    Layout,
    Login,
} from './components';

export const App = () => {
    useEffect(() => {
        const layout = localStorage.getItem('layout_version')
        const color = localStorage.getItem('color')
        document.body.classList.add(layout);
        document.getElementById("color").setAttribute("href", `${process.env.PUBLIC_URL}/assets/css/${color}.css`);
    }, []);

    return (
        <div className="App">
            <Provider store={store}>
                <BrowserRouter basename={'/'}>
                    <ScrollContext>
                        <Switch>
                            <Route exact path={`${process.env.PUBLIC_URL}/`} component={Login} />

                            <Fragment>
                                <PublicRoute>
                                    <Layout>
                                        {/* dashboard menu */}
                                        <Route path={`${process.env.PUBLIC_URL}/dashboard/landing`} component={Landing}></Route>
                                        <Route path={`${process.env.PUBLIC_URL}/dashboard/resource`} component={Default}></Route>
                                        <Route path={`${process.env.PUBLIC_URL}/dashboard/itmanager`} component={Ecommerce} />
                                        <Route path={`${process.env.PUBLIC_URL}/social`} component={Social} />
                                        <Route path={`${process.env.PUBLIC_URL}/facebook`} component={Face} />
                                        <Route path={`${process.env.PUBLIC_URL}/orange`} component={Orange} />
                                        <Route path={`${process.env.PUBLIC_URL}/dashboard/assets`} component={University} />
                                        <Route path={`${process.env.PUBLIC_URL}/users/userProfile`} component={UserProfile} />
                                        <Route path={`${process.env.PUBLIC_URL}/users/userEdit`} component={UserEdit} />
                                        <Route path={`${process.env.PUBLIC_URL}/users/userCards`} component={UserCards} />
                                        <Route path={`${process.env.PUBLIC_URL}/calender/calender1`} component={Calender1} />
                                        <Route path={`${process.env.PUBLIC_URL}/calender/calender2`} component={Calender2} />
                                    </Layout>
                                </PublicRoute>
                            </Fragment>
                        </Switch>
                    </ScrollContext>
                </BrowserRouter>
            </Provider>
        </div>
    )
}
