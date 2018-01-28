import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

class App extends Component {
  constructor(props) {
    super(props);
	this.state = {
		webserviceState: 'fixerio',
		currencyFromState: 'EUR',
		currencyToState: 'USD',
	};
	
	this.webserviceOptions = [{key: 'webservicex', value: 'webservicex'}, {key: 'currencyconverter', value:'currencyconverter'}, {key: 'fixerio', value:'fixerio'}];
	this.currencyOptions = [{key: 'USD', value: 'United States'}, {key: 'EUR', value: 'Europe'}, {key: 'GBP', value: 'United Kingdom'}]

	//axios.get(
	 //'http://localhost/CurrencyConverter/web/unapi/GetAllWebservices',
	 //)
	 //.then((response) => {
		//this.options = response.data;
		//console.log(this.options);
	 //});
	
	this.dropdownWebserviceOptions = this.webserviceOptions.map((op) => 
		<option key={op.key} value={op.key}>{op.value}</option>
	);
	
	this.dropdownCurrencyOptions = this.currencyOptions.map((op) =>
		<option key={op.key} value={op.key}>{op.key} - {op.value}</option>
	);
	
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  
  handleChange(event) {
	  if(event.target.name === 'DropdownWebservice'){
		  this.setState({webserviceState: event.target.value});
	  } else if (event.target.name === 'DropdownCurrencyFrom'){
		  this.setState({currencyFromState: event.target.value});
	  } else if (event.target.name === 'DropdownCurrencyTo'){
		  this.setState({currencyToState: event.target.value});
	  }
  }

  handleLogin(event) {
	  event.preventDefault();
	  
	  axios.post('http://localhost/CurrencyConverter/web/api/login_check', 
	  {
		  _username: 'admin',
		  _password: 'admin'
	  })
	.then((response) => {
		console.log(response.data.token)
	 });
  }
  
  handleSubmit(event) {
	event.preventDefault();
	
	axios.get(
	 'http://localhost/CurrencyConverter/web/unapi/ConvertCurrency',
	 {
		params: {
      ws_name: this.state.webserviceState,
	  currency_from: this.state.currencyFromState,
	  currency_to: this.state.currencyToState
    }
	 })
	 .then((response) => {
		this.AmountToOutput.value = this.AmountFromInput.value * response.data.rate;
	 });
  }
  
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
			  <div className="row">
	  <div className="col-md-2 offset-md-5">
	  <form onSubmit={this.handleLogin}>
	  
	  <input type="submit" value="Login" className="btn btn-primary"/>  
	  </form>
	  </div>
	  </div>
		
		 <form onSubmit={this.handleSubmit}>
		 <div className="row">
		  <div className="col-md-2 offset-md-5">
		 <div className="form-group">
		 <label htmlFor="DropdownWebservice">Webservice</label>
		 <select value={this.state.webserviceState} onChange={this.handleChange} name="DropdownWebservice" className="form-control">
			 {this.dropdownWebserviceOptions}
          </select>
		  </div>
		  </div>
		  </div>
		  
		  <div className="row">
		  <div className="col-md-6">
		  <div className="form-group">
		  <label htmlFor="DropdownCurrencyFrom">Currency I Have</label>
		 <select value={this.state.currencyFromState} onChange={this.handleChange} name="DropdownCurrencyFrom" className="form-control">
			 {this.dropdownCurrencyOptions}
          </select>
		   <label htmlFor="AmountFrom">Amount</label>
		   <input type="text" name="AmountFrom" className="form-control" ref={(AmountFromInput) => this.AmountFromInput = AmountFromInput}></input>
		   </div>
		   </div>
		   
		   <div className="col-md-6">
		   <div className="form-group">
		  <label htmlFor="DropdownCurrencyTo">Currency I Want</label>
		 <select value={this.state.currencyToState} onChange={this.handleChange} name="DropdownCurrencyTo" className="form-control">
			 {this.dropdownCurrencyOptions}
          </select>
		    <label htmlFor="AmountTo">Amount</label>
		   <input type="text" name="AmountTo" className="form-control" ref={(AmountToOutput) => this.AmountToOutput = AmountToOutput}></input>
		   </div>
		   </div>
		   </div>	   	   
		   <input type="submit" value="Submit" className="btn btn-primary"/>   
		   </form>	  
      </div>
    );
  }
}

export default App;
