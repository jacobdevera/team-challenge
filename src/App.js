import React, { Component } from 'react';
import SignUpForm from './TeamSignUp';

class App extends Component {
  render() {
    return (
      <div className="container">
         <h1>Sign Up</h1>
         <h2>Our service is fun and awesome, but you must be 13 years old to join</h2>
         <hr></hr>
         <SignUpForm />
      </div>
    );
  }
}

export default App;
