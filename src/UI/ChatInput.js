
const ChatInput = (props) => {
    const {controller} = props;
    const chat = () => {
        const text = document.getElementById("ipct").value;
        controller.updateConvContent(text);
        document.getElementById("ipct").value ="";
    }

    console.log('render ChatInput');
    return (
        <div className="chat-input">
            <input id ="ipct" type="text"></input>
            <button className = "btn" onClick={chat}>Send</button>
        </div>
    );
};

export default ChatInput;