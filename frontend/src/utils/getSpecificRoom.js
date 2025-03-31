const API_URL = process.env.REACT_APP_API_URL;

const getSpecificRoom = async (id) => {
  try {
    // Get token from localStorage
    const token = localStorage.getItem('token');
    
    const response = await fetch(`${API_URL}/rooms/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` })
      },
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching specific room:', error);
    throw error;
  }
};

export default getSpecificRoom;