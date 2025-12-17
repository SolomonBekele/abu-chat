export interface Message {
  _id: string;
  conversation_id: string;
  sender_id: string;
  type: "text" | "image" | "video" | "file"; // extend if needed
  content: string;
  media_url: string | null;
  delivered_at: string | null;
  read_at: string | null;
  deleted: boolean;
  reply_to_message_id: string | null;
  sent_at: string;
  updated_at?: string;
  __v: number;
}

export interface messagesState {
  success: boolean;
  message: string ;
  data: Record<string,Message[]>;
  loading: boolean;
   error?: string;
}


