import React from 'react';

const {
    Provider: BookStoreProvider,
    Consumer: BookStoreConsumer
} = React.createContext();

export {
    BookStoreProvider,
    BookStoreConsumer
};