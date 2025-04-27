import axios from 'axios';
const apiUrl = import.meta.env.VITE_API_URL;

const loginUser = async (payload) => {
  try {
    const response = await axios.post(`${apiUrl}/api/v1/auth/login`, payload, {
      withCredentials: true
    });

    // Check if the login was successful and return the message from backend
    if (response.data?.success) {
      // Store the access token in localStorage
      localStorage.setItem('MbPeShVmY', response.data.accessToken);
      return { success: true, data: response.data };
    } else {
      return { success: false, message: response.data.message || "Error logging in" };
    }
  } catch (error) {
    // Return the error message from the backend or the generic error message
    return { success: false, message: error.response?.data?.message || error.message || "Error logging in" };
  }
};

export default loginUser;
