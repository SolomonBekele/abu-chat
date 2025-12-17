import { useState } from "react";
import { BASE_URL, USER_PROFILE_API, VERSION } from "../utils/constants";

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
  const [error, setError] = useState<string | null>(null);

  const fetchUserData = async (): Promise<UserData | null> => {
    const token = localStorage.getItem("user-token");
    if (!token) return null; // no token, return null

    try {
      const response = await fetch(`${BASE_URL}${VERSION}${USER_PROFILE_API}/self/token`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const json: ApiResponse = await response.json();
      setUserData(json.data);
      return json.data; // return the data
    } catch (err: any) {
      setError(err.message || "Unknown error");
      console.error("Error fetching user data:", err);
      return null;
    }
  };

  return { userData, error, fetchUserData };
};

export default useProfileData;
