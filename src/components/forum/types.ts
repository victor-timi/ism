export interface ForumMessage {
  id: string;
  avatar: string;
  color: string;
  name: string;
  tag: string;
  message: string;
  reactions: string[];
}

export interface ForumChannel {
  name: string;
  count?: number;
  active?: boolean;
}
