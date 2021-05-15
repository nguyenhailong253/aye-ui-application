import React, { Component } from 'react';
import LogInForm from './components/login/LogInForm';
import SignUpForm from './components/signup/SignUpForm';
import Catalogue from './components/catalogue/Catalogue';
import Checkout from './components/checkout/Checkout';
import SalesReport from './components/salesReport/SalesReport';
import NavBar from './components/navbar/NavBar';
import Axios from 'axios';
class App extends Component {
	state = {
		userLoggedIn: false,
		isOnSignUpPage: false,
		isOnLogInPage: true,
		isOnCataloguePage: false,
		isOnCheckOutPage: false,
		isOnSalesReportPage: false,
		email: '',
		role: '',
		shoppingCart: [],
	}

	componentDidMount() {
		const email = localStorage.getItem('email');
		const page = localStorage.getItem('page');
		let role;
		if (email) {
			if (email === 'test.admin@hotmail.com') {
				role = 'admin';
			} else {
				role = 'customer'
			}
			this.setState({
				role,
				email,
				userLoggedIn: true,
				isOnLogInPage: false,
				isOnSignUpPage: false,
				isOnCataloguePage: page === 'catalogue',
				isOnCheckOutPage: page === 'checkout',
				isOnSalesReportPage: page === 'salesreport',
			});
		} else {
			this.setState({
				userLoggedIn: false,
				isOnCataloguePage: false,
				isOnLogInPage: true,
				isOnSignUpPage: false,
				isOnCheckOutPage: false,
				isOnSalesReportPage: false,
			});
		}
	}

	redirectToHome = (email) => {
		console.log("test email ", email);
		let role;
		if (email === 'test.admin@hotmail.com') {
			role = 'admin';
		} else {
			role = 'customer'
		}
		this.setState({
			role,
			email,
			userLoggedIn: true,
			isOnCataloguePage: true,
			isOnLogInPage: false,
			isOnSignUpPage: false,
			isOnCheckOutPage: false,
			isOnSalesReportPage: false,
		});
		localStorage.setItem('email', email);
		localStorage.setItem('page', 'catalogue');
	}

	redirectToSignUpPage = () => {
		localStorage.removeItem('email');
		this.setState({
			userLoggedIn: false,
			isOnLogInPage: false,
			isOnSignUpPage: true,
			isOnCataloguePage: false,
			isOnCheckOutPage: false,
			isOnSalesReportPage: false,
		});
	}

	redirectToLogInPage = () => {
		localStorage.removeItem('email');
		this.setState({
			email: '',
			userLoggedIn: false,
			isOnLogInPage: true,
			isOnSignUpPage: false,
			isOnCataloguePage: false,
			isOnCheckOutPage: false,
			isOnSalesReportPage: false,
		});
	}

	redirectToCataloguePage = () => {
		localStorage.setItem('page', 'catalogue');
		this.setState({
			userLoggedIn: true,
			isOnLogInPage: false,
			isOnSignUpPage: false,
			isOnCataloguePage: true,
			isOnCheckOutPage: false,
			isOnSalesReportPage: false,
		});
	}

	redirectToCheckOutPage = () => {
		localStorage.setItem('page', 'checkout');
		this.setState({
			userLoggedIn: true,
			isOnLogInPage: false,
			isOnSignUpPage: false,
			isOnCataloguePage: false,
			isOnCheckOutPage: true,
			isOnSalesReportPage: false,
		});
	}

	redirectToSalesReportPage = () => {
		localStorage.setItem('page', 'salesreport');
		this.setState({
			userLoggedIn: true,
			isOnLogInPage: false,
			isOnSignUpPage: false,
			isOnCataloguePage: false,
			isOnCheckOutPage: false,
			isOnSalesReportPage: true,
		});
	}

	addProductToCart = (productName) => {
		const { email, shoppingCart } = this.state;
		console.log('test product name ', productName);
		console.log('test shoppingCart ', shoppingCart)
		if (shoppingCart.length === 0) {
			console.log("test empty cart");
			Axios.post('http://localhost:8080/cart', {
				email,
				productName,
				quantity: 1
			})
			.then((response) => {
				Axios.get(`http://localhost:8080/cart?email=${email}`)
					.then((res) => {
						console.log('test created a new cart ', res.data);
						this.setState({ shoppingCart: res.data});
					})
			})
			.catch((error) => console.log('Something went wrong. Please try again later: ', error));
		} else {
			Axios.put('http://localhost:8080/cart', {
				email,
				productName,
				quantity: 1
			})
			.then((response) => {
				Axios.get(`http://localhost:8080/cart?email=${email}`)
					.then((res) => {
						console.log('test add new item to cart ', res.data);
						this.setState({ shoppingCart: res.data});
					})
			})
			.catch((error) => console.log('Something went wrong. Please try again later: ', error));
		}
	}

	render() {
		const {
			userLoggedIn,
			email,
			isOnSignUpPage,
			isOnLogInPage,
			role,
			isOnCataloguePage,
			isOnCheckOutPage,
			shoppingCart,
			isOnSalesReportPage,
		} = this.state;

		const showCatalogue = isOnCataloguePage && userLoggedIn;
		const showCheckOut = isOnCheckOutPage && userLoggedIn;
		const showSalesReport = isOnSalesReportPage && userLoggedIn;

		return(
			<div>
				{userLoggedIn &&
					<NavBar
						role={role}
						email={email}
						onLogOut={this.redirectToLogInPage}
						onCatalogueClick={this.redirectToCataloguePage}
						onCheckoutClick={this.redirectToCheckOutPage}
						onSalesReportClick={this.redirectToSalesReportPage}
					/>}
				{showCatalogue &&
					<Catalogue
						role={role}
						onLogOut={this.redirectToLogInPage}
						addProductToCart={this.addProductToCart}
						onCheckoutClick={this.redirectToCheckOutPage}
					/>}
				{showCheckOut &&
					<Checkout
						shoppingCart={shoppingCart}
						redirectToHome={this.redirectToHome}
						email={email}
					/>}
				{showSalesReport &&
					<SalesReport
						
					/>}
				{isOnSignUpPage &&
					<SignUpForm
						redirectToHome={this.redirectToHome}
						redirectToLogInPage={this.redirectToLogInPage}
					/>}
				{isOnLogInPage &&
					<LogInForm
						redirectToHome={this.redirectToHome}
						redirectToSignUpPage={this.redirectToSignUpPage}
					/>}
			</div>
		);
	}
}
export default App;
