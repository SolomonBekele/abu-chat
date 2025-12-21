import { createContext, useEffect, useState, useContext, ReactNode } from "react";
import { useDispatch } from "react-redux";
import { useAuthContext } from "./AuthContext";
import { io, Socket } from "socket.io-client";
import { handleNewMessage } from "../hooks/useListenMessages";
import { data } from "react-router-dom";

interface MessageDataType{
  conversationId : string | undefined;
  receiverId:string | undefined;
  content:string | undefined;
  type:string | undefined;
}

interface SocketContextType {
  socket: Socket | null;
  onlineUsers: string[];
  emitTypingStart: (receiverId: string, conversationId: string) => void;
  emitTypingStop: (receiverId: string, conversationId: string) => void;
  emitMessageSeen: (messageId: string, receiverId: string) => void;
  emitMessageSend: (messageData:MessageDataType) =>void;
}

const SocketContext = createContext<SocketContextType | undefined>(undefined);

export const useSocketContext = (): SocketContextType => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error("useSocketContext must be used within a SocketContextProvider");
  }
  return context;
};

interface SocketContextProviderProps {
  children: ReactNode;
}

export const SocketContextProvider: React.FC<SocketContextProviderProps> = ({ children }) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [onlineUsers, setOnlineUsers] = useState<string[]>([]);
  const { authUser } = useAuthContext();
  const dispatch = useDispatch();

  useEffect(() => {
    if (authUser) {
      const socketInstance: Socket = io("http://localhost:3002", {
        auth: {
          token: localStorage.getItem("user-token"),
        },
        autoConnect: true,
        reconnection: true,
      });

      setSocket(socketInstance);

      // Online users
      socketInstance.on("getOnlineUsers", (users: string[]) => {
        setOnlineUsers(users);
      });

      // Typing indicator
      socketInstance.on("typing:start", ({ from, conversationId }) => {
        console.log(`User ${from} is typing in conversation ${conversationId}`);
      });
      socketInstance.on("typing:stop", ({ from, conversationId }) => {
        console.log(`User ${from} stopped typing in conversation ${conversationId}`);
      });

      // Message seen indicator
      socketInstance.on("message:seen", ({ messageId, seenBy }) => {
        console.log(`Message ${messageId} seen by ${seenBy}`);
      });
      socketInstance.on("message:new", (payload, callback) => {
          handleNewMessage(payload, dispatch);
      });

      return () => {
        socketInstance.disconnect();
        setSocket(null);
      };
    } else {
      if (socket) {
        console.log("Closing socket due to no authUser");
        socket.disconnect();
        setSocket(null);
      }
    }
  }, [authUser]);

  // Functions to emit events
  const emitTypingStart = (receiverId: string, conversationId: string) => {
    socket?.emit("typing:start", { receiverId, conversationId });
  };

  const emitTypingStop = (receiverId: string, conversationId: string) => {
    socket?.emit("typing:stop", { receiverId, conversationId });
  };

  const emitMessageSeen = (messageId: string, receiverId: string) => {
    socket?.emit("message:seen", { messageId, receiverId });
  };
  const emitMessageSend = (messageData:MessageDataType)=>{
    socket?.emit("message:send",{messageData})
  }

  return (
    <SocketContext.Provider
      value={{ socket, onlineUsers, emitMessageSend,emitTypingStart, emitTypingStop, emitMessageSeen }}
    >
      {children}
    </SocketContext.Provider>
  );
};
