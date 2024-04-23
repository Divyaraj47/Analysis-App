import React, { useState } from "react";
// import "./Chatbot.css"; // Import CSS file for styling

const Chatbot = () => {
  const [inputMessage, setInputMessage] = useState("");
  const [conversation, setConversation] = useState([]);

  const handleMessageSubmit = (event) => {
    event.preventDefault();
    if (inputMessage.trim() !== "") {
      setConversation([...conversation, { text: inputMessage, sender: "user" }]);
      setInputMessage("");
    }
  };

  return (
    <div className="chatbot-container">
      <div className="chatbot-conversation">
        {conversation.map((message, index) => (
          <div key={index} className={`message ${message.sender}`}>
            {message.text}
          </div>
        ))}
      </div>
      <form onSubmit={handleMessageSubmit} className="chatbot-input">
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          placeholder="Type your message..."
        />
        <button type="submit" className="btn">Send</button>
      </form>
    </div>
  );
};

export default Chatbot;
