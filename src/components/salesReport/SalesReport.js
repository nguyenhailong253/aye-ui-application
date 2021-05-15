import React, { Component } from 'react';
import Axios from 'axios';
import styles from './SalesReport.module.css';
import Receipt from './Receipt';

class SalesReport extends Component {
    state = {
        hasError: false,
        errorMessage: '',
        productName: '',
        period: '',
        reportData: '',
    }

    getReport = () => {
        const { productName, period } = this.state;
		const email = localStorage.getItem('email');
        Axios.get(`http://localhost:8080/report?email=${email}&productName=${productName}&period=${period}`)
			.then((response) => {
				const reportData = response.data;
				console.log('test get report receipt data ', reportData);
				this.setState({ reportData });
			})
			.catch((error) => console.log('Something went wrong. Please try again later: ', error));
    }

    handleProductNameChange = (e) => {
        const productName = e.target.value;
        this.setState({ productName, hasError: false });
    }

    handlePeriodChange = (e) => {
        const period = e.target.value;
        if (isNaN(period)) {
            this.setState({ period, hasError: true, errorMessage: "Period needs to be a number"})
        } else {
            this.setState({ period, hasError: false});
        }
    }

    render() {
        const { hasError, errorMessage, productName, period, reportData } = this.state;
        const inputForm = (
            <div className={styles.inputField}>
                <h3 className={styles.salesReportHeader}>Sales Report</h3>

                <div className="form-group">
                    <label>Search report for product:</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Enter product name"
                        value={productName}
                        onChange={this.handleProductNameChange}
                    />
                </div>

                <div className="form-group">
                    <label>Over a period of (days):</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Enter number of days"
                        value={period}
                        onChange={this.handlePeriodChange}
                    />
                </div>

                {hasError &&
                    <div className="form-group">
                        <span className={styles.errorMessage}>{errorMessage}</span>
                    </div>
                }

                <button onClick={this.getReport} type="submit" className="btn btn-primary btn-block">Get report</button>
            </div>
        );

        const receipts = reportData && reportData.receipts.map((receipt, index) => <Receipt data={receipt} index={index} />);

        const report = (
            <div>
                <h4 className={styles.reportHeader}>Report for {productName}</h4>
                <form className={styles.overallReport}>
                    <div class="form-group row">
                        <label class="col-sm-5 col-form-label">Period: </label>
                        <div class="col-sm-5">
                            <input type="text" readonly class="form-control-plaintext" value={"Last " + period + " day(s)"}/>
                        </div>
                    </div>
                    <div class="form-group row">
                        <label class="col-sm-5 col-form-label">Total quantity</label>
                        <div class="col-sm-5">
                            <input type="text" readonly class="form-control-plaintext" value={reportData.totalQuantity} />
                        </div>
                    </div>
                    <div class="form-group row">
                        <label class="col-sm-5 col-form-label">Total sales</label>
                        <div class="col-sm-5">
                            <input type="text" readonly class="form-control-plaintext" value={"$" + reportData.totalSales + ".00"}/>
                        </div>
                    </div>
                </form>
                {receipts}
            </div>
        );

        return (
            <div>
                {inputForm}
                {!!reportData && report}
            </div>
        );
    }
}

export default SalesReport;
