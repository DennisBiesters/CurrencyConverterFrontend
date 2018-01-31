import React, { Component } from "react";
import { Link } from "react-router-dom";
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import "./Home.css";
import axios from 'axios';

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      amountFrom: 1,
	  amountTo: '',
	  currencyFromState: 'EUR',
	  currencyToState: 'USD',
	  dropdownCurrencyFromOptions: '',
	  dropdownCurrencyToOptions: '',
    };
  }

  async componentDidMount() {
    if (!this.props.isAuthenticated) {
      return;
    }
	
	axios.get(
	 'http://localhost/CurrencyConverterBackEnd/web/api/GetAllCurrencies', {
		 headers: { 'Authorization': 'Bearer ' + localStorage.getItem('jwt') }}
	 )
	 .then((response) => {
		this.setState({dropdownCurrencyFromOptions: Object.values(response.data.currencies).map((option) => <option key={option} value={option}>{option}</option>)});
		this.setState({dropdownCurrencyToOptions: Object.values(response.data.currencies).map((option) => <option key={option} value={option}>{option}</option>)});		
	 })
	 .catch((error) => {
		alert(error); 
	 });

    this.setState({ isLoading: false });
  }
  
    handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }
  
  handleSubmit = async event => {
    event.preventDefault();
	
		axios.get(
	 'http://localhost/CurrencyConverterBackEnd/web/api/ConvertCurrency',
	 {
		params: {
	  currency_from: this.state.currencyFromState,
	  currency_to: this.state.currencyToState
    }, headers: { 'Authorization': 'Bearer ' + localStorage.getItem('jwt') }
	 })
	 .then((response) => {
		 this.setState({amountTo: response.data.rate});
	 })
	 .catch((error) => {
		alert(error); 
	 });
  };

  renderLander() {
    return (
      <div className="lander">
        <h1>CurrencyConverter</h1>
        <p>A simple currency converter app</p>
        <div>
          <Link to="/login" className="btn btn-info btn-lg">
            Login
          </Link>
        </div>
      </div>
    );
  }

  renderCurrencyConverter() {
    return (
      <div className="notes">
	  <form onSubmit={this.handleSubmit}>
	  <div className="row">
	  <div className="col-md-6">
	  <FormGroup controlId="currencyFromState" bsSize="large">
            <ControlLabel>Currency From</ControlLabel>
            <FormControl componentClass="select" placeholder="select" value={this.state.currencyFromState} onChange={this.handleChange}>
			 {this.state.dropdownCurrencyFromOptions}
      </FormControl>
          </FormGroup>
	  </div>
	   <div className="col-md-6">
	  <FormGroup controlId="currencyToState" bsSize="large">
            <ControlLabel>Currency To</ControlLabel>
            <FormControl componentClass="select" placeholder="select" value={this.state.currencyToState} onChange={this.handleChange}>
			 {this.state.dropdownCurrencyToOptions}
      </FormControl>
          </FormGroup>
	  </div>
	  </div>
	  <div className="row">
	  <div className="col-md-6">
	    <FormGroup controlId="amountFrom" bsSize="large">
            <ControlLabel>Amount {this.state.currencyFromState}</ControlLabel>
            <FormControl
              autoFocus
              type="number"
              value={this.state.amountFrom}
              onChange={this.handleChange}
            />
          </FormGroup>
		  </div>
		  	  <div className="col-md-6">
	    <FormGroup controlId="amountTo" bsSize="large">
            <ControlLabel>Amount {this.state.currencyToState}</ControlLabel>
            <FormControl
              autoFocus
              type="number"
              value={this.state.amountTo}
              onChange={this.handleChange}
            />
          </FormGroup>
		  </div>
		  </div>
		  <input type="submit" value="Submit" className="btn btn-primary"/>   
	  </form>
      </div>
    );
  }

  render() {
    return (
      <div className="Home">
        {this.props.isAuthenticated ? this.renderCurrencyConverter() : this.renderLander()}
      </div>
    );
  }
}
