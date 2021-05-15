import React, { Component } from 'react';
import ProductTable from "./productTable/ProductTable";
import ProductUpdateTable from './productUpdateTable/ProductUpdateTable';
import './Catalogue.css';
import Axios from 'axios';

class Catalogue extends Component {
	state = {
		productAddedToCart: [],
		catalogueData: '',
		showUpdateView: false,
		selectedProductIndex: '',
	}

	componentDidMount() {
		this.getCatalogueData();
	}

	addToCart = (productName) => {
		let productAddedToCart = [...this.state.productAddedToCart];
		productAddedToCart.push(productName);
		this.setState({ productAddedToCart });
		this.props.addProductToCart(productName);
	}

	getCatalogueData = () => {
		Axios.get('http://localhost:8080/catalogue')
			.then((response) => {
				const catalogueData = response.data;
				console.log('test get catalogue data ', catalogueData);
				this.setState({ catalogueData });
			})
			.catch((error) => console.log('Something went wrong. Please try again later: ', error));
	}

	backToCatalogue = () => {
		this.getCatalogueData();
		this.setState({ showUpdateView: false, selectedProductIndex: '' });
	}

	showUpdateProductView = (selectedProductIndex) => {
		this.setState({ showUpdateView: true, selectedProductIndex });
	}

	render() {
		const { productAddedToCart, catalogueData, showUpdateView, selectedProductIndex } = this.state;
		const { role } = this.props;

		const catalogueView = (
			<div>
				<div class="pb-2 mt-4 mb-2 catalogue-title-page">
					Catalogue
				</div>
				<ProductTable
					addProductToCart={this.addToCart}
					addedProducts={productAddedToCart}
					showUpdateProductView={this.showUpdateProductView}
					data={catalogueData.products}
					role={role}
				/>
				<div className="toCheckOut">
                	<button onClick={this.props.onCheckoutClick} type="submit" className="btn btn-primary">Check out</button>
            	</div>
			</div>
		);

		const updateView = (
			<div>
				<div class="pb-2 mt-4 mb-2 catalogue-title-page">
					Update product
				</div>
				<ProductUpdateTable
					selectedProductIndex={selectedProductIndex}
					backToCatalogue={this.backToCatalogue}
				/>
			</div>
		);

		return(
		    <div>
				{showUpdateView ? updateView : catalogueView}
			</div>
		);
	}
}
export default Catalogue;