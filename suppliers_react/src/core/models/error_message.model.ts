export interface ErrorMessage {
  message: string;
  timestamp: string;
  status: number;
  error?: string;
  path?: string;
  details?: { [key: string]: string };
}
