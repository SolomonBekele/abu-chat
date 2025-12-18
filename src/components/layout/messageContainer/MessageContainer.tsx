import React, { useEffect } from 'react'
// import Messages from './Messages'
import MessageInput from './MessageInput'
import { TiMessages } from "react-icons/ti";
// import useConversation from '../../zustand/useConversation';
import { useAuthContext } from '../../../context/AuthContext';
import MessageHeader from './MessageHeader';
import Messages from './Messages';
import type { RootState } from "../../../store";
import { useSelector } from "react-redux";

const MessageContainer = () => {
  const { selectedConversation } = useSelector(
    (state: RootState) => state.conversations
  );

  return (
    <div className="flex flex-col w-full h-full bg-gray-50"> {/* h-full added */}
      {selectedConversation === null ? (
        <NoChatSelected />
      ) : (
        <div className="flex flex-col flex-1 overflow-hidden"> {/* flex-1 + overflow-hidden */}
          {/* Header */}
          <MessageHeader />

          {/* Messages */}
          <div className="flex-1 overflow-auto">
            <Messages conversationId={selectedConversation?.conversationInfo?._id} />
          </div>

          {/* Input */}
          <MessageInput />
        </div>
      )}
    </div>
  );
};



export default MessageContainer


const NoChatSelected = () => {
	const { authUser } = useAuthContext();
    
	return (
		<div className='flex items-center justify-center w-full h-full'>
			<div className='px-4 text-center sm:text-lg md:text-xl text-gray-500 font-semibold flex flex-col items-center gap-2'>
				<p>{`Welcome 👋 ${authUser.name} ❄`}</p>
				<p>Select a conversation to start messaging</p>
				<TiMessages className='text-3xl md:text-6xl text-center' />
			</div>
		</div>
	);
};