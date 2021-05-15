import React from "react";
import styles from "./ProductTable.module.css";
import Table from "react-bootstrap/Table"

const ProductTable = ({ data, role, addProductToCart, addedProducts, showUpdateProductView }) => {
    const tableColumns = (
      <thead>
        <tr>
          <th>Product Name</th>
          <th>Price</th>
          <th>Action</th>
        </tr>
      </thead>
    );

    const addToCartAction = (productName) => (
        <a href="#" onClick={() => addProductToCart(productName)}>Add to cart</a>
    );

    const updateProductAction = (index) => (
      <a href="#" onClick={() => showUpdateProductView(index)}>Update product</a>
    );

    const tableRows = (
      <tbody>
        {!!data && data.map((item, index) => {
          return (
            <tr key={index}>
              <td>{item.name}</td>
              <td>${item.price}.00</td>
              {addedProducts.includes(item.name)
                ? <td><span>Added to cart</span> </td>
                : <td>
                    {role === 'customer' ? addToCartAction(item.name) : updateProductAction(index)}
                  </td>}
            </tr>
          );
        })}
      </tbody>
    );

    return (
      <div className={styles.productTable}>
        <Table bordered hover>
          {tableColumns}
          {tableRows}
        </Table>
      </div>
    );
};

export default ProductTable;
