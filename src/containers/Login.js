import React from 'react';
import LoginForm from '../components/LoginForm/LoginForm';

export default class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      errors: {},
      user: {
        name: '',
        password: ''
      }
    };

    this.changeUser = this.changeUser.bind(this);
    this.processForm = this.processForm.bind(this);
  }

  changeUser(event) {
    const field = event.target.name;
    const user = this.state.user;
    user[field] = event.target.value;

    this.setState({
      user
    });
  }

  processForm(event) {
    // prevent default action. in this case, action is the form submission event
    event.preventDefault();

    // create a string for an HTTP body message
    const name = encodeURIComponent(this.state.user.name);
    const password = encodeURIComponent(this.state.user.password);
    const formData = `name=${name}&password=${password}`;

    // create an AJAX request
    const xhr = new XMLHttpRequest();
    xhr.open('post', 'api/user/login');
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.responseType = 'json';
    xhr.addEventListener('load', () => {
      if (xhr.status === 200) {
        // success

        // change the component-container state
        // this.setState({
        //   errors: {}
        // });
        
        console.log('The form is valid', xhr.response);
        this.setState({
          errors: {}
        });
        window.localStorage.setItem('repair', xhr.response.token);
        window.location = 'http://' + window.location.hostname + ':' + window.location.port;
      } else {
        // failure
        console.log(xhr.response);
        const errors = xhr.response.errors ? xhr.response.errors : {};
        errors.summary = xhr.response.message;

        this.setState({
          errors
        });
      }
    });
    xhr.send(formData);
  }

  render(){
    return(
      <LoginForm onChange={this.changeUser} onSubmit={this.processForm} user={this.state.user} errors={this.state.errors} />
    )
  }
}
