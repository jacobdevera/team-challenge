import React, { Component } from 'react';
import SignUpForm from './TeamSignUp';

class App extends Component {
   constructor(props) {
      super(props);
      this.state = {
         submitted: false
      };
   }

   submit = () => {
      this.setState({ submitted: true });
   }

  render() {
    return (
      <div className="container">
         <h1>Sign Up</h1>
         <h2>Our service is fun and awesome, but you must be 13 years old to join</h2>
         <hr></hr>
         {this.state.submitted &&
            <div className="alert alert-success" role="alert">Thanks for signing up!</div>
         }
         <SignUpForm submitCallback={this.submit}/>
      </div>
    );
  }
}

export default App;
