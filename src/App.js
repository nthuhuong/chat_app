import React, { Component } from 'react'
//import LoginPage from './Component/login';
import { BrowserRouter as Router, Route, Switch, Redirect} from "react-router-dom"
import SingIn from './Component/auth/SignIn'
import Navbar from './Component/layout/Navbar'
import SingUp from './Component/auth/SignUp'
import './App.css';

class App extends Component {
	render(){
		return(
			<Router>
				<div>
					<Navbar/>
					<Switch>
					    //<Redirect from = '/home' to='/signup'/>
						<Route exact path='/' component={SingIn} />
						<Route path = '/signup' component={SingUp} />
					</Switch>

				</div>
			</Router>
		);
	}
	
}
export default App;