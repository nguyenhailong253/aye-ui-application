import React, { Component } from 'react';
import CheckoutTable from './checkoutTable/CheckoutTable';
import CheckoutActions from './checkoutActions/CheckoutActions';
import './Checkout.css';
import Payment from '../payment/Payment';
import Axios from 'axios';
class Checkout extends Component {
	state = {
		cartData: '',
        showPaymentDetails: false,
	}

    componentDidMount() {
		this.getCartData();
	}

    redirectToPaymentDetails = () => {
        this.setState({ showPaymentDetails: true });
    }

    getCartData = () => {
        const { email } = this.props;

		Axios.get(`http://localhost:8080/cart?email=${email}`)
			.then((response) => {
				const cartData = response.data;
				console.log('test get cartData ', cartData);
				this.setState({ cartData });
			})
			.catch((error) => console.log('Something went wrong. Please try again later: ', error));
	}

	render() {
		const { cartData, showPaymentDetails } = this.state;
        const { email } = this.props;

        const goShoppingButton = (
            <div className="goShopping">
                <button onClick={() => this.props.redirectToHome(email)} type="submit" className="btn btn-primary">Go shopping!</button>
            </div>
        );

        const shoppingCartOverview = (
            <div>
				<div class="pb-2 mt-4 mb-2 checkout-title-page">
					Check Out
                    <br />
                    {cartData && "Your current shopping cart"}
                    {!cartData && "Your current shopping cart is empty!"}
                    {!cartData && goShoppingButton}
				</div>
                {!!cartData && <CheckoutTable data={cartData.items} totalPrice={cartData.totalPrice}/>}
				{!! cartData && 
                    <CheckoutActions 
                        totalPrice={cartData.totalPrice}
                        redirectToPaymentDetails={this.redirectToPaymentDetails}
                    />}
                
			</div>
        );

		return(
		    <div>
                {showPaymentDetails 
                    ? <Payment redirectToHome={this.props.redirectToHome} />
                    : shoppingCartOverview}
            </div>
		);
	}
}
export default Checkout;