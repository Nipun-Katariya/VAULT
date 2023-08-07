import axios from 'axios';

const getUsers = async () => {
  try {
    const response = await axios.get('/users.json');
    return response.data.users;
  } catch (error) {
    console.error('Error fetching users:', error);
    return [];
  }
};

export default getUsers;
