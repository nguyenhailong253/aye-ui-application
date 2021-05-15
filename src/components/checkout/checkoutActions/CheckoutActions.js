import React from 'react';
import styles from './CheckoutActions.module.css';

const CheckoutActions = ({ totalPrice, redirectToPaymentDetails }) => {
    return (
        <div className={styles.checkoutActions}>
            <span className={styles.total}>Totals: ${totalPrice}.00</span>
            <button 
                type="button" 
                className="btn btn-primary"
                onClick={redirectToPaymentDetails}
            >
                    Enter payment details
            </button>
        </div>
    );
}

export default CheckoutActions;