"use client";
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useSession } from 'next-auth/react';
import { useState, useRef, useEffect } from 'react';
import { redirect } from 'next/navigation';

interface ChatMessage {
  sender: 'user' | 'bot';
  message: string;
}

const Chatbot = () => {
  const session=useSession();
  const [messagee, setMessage] = useState<string>('');
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([{
    sender: 'bot', message: 'Hello! How can I help you today?'
  }]);
  const [loading, setLoading] = useState<boolean>(false);
  const chatContainerRef = useRef<HTMLDivElement | null>(null); // Create a ref for the chat container

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) { // Allow shift + enter for new line
      e.preventDefault(); // Prevent default behavior of Enter key
      handleSendMessage();
    }
  };

  const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
  };

  const handleSendMessage = async () => {
    if(session.status=="unauthenticated")redirect('/signin')
    const message=messagee;
    if (!message.trim()) return;
    setMessage('');

    // Add user message to chat history
    setChatHistory((prevChatHistory) => [
      ...prevChatHistory,
      { sender: 'user', message },
    ]);
    setLoading(true);

    try {
      const res = await fetch('/api/chatbot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ body: message }), // Send message as the prompt
      });

      if (!res.ok) {
        throw new Error('Failed to fetch response from the backend');
      }

      // Try parsing the response as JSON
      const data = await res.json();

      if (data && data.output) {
        // Add bot response to chat history
        setChatHistory((prevChatHistory) => [
          ...prevChatHistory,
          { sender: 'bot', message: data.output },
        ]);
      } else {
        throw new Error('Invalid response from backend');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setChatHistory((prevChatHistory) => [
        ...prevChatHistory,
        { sender: 'user', message },
        { sender: 'bot', message: 'Error with request' },
      ]);
    }

    setLoading(false);
  };

  // Scroll to the bottom of the chat container whenever chatHistory changes
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatHistory]);

  return (
    <div className="min-h-screen bg-soft-gray py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-8">AI Support</h1>
        <div className="bg-white rounded-lg shadow-md p-6 max-w-2xl mx-auto">
          <div
            ref={chatContainerRef} // Attach the ref to the chat container
            className="mb-4 h-96 overflow-y-auto space-y-4 pr-4"
          >
            {chatHistory.map((entry, index) => (
              <div
                key={index}
                className={`mb-4 ${
                  entry.sender === 'user' ? 'text-right' : 'text-left'
                }`}
              >
                <span
                  className={`inline-block p-3 rounded-lg ${
                    entry.sender === 'user'
                      ? 'bg-blue-200 text-gray-800'
                      : 'bg-gray-200 text-gray-800'
                  }`}
                >
                  {entry.message}
                </span>
              </div>
            ))}
            {loading && (
              <div className="p-3 rounded-lg bg-gray-100 text-left animate-pulse">
                <p>Typing...</p>
              </div>
            )}
          </div>
          <div className="flex space-x-4">
            <Textarea
              value={messagee}
              onChange={handleMessageChange}
              placeholder="Type your message here..."
              onKeyDown={handleKeyPress}
              className="flex-grow p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
            <Button
              onClick={handleSendMessage}
              className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Send
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;

