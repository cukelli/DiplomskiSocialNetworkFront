import React from 'react';

const ImageComponent = ({ imageData }) => {
  return (
    <img src={imageData} alt="Post Content" style={{ maxWidth: '100%' }} />
  );
};

export default ImageComponent;
