import React, {useContext, useEffect} from 'react';
import {BookList, ErrorIndicator, Spinner} from "../components";
import {useDispatch, useSelector} from 'react-redux';
import {fetchBooks} from "../actions";
import {ServiceContext} from "../contexts";

const BookListContainer = () => {

    const {bookStoreService} = useContext(ServiceContext);
    const dispatch = useDispatch();
    const { books, loading, error } = useSelector(
        ({booksReducer: {books, loading, error}}) => ({books, loading, error})
    );

    useEffect(() => {
        fetchBooks(bookStoreService, dispatch);
    }, [dispatch]);


    if (loading) {
        return (<Spinner/>);
    }

    if (error) {
        return (<ErrorIndicator/>);
    }

    return <BookList books={books}/>
};

export default BookListContainer;
