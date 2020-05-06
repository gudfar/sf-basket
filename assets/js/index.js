import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {BookStoreProvider} from "./components/context";
import {BrowserRouter as Router} from 'react-router-dom';
import {App, ErrorBoundary} from "./components";
import store from "./strore";
import {BookStoreService} from "./services";

const bookStoreService = new BookStoreService();

ReactDOM.render(
    <Provider store={store}>
        <ErrorBoundary>
            <BookStoreProvider value={bookStoreService}>
                <Router>
                    <App/>
                </Router>
            </BookStoreProvider>
        </ErrorBoundary>
    </Provider>,
    document.getElementById('root')
);
