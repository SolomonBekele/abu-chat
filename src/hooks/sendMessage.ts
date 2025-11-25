import React from 'react'
import { LOCAL_URL, MESSAGE_API } from '../utils/constants';
import { useSelector } from 'react-redux';
import type { RootState } from "../store";

const sendMessage = (message:string) => {
    const {selectedConversation} = useSelector((state:RootState)=> state.conversations)
    const id = selectedConversation?.id
    const sendMessage = async () => {
        try {
          const token = localStorage.getItem("user-token");
    
        await fetch(`${LOCAL_URL}${MESSAGE_API}send/${id}`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              ...(token && { Authorization: `Bearer ${token}` }),
            },
            body:JSON.stringify({message:message})
            }
          );
    
        } catch (error) {
          console.error("Error sending message:", error);
        }

      };
  sendMessage();
}

export default sendMessage