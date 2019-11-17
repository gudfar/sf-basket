import React from 'react';

import {BookStoreConsumer} from '../context'

const withBookstore = (Wrapped) => {
    return (props) => {
        return (
            <BookStoreConsumer>
                {
                    (bookStoreService) => (
                        <Wrapped {...props} bookStoreService={bookStoreService}/>
                    )
                }
            </BookStoreConsumer>
        );
    };
};

export default withBookstore;