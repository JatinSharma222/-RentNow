const getSpecificRoom = async (id) => {
    try {
      const response = await fetch(`http://localhost:3001/auth/rooms/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
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