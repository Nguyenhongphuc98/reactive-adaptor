import { memo, useState } from "react";
import Loader from "./loader";

const ChatInput = (props) => {
    const { controller } = props;

    const [sending, setSending] = useState(false);
    const chat = () => {
        const text = document.getElementById("ipct").value;

        setSending(true);
        document.getElementById("ipct").value = "";
        controller.sendMessage(text)
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

export default memo(ChatInput);