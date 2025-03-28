const API_URL = process.env.REACT_APP_API_URL;
const getRooms = async () => {
  try {
    const response = await fetch(`${API_URL}/rooms`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
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
