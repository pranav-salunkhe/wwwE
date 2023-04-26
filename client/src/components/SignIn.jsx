import React, { Component } from 'react';
class SignInButton extends Component {
    componentDidMount() {
      gapi.load('auth2', () => {
        gapi.auth2.init({
          client_id: 'YOUR_CLIENT_ID_HERE'
        });
        gapi.signin2.render('my-signin2', {
          'scope': 'profile email',
          'width': 240,
          'height': 50,
          'longtitle': true,
          'onsuccess': this.onSignIn,
          'onfailure': this.onSignInFailure
        });
      });
    }
  
    onSignIn = () => {
      const profile = gapi.auth2.getAuthInstance().currentUser.get().getBasicProfile();
      const userId = profile.getId();
      // TODO: Fetch events for the signed-in user's calendar and pass them to the parent component
    };
  
    onSignInFailure = error => {
      console.error(error);
    };
  
    render() {
      return <div>SIGN_IN</div>;
    }
  }

  export default SignInButton;