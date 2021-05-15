import Axios from 'axios';
import React, { Component } from 'react';
import styles from './Payment.module.css';

class Payment extends Component {
    state = {
        showTextBox: false,
        isPaypal: true,
        email: '',
        password: '',
        cardNumber: '',
        cardName: '',
        expiryDate: '',
        cvv: '',
        successfulPayment: false,
    }

    selectPaymentMethod = (method) => {
        if (method === 'paypal') {
            this.setState({ isPaypal: true, showTextBox: true });
        } else {
            this.setState({ isPaypal: false, showTextBox: true });
        }
    }

    handleEmailChange = (event) => {
        const email = event.target.value;
        this.setState({ email });
    }

    handlePasswordChange = (event) => {
        const password = event.target.value;
        this.setState({ password });
    }

    handleCardNameChange = (event) => {
        const cardName = event.target.value;
        this.setState({ cardName });
    }

    handleCardNumberChange = (event) => {
        const cardNumber = event.target.value;
        this.setState({ cardNumber });
    }

    handleExpiryDateChange = (event) => {
        const expiryDate = event.target.value;
        this.setState({ expiryDate });
    }

    handleCvvChange = (event) => {
        const cvv = event.target.value;
        this.setState({ cvv });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const {
            isPaypal,
            email,
            password,
            cardName,
            cardNumber,
            expiryDate,
            cvv
        } = this.state;

        Axios.post('http://localhost:8080/payment', {
            email,
            password,
            cardNumber,
            cardName,
            expiryDate,
            cvv,
            method: isPaypal ? 'paypal' : 'credit card',
        })
        .then((response) => {
            this.setState({ successfulPayment: true });
            console.log('test payment success ', response);
        })
        .catch((error) => console.log('Something went wrong. Please try again later.', error));
    }

    render() {

        const {
            showTextBox,
            isPaypal,
            email,
            password,
            cardName,
            cardNumber,
            expiryDate,
            cvv,
            successfulPayment
        } = this.state;

        const header = (
            <h2 className={styles.paymentHeader}>Select your payment method</h2>
        );

        const paymentMethods = (
            <div className={styles.paymentSelection}>
                <button 
                    type="button" 
                    className="btn btn-info"
                    onClick={() => this.selectPaymentMethod('paypal')}
                >
                    PayPal
                </button>
                <button 
                    type="button" 
                    className="btn btn-info"
                    onClick={() => this.selectPaymentMethod('creditcard')}
                >
                    Credit card
                </button>
            </div>
        );

        const paypalForm = (
            <div className={styles.paypalForm}>
                <div className="form-group">
                    <label>PayPal Email</label>
                    <input 
                        type="email" 
                        className="form-control" 
                        placeholder="Enter email" 
                        value={email}
                        onChange={this.handleEmailChange}
                    />
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input 
                        type="password" 
                        className="form-control" 
                        placeholder="Enter password" 
                        value={password}
                        onChange={this.handlePasswordChange}
                    />
                </div>
            </div>
        );

        const creditCardForm = (
            <div className={styles.paypalForm}>
                <div className="form-group">
                    <label>Card Name</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        placeholder="John Smith" 
                        value={cardName}
                        onChange={this.handleCardNameChange}
                    />
                </div>

                <div className="form-group">
                    <label>Card Number</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        placeholder="1234 5678 9101 1121" 
                        value={cardNumber}
                        onChange={this.handleCardNumberChange}
                    />
                </div>

                <div className="form-group">
                    <label>Expiry Date</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        placeholder="01/2022" 
                        value={expiryDate}
                        onChange={this.handleExpiryDateChange}
                    />
                </div>

                <div className="form-group">
                    <label>CVV</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        placeholder="123" 
                        value={cvv}
                        onChange={this.handleCvvChange}
                    />
                </div>
            </div>
        );

        const authoriseButton = (
            <div className={styles.authoriseButton}>
                <button onClick={this.handleSubmit} type="submit" className="btn btn-primary">Authorise Payment</button>
            </div>
        );

        const successBanner = (
            <div className={styles.successMessage}>
                <h2 className={styles.paymentHeader}>Success! <br /> Your purchase has been made!</h2>
                <div className={styles.authoriseButton}>
                    <button onClick={() => this.props.redirectToHome(email)} type="submit" className="btn btn-primary">Continue shopping</button>
                </div>
            </div>
        );

        return (
            <div>
                {!successfulPayment && header}
                {!successfulPayment && paymentMethods}
                {!successfulPayment && showTextBox && isPaypal && paypalForm}
                {!successfulPayment && showTextBox && !isPaypal && creditCardForm}
                {!successfulPayment && showTextBox && authoriseButton}
                {showTextBox && successfulPayment && successBanner}
            </div>
        );
    }
}

export default Payment;