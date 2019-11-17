import React, {Component} from 'react';
import {BookList, ErrorIndicator, Spinner} from "../components";
import {connect } from 'react-redux';
import {withBookstore} from "../components/hoc";
import {fetchBooks} from "../actions";
import {compose} from '../utils'

class BookListContainer extends Component {

    componentDidMount() {
        this.props.fetchBooks();
    }

    render() {
        const {books, loading, error} = this.props;

        if (loading) {
            return (<Spinner/>);
        }

        if (error) {
            return (<ErrorIndicator/>);
        }

        return <BookList books={books}/>
    }
};

const mapStateToProps = ({booksReducer: state}) => {
    return {
        books: state.books,
        loading: state.loading,
        error: state.error
    };
};

// const mapDispatchToProps = (dispatch) => {
//     return bindActionCreators({
//         booksLoaded
//     }, dispatch);
// };

const mapDispatchToProps = (dispatch, ownProps) => {
    const { bookStoreService } = ownProps;
    return {
        fetchBooks: fetchBooks(bookStoreService, dispatch)
    }
};

// const mapDispatchToProps =  {
//     booksLoaded,
//     booksRequested,
//     booksFailed
// };

export default compose(
    withBookstore,
    connect(mapStateToProps, mapDispatchToProps)
)(BookListContainer);
