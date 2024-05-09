import React, {useEffect, useState} from 'react';
import './HomePage.css';
import useToken from '../../service/UseToken'; 
import { useNavigate } from 'react-router-dom';
import { getImagesByPostId, getToken } from '../../service/BackendService';
import ProtectedRoutes from '../../ProtectedRoutes';
import { Link } from 'react-router-dom';
import { getCurrentUser, getDefaultProfilePicture, createPost, getFriendsPosts } from '../../service/BackendService';
import { useRef } from 'react';

const HomePage = () => {
   const { clearToken } = useToken();
   const [userData, setUserData] = useState(null);
   const [profilePictureUrl, setProfilePictureUrl] = useState(null);
   const [friendsPosts, setFriendsPosts] = useState([]);
   const [showSuccessMessage, setShowSuccessMessage] = useState(false);
   const navigate = useNavigate();
   const inputRefTitle = useRef(null);
   const inputRefDescription = useRef(null);
   const token = getToken()
   const [Title, setTitle] = useState('');
// const [ImagePath, setImagePath] = useState([]);
   const [Description, setDescription] = useState('');

  const isFormValid = () => {
   if (inputRefDescription.current !== null && inputRefTitle.current !== null) {
   return (
      inputRefDescription.current.value.trim() !== '' &&
      inputRefTitle.current.value.trim() !== '' 
   ); }
 };
  const fetchData = async () => {
    try {
      const user = await getCurrentUser();
      setUserData(user);

      const pictureUrl = await getDefaultProfilePicture();
      setProfilePictureUrl(pictureUrl);

      const response = await getFriendsPosts();

          for (let i=0; i< response.length; i++) {
            const imagePath = await getImagesByPostId(response[i].PostID);
            if (imagePath.length > 0) {
              response[i].ImagePath = imagePath[0].ImagePath;
            }
          
    
          }

      setFriendsPosts(response);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

useEffect(() => {

  fetchData();
}, []); 

    
     
    const handleLogout = () => {
     clearToken();
     navigate('/'); 
   }; 


   const formatDateTime = (dateTimeString) => {
      const dateTime = new Date(dateTimeString);
      return dateTime.toLocaleString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        hour12: true,
      });
    };




    const handleCreatePost = async (e) => {
  e.preventDefault();

  try {
    const fileInput = document.getElementById('ImagePath');
    const files = fileInput.files;

    if (files.length > 0) {
      const file = files[0];
      const reader = new FileReader();

      reader.onloadend = async () => {
        const ImagePath = reader.result;
        try {
          const response = await createPost({ Title, Description, ImagePath});
          fetchData();
            // console.log(response);
            //  const imagePath = await getImagesByPostId(response.PostID);
            // if (imagePath.length > 0) {
            //   response.ImagePath = imagePath[0].ImagePath;
            // }

          // setFriendsPosts((prevPosts) => [response, ...prevPosts]);
          // setTitle('');
          // setDescription('');
          setShowSuccessMessage(true);
          setTimeout(() => {
            setShowSuccessMessage(false);
          }, 5000);
        } catch (error) {
          console.error('Error creating post:', error.error);
        }
      };

      reader.readAsDataURL(file);
    } else {

      const response = await createPost({ Title, Description });
      
      setFriendsPosts((prevPosts) => [response, ...prevPosts]);
    
          // for (let i=0; i< this.friendsPosts.length; i++) {
          //   // getImagesByPostId(response.PostID);
          //   console.log(i.PostID);
          //   console.log("here for loop")
          // }
      setTitle('');
      setDescription('');
  
      setShowSuccessMessage(true);
      setTimeout(() => {
        setShowSuccessMessage(false);
      }, 5000);
    }
  } catch (error) {
    console.error('Error handling file upload:', error);
  }
};

     return (
<div>
 <ProtectedRoutes/> 
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

<div className="container">
<link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css" rel="stylesheet"></link>
   <div className="row">
      <div className="col-md-12">
         <div id="content" className="content content-full-width">
            {/* <!-- begin profile --> */}
            <div className="profile">
               <div className="profile-header">
                  {/* <!-- BEGIN profile-header-cover --> */}
                  <div className="profile-header-cover"></div>
                  {/* <!-- END profile-header-cover --> */}
                  {/* <!-- BEGIN profile-header-content --> */}
                  <div className="profile-header-content">
                     {/* <!-- BEGIN profile-header-img --> */}
                     <div className="profile-header-img">
                     <img                   
                    src={profilePictureUrl}
                    alt=""/>                     
                    </div>
                     {/* <!-- END profile-header-img --> */}
                     {/* <!-- BEGIN profile-header-info --> */}
                     <div className="profile-header-info">
                        <h4 className="m-t-10 m-b-5">{userData?.FirstName} {userData?.LastName}</h4>
                        {/* <p className="m-b-10">UXUI + Frontend Developer</p> */}
                     </div>
                     {/* <!-- END profile-header-info --> */}
                  </div>
                  {/* <!-- END profile-header-content --> */}
            
               </div>
            </div>
            {/* <!-- end profile --> */}
            {/* <!-- begin profile-content --> */}
            <div className="profile-content">
               {/* <!-- begin tab-content --> */}
               <div className="tab-content p-0">
                  {/* <!-- begin #profile-post tab --> */}
                  <div className="tab-pane fade active show" id="profile-post">
                     {/* <!-- begin timeline --> */}
                     <ul className="timeline">
                        
                           {/* <!-- end timeline-time --> */}
                           {/* <!-- begin timeline-icon --> */}
                           <div className="timeline-icon">
                           </div>
                           {/* <!-- end timeline-icon -->
                           <!-- begin timeline-body --> */}

        {/* Create post form */}
        <div className="timeline-body"> 
    		<h5>Post something </h5>
    		<form onSubmit={handleCreatePost}>    		    
    		    <div className="form-group">
    		        <label for="Title">Title <span className="require">*</span></label>
                  <input
               ref={inputRefTitle}
              type="text"
              className="form-control"
              name="Title"
            value={Title}
              onChange={(e) => setTitle(e.target.value)}/>
    		    </div>
    		    <div className="form-group">
    		        <label for="Description">Description <span className="require">*</span> </label>
    		        <textarea rows="5" 
                     ref={inputRefDescription}
                 className="form-control" name="description" value={Description} onChange={(e) => setDescription(e.target.value)}></textarea>
    		    </div>
    		    <div className="form-group">
    		        <p><span className="require">*</span> - required fields</p>
    		    </div>
    		    <div className="form-group">
              <div className="form-group">
           <label htmlFor="ImagePath">Upload Image(s)</label>
                    <br></br>
           <input
           type="file"
           className="ImagePath"
         id="ImagePath"
         multiple
          accept="image/*"
    />
  </div>
                    <br></br>
    		        <button type="submit" className="btn btn-primary" disabled={!isFormValid()}>
    		            Post
    		        </button>
                   {/* Success message */}
              {showSuccessMessage && <div className="alert alert-success mt-3" role="alert">Posted successfully!</div>}
    		        
    		    </div>
   	</form>
</div>
{friendsPosts && friendsPosts
  .sort((a, b) => new Date(b.DateTImeCreated) - new Date(a.DateTImeCreated))
  .map((response) => (
    <li key={response.DateTImeCreated}>
      <div className="timeline-body">
        
        <div className="timeline-header">
          <span className="userimage"><img src="https://bootdey.com/img/Content/avatar/avatar3.png" alt=""/></span>
          <span className="username"><a href="">{response.Title}</a> <small></small></span>
          <br/>
          <br/>
          <span className="username">{response.FirstName} {response.LastName} <small></small></span>
        </div>
        <div className="timeline-content">
          <p>{response.Description}</p>
        </div>
          {/* {response.ImagePath && ( */}
            <div className="ImagePath">
              <img src={response.ImagePath} alt="Post image" style={{ maxWidth: '100%' }} />
            </div>
          {/* )}       */}
            <div className="timeline-likes"> <p>{response.Likes}</p>
          <div className="stats">
            <span className="fa-stack fa-fw stats-icon">
              <i className="fa fa-circle fa-stack-2x text-primary"></i>
              <i className="fa fa-thumbs-up fa-stack-1x fa-inverse"></i>
            </span>
          </div>
        </div>
    <br></br>
  
        <div className="timeline-footer">
          <a href="" className="m-r-15 text-inverse-lighter"><i className="fa fa-thumbs-up fa-fw fa-lg m-r-3"></i> Like</a> 
          <a href="" className="m-r-15 text-inverse-lighter"><i className="fa fa-comments fa-fw fa-lg m-r-3"></i> Comment</a>
        </div>
        <div className="timeline-comment-box">
          <div className="user"><img src="https://bootdey.com/img/Content/avatar/avatar3.png" alt=""/></div>
          <div className="input">
            <form action="">
              <div className="input-group">
                <input type="text" className="form-control rounded-corner" placeholder="Write a comment..."/>
                <span className="input-group-btn p-l-10">
                  <button className="btn btn-primary f-s-12 rounded-corner" type="button">Comment</button>
                </span>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="timeline-time">
        <span className="date">{formatDateTime(response.DateTImeCreated)}</span>
      </div>
      <div className="timeline-icon">
        <a href="">&nbsp;</a>
      </div>
    </li>
  ))}

                        <li>
                        </li>
                        <li>
                        </li>
                     </ul>
                  </div>
               </div>
            </div>
         </div>
      </div>
   </div>
</div>
</div>

);
};

export default HomePage;