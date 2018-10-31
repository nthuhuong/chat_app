import React, { Component } from 'react';
import LoginPage from './Component/login';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import './App.css';

const App = () => (
  <Router>
    <div>
      <Route exact path="/" component={LoginPage} />
    </div>
  </Router>
)
export default App;
