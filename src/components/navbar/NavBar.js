import React, { Component } from 'react';

class NavBar extends Component {
	render() {
		const { email } = this.props;
		return(
			<React.Fragment>
				<nav className="navbar navbar-expand-lg navbar-dark bg-primary">
					<a className="navbar-brand" href="#">All Your Electronics</a>
					<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
						<span className="navbar-toggler-icon"></span>
					</button>
	
					<div className="collapse navbar-collapse" id="navbarSupportedContent">
					<ul className="navbar-nav mr-auto">
						<li className="nav-item">
							<a className="nav-link" href="#" onClick={this.props.onCatalogueClick}>Catalogue</a>
						</li>
						<li className="nav-item">
							<a className="nav-link" href="#" onClick={this.props.onCheckoutClick}>Check out</a>
						</li>
						{email === 'test.admin@hotmail.com' && 
						<li className="nav-item">
							<a className="nav-link" href="#" onClick={this.props.onSalesReportClick}>Sales Report</a>
						</li>}
						<li className="nav-item">
							<a className="nav-link" href="#" onClick={this.props.onLogOut}>Log out</a>
						</li>
						<li className="nav-item">
							<span className="nav-link" >
								Logged in as {email}
							</span>
						</li>
					</ul>
					</div>
				</nav>
			</React.Fragment>
		);
	}
}

export default NavBar;