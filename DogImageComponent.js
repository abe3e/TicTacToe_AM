import React, { useState, useEffect } from 'react';

const DogImageComponent = () => {
  const [dogImageUrl, setDogImageUrl] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDogImage = async () => {
      try {
        const response = await fetch('https://dog.ceo/api/breeds/image/random');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setDogImageUrl(data.message);
        setIsLoading(false);
      } catch (error) {
        setError(error.message);
        setIsLoading(false);
        console.error('Error fetching dog image:', error);
      }
    };

    fetchDogImage();
  }, []);

  if (isLoading) {
    return <div>Loading Dog Image...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Random Dog Image</h1>
      <img src={dogImageUrl} alt="Random Dog" style={{ maxWidth: '500px' }} />
    </div>
  );
};

export default DogImageComponent;
