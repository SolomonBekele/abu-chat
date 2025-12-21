import React from 'react'
import { BASE_URL, MESSAGE_API, USER_AUTH_API, VERSION } from '../utils/constants';
import { useSelector } from 'react-redux';
import type { RootState } from "../store";

const Logout = () => {
    const logout = async () => {
        try {
          const token = localStorage.getItem("user-token");
    
        await fetch(`${BASE_URL}${VERSION}${USER_AUTH_API}/LOGOUT`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              ...(token && { Authorization: `Bearer ${token}` }),
            }
            }
          );
    
        } catch (error) {
          console.error("Error logout:", error);
        }

      };
  logout();
}

export default Logout