import axios from "axios";

const API = import.meta.env.VITE_APP_API_BASEURL;

export const follow = {
  follow: async ({ token, userId }) => {
    try {
      const response = await axios.post(
        `${API}/follow/create`,
        { userId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return response.data;
    } catch (e) {
      console.error(e);
    }
  },
  unfollow: async ({ token, id }) => {
    if (token && id) {
      try {
        const response = await axios.delete(`${API}/follow/delete`, {
          headers: { Authorization: `Bearer ${token}` },
          data: {
            id,
          },
        });
        return response.data;
      } catch (e) {
        console.error(e);
      }
    } else {
      console.error("token = ", token, "id = ", id, "Error!");
    }
  },
};
