import React, { Component } from 'react'
//import LoginPage from './Component/login';
import { BrowserRouter as Router, Route, Switch} from "react-router-dom"
import SingIn from './Component/auth/SignIn'
import Navbar from './Component/layout/Navbar'
import SingUp from './Component/auth/SignUp'
import HomeChat from './Component/home/HomeChat'
import './App.css';

class App extends Component {
	render(){
		return(
			<Router>
				<div>
					<Navbar/>
					<Switch>
						<Route exact path='/' component={SingIn} />
						<Route path = '/signup' component={SingUp} />
						<Route path = '/homechat' component = { HomeChat } />			
					</Switch>

				</div>
			</Router>
		);
	}
	
}
export default App;