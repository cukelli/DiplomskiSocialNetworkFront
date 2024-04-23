import LoginForm from'./components/Login/LoginForm';
import RegistrationForm from './components/Registration/RegistrationForm'
import HomePage from './components/Home/HomePage'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import {Routes, Route } from 'react-router-dom';
import ProfilePage from './components/Profile/ProfilePage';
import FriendsPage from './components/Friends/FriendsPage';
import WelcomePage from './components/WelcomePage/WelcomePage';

function App() {

  const setToken = (token) => {
    console.log('Token:', token);
  };

  return (
    <div className="App">

   
   <Routes>
          <Route path="/profile/friends" element={<FriendsPage/>} />
          <Route path="/"  element={<LoginForm setToken={setToken} />} />
          <Route path="/registration" element={<RegistrationForm />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/profile" element={<ProfilePage />} />
            <Route path="/welcome" element={<WelcomePage />} />


       </Routes>

    </div>
  );
}

export default App;
