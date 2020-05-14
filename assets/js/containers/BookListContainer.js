import React, {useEffect} from 'react';
import {BookList, ErrorIndicator, Spinner} from "../components";
import {useDispatch, useSelector} from 'react-redux';
import {withBookstore} from "../components/hoc";
import {fetchBooks} from "../actions";

const BookListContainer = ({bookStoreService}) => {

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

export default withBookstore(BookListContainer);
