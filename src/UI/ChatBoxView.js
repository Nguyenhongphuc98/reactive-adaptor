import React from 'react';
import ChatBoxControllerManager from '../controller/ChatBoxControllerManager';
import { useItem } from '../reactive';
import ChatBoxHeader from './ChatBoxHeader';
import ChatInput from './ChatInput';
import Message from './Message';

const ChatBoxView = (props) => {
    const id = useItem("ChatManager", "currentConv");
    const controller = ChatBoxControllerManager.getControllerById(id);

    console.log('render ChatBoxView', id);
    return (
        <div className="chat-box-view">
            <ChatBoxHeader id = {id} controller = {controller}/>
            <Message id = {id} controller = {controller}/>
            <ChatInput id = {id} controller = {controller}/>
        </div>
    );
};

export default ChatBoxView;