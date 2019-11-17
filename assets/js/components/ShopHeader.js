import React from 'react';
import '../../css/shop-header.css';
import {Link} from "react-router-dom";
import * as Routes from '../constants/routes';
import { connect } from "react-redux";

const ShopHeader = ({ itemsCount, total }) => {
    return (
        <header className="shop-header row">
            <Link to={Routes.HOME}>
                <div className="logo text-dark">ReStore</div>
            </Link>
            <div className="shopping-cart">
                <i className="cart-icon fa fa-shopping-cart" />
                {itemsCount} items (${total})
            </div>
        </header>
    );
};

const mapStateToProps = ({basketReducer: {items, total}}) => {
    return {
        total,
        itemsCount: items.reduce((count, item) => count + item.count, 0)
    };
};

export default connect(mapStateToProps)(ShopHeader);