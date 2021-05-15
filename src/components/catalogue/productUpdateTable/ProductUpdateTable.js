import React, { Component } from "react";
import styles from "./ProductUpdateTable.module.css";
import Table from "react-bootstrap/Table"
import Axios from 'axios';

class ProductUpdateTable extends Component {
    state = {
        catalogueData: '',
    }

    componentDidMount() {
		this.getCatalogueData();
	}

    getCatalogueData = () => {
		Axios.get('http://localhost:8080/catalogue')
			.then((response) => {
				const catalogueData = response.data;
				console.log('test get catalogue data for update table ', catalogueData);
				this.setState({ catalogueData });
			})
			.catch((error) => console.log('Something went wrong. Please try again later: ', error));
	}

    handleProductNameChange = (event) => {
        const { value, name } = event.target;
        let catalogueData = JSON.parse(JSON.stringify(this.state.catalogueData));
        const newProducts = catalogueData.products.map((product, idx) => {
            if (String(idx) === name) {
                const prod = {...product, name: value};
                return prod;
            } else {
                return product;
            }
        })
        catalogueData.products = newProducts;
        this.setState({ catalogueData });
    }

    handlePriceChange = (event) => {
        const { value, name } = event.target;
        let catalogueData = JSON.parse(JSON.stringify(this.state.catalogueData));
        const newProducts = catalogueData.products.map((product, idx) => {
            if (String(idx) === name) {
                const prod = {...product, price: value};
                return prod;
            } else {
                return product;
            }
        })
        catalogueData.products = newProducts;
        this.setState({ catalogueData });
    }

    handleHasEnoughStockChange = (event) => {
        const { checked, name } = event.target;
        let catalogueData = JSON.parse(JSON.stringify(this.state.catalogueData));
        const newProducts = catalogueData.products.map((product, idx) => {
            if (String(idx) === name) {
                const prod = {...product, hasEnoughStock: checked};
                return prod;
            } else {
                return product;
            }
        })
        catalogueData.products = newProducts;
        this.setState({ catalogueData });
    }

    handleSaveUpdates = (e) => {
        e.preventDefault();

		const email = localStorage.getItem('email');
        const { catalogueData } = this.state;

        Axios.post(`http://localhost:8080/catalogue?email=${email}`, {
            ...catalogueData
        })
        .then((response) => {
            this.props.backToCatalogue();
            console.log('test update catalogue success ', response);
        })
        .catch((error) => console.log('Something went wrong. Please try again later.', error));
    }

    render() {
        const { catalogueData } = this.state;
        const { selectedProductIndex } = this.props;

        const tableColumns = (
            <thead>
              <tr>
                <th>Product Name</th>
                <th>Price</th>
                <th>Has enough stock</th>
              </tr>
            </thead>
          );
      
        const tableRows = (
            <tbody>
                {!!catalogueData.products && catalogueData.products.map((item, index) => {
                    if (index === selectedProductIndex) {
                        return (
                            <tr key={index}>
                                <td>
                                    <input 
                                        type="text"
                                        className="form-control"
                                        name={index}
                                        value={item.name}
                                        onChange={this.handleProductNameChange}
                                    />
                                </td>
                                <td className={styles.priceColumn}>
                                    <input 
                                        type="text"
                                        className="form-control"
                                        name={index}
                                        value={item.price}
                                        onChange={this.handlePriceChange}
                                    />
                                </td>
                                <td>
                                    <input 
                                        type="checkbox"
                                        className="form-control"
                                        name={index}
                                        defaultChecked={item.hasEnoughStock}
                                        onChange={this.handleHasEnoughStockChange}
                                    />
                                </td>
                            </tr>
                            );
                    }
                    return <div></div>;
                })}
            </tbody>
        );

        return (
            <div className={styles.productUpdateTable}>
                <Table bordered hover>
                    {tableColumns}
                    {tableRows}
                </Table>
                <div className="saveUpdates">
                    <button onClick={this.handleSaveUpdates} type="submit" className="btn btn-primary">Save updates</button>
                </div>
            </div>
        );
    }
};

export default ProductUpdateTable;
