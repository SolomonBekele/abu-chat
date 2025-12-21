import { useSelector } from "react-redux";
import type { RootState } from "../store";
import { useState } from "react";
import { BASE_URL, USER_PROFILE_API, VERSION } from "../utils/constants";
export interface UserDataProps {
  id: string;
  name: string;
  email: string;
  phone_number: string;
  profile_picture: string;
  status:string;
}

const useFetchProfilePic = (userData:UserDataProps) => {
const { userData,updateProfilePic } = useSelector((state: RootState) => state.user);
const [profilePicUrl, setProfilePicUrl] = useState<string>(userData?.profile_picture ?? "");
const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    
    if (!userData?.profile_picture) return;
  
    const fetchProfilePic = async () => {
      try {
        const res = await fetch(`${BASE_URL}${VERSION}${USER_PROFILE_API}/profile/pic/${userData?.id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("user-token")}`,
          },
        });
        if (!res.ok) throw new Error("Failed to fetch profile pic");
        const data = await res.json();
        setImageUrl(data.imageUrl);
      } catch (err) {
        console.error(err);
      }
    };
  
    fetchProfilePic();
  }, [userData?.profile_picture, updateProfilePic.isUpdated]); 
    
}

export default useFetchProfilePic