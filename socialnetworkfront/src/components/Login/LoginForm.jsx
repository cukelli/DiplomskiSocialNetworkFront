import React,{useState} from 'react';
import './LoginForm.css';
import { Link, useNavigate} from 'react-router-dom';
import { loginUser } from '../../service/BackendService';
import PropTypes from 'prop-types'; 

const LoginForm = ({setToken}) => {
  const [Email, setEmail] = useState()
  const [Password, setPassword] = useState()
  const navigate = useNavigate();
  const [error, setError] = useState('');



  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const token = await loginUser({
        Email,
        Password,
      });
  
      if (token.token) {
       // console.log(Email, Password);
        //console.log(token.token);
        navigate('/home');
        localStorage.setItem('token', JSON.stringify(token.token));
      } else {
        setError('Invalid credentials. Please try again.');
      }
    } catch (error) {
      console.error('Login error:', error);
    }
  };
  
  return (
    <div>
      <section className="vh-100">
        <div className="container-fluid h-custom">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-md-9 col-lg-6 col-xl-5">
              <img
                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                className="img-fluid"
                alt="Sample image"
              />
            </div>
            <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
              <form onSubmit={handleSubmit}>
              
                <div className="divider d-flex align-items-center my-4">
                  <p className="text-center fw-bold mx-3 mb-0">Welcome back </p>
                </div>

                 {/* Email input */}

                <div className="form-outline mb-4">
                  <input
                    type="email"
                    id="Email"
                    className="form-control form-control-lg" required
                    onChange={(e)=>setEmail(e.target.value)}
                    placeholder="Enter a valid email address"
                  />
                  <label className="form-label" htmlFor="emailLoginHTML">
                    Email address
                  </label>
                </div>



                {/* Password input  */}

                <div className="form-outline mb-3">
                  <input
                    type="password"
                    id="Password"
                    className="form-control form-control-lg" required 
                    onChange={(e)=>setPassword(e.target.value)}
                    placeholder="Enter password"
                  />
                  <label className="form-label" htmlFor="form3Example4">
                    Password
                  </label>
                </div>

                <div className="d-flex justify-content-between align-items-center">
                  <div className="form-check mb-0">
                    <input
                      className="form-check-input me-2"
                      type="checkbox"
                      value=""
                      id="form2Example3"
                    />
                    <label className="form-check-label" htmlFor="form2Example3">
                      Remember me
                    </label>
                  </div>
                  <a href="#!" className="text-body">
                    Forgot password?
                  </a>
                </div>

                <div className="text-center text-lg-start mt-4 pt-2">
                  <button
                    type="submit"
                    className="btn btn-primary btn-lg"
                    style={{ paddingLeft: '2.5rem', paddingRight: '2.5rem' }}>
                    Login
                  </button>

                  {error && <div className="error-message" style={{ color: 'red' }}>{error}</div>}
                  
                  <p className="small fw-bold mt-2 pt-1 mb-0">
                    Don't have an account? <Link to="/registration" className="link-danger">Register</Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="d-flex flex-column flex-md-row text-center text-md-start justify-content-between py-4 px-4 px-xl-5 bg-primary">
          <div className="text-white mb-3 mb-md-0">
            Copyright © 2020. All rights reserved.
          </div>
          <div>
            <a href="#!" className="text-white me-4">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="#!" className="text-white me-4">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#!" className="text-white me-4">
              <i className="fab fa-google"></i>
            </a>
            <a href="#!" className="text-white">
              <i className="fab fa-linkedin-in"></i>
            </a>
          </div>
        </div>
      </section>
      </div>
  );
};

LoginForm.propTypes = {
  setToken: PropTypes.func.isRequired
}


export default LoginForm