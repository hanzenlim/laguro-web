import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import moment from 'moment';
import * as actions from '../actions';

class Cart extends Component {
    componentWillMount() {
        document.title = 'Laguro - Cart';
    }

    componentDidMount() {
        const { auth } = this.props;
        this.props.getDentistByUser(auth._id);
        this.props.fetchListings();
    }

    renderCartItems() {
        const { listings, dentist } = this.props;
        if (!listings || !listings.length || !dentist || !dentist.cart || !dentist.cart.length) {
            this.cartListings = [];
        } else {
            this.cartListings = listings.filter(listing =>
                dentist.cart.includes(listing));
        }

        if (!this.cartListings.length) {
            return <div />;
        }

        return this.cartListings.map((listing, index) => {
            const formatted_time =
        moment(listing.time_available).format('MMM D, h a - ') +
        moment(listing.time_closed).format('h a');

            return (
                <div className="cart_item" key={index}>
                    <Link
                        className="blue-text text-darken-2"
                        to={`/offices/${listing.office}/listings/${listing._id}`}
                    >
                        <p>{`${formatted_time}`}</p>
                    </Link>
                </div>
            );
        });
    }

    render() {
        return (
            <div className="cart">
                <h5>Shopping Cart</h5>
                {this.renderCartItems()}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        dentist: state.dentists.selectedDentist,
        listings: state.listings.all,
        auth: state.auth.data,
    };
}
export default connect(mapStateToProps, actions)(Cart);
