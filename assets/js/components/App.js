import React, {Component} from 'react';
import {withBookstore} from "./hoc";
import {CartPage, HomePage} from "./pages";
import { Switch, Route} from 'react-router-dom';
import * as Routes from '../constants/routes';
import {ShopHeader} from "./index";

class App extends Component {
    render() {
        return (
            <main role="main" className="container">
                <ShopHeader numItems={5} total={210}/>
                <Switch>
                    <Route path={Routes.HOME} exact component={HomePage}/>
                    <Route path={Routes.CART} exact component={CartPage}/>
                </Switch>
            </main>
        );
    }
};

export default withBookstore(App)