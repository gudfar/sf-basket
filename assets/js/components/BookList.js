import React from "react";

import {BookListItem} from "./index";
import '../../css/book-list.css';

const BookList = ({books}) => {
    return (
        <ul className="book-list">
            {books.map((book) => (
                <li key={book.id} className="list-group-item">
                    <BookListItem book={book} />
                </li>
            ))}
        </ul>
    );
};

export default BookList;