// Default to production URL if environment variable is not set
const API_URL = process.env.REACT_APP_API_URL || 'https://rentnow-backend.onrender.com';

const getSpecificRoom = async (id) => {
  try {
    const token = localStorage.getItem('token');
    
    // Optional: Add error handling for invalid ID
    if (!id) {
      throw new Error('Room ID is required');
    }
    
    // Change this URL to match your backend route
    const response = await fetch(`${API_URL}/rooms/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` })
      },
      credentials: 'include',
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching specific room:', error);
    throw error;
  }
};

export default getSpecificRoom;