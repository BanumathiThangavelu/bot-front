import { useEffect, useState, useRef } from 'react';
import useChatBot from '../../hooks/useChatBot';
import type { Message } from '../../types/message';
const ChatHistory = () => {
  const { getHistory, isLoading } = useChatBot();
  const [messages, setMessages] = useState<Message[]>([]);
  const chatEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const loadHistory = async () => {
      const history = await getHistory(1, 20);
      console.log('Chat History:', history);
      setMessages(history.reverse());
    };

    loadHistory();
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  console.log('Messages:', messages);
  return (
    <div className="max-w-xl mx-auto mt-8 p-4 bg-white rounded shadow">
      <div className="h-96 overflow-y-auto border p-2 mb-2 space-y-2 bg-white rounded flex flex-col">
        {messages.map((msg) => (
          <div
            key={msg._id}
            className={`max-w-[75%] rounded p-3 break-words shadow ${
              msg.sender === 'USER'
                ? 'bg-blue-600 text-white self-end'
                : 'bg-gray-200 text-black self-start'
            }`}
          >
            <p>{msg.message}</p>
            {msg.sender === 'BOT' && msg.supportId && (
              <p className="text-xs text-gray-600 mt-1 italic">
                Support ID: {msg.supportId}
              </p>
            )}
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>
    </div>
  );
};

export default ChatHistory;
