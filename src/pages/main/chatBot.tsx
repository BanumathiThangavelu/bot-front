import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import useChatBot from '../../hooks/useChatBot';
import type { Message } from '../../types/message';
import { CHAT_HISTORY } from '../../constant/navigation';

const ChatBot = () => {
  const navigate = useNavigate();
  const { sendMessage, getHistory, isLoading } = useChatBot();

  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const chatEndRef = useRef<HTMLDivElement | null>(null);

  // Load chat history once
  useEffect(() => {
    const loadHistory = async () => {
      const history = await getHistory(1, 20);
      setMessages(history.reverse());
    };
    loadHistory();
  }, []);

  // Scroll to bottom when messages update
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const data = await sendMessage(input);
    if (data) {
      setMessages((prev) => [...prev, data.userMessage, data.botMessage]);
      setInput('');
    }
  };

  const handleHistoryClick = () => {
    navigate(CHAT_HISTORY);
  };

  return (
    <div className="max-w-xl mx-auto mt-8 p-4 bg-white rounded shadow">
      <div className="h-96 overflow-y-auto border p-2 mb-2 space-y-2 bg-gray-50 rounded flex flex-col">
        {messages.map((msg, i) => (
          <div
            key={msg._id || i}
            className={`p-2 rounded max-w-[75%] break-words ${
              msg.sender === 'USER'
                ? 'bg-blue-100 text-black self-end'
                : 'bg-gray-200 text-black self-start'
            }`}
          >
            {msg.message}
            {msg.sender === 'BOT' && msg.supportId && (
              <p className="text-xs text-gray-500 mt-1 italic">
                Support ID: {msg.supportId}
              </p>
            )}
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>

      <form onSubmit={handleSend} className="flex gap-2 mt-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask your question here"
          className="flex-grow border px-4 py-3 text-lg rounded-lg"
        />
        <button
          type="submit"
          disabled={isLoading}
          className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          Send
        </button>
        <button
          type="button"
          onClick={handleHistoryClick}
          className="bg-gray-300 text-black px-4 py-2 rounded"
        >
          Chat History
        </button>
      </form>
    </div>
  );
};

export default ChatBot;
