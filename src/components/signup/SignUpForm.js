import Axios from 'axios';
import React, { Component } from 'react';
import styles from './SignUpForm.module.css';

class SignUpForm extends Component {
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
        Axios.post('http://localhost:8080/users', {
            email,
            password
        })
        .then((response) => this.props.redirectToHome(email))
        .catch((error) => this.setState({ hasError: true, errorMessage: 'Something went wrong. Please try again later.' }));
    }

    render() {
        return (
            <form autoComplete="off" className={styles.signUpForm} onSubmit={this.handleSubmit}>
                <h3 className={styles.signUpHeader}>Sign Up</h3>

                <div className="form-group">
                    <label>Email address</label>
                    <input 
                        type="email" 
                        className="form-control" 
                        placeholder="Enter email" 
                        value={this.state.email}
                        onChange={this.handleEmailChange}
                        required
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
                        required
                    />
                </div>

                {this.state.hasError && 
                    <div className="form-group">
                        <span className={styles.errorMessage}>{this.state.errorMessage}</span>
                    </div>
                }

                <button type="submit" className="btn btn-primary btn-block">Sign Up</button>
                <p className={styles.alreadyRegistered}>
                    Already registered? 
                    <a 
                        href="#"
                        className={styles.logInLink}
                        onClick={this.props.redirectToLogInPage}
                    >
                        Log in
                    </a>
                </p>
            </form>
        )
    }
}

export default SignUpForm;