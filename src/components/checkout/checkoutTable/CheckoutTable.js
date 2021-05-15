import React from "react";
import styles from "./CheckoutTable.module.css";
import Table from "react-bootstrap/Table"

const CheckoutTable = ({ data }) => {
    const tableColumns = (
      <thead>
        <tr>
          <th>Product name</th>
          <th>Unit price</th>
          <th>Quantity</th>
          <th>Total price</th>
        </tr>
      </thead>
    );

    const tableRows = (
      <tbody>
        {data.map((item, index) => {
          return (
            <tr key={index}>
            <td>{item.product.name}</td>
            <td>${item.product.price}.00</td>
            <td>{item.quantity}</td>
            <td>${item.totalPrice}.00</td>
          </tr>
          );
        })}
      </tbody>
    );

    return (
      <div className={styles.supermarket}>
        <Table bordered hover>
        {tableColumns}
        {tableRows}
        </Table>
      </div>
    );
};

export default CheckoutTable;
