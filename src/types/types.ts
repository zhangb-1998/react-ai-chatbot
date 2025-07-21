export interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
}


export interface ChatConfig {
  model: string;
  temperature?: number;
  maxTokens?: number;
}