import * as actionTypes from '../constants/actionTypes';

const booksLoaded = (bookList) => ({
    type: actionTypes.BOOKS_LOADED,
    payload: bookList
});

const booksRequested = () => ({
    type: actionTypes.BOOKS_REQUESTED,
});

const booksFailed = (error) => ({
    type: actionTypes.BOOKS_FAILED,
    payload: error
});


const fetchBooks = (bookStoreService, dispatch) => () => {
    dispatch(booksRequested());
    bookStoreService.getBooks()
        .then((data) => dispatch(booksLoaded(data)))
        .catch((error) => dispatch(booksFailed(error)));
};

const fetchBooksOld = (bookstoreService) => () => (dispatch) => {
    dispatch(booksRequested());
    bookstoreService.getBooks()
        .then((data) => dispatch(booksLoaded(data)))
        .catch((err) => dispatch(booksFailed(err)));
};

export {
    fetchBooks
};
