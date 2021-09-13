import React from 'react';
import ChatBoxControllerManager from '../controller/chat-box-controller-manager';
import { useItem } from '../reactive';
import ChatBoxHeader from './chat-box-header';
import ChatInput from './chat-input';
import Message from './message';

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