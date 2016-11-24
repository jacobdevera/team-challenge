import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { SignUpForm } from './TeamSignUp';

class App extends Component {
  render() {
    return (
      <div>
         <h1>Sign Up</h1>
         <SignUpForm />
      </div>
    );
  }
}

export default App;
