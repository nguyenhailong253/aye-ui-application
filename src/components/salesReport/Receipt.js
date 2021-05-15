import React from "react";
import styles from "./Receipt.module.css";

const Receipt = ({ data, index }) => {
    const row = (label, value) => (
        <div class="form-group row">
            <label class="col-sm-5 col-form-label">{label}</label>
            <div class="col-sm-5">
                <input type="text" readonly class="form-control-plaintext" value={value}/>
            </div>
        </div>
    );

    const itemsPurchased = 
        data.itemsPurchased.map(item => {
            return (
                <form className={styles.itemPurchased}>
                    {row('Product name', item.product.name)}
                    {row('Unit price', `$${item.product.price}.00`)}
                    {row('Product quantity', item.quantity)}
                    {row('Total amount for product', `$${item.totalPrice}.00`)}
                </form>
            );
        });

    return (
      <form className={styles.receipt}>
            <h4 className={''}>Receipt #{index}</h4>
            {itemsPurchased}
            {row('Total receipt price', `$${data.totalPrice}.00`)}
            {row('Amount paid', `$${data.amountPaid}.00`)}
            {row('Payment method', data.paymentMethod)}
            {row('Transaction date', data.transactionDate)}
      </form>
    );
};

export default Receipt;
