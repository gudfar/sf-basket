import React, {Component} from 'react';
import {BookListContainer, BasketContainer} from "../../containers";

export default class HomePage extends Component {
    render() {
        return (
            <div>
                <BookListContainer />
                <BasketContainer />
            </div>
        );
    }
};