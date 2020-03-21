import React from 'react';
import { connect } from 'react-redux';
import { userActions } from '../actions';
import img01 from '../assets/images/img-01.png';
import 'bootstrap/dist/css/bootstrap.css';
import '../assets/fonts/font-awesome-4.7.0/css/font-awesome.min.css';
import '../assets/vendor/animate/animate.css';
import '../assets/css/util.css';
import '../assets/css/main.css';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      email_errors: ''
    };
  }
  componentDidMount() {
  }
  changeHandler= (e) => {
    this.setState({ [e.target.name] : e.target.value});
  }

  handleSubmit = event => {
    event.preventDefault();
    console.log('Submitted');
    console.log(this.state);
    console.log(this.props);
    if(/\S+@\S+\.\S+/.test(this.state.email)){
      this.setState({email_errors: ''})
    } else {
      this.setState({email_errors: 'The email is invalid.'})
    }
    // this.props.login(this.state.email, this.state.password);
  }

  render() {
    return (
      <div className="limiter">
        <div className="container-login100">
          <div className="wrap-login100">
            <div className="login100-pic js-tilt" data-tilt>
              <img src={img01} alt="IMG"/>
            </div>

            <form className="login100-form validate-form" onSubmit={this.handleSubmit}>
              <span className="login100-form-title">
                eTutor Login
              </span>
                        
              <div className="wrap-input100 validate-input" data-validate = "Valid email is required: ex@abc.xyz">
                <input className="input100" type="text" name="email" placeholder="Email" value={this.state.email} onChange={this.changeHandler} />
                <span className="focus-input100"></span>
                <span className="symbol-input100">
                  <i className="fa fa-envelope" aria-hidden="true"></i>
                </span>
                {this.state.email_errors && <div className="error">{this.state.email_errors}</div>}
              </div>
                        
              <div className="wrap-input100 validate-input" data-validate = "Password is required">
                <input className="input100" type="password" name="password" placeholder="Password" value={this.state.password} onChange={this.changeHandler}/>
                <span className="focus-input100"></span>
                <span className="symbol-input100">
                  <i className="fa fa-lock" aria-hidden="true"></i>
                </span>
              </div>
              
              <div className="container-login100-form-btn">
                <button className="login100-form-btn">
                  Login
                </button>
              </div>

              {/* <div className="text-center p-t-12">
                <span className="txt1">
                  Forgot
                </span>
                <a className="txt2" href="#">
                  Username / Password?
                </a>
              </div> */}

              <div className="text-center p-t-136">
                {/* <a className="txt2" href="#">
                  Create your Account
                  <i className="fa fa-long-arrow-right m-l-5" aria-hidden="true"></i>
                </a> */}
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

function mapState(state) {
  const { alert } = state;
  console.log(alert, 'shika');
  return {ca: "ac"};
}

const actionCreators = {
  login: userActions.login,
};

export default connect(mapState, actionCreators)(Login);