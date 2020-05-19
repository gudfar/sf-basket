import React, {Fragment, useEffect} from 'react';
import {connect, useDispatch, useSelector} from 'react-redux';
import '../../css/shopping-cart-table.css';
import {
    updateBasketItemCount,
    deleteBasketItem,
    fetchBasketItems
} from "../actions";
import {ErrorIndicator, Spinner} from "../components";

const BasketContainer = () => {

    const dispatch = useDispatch();
    const { items, loading, error, total } = useSelector(
        ({basketReducer: {items, loading, error, total}}) => ({items, loading, error, total})
    );

    useEffect(() => {
        fetchBasketItems(dispatch);
    }, [dispatch]);


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
                            { items.map((item) => {
                                const { id, title, quantity, price } = item;
                                return (
                                    <tr key={id}>
                                        <td>{id}</td>
                                        <td>{title}</td>
                                        <td>{quantity}</td>
                                        <td>${price}</td>
                                        <td>
                                            <button
                                                onClick={() => deleteBasketItem(id, dispatch)}
                                                className="btn btn-outline-danger btn-sm float-right">
                                                <i className="fa fa-trash-o" />
                                            </button>
                                            <button
                                                onClick={() => updateBasketItemCount({id, counterValue: 1}, dispatch)}
                                                className="btn btn-outline-success btn-sm float-right">
                                                <i className="fa fa-plus-circle" />
                                            </button>
                                            <button
                                                onClick={() => updateBasketItemCount({id, counterValue: -1}, dispatch)}
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

export default BasketContainer;
