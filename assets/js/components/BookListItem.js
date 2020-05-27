import React from 'react';
import PropTypes from 'prop-types';
import '../../css/book-list-item.css';
import {connect } from 'react-redux';
import {addToBasket} from "../actions";

const BookListItem = ({book, onAddToBasket, loading}) => {
    const { id, title, author, price, imageUrl } = book;
    return (
        <div className="book-list-item">
            <div className="book-cover">
                <img src={imageUrl} alt="cover" />
            </div>
            <div className="book-details">
                <div className="book-title">{title}</div>
                <div className="book-author">{author}</div>
                <div className="book-price">${price}</div>
                <button disabled={loading} onClick={() => onAddToBasket(book.id)} className="btn btn-info add-to-cart">Add to cart</button>
            </div>

        </div>
    );
};

BookListItem.propTypes = {
    book: PropTypes.object.isRequired,
};

const mapStateToProps = ({basketReducer: {loading}}) => ({loading});


const mapDispatchToProps = (dispatch) => {
    return {
        onAddToBasket: (id) => addToBasket(id, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookListItem);
