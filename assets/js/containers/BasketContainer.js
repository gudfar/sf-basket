import React, {Fragment} from 'react';
import { connect } from 'react-redux';
import '../../css/shopping-cart-table.css';
import {increaseBasketItemCount, decreaseBasketItemCount, deleteBasketItem} from "../actions";
import {ErrorIndicator, Spinner} from "../components";

const BasketContainer = ({ items, total, onIncrease, onDecrease, onDelete, loading, error }) => {

    if (loading) {
        return (<Spinner/>);
    }

    if (error) {
        return (<ErrorIndicator/>);
    }

    return (
        <div className="shopping-cart-table">
            { !items.length
                ? <span>Your basket is empty.</span>
                : (
                    <Fragment>
                        <h2>Your Order</h2>
                        <table className="table">
                            <thead>
                            <tr>
                                <th>#</th>
                                <th>Item</th>
                                <th>Count</th>
                                <th>Amount</th>
                                <th>Action</th>
                            </tr>
                            </thead>
                            <tbody>
                            { items.map((item, index) => {
                                const { id, title, count, price } = item;
                                return (
                                    <tr key={id}>
                                        <td>{index + 1}</td>
                                        <td>{title}</td>
                                        <td>{count}</td>
                                        <td>${price}</td>
                                        <td>
                                            <button
                                                onClick={() => onDelete(id)}
                                                className="btn btn-outline-danger btn-sm float-right">
                                                <i className="fa fa-trash-o" />
                                            </button>
                                            <button
                                                onClick={() => onIncrease(id)}
                                                className="btn btn-outline-success btn-sm float-right">
                                                <i className="fa fa-plus-circle" />
                                            </button>
                                            <button
                                                onClick={() => onDecrease(id)}
                                                className="btn btn-outline-warning btn-sm float-right">
                                                <i className="fa fa-minus-circle" />
                                            </button>
                                        </td>
                                    </tr>
                                )
                            }) }
                            </tbody>
                        </table>
                        <div className="total">
                            Total: ${total}
                        </div>
                    </Fragment>
                )
            }
        </div>
    );
};

const mapStateToProps = ({basketReducer: state}) => (state);

const mapDispatchToProps = (dispatch) => {
    return {
        onIncrease: (id) => increaseBasketItemCount(id, dispatch),
        onDelete: (id) => deleteBasketItem(id, dispatch),
        onDecrease: (id) => decreaseBasketItemCount(id, dispatch),
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(BasketContainer);
