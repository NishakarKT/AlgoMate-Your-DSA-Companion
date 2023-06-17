import React, { useState, useEffect, useContext, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import "./Assistant.css";
// constants
import { MAIN_NYRA_PNG } from "../../constants/images";
// components
import ChatBox from "../chatBox/ChatBox";
// contexts
import UserContext from "../../contexts/userContext";
// mui
import { Fab, Avatar } from "@mui/material";
import { DSA_ROUTE } from "../../constants/routes";
// speech recognition
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognizer = new SpeechRecognition();
// speech synthesis
const utterance = new SpeechSynthesisUtterance();

const Assistant = () => {
    const navigate = useNavigate();
    const { user, setSearch } = useContext(UserContext);
    const [activate, setActivate] = useState(false);
    const [isListening, setIsListening] = useState(false);
    const [isNyraSpeaking, setIsNyraSpeaking] = useState(false);
    const [messages, setMessages] = useState([{
        date: new Date(), content: "Enter your DSA question and let me search through!", from: "Nyra"
    }]);

    const saySpeech = speech => {
        utterance.text = speech;
        window.speechSynthesis.speak(utterance);
    }

    const processCommand = useCallback(command => {
        setSearch(command.toLowerCase());
        navigate(DSA_ROUTE);
        saySpeech("Here are the search results for your question!");
        return ({ from: "Nyra", content: "Here are the search results for your question!", date: new Date() });
    }, [navigate, setSearch]);

    const handleNewCommand = useCallback(command => {
        const newMessage = { from: user.roll, content: command, date: new Date() }
        setMessages(messages => [...messages, newMessage]);

        const nyraMessage = processCommand(command);
        setTimeout(() => {
            setMessages(messages => [...messages, nyraMessage]);
        }, 500);
    }, [user, processCommand]);

    useEffect(() => {
        // recognizer
        recognizer.onstart = () => {
            console.log("Started Listening...");
        }
        recognizer.onend = () => {
            console.log("Stopped Listening...");
        }
        recognizer.onresult = e => {
            setIsListening(false);
            const command = e.results[0][0].transcript;
            handleNewCommand(command);
        }
        // utterance
        window.speechSynthesis.onvoiceschanged = () => {
            const voices = window.speechSynthesis.getVoices()
            utterance.voice = voices[12];
        };
        utterance.onstart = () => {
            setIsNyraSpeaking(true);
        };
        utterance.onend = () => {
            setIsNyraSpeaking(false);
        };
    }, [handleNewCommand]);

    useEffect(() => {
        if (isListening) recognizer.start();
        else recognizer.stop();
    }, [isListening]);

    return (
        <div className="assistant">
            <Fab className="assistant__toggle" onClick={() => setActivate(activate => !activate)} tabIndex={0}>
                <Avatar src={MAIN_NYRA_PNG} alt="" />
            </Fab>
            <ChatBox isListening={isListening} setIsListening={setIsListening} isNyraSpeaking={isNyraSpeaking} setActivate={setActivate} username={user.name} messages={messages} handleNewCommand={handleNewCommand} style={activate ? { width: "300px", height: "400px" } : { width: "0px", height: "0px" }} />
        </div>
    );
};

export default Assistant;
