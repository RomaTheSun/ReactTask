import React, { Component } from 'react';
import './MortgageCalculator.css';

class MortgageCalculator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mortgageAmount: "",
      mortgageTerm: "",
      interestRate: "",
      monthlyRepayment: 0,
    };
  }

  handleChange = (e) => {
    const { id, value } = e.target;
    this.setState({ [id]: value });
  };

  calculateMortgage = () => {
    const { mortgageAmount, mortgageTerm, interestRate } = this.state;
    const month = 12;
    const percentage = 100;

    if (mortgageAmount > 0 && mortgageTerm > 0 && interestRate > 0) {
      const monthlyRate = interestRate / percentage / month;
      const numberOfPayments = mortgageTerm * month;
      const monthlyRepayment =
        (mortgageAmount * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -numberOfPayments));

      this.setState({ monthlyRepayment: monthlyRepayment.toFixed(2) });
    } else {
      this.setState({ monthlyRepayment: 0 });
    }
  };

  clearAll = () => {
    this.setState({
      mortgageAmount: '',
      mortgageTerm: '',
      interestRate: '',
      monthlyRepayment: 0,
    });
  };

  render() {
    const { mortgageAmount, mortgageTerm, interestRate, monthlyRepayment } = this.state;
    return (
      <div className="background">
        <main className="main_container">
          <section className="calc_cont">
            <div className="title_cont">
              <h1 className="title">Mortgage Calculator</h1>
              <input type="reset" value="Clear All" id="clear_btn" className="clear_btn" onClick={this.clearAll} />
            </div>

            <label className="mortgage_cont label">
              Mortgage Amount
              <div className="input_cont">
                <div className="input_img">$</div>
                <input
                  className="mortgage_input"
                  type="number"
                  id="mortgageAmount"
                  value={mortgageAmount}
                  onChange={this.handleChange}
                />
              </div>
            </label>

            <div className="year_and_interest_cont">
              <label className="input_box label">
                Mortgage Term
                <div className="input_cont">
                  <input
                    className="reverse_mortgage_input"
                    type="number"
                    id="mortgageTerm"
                    value={mortgageTerm}
                    onChange={this.handleChange}
                  />
                  <div className="reverse_input_img">years</div>
                </div>
              </label>

              <label className="input_box label">
                Interest Rate
                <div className="input_cont">
                  <input
                    className="reverse_mortgage_input"
                    type="number"
                    id="interestRate"
                    step="0.01"
                    value={interestRate}
                    onChange={this.handleChange}
                  />
                  <div className="reverse_input_img">%</div>
                </div>
              </label>
            </div>
            <button className="calculate_btn" id="calculate_btn" onClick={this.calculateMortgage}>
              Calculate
            </button>
          </section>
          <section className="result_cont">
            <h2 className="title white">Your results</h2>
            <div className="repayments_sum_cont">
              <span className="label white">Your monthly repayments</span>
              <div id="sum">$ {monthlyRepayment}</div>
            </div>
          </section>
        </main>
      </div>
    );
  }
}

export default MortgageCalculator;
