import { useState } from 'react';
import axios, { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import { POST_API } from '../constant/endpoints';
import { getHeaders } from '../utils/api-headers';
const useChatBot = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Send user message and get bot reply
  const sendMessage = async (message: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await axios.post(
        POST_API.SEND_MESSAGE,
        { message },
        { headers: getHeaders() },
      );
      return res.data;
    } catch (err) {
      const axiosError = err as AxiosError;
      const message = axiosError.message || 'Failed to send message';
      setError(message);
      toast.error(message);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  // Get chat history (paginated)
  const getHistory = async (page = 1, limit = 20) => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await axios.get(
        `${POST_API.GET_HISTORY}?page=${page}&limit=${limit}`,
        { headers: getHeaders() },
      );
      return res.data.messages;
    } catch (err) {
      const axiosError = err as AxiosError;
      const message = axiosError.message || 'Failed to load history';
      setError(message);
      toast.error(message);
      return [];
    } finally {
      setIsLoading(false);
    }
  };

  return { sendMessage, getHistory, isLoading, error };
};

export default useChatBot;
