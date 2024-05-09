import React, { useEffect, useState } from 'react';
import './ProfilePage.css';
import useToken from '../../service/UseToken';
import ProtectedRoutes from '../../ProtectedRoutes';
import { getCurrentUser, getDefaultProfilePicture, editUserInfo, changePassword } from '../../service/BackendService';
import { Link, useNavigate } from 'react-router-dom';
import { getToken } from '../../service/BackendService';
import { useRef } from 'react';

const ProfilePage = () => {
  const { clearToken } = useToken();
  const [userData, setUserData] = useState(null);
  const [profilePictureUrl, setProfilePictureUrl] = useState(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const inputRefFirstName = useRef(null);
  const inputRefLastName = useRef(null);
  const [showSuccessPasswordMessage, setShowSuccessPasswordMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [errorMessagePassword, setErrorMessagePassword] = useState(null);
  const [passwordError, setPasswordError] = useState(null);
  const [formError, setFormError] = useState(null);
  const navigate = useNavigate();
  const token = getToken();


  const isFormValid = () => {
    if (inputRefFirstName.current !== null && inputRefLastName.current !== null) {
    return (
      inputRefFirstName.current.value.trim() !== '' &&
      inputRefLastName.current.value.trim() !== '' 
    ); }
  };

  const [updatedUserInfo, setUpdatedUserInfo] = useState({
    FirstName: userData?.FirstName || '',
    LastName: userData?.LastName || '',
  });

  const [changePasswordInfo, setChangePasswordInfo] = useState({
    OldPassword: '',
    NewPassword: '',
    RepeatPassword: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = await getCurrentUser();
        setUserData(user);

        const pictureUrl = await getDefaultProfilePicture();
        setProfilePictureUrl(pictureUrl);
      } catch (error) {
        // console.error('Error fetching user data:', error);
      }
    };

    if (token) {
      fetchData();
    }
  }, [token]);

  useEffect(() => {
    setUpdatedUserInfo({
      FirstName: userData?.FirstName || '',
      LastName: userData?.LastName || '',
    });
  }, [userData]);

  const handleLogout = () => {
    clearToken();
    navigate('/');
  };

  const handleFirstNameChange = (e) => {
    setUpdatedUserInfo((prevUserInfo) => ({
      LastName: prevUserInfo.LastName,
      FirstName: e.target.value,
    }));
  };

  const handleLastNameChange = (e) => {
    setUpdatedUserInfo((prevUserInfo) => ({
      FirstName: prevUserInfo.FirstName,
      LastName: e.target.value,
    }));
  };

  const handleEditInfo = async () => {

    try {
      const result = await editUserInfo(updatedUserInfo);

      setShowSuccessMessage(true);
      setTimeout(() => {
        setShowSuccessMessage(false);
      }, 5000);
    } catch (error) {
      // console.error('Error editing user info:', error);
      setErrorMessage(error.message || 'Error editing user info');
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const handleChangePassword = async () => {
    if (changePasswordInfo.NewPassword !== changePasswordInfo.RepeatPassword) {
      setPasswordError('New password and repeat password do not match');
      setTimeout(() => {
        setPasswordError(null);
      }, 5000);
      return;
    }

    try {
      const result = await changePassword({
        OldPassword: changePasswordInfo.OldPassword,
        NewPassword: changePasswordInfo.NewPassword,
      });

      setShowSuccessPasswordMessage(true);
      setTimeout(() => {
        setShowSuccessPasswordMessage(false);
      }, 5000);
    } catch (error) {
      // console.error('Error changing password:', error);
      setErrorMessagePassword(error.message || 'Error changing password');
      setTimeout(() => {
        setErrorMessagePassword(null);
      }, 5000);
    }
  };

  const handleInputChange = (e) => {
    setChangePasswordInfo((prevInfo) => ({
      ...prevInfo,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div>
      <ProtectedRoutes />
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand">Navbar</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item active">
              <Link to="/home" style={{ textDecoration: 'none' }}>
                <a className="nav-link">Home</a>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/profile/friends" style={{ textDecoration: 'none' }}>
                <a className="nav-link">Friends</a>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/profile" style={{ textDecoration: 'none' }}>
                <a className="nav-link">Profile </a>
              </Link>
            </li>
            <li className="nav-item">
              <button onClick={handleLogout} className="nav-link">
                LOG OUT
              </button>
            </li>
          </ul>
        </div>
      </nav>
      <div className="container rounded bg-white mt-5 mb-5">
        <div className="row">
          <div className="col-md-3 border-right">
            <div className="d-flex flex-column align-items-center text-center p-3 py-5">
              <img className="rounded-circle mt-5" width="150px" src={profilePictureUrl} alt="" />
              <span className="font-weight-bold">{userData?.FirstName}</span>
              <span></span>
            </div>
            <p>

              {/* Change profile picture form  */}
              <b>Change profile picture</b>
            </p>

            <form action="/api/uploadImage" method="post" encType="multipart/form-data">          
                <input type="file" name="picture" />
                <br/>
                <br/>

                <button type="submit" className="btn btn-primary profile-button">Upload Image</button>
            </form>


          </div>
          <div className="col-md-5 border-right">
            <div className="p-3 py-5">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h4 className="text-right">Profile Settings</h4>
              </div>
              <h6 className="text-right"> Change personal info </h6>
              <form>
                <div className="row mt-2">
                  <div className="col-md-6">
                    <label className="labels">Name</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="First Name"
                      ref={inputRefFirstName}
                      defaultValue={userData?.FirstName || ''}
                      onChange={handleFirstNameChange}
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="labels">Last Name</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Last Name"
                      ref={inputRefLastName}
                      defaultValue={userData?.LastName || ''}
                      onChange={handleLastNameChange}
                    />
                  </div>
                </div>
                <div className="row-mt-3">
                  <label className="labels">Email</label>
                  <input type="text" className="form-control" placeholder="Email" defaultValue={userData?.Email || ''} disabled />
                </div>
                <br />
                <p>
                  Gender: <b>{userData?.Gender}</b>
                </p>
                <div className="mt-5 text-center">
                  <button className="btn btn-primary profile-button" type="button"  disabled={!isFormValid()} onClick={handleEditInfo}>
                    Edit info
                  </button>
                </div>
              </form>
              {/* Success message */}
              {showSuccessMessage && <div className="alert alert-success mt-3" role="alert">Profile updated successfully!</div>}
              {/* Error message */}
              {errorMessage && <div className="alert alert-danger mt-3" role="alert">{errorMessage}</div>}
              {formError && 
                  <div className="alert alert-danger mt-3" role="alert">
                    {formError}
                  </div> }
              <br />
              <form>
                <h6 className="text-right">Change password </h6>
                <div className="row mt-2">
                  <div className="col-md-6">
                    <label className="labels">Old password</label>
                    <input
                      type="password"
                      onChange={handleInputChange}
                      className="form-control"
                      placeholder="Old password"
                      name="OldPassword"
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="labels">New password</label>
                    <input
                      type="password"
                      onChange={handleInputChange}
                      className="form-control"
                      placeholder="New password"
                      name="NewPassword"
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="labels">Repeat new password</label>
                    <input
                      type="password"
                      onChange={handleInputChange}
                      className="form-control"
                      placeholder="Repeat new password"
                      name="RepeatPassword"
                    />
                  </div>
                </div>
                <br />
                <div className="mt-5 text-center">
                  <button className="btn btn-primary profile-button" type="button" onClick={handleChangePassword}>
                    Change password
                  </button>
                </div>
                {/* Success message */}
                {showSuccessPasswordMessage && (
                  <div className="alert alert-success mt-3" role="alert">
                    Password changed successfully!
                  </div>
                )}
                {/* Error message */}
                {passwordError && ( <div className="alert alert-danger mt-3" role="alert">{passwordError}</div>)}
                {/* Error message 2 */}
                        {errorMessagePassword && <div className="alert alert-danger mt-3"
                         role="alert">{errorMessagePassword}</div>}

              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
