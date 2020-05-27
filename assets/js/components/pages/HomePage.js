import React from 'react';
import {BookListContainer, BasketContainer} from "../../containers";
import {ShopHeader} from "../index";

const HomePage = () => {
    return (
        <>
            <ShopHeader/>
            <BookListContainer />
            <BasketContainer />
        </>
    );
};

export default HomePage;
