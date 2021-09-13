import { useState } from "react";
import { store } from "../store";
import Loader from "./loader";

const ChatInput = (props) => {
    const { controller } = props;

    const [sending, setSending] = useState(false);
    const chat = () => {
        const text = document.getElementById("ipct").value;

        setSending(true);
        document.getElementById("ipct").value = "";
        controller.updateConvContent(text)
            .then(r => {
                setSending(false);
            })
    }

    console.log('render ChatInput');
    return (
        <div className="chat-input">
            <input id="ipct" type="text"></input>
            {sending ? <Loader /> : <button className="btn" onClick={chat}>Send</button>}
        </div>
    );
};

export default ChatInput;