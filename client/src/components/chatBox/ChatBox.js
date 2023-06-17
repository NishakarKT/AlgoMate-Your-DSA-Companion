import React, { useState, useEffect, useContext, useRef } from "react";
import "./ChatBox.css";
// components
import ChatBubble from "../chatBubble/ChatBubble";
// constants
import { MAIN_NYRA_PNG } from "../../constants/images";
// contexts
import UserContext from "../../contexts/userContext";
// mui
import { IconButton } from "@mui/material";
import MicRoundedIcon from "@mui/icons-material/MicRounded";
import MicOffRoundedIcon from "@mui/icons-material/MicOffRounded";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

const ChatBox = ({ isListening, setIsListening, isNyraSpeaking, setActivate, messages, handleNewCommand, style }) => {
    const { user } = useContext(UserContext)
    const chatBox = useRef(null);
    const [command, setCommand] = useState("");

    const handleCommandSubmit = e => {
        e.preventDefault();
        handleNewCommand(command);
        setCommand("");
    };

    const handleClose = () => {
        setActivate(false);
        setIsListening(false);
    };

    useEffect(() => {
        setTimeout(() => chatBox.current.scrollTop = chatBox.current.scrollHeight, 0);
    }, [messages]);

    return (
        <div className="chatBox__container" style={style}>
            <div className="chatBox">
                <div className="chatBox__head">
                    <div className="chatBox__chatInfo">
                        <img className={`chatBox__avatar ${isNyraSpeaking ? "chatBox__nyraSpeaks" : ""}`} src={MAIN_NYRA_PNG} alt="" />
                        <div className="chatBox__nyraInfo">
                            <p>Nyra</p>
                            <p>Your assistant programmer!</p>
                        </div>
                    </div>
                    <IconButton className="chatBox__closeBtn" onClick={() => handleClose()}><CloseRoundedIcon /></IconButton>
                </div>
                <div className="chatBox__messages" ref={chatBox}>
                    <p className="chatBox__welcomeMsg">This is Nyra, your very own personal assistant.<br /></p>
                    {messages.map((message, index) => <ChatBubble key={index} message={message} myText={message.from === user.roll} />)}
                </div>
                <form className="chatBox__newMessage" onSubmit={e => handleCommandSubmit(e)}>
                    <IconButton onClick={() => setIsListening(isListening => !isListening)}>{isListening ? <MicRoundedIcon className="chatBox__micActive" /> : <MicOffRoundedIcon />}</IconButton>
                    <input placeholder="Type your question." value={command} onChange={e => setCommand(e.target.value)} />
                    <IconButton disabled={Boolean(!command.length)} type="submit"><SendRoundedIcon style={{ color: Boolean(command.length) ? "#1976D2" : "grey" }} /></IconButton>
                </form>
            </div>
        </div>
    );
};

export default ChatBox;
