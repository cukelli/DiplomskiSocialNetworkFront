import React,{useState, useEffect} from 'react';
import './FriendsPage.css';
import useToken from '../../service/UseToken'; 
import ProtectedRoutes from '../../ProtectedRoutes';
import { Link, useNavigate } from 'react-router-dom'; 
import { getToken } from '../../service/BackendService';
import { getCurrentUser, getDefaultProfilePicture } from '../../service/BackendService';


const FriendsPage = () => {

   const { clearToken } = useToken();
   const [userData, setUserData] = useState(null);
   const [profilePictureUrl, setProfilePictureUrl] = useState(null);
   const navigate = useNavigate();
   const token = getToken()

   useEffect(() => {
    const fetchData = async () => {
      try {
        const user = await getCurrentUser();
        setUserData(user);

        const pictureUrl = await getDefaultProfilePicture();
        setProfilePictureUrl(pictureUrl);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    if (token) {
      fetchData();
    }
  }, [token]);

 
    const handleLogout = () => {
     clearToken();
     navigate('/'); 
   }; 


return (
<div>
<ProtectedRoutes/> 

    {/* Navigation bar  */}
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
         </Link>      </li>

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

      <li className="nav-item"> <button onClick={handleLogout} className="nav-link"> LOG OUT </button></li>   
    </ul>
  </div>


</nav>

{/* navigation bar ending */}

<div className="container">
<div id="content" className="content p-0">
    <div className="profile-header">
        <div className="profile-header-cover"></div>
        <div className="profile-header-content">
            <div className="profile-header-img mb-4">
        <img src={profilePictureUrl || 'https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg'} className="mb-4" alt="" />
            </div>

            <div className="profile-header-info">
                <h4 className="m-t-sm">{userData?.FirstName} {userData?.LastName}</h4>
                {/* <a href="#" class="btn btn-xs btn-primary mb-2">Edit Profile</a> */}
            </div>
        </div>
    </div>

    <div className="profile-container">
        <div className="row row-space-20">
            <div className="col-md-8">
                <div className="tab-content p-0">
                    <div className="tab-pane fade active show" id="profile-friends">
                        <div className="m-b-10"><b>Friend List (0)</b></div>
                        {/* <ul className="friend-list clearfix">
                            <li>
                                <a href="#">
                                    <div className="friend-img"><img src="https://bootdey.com/img/Content/avatar/avatar2.png" alt="" /></div>
                                    <div className="friend-info">
                                        <h4>Sancho Aldo</h4>
                                        <p>392 friends</p>
                                    </div>
                                </a>
                            </li>
                            <li>
                                <a href="#">
                                    <div className="friend-img"><img src="https://bootdey.com/img/Content/avatar/avatar3.png" alt="" /></div>
                                    <div className="friend-info">
                                        <h4>Jonty Augusto</h4>
                                        <p>128 friends</p>
                                    </div>
                                </a>
                            </li>
                            <li>
                                <a href="#">
                                    <div className="friend-img"><img src="https://bootdey.com/img/Content/avatar/avatar4.png" alt="" /></div>
                                    <div className="friend-info">
                                        <h4>Androkles Allen</h4>
                                        <p>12 friends</p>
                                    </div>
                                </a>
                            </li>
                            <li>
                                <a href="#">
                                    <div className="friend-img"><img src="https://bootdey.com/img/Content/avatar/avatar5.png" alt="" /></div>
                                    <div className="friend-info">
                                        <h4>Ithamar Silvio</h4>
                                        <p>1,923 friends</p>
                                    </div>
                                </a>
                            </li>
                            <li>
                                <a href="#">
                                    <div className="friend-img"><img src="https://bootdey.com/img/Content/avatar/avatar6.png" alt="" /></div>
                                    <div className="friend-info">
                                        <h4>Denzel Annas</h4>
                                        <p>893 friends</p>
                                    </div>
                                </a>
                            </li>
                            <li>
                                <a href="#">
                                    <div className="friend-img"><img src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="" /></div>
                                    <div className="friend-info">
                                        <h4>Kamil Cree</h4>
                                        <p>983 friends</p>
                                    </div>
                                </a>
                            </li>
                            <li>
                                <a href="#">
                                    <div className="friend-img"><img src="https://bootdey.com/img/Content/avatar/avatar8.png" alt="" /></div>
                                    <div className="friend-info">
                                        <h4>Fritjof Inderjit</h4>
                                        <p>3,321 friends</p>
                                    </div>
                                </a>
                            </li>
                            <li>
                                <a href="#">
                                    <div className="friend-img"><img src="https://bootdey.com/img/Content/avatar/avatar1.png" alt="" /></div>
                                    <div className="friend-info">
                                        <h4>Sushil Trygve</h4>
                                        <p>921 friends</p>
                                    </div>
                                </a>
                            </li>
                            <li>
                                <a href="#">
                                    <div className="friend-img"><img src="https://bootdey.com/img/Content/avatar/avatar2.png" alt="" /></div>
                                    <div className="friend-info">
                                        <h4>Frans Gebhard</h4>
                                        <p>944 friends</p>
                                    </div>
                                </a>
                            </li>
                        </ul> */}
                    </div>
                </div>
            </div>
            </div>
        </div>
    </div>
</div>
</div>

)
};

export default FriendsPage;