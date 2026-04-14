import React, { useState } from 'react';
import { MessageSquare, X, Send } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Chatbot = () => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: t("chatbot_greeting"), sender: 'bot' }
  ]);
  const [input, setInput] = useState('');

  const toggleChat = () => setIsOpen(!isOpen);

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = input.trim();
    setMessages([...messages, { text: userMessage, sender: 'user' }]);
    setInput('');

    // Simulate bot response
    setTimeout(() => {
      setMessages(prev => [...prev, { text: "I'm a demo bot. How can I help with your cognitive assessment?", sender: 'bot' }]);
    }, 1000);
  };

  return (
    <div className="chatbot-container">
      {isOpen && (
        <div className="chatbot-window animate-fade-in">
          <div className="chatbot-header">
            <span>CogniCare Assistant</span>
            <button onClick={toggleChat} style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer' }}>
              <X size={20} />
            </button>
          </div>
          <div className="chatbot-messages">
            {messages.map((msg, index) => (
              <div key={index} className={`chat-message ${msg.sender}`}>
                {msg.text}
              </div>
            ))}
          </div>
          <form className="chatbot-input" onSubmit={handleSend}>
            <input 
              type="text" 
              value={input} 
              onChange={(e) => setInput(e.target.value)} 
              placeholder={t("chatbot_placeholder")}
            />
            <button type="submit" style={{ background: 'none', border: 'none', color: 'var(--colorPrimary)', cursor: 'pointer', marginLeft: '10px' }}>
              <Send size={20} />
            </button>
          </form>
        </div>
      )}
      <button className="chatbot-toggle" onClick={toggleChat}>
        <MessageSquare size={28} />
      </button>
    </div>
  );
};

export default Chatbot;
