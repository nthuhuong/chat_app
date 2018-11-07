import React, { Component } from 'react'
import '../../App.css'


class SignUp extends Component{
	state={
		email:'',
		password:'',
		firstName:'',
		lastName:''
	}

	handleChange = (e) =>{
		this.setState({
			[e.target.id]: e.target.value

		})
	}

	handleSubmit = (e) =>{
		e.preventDefault();
		console.log(this.state);

	}	


	render(){
		return(
			<div className="container">
				<form onSubmit={this.handleSubmit} className="white">
					<h5 className="grey-text text-darken-3">Sign Up</h5>
					<div className="imput-field">
						<label htmlFor="email">Email</label>
						<input type="email" id="email" onChange={this.handleChange}/>
					</div>
					<div className="imput-field">
						<label htmlFor="password">Password</label>
						<input type="password" id="password" onChange={this.handleChange}/>
					</div>
					<div className="imput-field">
						<label htmlFor="firstName">First Name</label>
						<input type="text" id="firstName" onChange={this.handleChange}/>
					</div>
					<div className="imput-field">
						<label htmlFor="lastName">Last Name</label>
						<input type="text" id="lastName" onChange={this.handleChange}/>
					</div>

					<div className="">
						 <button className="waves-effect waves-light btn-small pink lighten-1 z-depth-g signup"><b>Sign Up</b></button>
					</div>
					<br/>
				</form>
			</div>
		)
	}
}

export default SignUp