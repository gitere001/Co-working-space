import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_URL;

const getUser = async () => {
  try {
	const response = await axios.get(`${apiUrl}/api/v1/auth/user`, {
	  withCredentials: true
	});


	if (response.data?.success) {

	  return { success: true, user: response.data };
	} else {
	  return { success: false, message: response.data.message || "Error logging out" };
	}
  } catch (error) {
	// Return the error message from the backend or the generic error message
	return { success: false, message: error.response?.data?.message || error.message || "Error logging out" };
  }
};

export default getUser;
