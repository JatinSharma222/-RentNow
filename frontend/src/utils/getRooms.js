const API_URL = process.env.REACT_APP_API_URL;

const getRooms = async () => {
  try {
    // Get token from localStorage directly
    const token = localStorage.getItem('token');
    
    const response = await fetch(`${API_URL}/rooms`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        // Include Authorization header if token exists
        ...(token && { 'Authorization': `Bearer ${token}` })
      },
      credentials: 'include'
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to fetch rooms');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching rooms:', error);
    throw error;
  }
};

// Alternative version that accepts auth context
// This is useful if you're calling this from a component
const getRoomsWithAuth = async (authContext) => {
  try {
    const response = await fetch(`${API_URL}/rooms`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...authContext.getAuthHeader()
      },
      credentials: 'include'
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to fetch rooms');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching rooms:', error);
    throw error;
  }
};

export default getRooms;
export { getRoomsWithAuth };