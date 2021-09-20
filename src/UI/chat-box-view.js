import {useState} from 'react';
import ChatBoxControllerManager from '../controller/chat-box-controller-manager';
import { useItem } from '../reactive';
import ChatBoxHeader from './chat-box-header';
import ChatInput from './chat-input';
import MessageList from './message-list';

const ChatBoxView = (props) => {
    const id = useItem("ChatManager", "currentConv", item => {
        console.log("runing chatboxview selector", item);
        return item;
    });
    const controller = ChatBoxControllerManager.getControllerById(id);

    const [showMess, setShowMess] = useState(true);

    const toggleMess = () => {
        setShowMess(!showMess);
    }

    console.log('render ChatBoxView', id);
    return (
        <div className="chat-box-view">
            <ChatBoxHeader id = {id} controller = {controller}/>
            <button style={{marginLeft: "500px"}} onClick={toggleMess}>{showMess? "Hide Mess" : "Show Mess"}</button>
            {showMess? <MessageList convId = {id}/> : null}
            <ChatInput id = {id} controller = {controller}/>
        </div>
    );
};

export default ChatBoxView;