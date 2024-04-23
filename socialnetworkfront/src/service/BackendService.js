function setToken(token) {
    localStorage.setItem('token', token);
  }
  
  function getToken() {
    return localStorage.getItem('token');
  }
  
  async function loginUser(credentials) {
    return fetch('http://localhost:9000/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
      mode: 'cors',
    })
      .then((data) => data.json())
      .then((response) => {
        setToken(response.token); 
        return response;
      })
      .catch((error) => console.error('Fetch error:', error));
  }
  

  async function registerUser(userData) {
  return fetch('http://localhost:9000/api/registration', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
    mode: 'cors',
  })
    .then((data) => data.json())
    .then((response) => {
      // console.log(response);
      return response;
    })
    .catch((error) => console.error('Fetch error:', error));
}


async function getCurrentUser() {
  const token = getToken();

  if (!token) {
    console.error('Token not found');
    return null; 
  }

  const tokenWithoutDoubleQuotes = token.replace(/^"(.*)"$/, '$1');

  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${tokenWithoutDoubleQuotes}`,
  };
  

  try {
    const response = await fetch('http://localhost:9000/api/get/user', {
      method: 'GET',
      headers: headers,
      mode: 'cors', 

    });

    if (!response.ok) {
      // console.log(response)
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const user = await response.json();
    // console.log('User:', user);

    return user;
  } catch (error) {
    console.error('Fetch error:', error);
    throw error; 
  }
}



async function getDefaultProfilePicture() {
  const token = getToken();

  if (!token) {
    return null;
  }

  const tokenWithoutDoubleQuotes = token.replace(/^"(.*)"$/, '$1');

  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${tokenWithoutDoubleQuotes}`,
  };

  try {
    const response = await fetch('http://localhost:9000/assets/images/avatar.jpg', {
      method: 'GET',
      headers: headers,
      mode: 'cors',
    });

    if (!response.ok) {
      // console.log(response);
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const imageUrl = response.url;
    // console.log('Profile Picture URL:', imageUrl);

    return imageUrl;
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
}


async function editUserInfo(updatedUserInfo) {
  const token = getToken();

  if (!token) {
    return null;
  }

  const tokenWithoutDoubleQuotes = token.replace(/^"(.*)"$/, '$1');

  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${tokenWithoutDoubleQuotes}`,
  };

  try {
    const response = await fetch('http://localhost:9000/api/profile/update', {
      method: 'PUT', 
      headers: headers,
      mode: 'cors',
      body: JSON.stringify(updatedUserInfo), 
    });

    if (!response.ok) {
      // console.log(response);
      throw new Error("First and last name must be in correct format!");
    }

    const result = await response.json();
    // console.log('Edit User Info Result:', result);
    return result;
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
}


async function changePassword(changePasswordApi) {
  const token = getToken();

  if (!token) {
    return null;
  }

  const tokenWithoutDoubleQuotes = token.replace(/^"(.*)"$/, '$1');
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${tokenWithoutDoubleQuotes}`,
  };

  try {
    const response = await fetch('http://localhost:9000/api/update/password', {
      method: 'PUT',
      headers: headers,
      mode: 'cors',
      body: JSON.stringify(changePasswordApi),
    });

    if (!response.ok) {
      const errorData = await response.json(); 
      // console.log('Change Password Error:', errorData);
      throw new Error(errorData.message || 'Error changing password');
    }

    const result = await response.json();
    // console.log('Change Password Result:', result);
    return result;
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
}


async function createPost(postData) {
  const token = getToken();

  if (!token) {
    return null;
  }

  const tokenWithoutDoubleQuotes = token.replace(/^"(.*)"$/, '$1');

  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${tokenWithoutDoubleQuotes}`,
  };

  try {
    // console.log("test heere")
    // console.log(JSON.stringify(postData));
    const response = await fetch('http://localhost:9000/api/post/create', {
      method: 'POST',
      headers: headers,
      mode: 'cors',
      body: JSON.stringify(postData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.log('Create Post Error:', errorData);
      throw new Error(errorData.message || 'Error creating post');
    }

    const result = await response.json();
    // console.log('Create Post Result:', result);
    return result;
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
}



async function getFriendsPosts() {
  const token = getToken();

  if (!token) {
    return null;
  }

  const tokenWithoutDoubleQuotes = token.replace(/^"(.*)"$/, '$1');

  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${tokenWithoutDoubleQuotes}`,
  };

  try {
    const response = await fetch('http://localhost:9000/api/home/posts', {
      method: 'GET',
      headers: headers,
      mode: 'cors'
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Error fetching posts');
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
}


async function getImagesByPostId(postId) {
  // console.log("entered function");
  const token = getToken();

  if (!token) {
    console.error('Token not found');
    return [];
  }

  const tokenWithoutDoubleQuotes = token.replace(/^"(.*)"$/, '$1');

  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${tokenWithoutDoubleQuotes}`,
  };

  try {
    const response = await fetch(`http://localhost:9000/api/image/posts/${postId}`, {
      method: 'GET',
      headers: headers,
      mode: 'cors',
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Error fetching images');
    }

    const images = await response.json();
    // console.log(images);
    return images;
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
}



  export { setToken, getToken, loginUser, registerUser, getCurrentUser, getDefaultProfilePicture, editUserInfo, changePassword, createPost, getFriendsPosts, getImagesByPostId };