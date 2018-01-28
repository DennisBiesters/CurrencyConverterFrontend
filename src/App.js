import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import querystring from 'querystring';

class App extends Component {
  constructor(props) {
    super(props);
	this.state = {
		webserviceState: 'fixerio',
		currencyFromState: 'EUR',
		currencyToState: 'USD',
		amountFrom: 1,
		backend: 'http://localhost/CurrencyConverterBackEnd/web/api',
		username: 'admin',
		password: 'admin'
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
	
	this.handleLogin = this.handleLogin.bind(this);
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
	  } else if (event.target.name === 'Backend'){
		  this.setState({backend: event.target.value});
	  } else if (event.target.name === 'Username'){
		  this.setState({username: event.target.value});
	  } else if (event.target.name === 'Password'){
		  this.setState({password: event.target.value});
	  }
	  
  }

  handleLogin(event) {
	event.preventDefault();
	
	const data = querystring.stringify({_username: this.state.username, _password: this.state.password});
	  
	axios.post(this.state.backend + '/login_check', data)
	.then((response) => {		
		this.DisplayToken.value = response.data.token;
	 })
     .catch((error) => {
		alert(error); 
	 });
  }
  
  handleSubmit(event) {
	event.preventDefault();
	
	axios.get(
	 this.state.backend + '/ConvertCurrency',
	 {
		params: {
      ws_name: this.state.webserviceState,
	  currency_from: this.state.currencyFromState,
	  currency_to: this.state.currencyToState
    }, headers: { 'Authorization': 'Bearer ' + this.DisplayToken.value }
	 })
	 .then((response) => {
		this.AmountToOutput.value = this.AmountFromInput.value * response.data.rate;
	 })
	 .catch((error) => {
		alert(error); 
	 });
  }
  
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
	  <form onSubmit={this.handleLogin}>
	  			  <div className="row">
	  <div className="col-md-4 offset-md-4">
	   <div className="form-group">
	  <label htmlFor="DisplayToken">Token</label>
	  <textarea rows="5" cols="200" className="form-control" name="DisplayToken" ref={(DisplayToken) => this.DisplayToken = DisplayToken}></textarea>	
	  </div>
	  	  <input type="submit" value="Get JWT token" className="btn btn-primary"/>  
	  </div>
	  <div className="col-md-4">
	  <div className="form-group">
	   <label htmlFor="Backend">Backend URL</label>
		   <input type="text" name="Backend" value={this.state.backend} onChange={this.handleChange} className="form-control"></input>
	  </div>
	  <div className="form-group">
	   <label htmlFor="Username">Username</label>
		   <input type="text" name="Username" value={this.state.username} onChange={this.handleChange} className="form-control"></input>
	  </div>
	  <div className="form-group">
	   <label htmlFor="Password">Password</label>
		   <input type="text" name="Password" value={this.state.password} onChange={this.handleChange} className="form-control"></input>
	  </div>
	  </div>
	  </div>
	  </form>
<br/>
		
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
		   <input type="text" defaultValue={this.state.amountFrom} name="AmountFrom" className="form-control" ref={(AmountFromInput) => this.AmountFromInput = AmountFromInput}></input>
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
