import React from "react";
import "./ChatBubble.css";

const ChatBubble = ({ message, myText }) => {
    return (
        <div className={`chatBubble ${myText ? "chatBubble__right" : "chatBubble__left"}`}>
            <p className="chatBubble__content">{message.content}</p>
            <p className="chatBubble__date">{new Date(message.date).toLocaleString("en-GB", { hour: "numeric", minute: "2-digit", hour12: true, day: "numeric", month: "short", year: "numeric", })}</p>
        </div>
    );
};

export default ChatBubble;
