import React from 'react'
import { NavLink} from 'react-router-dom'

const SignedOutLink = () =>{
	return(
		<ul className = "right">
		
			<li><NavLink to='/signup'><b>Sing Up</b></NavLink></li>
			
		</ul>

	)
}
export default SignedOutLink