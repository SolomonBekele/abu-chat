import { useEffect, useState } from "react";
import { LOCAL_URL, USER_API } from "../utils/constants";


interface UserData {
  id: string;
  fullName: string;
  email: string;
  gender: string;
  profilePic: string;
}

interface ApiResponse {
  data: UserData;
}

const useProfileData = () => {
  const [userData, setUserData] = useState<UserData | null>(null);

  const fetchUserData = async () => {
    try {
      const token = localStorage.getItem("user-token");

      const response = await fetch(`${LOCAL_URL}${USER_API}user/token`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` }),
        },
      });

      const json: ApiResponse = await response.json();
      setUserData(json.data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

 useEffect(() => {
  const load = async () => {
    await fetchUserData();
  };

  load();
}, []);
  return userData;
};

export default useProfileData;
