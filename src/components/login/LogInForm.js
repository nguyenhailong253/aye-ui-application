import Axios from 'axios';
import React, { Component } from 'react';
import styles from './LogInForm.module.css';

class LogInForm extends Component {
    state = {
        email: '',
        password: '',
        hasError: false,
        errorMessage: '',
    }

    handleEmailChange = (event) => {
        const email = event.target.value;
        this.setState({ email, hasError: false });
    }

    handlePasswordChange = (event) => {
        const password = event.target.value;
        this.setState({ password, hasError: false });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const { email, password } = this.state;

        Axios.post('http://localhost:8080/users/auth', {
            email,
            password,
        })
        .then((response) => this.props.redirectToHome(email))
        .catch((error) => this.setState({ hasError: true, errorMessage: 'Incorrect email or password.' }));
    }

    render() {
        return (
            <form autoComplete="off" className={styles.logInForm} onSubmit={this.handleSubmit}>
                <h3 className={styles.logInHeader}>Log In</h3>

                <div className="form-group">
                    <label>Email</label>
                    <input 
                        type="email" 
                        className="form-control" 
                        placeholder="Enter email" 
                        value={this.state.email}
                        onChange={this.handleEmailChange}
                    />
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input 
                        type="password" 
                        className="form-control" 
                        placeholder="Enter password" 
                        value={this.state.password}
                        onChange={this.handlePasswordChange}
                    />
                </div>

                {this.state.hasError && 
                    <div className="form-group">
                        <span className={styles.errorMessage}>{this.state.errorMessage}</span>
                    </div>
                }

                <div className="form-group">
                    <div className="custom-control custom-checkbox">
                        <input type="checkbox" className="custom-control-input" id="customCheck1" />
                        <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                    </div>
                </div>

                <button type="submit" className="btn btn-primary btn-block">Log in</button>
                <p className={styles.dontHaveAccount}>
                    Don't have an account? 
                    <a 
                        href="#" 
                        className={styles.signUpLink} 
                        onClick={this.props.redirectToSignUpPage}
                    >
                        Sign Up
                    </a>
                </p>
            </form>
        )
    }
}

export default LogInForm;