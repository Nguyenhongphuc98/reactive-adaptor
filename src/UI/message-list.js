
import React from 'react';
import { useList } from '../reactive';
import Message from './message';

const MessageList = ({convId}) => {
    const msgs = useList("ChatManager", convId);

    console.log("MessageList render...", msgs);
    return (
        <div>
            {msgs.map(v => <Message key = {v} id = {v}/>)}
        </div>
    );
};

export default MessageList;