import { Link, useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import { registerUser } from '../../service/BackendService';


const RegistrationForm = () => {

   const [formData, setFormData] = useState({
    Email: '',
    LastName: '',
    FirstName: '',
    Password: '',
    Gender: 'F',
  });

  const navigate = useNavigate();
  const [repeatPassword, setRepeatPassword] = useState('');


  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

    const handleRepeatPasswordChange = (e) => {
    setRepeatPassword(e.target.value);
  };

 const [errors, setErrors] = useState([]);

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const response = await registerUser(formData);

    if (response.message === 'User created successfully') {
      console.log('Registration successful:', response);
      navigate('/welcome');
    } else {
      if (formData.Password !== repeatPassword) {
        setErrors((prevErrors) => [...prevErrors, 'Passwords do not match.']);
      }
      setErrors((prevErrors) => [...prevErrors, `${response.message}`]);
      console.log(errors.toString());
    }
  } catch (error) {
    console.error('Registration error:', error);
  }
};

    return (
<section className="vh-100" style={{backgroundColor: '#eee'}}>
  <div className="container h-100">
    <div className="row d-flex justify-content-center align-items-center h-100">
      <div className="col-lg-12 col-xl-11" style={{position: 'absolute', top: '1px'}}>
        <div className="card text-black" style={{borderRadius: '25px'}}>
          <div className="card-body p-md-5">
            <div className="row justify-content-center">
              <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">

                <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign up</p>

                <form onSubmit={handleSubmit} className="mx-1 mx-md-4">

                  {/*First Name */}
               <div className="d-flex flex-row align-items-center mb-4">
          <i className="fas fa-user fa-lg me-3 fa-fw"></i>
        <div className="form-outline flex-fill mb-0">
          <input
           type="text"
           id="FirstName"
           className="form-control"
           value={formData.FirstName}
          onChange={handleChange}
        />
        <label className="form-label">Your First Name</label>
        </div>
</div>

                  {/*Last Name */}
                    <div className="d-flex flex-row align-items-center mb-4">
          <i className="fas fa-user fa-lg me-3 fa-fw"></i>
        <div className="form-outline flex-fill mb-0">
          <input
           type="text"
           id="LastName"
           className="form-control"
           value={formData.LastName}
          onChange={handleChange}
        />
        <label className="form-label">Your Last Name</label>
        </div>
      </div>

                   {/*Email */}
                  <div className="d-flex flex-row align-items-center mb-4">
            <i className="fas fa-user fa-lg me-3 fa-fw"></i>
            <div className="form-outline flex-fill mb-0">
          <input
           type="text"
           id="Email"
           className="form-control"
           value={formData.Email}
          onChange={handleChange}
        />
        <label className="form-label">Your Email</label>
        </div>
      </div>

                  {/*Gender */}
<div>
  <label className="form-label">Your Gender:</label>
  <div className="form-check">
    <input
      className="form-check-input"
      type="radio"
      id="Gender"
      name="Gender"
      value="M"
      checked={formData.Gender === 'M'}
      onChange={handleChange}
    />
    <label className="form-check-label" htmlFor="male">
      Male
    </label>
  </div>
  <div className="form-check">
    <input
      className="form-check-input"
      type="radio"
      id="Gender"
      name="Gender"
      value="F"
      checked={formData.Gender === 'F'}
      onChange={handleChange}
    />
    <label className="form-check-label" htmlFor="female">
      Female
    </label>
  </div>
</div>

                  {/*Password*/}


                  <div className="d-flex flex-row align-items-center mb-4">
            <i className="fas fa-user fa-lg me-3 fa-fw"></i>
            <div className="form-outline flex-fill mb-0">
          <input
           type="password"
           id="Password"
           className="form-control"
           value={formData.Password}
          onChange={handleChange}
        />
        <label className="form-label">Enter Your Password </label>
        </div>
      </div>


                 {/*Repeat Password*/}
      <div className="d-flex flex-row align-items-center mb-4">
      <i className="fas fa-key fa-lg me-3 fa-fw"></i>
      <div className="form-outline flex-fill mb-0">
        <input
          type="password"
          id="repeatPassword"
          className="form-control"
          value={repeatPassword}
          onChange={handleRepeatPasswordChange}
        />
        <label className="form-label">Repeat your password</label>
      </div>
    </div>
  
                <div className="form-check d-flex justify-content-center mb-5">
                    <input className="form-check-input me-2" type="checkbox" id="form2Example3c" />
                    <label className="form-check-label" htmlFor="form2Example3">
                      Already have an account? <Link to="/" >Log in</Link>
                    </label>
                  </div>
                  <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                    <button type="submit" className="btn btn-primary btn-lg">Register</button>
                  </div>
                </form>

                {/* Errors */}
        {/* {errors.length > 0 && <div style={{ color: 'red' }}>{errors.toString()} Error </div>} */}


        {/* // Errors */}
   {errors.length > 0 && (
     <div style={{ color: 'red' }}>
      {errors.join('. ')}
     </div>
        )}



              </div>
              <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">

                <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                  className="img-fluid" alt="Sample image"/>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div className="d-flex flex-column flex-md-row text-center text-md-start justify-content-between py-4 px-4 px-xl-5 bg-primary"
            style={{position: 'relative', top: '60%', marginTop: '2px'
}}>
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

);
};

export default RegistrationForm;